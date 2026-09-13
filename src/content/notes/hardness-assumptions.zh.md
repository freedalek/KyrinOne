---
title: "困难性假设"
description: "公钥密码学所依赖的计算困难性假设：一般群问题 DLP、CDH 与 DDH，因子分解与 RSA，椭圆曲线上的困难性，以及后量子格问题。"
pubDate: 2026-08-16
tags: ["密码学", "困难性假设", "公钥密码", "格", "后量子"]
lang: "zh"
langLink: "/en/notes/hardness-assumptions/"
---

每个公钥方案都建立在一个*计算困难性假设*之上：一个被认为（但未被证明）不可行的问题。这些假设构成一个**归约格**——攻破该方案意味着存在一个能求解底层问题的攻击者。本文定义标准假设及其相对强度。

## 1. 一般群问题：DLP、CDH、DDH

固定一个素数阶 $q$ 的循环群 $\mathbb{G}$，生成元为 $g$，以乘法方式书写。

**定义（离散对数问题，DLP）.** 给定 $g$ 与 $h = g^x$，求 $x \in \mathbb{Z}_q$。

**定义（计算性 Diffie–Hellman，CDH）.** 给定 $g$、$g^a$、$g^b$，计算 $g^{ab}$。

**定义（判定性 Diffie–Hellman，DDH）.** 区分 $(g, g^a, g^b, g^{ab})$ 与
$(g, g^a, g^b, g^c)$，其中 $a, b, c$ 均匀随机。形式化地，对所有高效 $\mathcal{A}$：
$$ \left|\Pr[\mathcal{A}(g,g^a,g^b,g^{ab})=1] - \Pr[\mathcal{A}(g,g^a,g^b,g^c)=1]\right| \le \mathrm{negl}. $$

**归约链.** DDH $\Rightarrow$ CDH $\Rightarrow$ DLP：求解 DLP 即可求解 CDH（计算出 $a$
与 $b$），而求解 CDH 即可求解 DDH（计算 $g^{ab}$ 并比较）。反方向蕴含一般并不成立。

**用途.** DLP → DSA/ElGamal；CDH → Diffie–Hellman 密钥交换；DDH → ElGamal 加密的 IND-CPA 安全性以及许多零知识证明。

**一般算法.** 最好的*一般*算法是 Pollard rho，需要 $O(\sqrt{q})$ 次群运算；由 Shoup 下界可知它对一般群是最优的。因此 256 位的群阶 $q$ 提供约 128 位安全性。**Pohlig–Hellman** 把 DLP 归约到 $q$ 的素数幂因子上的 DLP，因此 $q$ 必须是素数（或接近素数）。

## 2. 因子分解与 RSA 假设

**定义（因子分解）.** 给定 $N = pq$（大素数 $p, q$），恢复 $p, q$。

**定义（RSA 问题）.** 给定 $N$、满足 $\gcd(e, \varphi(N)) = 1$ 的 $e$，以及 $c$，求满足
$m^e \equiv c \pmod N$ 的 $m$。

**定义（RSA 假设）.** 对随机的 $m$，RSA 问题是困难的。

**关系.** RSA 问题归约到因子分解（若能分解即可计算
$d = e^{-1} \bmod \varphi(N)$），但因子分解是否归约到 RSA 尚不清楚。**强
RSA** 与 **Φ-隐藏** 假设支撑着某些零知识/累加器构造。

**最佳攻击.** GNFS 以亚指数时间完成因子分解（见数论）。因此 RSA 模数为 2048–3072 位时可提供 112–128 位安全性。小 $d$ 攻击（Wiener、Boneh–Durfee）以及 $e = 3$
广播攻击说明了需要恰当填充（OAEP/PSS）并使用较大的 $d$。

## 3. 椭圆曲线上的困难性

ECDLP = 点群 $E(\mathbb{F}_p)$ 中的 DLP。对于选择得当的曲线，尚无已知的指数演算类似方法，因此最佳攻击是一般性的（Pollard rho，$O(\sqrt{q})$）。这正是 ECC 能以约 256 位密钥达到 128 位安全性的原因。对特殊曲线的攻击——**MOV/Frey–Rück**（当嵌入次数较小时利用配对）、**异常曲线**（$\#E = p$，可被
Smart 算法攻击），以及某些情形下的**超奇异曲线**——促使人们选择
「安全」曲线（见椭圆曲线）。

## 4. 格问题（后量子）

格提供了主要的抗量子假设。

**定义（SVP / CVP）.** **最短向量问题**要求在格 $\mathcal{L}$ 中找出最短的非零向量；**CVP** 要求找出距离目标最近的格向量。

**定义（LWE —— 带误差学习）.** 给定秘密 $\mathbf{s} \in \mathbb{Z}_q^n$ 以及
样本 $(\mathbf{a}_i, b_i = \langle \mathbf{a}_i, \mathbf{s} \rangle + e_i \bmod q)$，其中误差 $e_i$ 很小，将其与均匀的 $(\mathbf{a}_i, u_i)$ 区分开。Ring-LWE 与 Module-LWE 为提升效率而将
$\mathbf{a}_i$ 限制在分圆环 / 模上。

**归约.** LWE（在最坏情况下）与在任意格中求解近似 SVP/GapSVP 一样困难
（Regev）。这种最坏情况到平均情况的归约是格困难性最强有力的证据，也是 NIST 为 PQC 选择格方案的原因（见后量子）。

## 5. 困难性地图

| 假设 | 结构 | 是否被量子攻破？ | 作为什么的基础 |
|------------|-----------|-----------------|----------|
| DLP（一般） | 循环群 $\mathbb{G}$ | 是（Shor） | DSA、ElGamal、DH |
| CDH / DDH | 循环群 | 是 | DH 密钥交换、ElGamal |
| 因子分解 | $\mathbb{Z}/N\mathbb{Z}$ | 是（Shor） | RSA |
| ECDLP | $E(\mathbb{F}_p)$ | 是（Shor） | ECDH、ECDSA、EdDSA |
| RSA | $\mathbb{Z}/N\mathbb{Z}$ | 是 | RSA 加密/签名 |
| LWE / SVP / CVP | 格 | **否**（被认为） | ML-KEM、ML-DSA、FHE、许多 ZKP |
| 哈希原像/碰撞 | 哈希函数 | 否（Grover 平方根） | 签名、承诺 |

## 6. 正确使用假设

1. **将假设与方案匹配**——基于 DDH 的证明无法迁移到 DDH 容易的群上（例如配对群中 DDH 被攻破，但较弱的假设仍成立）。
2. **注意群的表示**——「一般」群是一种理想化；具体群可能通过小子群、低嵌入次数或非素数阶而泄露信息。
3. **记录使用的是哪种变体**——CDH、DDH、Gap-DH 与 strong-DH 各自提供不同的保证。
4. **量子威胁**——任何可被 Shor 算法求解的假设都必须按照 NIST IR 8547 的迁移时间表逐步淘汰。

## 来源

- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——第 16 章：对数论假设的攻击：https://toc.cryptobook.us/
- Katz–Lindell，《Introduction to Modern Cryptography》——第 8/9 章，因子分解与 DLP：https://www.cs.umd.edu/~jkatz/imc.html
- 格假设综述：https://eprint.iacr.org/
