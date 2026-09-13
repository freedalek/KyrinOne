---
title: "椭圆曲线"
description: "椭圆曲线上的点群及其密码学用途：群律、ECDLP、曲线表示，以及标准曲线 P-256、secp256k1、Curve25519 与 Ed25519。"
pubDate: 2026-08-16
tags: ["密码学", "椭圆曲线", "ECDLP", "Curve25519", "Ed25519"]
lang: "zh"
langLink: "/en/notes/elliptic-curves/"
---

椭圆曲线密码用曲线上的点群取代 $\mathbb{F}_p^{\times}$，以小得多的密钥长度获得相同的困难性（ECDLP）——128 位安全仅需约 256 位。

## 1. 定义与群律

**定义（Weierstrass 形式）.** 在特征 $\neq 2, 3$ 的域 $\mathbb{F}$ 上，椭圆曲线为
$$ E : y^2 = x^3 + ax + b, \qquad 4a^3 + 27b^2 \neq 0 \quad(\text{非奇异性}). $$
点集为 $E(\mathbb{F}) = \{(x,y) \in \mathbb{F}^2 : y^2 = x^3 + ax + b\} \cup \{\mathcal{O}\}$，其中 $\mathcal{O}$ 是「无穷远点」（单位元）。

**群律（弦切法）.** 对 $P = (x_1, y_1)$、$Q = (x_2, y_2)$：
- 若 $x_1 \neq x_2$，过 $P, Q$ 的直线与曲线交于第三点 $R'$；定义 $P + Q = -R'$（关于 $x$ 轴反射）。斜率 $\lambda = (y_2 - y_1)/(x_2 - x_1)$。
- 倍点（$P = Q$，$y_1 \neq 0$）：$\lambda = (3x_1^2 + a)/(2y_1)$。
- $P + (-P) = \mathcal{O}$；$\mathcal{O}$ 是单位元。

借助这些公式，$E(\mathbb{F})$ 构成**阿贝尔群**。点加法需一次求逆（若用射影坐标，则在最终仿射转换前无需求逆）。

## 2. 椭圆曲线离散对数问题（ECDLP）

**定义.** 给定 $P$ 与 $Q = nP$，求 $n$。

**困难性.** 对精心选择的曲线，已知最佳算法是通用的——Pollard rho，$O(\sqrt{q})$——对最大素数阶子群阶 $q \approx 2^{256}$ 的曲线给出约 128 位安全。与 $\mathbb{F}_p^{\times}$ 不同，对一般椭圆曲线**没有已知的亚指数指数演算攻击**。这正是 ECC 短密钥的全部动机。

**必须避免的弱曲线类：**
- **异常曲线**（$\#E(\mathbb{F}_p) = p$）→ Smart 的线性时间攻击。
- **低嵌入度** → 当 $k$ 很小时，MOV/Frey–Rück 攻击通过配对把 ECDLP 转移到 $\mathbb{F}_{p^k}$ 中（见《配对》笔记）。
- 乘法转移场景中的**超奇异曲线**（不过超奇异曲线对基于*同源*的 PQC 是安全的，那是另一种机制）。
- **奇异曲线**（$4a^3 + 27b^2 = 0$）→ 群退化，DLP 变得容易。

## 3. 曲线表示

| 形式 | 方程 | 备注 |
|------|----------|-------|
| Weierstrass | $y^2 = x^3 + ax + b$ | FIPS 186-5 NIST 曲线（P-256…） |
| Montgomery | $By^2 = x^3 + Ax^2 + x$ | X25519/X448（RFC 7748）；快速、常数时间的仅 $x$ 阶梯 |
| （扭曲）Edwards | $ax^2 + y^2 = 1 + dx^2 y^2$ | Ed25519（RFC 8032）；完备加法律 |

**Montgomery 阶梯.** X25519 只传输 $x$ 坐标并使用差分加法阶梯，因此每次运算都是固定序列——天然常数时间且易于加固。

**完备加法律**在 Edwards 曲线上没有例外情形（无倍点分支），从而消除了一类侧信道与正确性缺陷。

## 4. 标准曲线

| 曲线 | 标准 | 形式 | 安全性 | 备注 |
|-------|----------|------|----------|-------|
| P-256 / P-384 / P-521 | FIPS 186-5 | Weierstrass | 128/192/256 位 | NIST；可验证的（伪）随机种子 |
| secp256k1 | SEC 2 | Weierstrass | 128 位 | 比特币/以太坊；$a = 0$ |
| Curve25519 | RFC 7748 | Montgomery | 128 位 | X25519 DH；常数时间 |
| Ed25519 | RFC 8032 | 扭曲 Edwards | 128 位 | EdDSA 签名 |
| BLS12-381 | （RFC 9380 草案/工业界） | 配对友好 | ~128 位 | 配对、ZK、以太坊 2.0 |

## 5. 安全意义小结

1. **验证点**——只接受在曲线上的点，且（对素数阶群）位于正确的子群中；未验证的点会导致**无效曲线**与**小子群**攻击，从而泄露秘密标量。
2. **使用安全曲线**，其阶为素数（或近似素数）且嵌入度足够；不要自创参数。
3. **ECDLP = 通用困难性**，这为 256 位密钥提供了依据，但任何曲线特有的弱点（嵌入度、异常、奇异）都会使其失效。
4. **所有 ECC 都会被 Shor 攻破**——ECDH/ECDSA/EdDSA 必须按 NIST IR 8547 迁移到 PQC 方案。

## 来源

- NIST CSRC — Cryptographic Standards and Guidelines（FIPS 186-5 椭圆曲线）：https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- IETF RFC Editor — RFC 7748（Curve25519/X448）；RFC 8032（Ed25519）：https://www.rfc-editor.org/
- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——第 15 章：https://toc.cryptobook.us/
- CryptoHack — 椭圆曲线课程：https://cryptohack.org/
