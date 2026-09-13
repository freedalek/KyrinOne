---
title: "零知识证明"
description: "只泄露陈述真实性、别无所泄的交互式证明：形式化定义、Sigma 协议、Fiat–Shamir、SNARK/STARK 与承诺。"
pubDate: 2026-08-16
tags: ["密码学", "零知识证明", "Sigma 协议", "SNARK", "STARK"]
lang: "zh"
langLink: "/en/notes/zero-knowledge-proofs/"
---

零知识证明让证明者 $\mathcal{P}$ 使验证者 $\mathcal{V}$ 相信陈述 $x$ 为真，**而不泄露除其真实性之外的任何信息**。它是隐私认证、数字签名理论，以及支撑现代区块链扩容与隐私计算的 SNARK/STARK 系统的基础。

## 1. 形式化定义

语言 $\mathcal{L}$（对应关系 $\mathcal{R}$）的交互式证明系统必须满足：

1. **完备性.** 若 $x \in \mathcal{L}$ 且证明者诚实，验证者以压倒性概率接受。
2. **可靠性.** 若 $x \notin \mathcal{L}$，任何（甚至作弊、无界的）证明者都只能以可忽略概率使验证者接受。
3. **零知识性.** 对每个验证者 $\mathcal{V}^*$，都存在一个模拟器，**仅使用公开输入**就能生成与真实交互不可区分的记录——即验证者除陈述为真之外学不到任何东西。

**零知识是通过模拟来定义的**，而不是通过「验证者无法计算出来」来定义。模拟范式把直观的隐私主张转化为精确的密码学性质。

## 2. Sigma 协议

**Σ-协议**是针对某个关系的三步协议，具有特殊的**诚实验证者零知识**（HVZK）与**特殊可靠性**结构。

**Schnorr 协议**（证明知道满足 $h = g^x$ 的 $x$）：
1. **承诺：** 证明者发送 $a = g^r$，$r$ 随机。
2. **挑战：** 验证者发送 $c \leftarrow \mathbb{Z}_q$。
3. **响应：** 证明者发送 $z = r + c x \bmod q$。
4. **验证：** 当且仅当 $g^z = a \cdot h^c$ 时接受。

- **完备性：** $g^{r + cx} = g^r (g^x)^c$。✓
- **特殊可靠性：** 由两条都接受的记录 $(a, c_1, z_1), (a, c_2, z_2)$（$c_1 \neq c_2$），可提取出 $x = (z_1 - z_2)/(c_1 - c_2)$。该**提取器**在 $O(1)$ 期望时间内运行，因此是*知识证明*。
- **HVZK：** 模拟器均匀选取 $c, z$ 并令 $a = g^z h^{-c}$；记录 $(a, c, z)$ 与真实记录的分布完全相同。

## 3. Fiat–Shamir 变换

Fiat–Shamir 启发式把公开抛币的 Σ-协议变为**非交互**证明：用记录哈希替代验证者的随机挑战：
$$ c = H(x \mathbin{\Vert} a). $$

在**随机预言机模型**下，所得的 NIZK 是安全的（可靠性通过回绕随机预言机得到；零知识继承自 HVZK）。实践中哈希必须绑定 $x$ 与 $a$——只哈希 $a$ 的*弱* Fiat–Shamir 容易受到伪造（一类已被记录的漏洞）。Schnorr 签名与 EdDSA 都是 Fiat–Shamir NIZK。

## 4. SNARK 与 STARK

- **SNARK** —— *简洁非交互知识论证（Succinct Non-interactive ARgument of Knowledge）.* 证明者开销是超线性的，但证明很小（$O(1)$ 或 $O(\log n)$），验证开销低。构造方式：
  1. **算术化** —— 把计算编码为算术电路/约束系统（R1CS、Plonk 风格、AIR）。
  2. **承诺** —— 对见证承诺：**KZG**（配对；可信设置）或**内积论证**（Bulletproofs；无可信设置）或**折叠**（Nova/Sangria）。
  3. **简洁论证** —— 用 Merkle 树或基于配对的打开来编译的 PCP/IOP。
  例如：**Groth16**（KZG，证明很小，可信设置）、**PLONK**（通用设置）、**Halo2**（递归，无可信设置）、**Nova**（折叠/增量可验证计算）。

- **STARK** —— *可扩展透明知识论证（Scalable Transparent ARgument of Knowledge）.* 基于哈希（Merkle/Reed–Solomon IOP），**无可信设置**，且由于基于哈希而**后量子安全**。证明更大（约数百 KB），但证明者快、验证为对数/常数级。用于重视透明性与抗量子的场合。

**可信设置的警示.** 基于配对的 SNARK 需要结构化参考串，其生成物是「有毒废料」；能重跑仪式的一方可以伪造证明。通用/可更新设置（PLONK、powers-of-tau）与透明系统（STARK、Bulletproofs、Nova）避免或削弱了这一点。

## 5. 承诺

**承诺**绑定一个值 $m$（隐藏性），使得承诺者事后无法打开为另一个值（绑定性）：
- **Pedersen：** $\mathrm{Com}(m; r) = g^m h^r$ —— 完美隐藏、计算绑定；是基于 Schnorr 的 Σ-协议与范围证明的标准选择。
- **哈希承诺：** $\mathrm{Com}(m) = H(r \mathbin{\Vert} m)$ —— 在随机预言机模型下绑定。
- **KZG：** 一种多项式承诺，具有常数大小的打开与同态结构，是 SNARK 的核心。

## 6. 安全意义小结

1. **可靠性与知识** —— *知识证明*（可提取）强于单纯的可靠性，也正是签名所需要的。
2. **Fiat–Shamir 必须哈希完整陈述** —— 弱哈希会导致伪造。
3. **可信设置是真实风险** —— 条件允许时优先选择通用或透明方案。
4. **抗量子性** —— 基于哈希的 STARK 能存活；基于配对的 SNARK 不能。
5. **非交互 ≠ 不可延展** —— NIZK 可被重放；在协议使用中应将其绑定到上下文/身份（模拟可提取或强绑定变体）。

## 来源

- Boneh–Shoup，第 19–20 章：Sigma 协议与零知识：https://toc.cryptobook.us/
- Katz–Lindell，零知识证明章节：https://www.cs.umd.edu/~jkatz/imc.html
- SNARK/STARK 文献：https://eprint.iacr.org/
- Zero-Knowledge Proofs 分类：https://cryptohack.org/
