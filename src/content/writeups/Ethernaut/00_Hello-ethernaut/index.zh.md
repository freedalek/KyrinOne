---
title: "Ethernaut - 00 Hello Ethernaut"
description: "Ethernaut 第 00 关 Hello Ethernaut 通关记录：校验密码被声明为 public 状态变量，直接读取即可通过。含完整命令链、源码对照与 Sepolia 水龙头踩坑。"
pubDate: 2025-11-08
tags: ["Ethernaut","Solidity","智能合约","区块链"]
categories: ["Ethernaut", "Smart Contract Security"]
difficulty: "easy"
platform: "Ethernaut"
lang: "zh"
langLink: "/en/writeups/Ethernaut/00_Hello-ethernaut/"
---

**这一关没有需要绕过的校验逻辑——校验用的 `password` 被声明为 `string public`，任何调用者都能直接读到它。** 比较值得关注的地方是**Step_4**`await contract.infoNum().then(v => v.toString())` 。

> 还原说明：解题时没有留现场记录，本文是事后按可复现的命令补写的流程与踩坑，不包含任何没有依据的攻击场景推测。

## 背景：环境与前置条件

题目来自 OpenZeppelin 的 [Ethernaut](https://ethernaut.openzeppelin.com/) 新手关卡，部署在 **Sepolia 测试网**。解题环境是浏览器控制台：页面注入的 `contract` 对象（ethers.js 封装）可以直接对关卡实例发起调用。

1. 访问官网，点击 **"00"** 的小手图标进入第一题 *Hello Ethernaut*。

![step](/images/Ethernaut/00_Hello-ethernaut/Image_20251108102304.png)

![step](/images/Ethernaut/00_Hello-ethernaut/Image_20251108102641.png)

2. 按新手指引创建钱包与账户，领取 Sepolia 测试币后，在控制台逐条执行提示给出的方法即可。

### 新手第一坑：测试币领不到

前置卡点不在题内，而在水龙头。试过下面两个都没领到测试币：

- https://faucets.chain.link/
- https://cloud.google.com/application/web3/faucet/ethereum/sepolia

**原因：多数水龙头要求钱包里已有余额（0.001 ETH 或 1 LINK 等），否则拒绝发放。**

解决办法：

1. 往钱包里转入超过 0.001 ETH 后，[quicknode 水龙头](https://faucet.quicknode.com/ethereum/sepolia) 可以领到币。
2. 另一条路：据说 B 站 之类的地方会有博主定期放水，有需要可以关注一下。

![step](/images/Ethernaut/00_Hello-ethernaut/Image_20251108105610.png)

![step](/images/Ethernaut/00_Hello-ethernaut/Image_20251108114327.png)

## 解题流程：每一步的输出，就是下一步的命令
> 终于到这一步了，新手走到这里已经累够呛了。

拿到测试币后，我在控制台里沿着上一步的输出逐条调用。整条线索链如下：

```js
// Step_1：教程给出的第一个方法
await contract.info()
// Output: 'You will find what you need in info1().'
```

```js
// Step_2：info() 指向 info1()
await contract.info1()
// Output: 'Try info2(), but with "hello" as a parameter.'
```

```js
// Step_3：info1() 给出了方法名和参数
await contract.info2("hello")
// Output: 'The property infoNum holds the number of the next info method to call.'
```

```js
// Step_4：取 infoNum 的数值（为什么带 .then(v => v.toString())，见下文）
await contract.infoNum().then(v => v.toString())
// Output: 42
```

```js
// Step_5：42 → info42()
await contract.info42()
// Output: 'theMethodName is the name of the next method.'
```

```js
// Step_6：拿到下一个方法名
await contract.theMethodName()
// Output: 'The method name is method7123949.'
```

```js
// Step_7：再跟进一个方法，提示要提交密码
await contract.method7123949()
// Output: 'If you know the password, submit it to authenticate().'
```

```js
// Step_8：直接查看合约对象，发现它暴露了 password() getter
contract
// Output: { abi: ..., address: ..., ...., password: f () }
```

```js
// Step_9：调用 password() 读出明文密码
await contract.password()
// Output: 'ethernaut0'
```

```js
// Step_10：把密码作为参数提交给 authenticate()
await contract.authenticate('ethernaut0')
```

| 步骤  | 命令                                    | 返回的线索                               | 下一步                             |
| --- | ------------------------------------- | ----------------------------------- | ------------------------------- |
| 1   | `contract.info()`                     | 指向 `info1()`                        | 调用 `info1()`                    |
| 2   | `contract.info1()`                    | 要求用 `"hello"` 调 `info2()`           | 调用 `info2("hello")`             |
| 3   | `contract.info2("hello")`             | 提示读 `infoNum`                       | `infoNum()`                     |
| 4   | `contract.infoNum()`                  | **42**                              | 调用 `info42()`                   |
| 5   | `contract.info42()`                   | 提示 `theMethodName`                  | 调用 `theMethodName()`            |
| 6   | `contract.theMethodName()`            | 方法名 `method7123949`                 | 调用 `method7123949()`            |
| 7   | `contract.method7123949()`            | 提示提交密码                              | 找密码                             |
| 8   | `contract`                            | 暴露 `password()` getter              | 调用 `password()`                 |
| 9   | `contract.password()`                 | **密码 = `ethernaut0`**               | 提交 `authenticate('ethernaut0')` |
| 10  | `contract.authenticate('ethernaut0')` | **通关** | —                               |

## 为什么 Step_4 要写 `.then(v => v.toString())`？

这一行完全看不懂，但直觉告诉我必须得理解这里。它背后是一条完整的数据链路：

**Solidity 状态变量 → RPC 报文 → ethers.js 反序列化 → BigNumber 内部表示 → `toString()` 算法 → 打印 "42"**

```solidity
uint8 public infoNum = 42;     // 42 被编译成 "32 字节大端" 状态存储
```

关键点：`infoNum` 的返回值经 ethers.js 反序列化后是一个 **`BigNumber` 实例**，而不是普通字符串。

| 写法 | 拿到的东西 |
| --- | --- |
| `await contract.infoNum()` | `BigNumber` 对象 |
| `await contract.infoNum().then(v => v.toString())` | 可读的字符串 `"42"` |

**所以 `.then(v => v.toString())` 的含义是：把 Promise 决议出的值 `v`（也就是那个 `BigNumber` 实例）交给回调，回调内对它调用 `.toString()`，最终打印出人能读的 `"42"`。**

>如果还是太抽象的话，可以这样理解: `BigNumber`是一个活生生的人，比如kyrin，但是在一个人员登记册上记录“kyrin”的时候，我们不能直接把Kyrin这个人放在人员登记册上，而是用一个名字"kyrin"来表示。上述这段代码的原理就可以理解成是把kyrin这个人的名字("kyrin"这个单词) 给打印出来。


## 源码对照：

通关后题目会给出合约源码。校验逻辑本身不难：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Instance {
    string public password;
    // 42被编译成 **32 字节大端** 状态存储
	uint8 public infoNum = 42;
    string public theMethodName = "The method name is method7123949.";
    bool private cleared = false;

    // constructor
    constructor(string memory _password) {
        password = _password;
    }

    function info() public pure returns (string memory) {
        return "You will find what you need in info1().";
    }

    function info1() public pure returns (string memory) {
        return 'Try info2(), but with "hello" as a parameter.';
    }

    function info2(string memory param) public pure returns (string memory) {
        if (keccak256(abi.encodePacked(param)) == keccak256(abi.encodePacked("hello"))) {
            return "The property infoNum holds the number of the next info method to call.";
        }
        return "Wrong parameter.";
    }

    function info42() public pure returns (string memory) {
        return "theMethodName is the name of the next method.";
    }

    function method7123949() public pure returns (string memory) {
        return "If you know the password, submit it to authenticate().";
    }

    function authenticate(string memory passkey) public {
        if (keccak256(abi.encodePacked(passkey)) == keccak256(abi.encodePacked(password))) {
            cleared = true;
        }
    }

    function getCleared() public view returns (bool) {
        return cleared;
    }
}
```

**密码能够被直接读取的原因** ，在状态变量声明方式上：`password` 是 **`public`** 状态变量。编译器会为它自动生成 `password()` 读取函数，而读取链上状态不需要任何身份或密钥——**Step_8 在 `contract` 对象里看到的 `password: f()` 就是它**。

补充：`cleared` 虽然标了 `private`，但 `private` 只约束"其他合约不能直接访问"，对任何能发 RPC 的读取者依旧透明。

## 结论与经验

- **链上数据对所有人公开**：`public` getter、`private` 状态变量、甚至存储布局，任何人都能通过公开节点读取；千万不要把需要保密的"密码"放在链上做字符串比对，权限控制应该靠调用方身份，而不是靠"知道一个字符串"。
- **ethers.js 的数值返回 BigNumber**：遇到数值型返回先 `.toString()`（或 `formatUnits()`）再展示，否则拿到的是对象而不是可读数字——据说这是控制台输出"对不上"的最常见原因。
- **准备测试网比解题更耗时**：先让钱包持有少量 ETH（≥ 0.001）再找水龙头，否则大部分 faucet 会直接拒绝发放。



>话说，链上状态有没有真正的秘密？
