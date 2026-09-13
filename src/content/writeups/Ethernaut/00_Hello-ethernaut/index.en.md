---
title: "Ethernaut - 00 Hello Ethernaut"
description: "Walkthrough of Ethernaut level 00, Hello Ethernaut: the verification password is declared as a public state variable, so anyone can read it on-chain. Covers the full command chain, source analysis, and Sepolia faucet pitfalls."
pubDate: 2025-11-08
tags: ["Ethernaut","Solidity","Smart Contract","Blockchain"]
categories: ["Ethernaut", "Smart Contract Security"]
difficulty: "easy"
platform: "Ethernaut"
lang: "en"
langLink: "/zh/writeups/Ethernaut/00_Hello-ethernaut/"
---

**This level has no validation logic to bypass — the `password` used for verification is declared as `string public`, so any caller can read it directly.** The more interesting part is **Step_4**: `await contract.infoNum().then(v => v.toString())`.

> Note on reconstruction: no live notes were kept during the solve; this article is a reproducible, post-hoc write-up of the steps and pitfalls, with no speculative attack scenarios.

## Background: environment and prerequisites

The challenge is a beginner level from OpenZeppelin's [Ethernaut](https://ethernaut.openzeppelin.com/), deployed on the **Sepolia testnet**. The solving environment is the browser console: the injected `contract` object (an ethers.js wrapper) can call the level instance directly.

1. Visit the site and click the little hand icon on **"00"** to enter the first challenge, *Hello Ethernaut*.

![step](/images/Ethernaut/00_Hello-ethernaut/Image_20251108102304.png)

![step](/images/Ethernaut/00_Hello-ethernaut/Image_20251108102641.png)

2. Follow the beginner guide to create a wallet and account, claim Sepolia test ETH, then run the methods given by the hints one by one in the console.

### The first beginner trap: can't get test ETH

The blocker isn't in the challenge, it's the faucet. I tried the following two and got nothing:

- https://faucets.chain.link/
- https://cloud.google.com/application/web3/faucet/ethereum/sepolia

**Reason: most faucets require the wallet to already hold a balance (0.001 ETH or 1 LINK, etc.), otherwise they refuse to dispense.**

Workarounds:

1. After transferring more than 0.001 ETH into the wallet, the [quicknode faucet](https://faucet.quicknode.com/ethereum/sepolia) dispenses fine.
2. Another route: apparently bloggers on sites like Bilibili periodically hand out test ETH — worth watching if you need it.

![step](/images/Ethernaut/00_Hello-ethernaut/Image_20251108105610.png)

![step](/images/Ethernaut/00_Hello-ethernaut/Image_20251108114327.png)

## Walkthrough: each step's output is the next step's command
> Finally made it this far — a beginner is pretty worn out by now.

With test ETH in hand, I called the methods in the console one by one, following the previous output. The full chain of clues is:

```js
// Step_1: the first method given by the tutorial
await contract.info()
// Output: 'You will find what you need in info1().'
```

```js
// Step_2: info() points to info1()
await contract.info1()
// Output: 'Try info2(), but with "hello" as a parameter.'
```

```js
// Step_3: info1() gives the method name and parameter
await contract.info2("hello")
// Output: 'The property infoNum holds the number of the next info method to call.'
```

```js
// Step_4: fetch the value of infoNum (why .then(v => v.toString()) is needed, see below)
await contract.infoNum().then(v => v.toString())
// Output: 42
```

```js
// Step_5: 42 → info42()
await contract.info42()
// Output: 'theMethodName is the name of the next method.'
```

```js
// Step_6: get the next method name
await contract.theMethodName()
// Output: 'The method name is method7123949.'
```

```js
// Step_7: follow one more method; the hint asks to submit the password
await contract.method7123949()
// Output: 'If you know the password, submit it to authenticate().'
```

```js
// Step_8: inspect the contract object directly and find it exposes the password() getter
contract
// Output: { abi: ..., address: ..., ...., password: f () }
```

```js
// Step_9: call password() to read the plaintext password
await contract.password()
// Output: 'ethernaut0'
```

```js
// Step_10: submit the password as an argument to authenticate()
await contract.authenticate('ethernaut0')
```

| Step | Command                                    | Returned clue                               | Next step                             |
| --- | ------------------------------------- | ----------------------------------- | ------------------------------- |
| 1   | `contract.info()`                     | points to `info1()`                        | call `info1()`                    |
| 2   | `contract.info1()`                    | asks to call `info2()` with `"hello"`           | call `info2("hello")`             |
| 3   | `contract.info2("hello")`             | hints to read `infoNum`                       | `infoNum()`                     |
| 4   | `contract.infoNum()`                  | **42**                              | call `info42()`                   |
| 5   | `contract.info42()`                   | hints at `theMethodName`                  | call `theMethodName()`            |
| 6   | `contract.theMethodName()`            | method name `method7123949`                 | call `method7123949()`            |
| 7   | `contract.method7123949()`            | hints to submit the password                              | find the password                             |
| 8   | `contract`                            | exposes the `password()` getter              | call `password()`                 |
| 9   | `contract.password()`                 | **password = `ethernaut0`**               | submit `authenticate('ethernaut0')` |
| 10  | `contract.authenticate('ethernaut0')` | **cleared** | —                               |

## Why does Step_4 need `.then(v => v.toString())`?

I couldn't understand this line at all, but intuition told me I had to. Behind it is a complete data path:

**Solidity state variable → RPC message → ethers.js deserialization → BigNumber internal representation → `toString()` algorithm → prints "42"**

```solidity
uint8 public infoNum = 42;     // 42 is compiled into "32-byte big-endian" state storage
```

Key point: after ethers.js deserialization, the return value of `infoNum` is a **`BigNumber` instance**, not an ordinary string.

| Form | What you get |
| --- | --- |
| `await contract.infoNum()` | a `BigNumber` object |
| `await contract.infoNum().then(v => v.toString())` | the readable string `"42"` |

**So `.then(v => v.toString())` means: hand the Promise-resolved value `v` (that `BigNumber` instance) to the callback, call `.toString()` on it inside the callback, and finally print the human-readable `"42"`.**

>If that's still too abstract, think of it this way: `BigNumber` is a living person, say kyrin, but when recording "kyrin" in a personnel register we can't put the actual person Kyrin on the register — we use the name "kyrin" to represent him. The code above can be understood as printing out that person kyrin's name (the word "kyrin").


## Source comparison:

After clearing, the challenge shows the contract source. The validation logic itself isn't hard:

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

**Why the password can be read directly** comes down to how the state variable is declared: `password` is a **`public`** state variable. The compiler auto-generates a `password()` getter for it, and reading on-chain state requires no identity or key — **the `password: f()` seen on the `contract` object in Step_8 is exactly that**.

Aside: although `cleared` is marked `private`, `private` only means "other contracts can't access it directly"; it remains fully transparent to anyone who can send RPC reads.

## Conclusion and takeaways

- **On-chain data is public to everyone**: `public` getters, `private` state variables, even the storage layout, can all be read by anyone through a public node; never put a secret "password" on-chain for string comparison — access control should rely on caller identity, not on "knowing a string".
- **ethers.js returns BigNumber for numeric values**: when a return value is numeric, call `.toString()` (or `formatUnits()`) before displaying it, otherwise you get an object rather than a readable number — reportedly the most common reason console output "doesn't match".
- **Preparing the testnet takes longer than solving the challenge**: get a small amount of ETH (≥ 0.001) into the wallet before hunting for a faucet, otherwise most faucets will simply refuse.



>By the way — is there any real secret in on-chain state?
