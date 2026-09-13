---
title: "面向密码学的数论"
description: "RSA、Diffie–Hellman、DSA 与椭圆曲线方案背后的整数算术：整除、Bézout 等式、欧拉/费马定理、中国剩余定理、二次剩余，以及素性检验与因子分解。"
pubDate: 2026-08-16
tags: ["密码学", "数论", "基础", "RSA"]
lang: "zh"
langLink: "/en/notes/number-theory/"
---

数论提供了 RSA、Diffie–Hellman、DSA 以及椭圆曲线方案所依赖的整数算术。本文给出相关定义与定理，并在证明较短时给出证明。

## 1. 整除与模运算

**定义（整除）.** 对整数 $a, b$ 且 $b \neq 0$，若存在 $k \in \mathbb{Z}$ 使 $a = kb$，则记作 $b \mid a$。

**定义（同余）.** $a \equiv b \pmod{n}$ 当且仅当 $n \mid (a - b)$。同余是一种等价关系，剩余类集合 $\mathbb{Z}/n\mathbb{Z}$ 构成一个环。

**定理（带余除法）.** 对 $a, n \in \mathbb{Z}$、$n > 0$，存在唯一的 $q, r$ 使 $a = qn + r$ 且 $0 \le r < n$。余数 $r$ 记作 $a \bmod n$。

## 2. 最大公约数与 Bézout 等式

**定义.** $\gcd(a, b)$ 是同时整除 $a$ 与 $b$ 的最大正整数。

**定理（Bézout 等式）.** 对任意整数 $a, b$（不全为零），存在整数 $x, y$ 使
$$ ax + by = \gcd(a, b). $$

*证明梗概.* 运行欧几里得算法：反复把 $(a, b)$ 替换为 $(b, a \bmod b)$ 直到余数为 $0$；最后一个非零余数即为 $\gcd(a,b)$。再回代各商，恢复系数 $x, y$。∎

**扩展欧几里得算法**在 $O(\log(\min(a,b)))$ 次算术运算内同时算出 $\gcd(a, b)$ 与系数 $x, y$。在密码学中它用于计算**模逆**：若 $\gcd(a, n) = 1$，则 $ax + ny = 1$ 中的 $x$ 满足 $a x \equiv 1 \pmod n$，即 $x = a^{-1} \bmod n$。

## 3. 欧拉函数与欧拉/费马定理

**定义.** 欧拉函数 $\varphi(n)$ 是 $[1, n]$ 中与 $n$ 互素的整数个数。乘法群 $(\mathbb{Z}/n\mathbb{Z})^{\times}$ 的阶为 $\varphi(n)$。

**定理.** 若 $n = \prod p_i^{e_i}$ 为素因子分解，则
$$ \varphi(n) = n \prod_{p \mid n} \left(1 - \frac{1}{p}\right) = \prod_i p_i^{e_i - 1}(p_i - 1). $$

**定理（欧拉定理）.** 若 $\gcd(a, n) = 1$，则
$$ a^{\varphi(n)} \equiv 1 \pmod n. $$

**定理（费马小定理）.** 若 $p$ 为素数且 $p \nmid a$，则
$$ a^{p-1} \equiv 1 \pmod p, \qquad\text{等价地 } a^p \equiv a \pmod p. $$

*证明（由欧拉定理推费马小定理）.* $\varphi(p) = p - 1$，代入欧拉定理即可。∎

费马小定理是**费马素性检验**的基础，连同其推广一起，也支撑了 RSA 的正确性：RSA 取 $n = pq$、$\varphi(n) = (p-1)(q-1)$，选择满足 $\gcd(e, \varphi(n)) = 1$ 的 $e$，并令 $d = e^{-1} \bmod \varphi(n)$；于是对所有 $m$ 都有 $m^{ed} \equiv m \pmod n$。

## 4. 中国剩余定理（CRT）

