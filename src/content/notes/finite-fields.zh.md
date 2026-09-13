---
title: "有限域"
description: "伽罗瓦域作为 AES、GHASH、椭圆曲线与秘密共享的底层结构：构造、运算、二元域，以及域多项式的作用。"
pubDate: 2026-08-16
tags: ["密码学", "有限域", "基础", "AES"]
lang: "zh"
langLink: "/en/notes/finite-fields/"
---

有限域（伽罗瓦域）是 AES、大多数哈希函数、椭圆曲线坐标、秘密共享以及基于 Reed–Solomon 的纠删码的底层结构。

## 1. 存在性与唯一性

**定理（有限域的分类）.** 有限域存在当且仅当其大小为 $q = p^n$，其中 $p$ 为素数、$n \ge 1$。同阶的任意两个域同构；阶为 $q$ 的域记作 $\mathbb{F}_q$（或 $GF(q)$）。

**构造.** $\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$。构造 $\mathbb{F}_{p^n}$ 时，取多项式环 $\mathbb{F}_p[x]$，模一个 $n$ 次**不可约**多项式 $f(x)$：
$$ \mathbb{F}_{p^n} \cong \mathbb{F}_p[x] / (f(x)). $$
其元素是次数 $< n$、系数在 $\mathbb{F}_p$ 中的多项式。

## 2. 运算

**加法/减法**是系数逐项模 $p$。

**乘法**是多项式乘法后再模 $f(x)$ 约化。

**求逆**使用 $\mathbb{F}_p[x]$ 上的扩展欧几里得算法（多项式的 Bézout 等式）。

**Frobenius 自同构.** 映射 $\sigma : x \mapsto x^p$ 是 $\mathbb{F}_{p^n}$ 上固定 $\mathbb{F}_p$ 的域自同构。它用于定义**迹** $\operatorname{Tr}(a) = \sum_{i=0}^{n-1} a^{p^i}$ 与**范数**，二者都落在 $\mathbb{F}_p$ 中。

## 3. 二元域 $\mathbb{F}_{2^m}$

当 $p = 2$ 时，加法即异或（系数模 2 运算，无进位），在硬件中极其廉价。元素是长度为 $m$ 的比特串，乘法模一个不可约二元多项式。标准例子包括：

- AES 使用 $\mathbb{F}_{2^8}$，$f(x) = x^8 + x^4 + x^3 + x + 1$（0x11B），用于 S 盒求逆与 MixColumns 步骤（见《对称密码》笔记）。
- GCM 的 GHASH 在 $\mathbb{F}_{2^{128}}$ 中运算。

## 4. 素域 $\mathbb{F}_p$ 与椭圆曲线

椭圆曲线密码使用 $\mathbb{F}_p$ 上的曲线，$p$ 为大素数（例如 NIST P-256 的 $p$ 为 256 位，secp256k1 的 $p = 2^{256} - 2^{32} - 977$）。曲线上的点构成阶约为 $p$ 的群；该群中的离散对数即 ECDLP（见《椭圆曲线》笔记）。

## 5. 域多项式的实践

**不可约 vs. 本原.** 不可约的 $f(x)$ 足以构造域。**本原**多项式的根是 $\mathbb{F}_{q}^{\times}$ 的生成元。AES 与许多基于 LFSR 的流密码选择本原多项式，使「乘以 $x$」的操作能遍历所有非零元素。

**有限域中的离散对数.** 在 $\mathbb{F}_p$ 上，DLP 可由**指数演算**方法在亚指数时间内求解，这正是素域 DLP 需要比椭圆曲线 DLP（约 256 位）大得多的参数（2048–3072 位的 $p$）的原因——指数演算无法迁移到一般椭圆曲线群。

## 6. 有限域为何是密码学的核心

| 结构 | 用途 |
|-----------|-----|
| $\mathbb{F}_2$ / $\mathbb{F}_{2^8}$ | AES S 盒、字节混淆 |
| $\mathbb{F}_{2^{128}}$ | GCM 认证（GHASH） |
| $\mathbb{F}_p$（大素数） | DH、DSA、ElGamal、EC 坐标 |
| $\mathbb{F}_p$（小素数，如 $p \equiv 1 \pmod 4$） | 零知识/MPC 算术电路（如 Baby Bear、Goldilocks、Mersenne 素数） |
| $\mathbb{F}_{p^n}$ | 配对友好扩域、纠删码 |

## 来源

- NIST CSRC — Cryptographic Standards and Guidelines（FIPS 197 AES；伽罗瓦域）：https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——附录 A：https://toc.cryptobook.us/
- CryptoHack — Mathematics：https://cryptohack.org/
