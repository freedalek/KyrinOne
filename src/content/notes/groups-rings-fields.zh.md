---
title: "群、环与域"
description: "密码学的抽象代数骨架：群/环/域公理、循环群与拉格朗日定理、特征，以及这些结构为何定义了安全所依赖的困难问题。"
pubDate: 2026-08-16
tags: ["密码学", "抽象代数", "基础", "群论"]
lang: "zh"
langLink: "/en/notes/groups-rings-fields/"
---

抽象代数密码学的结构骨架：循环群支撑 Diffie–Hellman 与 DSA，有限域支撑 AES 与椭圆曲线，环支撑基于格的 PQC。这里精确陈述各条公理，因为每一次安全性归约都是*在这些结构内部*完成的。

## 1. 群

**定义（群）.** 群是集合 $G$ 连同二元运算 $\cdot$，满足：

1. **封闭性：** $\forall a,b \in G,\ a \cdot b \in G$。
2. **结合律：** $\forall a,b,c \in G,\ (a \cdot b) \cdot c = a \cdot (b \cdot c)$。
3. **单位元：** 存在 $e \in G$，使对所有 $a$ 有 $e \cdot a = a \cdot e = a$。
4. **逆元：** 对每个 $a$ 存在 $a^{-1}$，使 $a \cdot a^{-1} = a^{-1} \cdot a = e$。

若进一步对所有 $a, b$ 有 $a \cdot b = b \cdot a$，则群是**阿贝尔群**。密码学几乎只使用阿贝尔群：椭圆曲线用加法记号（$P + Q$，单位元 $\mathcal{O}$），$\mathbb{F}_p^{\times}$ 用乘法记号（$g^a$，单位元 $1$）。

**定义（阶、循环）.** **阶** $|G|$ 是元素个数。元素 $g$ 的阶是最小的 $n > 0$ 使 $g^n = e$。若群存在**生成元** $g$ 使 $G = \langle g \rangle = \{g^0, g^1, \dots, g^{n-1}\}$，则称群为**循环群**。

**定理（拉格朗日）.** 若 $H \le G$ 是子群，则 $|H|$ 整除 $|G|$。

**推论.** 每个元素的阶都整除 $|G|$；因此对所有 $a \in G$ 有 $a^{|G|} = e$。（欧拉定理是 $G = (\mathbb{Z}/n\mathbb{Z})^{\times}$、$|G| = \varphi(n)$ 的特例。）

**定理（循环子群的分类）.** 在阶为 $n$ 的循环群中，对每个因子 $d \mid n$ 都存在唯一的 $d$ 阶子群，且它也是循环群。

*安全性推论.* 密码学中通常工作在**素数阶** $q$ 的循环群里：素数阶没有非平凡子群，因此 Pohlig–Hellman 归约（把合数阶的离散对数拆成素数幂因子上的离散对数）无从下手，且每个非单位元都是生成元。

## 2. 环

**定义（环）.** 环 $(R, +, \cdot)$ 是带两种运算的集合，满足：$(R, +)$ 是阿贝尔群（单位元 $0$），$\cdot$ 结合且有单位元 $1$，乘法对加法满足分配律。若 $a b = b a$ 则环是**交换环**。**域**是每个 $a \neq 0$ 都有乘法逆元的交换环。

密码学中使用的例子：

| 环 | 作用 |
|------|------|
| $\mathbb{Z}$ | 整数；欧几里得整环 |
| $\mathbb{Z}/n\mathbb{Z}$ | 模运算；RSA 在模 $n = pq$ 下工作 |
| $\mathbb{F}_p[x]$ | 多项式环；有限域 $\mathbb{F}_{p^n}$ 的来源 |
| $\mathbb{Z}[x] / (x^n + 1)$ | 分圆环；Ring-LWE / Module-LWE 等 PQC 方案 |
| $\mathbb{F}_{2^{128}}$ | GCM 的 GHASH 认证标签所用的有限域 |

**定义（单位）.** 若 $a \in R$ 有乘法逆元，则称 $a$ 为**单位**。单位在乘法下构成群 $R^{\times}$。对域 $\mathbb{F}$，$\mathbb{F}^{\times}$ 的阶为 $|\mathbb{F}| - 1$。

## 3. 域及其特征

**定义（特征）.** 域 $\mathbb{F}$ 的**特征**是最小的 $n>0$ 使 $n \cdot 1 = 0$（若不存在则为 $0$）。它总是 $0$ 或某个素数 $p$。

**例子.**

- $\mathbb{Q}, \mathbb{R}, \mathbb{C}$ 的特征为 $0$。
- $\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$ 的特征为 $p$，含 $p$ 个元素。
- 阶为 $p^n$ 的域特征为 $p$。

**定理（子域结构）.** 每个有限域 $\mathbb{F}_{p^n}$ 对每个 $d \mid n$ 都包含唯一的 $\mathbb{F}_{p^d}$ 副本，且没有其他子域。

## 4. 乘法群是循环群

**定理.** 对每个有限域 $\mathbb{F}$，乘法群 $\mathbb{F}^{\times}$ 都是循环群。

*推论.* 存在阶为 $|\mathbb{F}| - 1$ 的**本原元** $g \in \mathbb{F}^{\times}$。离散对数与 Diffie–Hellman 方案就定义在这类循环群上；「从 $g^a$ 恢复 $a$ 有多难」即 DLP，是核心困难性问题（见《困难性假设》笔记）。

## 5. 这些公理为何关乎安全

1. **结合律**是 Diffie–Hellman 正确的原因：$(g^a)^b = g^{ab} = (g^b)^a$。
2. **交换律**使共享密钥对称；没有它，密钥协商无法成立。
3. **逆元的存在**支持解密（乘以 $d = e^{-1} \bmod \varphi(n)$）与签名验证。
4. **素数阶**挫败子群/Pohlig–Hellman 攻击，并简化安全性证明。
5. **群结构**正是安全性归约所依赖的计算问题（DLP、CDH、DDH）的*定义*来源。方案的强度取决于群有多「通用」——带有额外结构的群（如配对、低嵌入度）更容易被攻击。

## 来源

- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——附录 A：https://toc.cryptobook.us/
- Katz–Lindell，《Introduction to Modern Cryptography》——数论附录：https://www.cs.umd.edu/~jkatz/imc.html
- CryptoHack — Modular Arithmetic / Elliptic Curves：https://cryptohack.org/