**定理（CRT）.** 设 $n_1, \dots, n_k$ 两两互素，$N = \prod n_i$。同余方程组
$$ x \equiv a_i \pmod{n_i},\quad i = 1, \dots, k $$
在模 $N$ 意义下有唯一解，且
$$ x \equiv \sum_{i=1}^k a_i \cdot \frac{N}{n_i} \cdot \left(\frac{N}{n_i}\right)^{-1} \pmod{n_i} \pmod N. $$

*意义.* CRT 给出环同构
$\mathbb{Z}/N\mathbb{Z} \cong \mathbb{Z}/n_1\mathbb{Z} \times \cdots \times \mathbb{Z}/n_k\mathbb{Z}$。
它用于**加速 RSA 解密/签名**（分别在模 $p$ 与模 $q$ 下计算再合并），也出现在对小解密指数 RSA 的攻击中。

## 5. 二次剩余与 Legendre/Jacobi 符号

**定义.** 若 $x^2 \equiv a \pmod n$ 存在满足 $\gcd(x, n) = 1$ 的解，则称 $a$ 为模 $n$ 的**二次剩余**。

**定义（Legendre 符号）.** 对奇素数 $p$：
$$ \left(\frac{a}{p}\right) = \begin{cases} 1 & a \text{ 是模 } p \text{ 的二次剩余} \\ -1 & a \text{ 是非剩余} \\ 0 & p \mid a. \end{cases} $$

**定理（欧拉判别法）.** $\left(\frac{a}{p}\right) \equiv a^{(p-1)/2} \pmod p$。

**定理（二次互反律）.** 对不同奇素数 $p, q$，
$$ \left(\frac{p}{q}\right)\left(\frac{q}{p}\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}}. $$

**Jacobi 符号**把 Legendre 符号推广到奇合数模，用于 Solovay–Strassen 素性检验。二次剩余问题是 Goldwasser–Micali 密码体制背后的困难性假设。

## 6. 素性检验与因子分解

**定理（费马检验）.** 若 $p$ 为素数且 $p \nmid a$，则 $a^{p-1} \equiv 1 \pmod p$；若合数 $n$ 对某个 $a$ 不满足该式，则称 $a$ 为 $n$ 的费马见证。

**Miller–Rabin.** 一种概率性合数检验：将 $n-1 = 2^s \cdot d$ 分解，检验序列 $a^d, a^{2d}, \dots, a^{2^s d} \pmod n$。它是实用的标准素性检验：对合数 $n$，至少 $3/4$ 的底 $a$ 是见证，因此 $t$ 轮迭代的出错概率 $\le 4^{-t}$。确定性变体（已知的「小见证集」）在很大的界以下都是精确的。

**整数因子分解**被广泛认为一般是困难的。已知最好的经典算法是**一般数域筛法（GNFS）**，其运行时间为亚指数级
$$ \exp\left( \left(\sqrt[3]{\tfrac{64}{9}} + o(1)\right) (\ln n)^{1/3} (\ln\ln n)^{2/3} \right). $$
正是这一代价使得 RSA 在当前密钥长度（2048 位及以上）下是安全的，也正是 RSA **无法**抵御量子计算机的原因（Shor 算法——见后量子密码笔记）。

## 7. 安全意义小结

| 数论事实 | 密码学用途 |
|-----------------------|-------------------|
| 扩展欧几里得算法 | RSA/ECDSA 中的模逆 |
| 费马 / 欧拉定理 | RSA 正确性、费马检验 |
| CRT | RSA 加速、部分攻击 |
| 二次互反律 / Legendre | Goldwasser–Micali、Rabin、基于符号的检验 |
| Miller–Rabin | 参数生成（素数生成） |
| GNFS 亚指数代价 | RSA/DH 的密钥长度要求 |

## 来源

- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——附录 A：https://toc.cryptobook.us/
- Katz–Lindell，《Introduction to Modern Cryptography》——数论附录：https://www.cs.umd.edu/~jkatz/imc.html
- NIST CSRC — Cryptographic Standards and Guidelines：https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
