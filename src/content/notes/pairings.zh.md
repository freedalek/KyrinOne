---
title: "配对（双线性映射）"
description: "椭圆曲线群之间的双线性映射及其启用的原语——BLS 签名、基于身份的加密与 SNARK 承诺——以及 DDH 与 MOV 的注意事项。"
pubDate: 2026-08-16
tags: ["密码学", "配对", "双线性映射", "BLS", "SNARK"]
lang: "zh"
langLink: "/en/notes/pairings/"
---

配对是椭圆曲线群之间的双线性映射，它启用了新一类原语——BLS 签名、基于身份的加密，以及现代 SNARK 背后的多项式承诺机制。必须谨慎管理这一结构，因为它会*削弱*源群中的 DLP。

## 1. 定义

**定义（双线性配对）.** 设 $\mathbb{G}_1, \mathbb{G}_2, \mathbb{G}_T$ 为群。配对是一个可高效计算的映射 $e : \mathbb{G}_1 \times \mathbb{G}_2 \to \mathbb{G}_T$，满足：

1. **双线性：** 对所有 $P \in \mathbb{G}_1$、$Q \in \mathbb{G}_2$、$a, b \in \mathbb{Z}$，有 $e(aP, bQ) = e(P, Q)^{ab}$。
2. **非退化：** 若 $P, Q$ 为生成元，则 $e(P, Q) \neq 1$。

实践中这些是配对友好椭圆曲线（如 BLS12-381、BN254）上的 **Weil** 与 **Tate** 配对，其中 $\mathbb{G}_1, \mathbb{G}_2 \subset E(\mathbb{F}_{p^k})$、$\mathbb{G}_T \subset \mathbb{F}_{p^k}^{\times}$。对对称（「Type-1」）配对 $\mathbb{G}_1 = \mathbb{G}_2$；现代曲线大多是非对称的（Type-3），更高效也更安全。

## 2. 代价：DDH 变得容易

定义性的双线性破坏了源群中的 DDH：

**命题.** 给定 $P, aP, bP, cP \in \mathbb{G}_1$，可通过检验
$$ e(aP, bP) \overset{?}{=} e(cP, P). $$
来判断是否 $c = ab$。由双线性，两边相等当且仅当 $c = ab$，都等于 $e(P, P)^{ab}$。

**推论.** 在配对群中，DDH 假设**失效**，必须代之以与配对兼容的假设：**co-CDH**、**双线性 Diffie–Hellman（BDH）**（「从 $aP, bP, cP$ 计算 $e(P,P)^{abc}$」）以及**判定性双线性 Diffie–Hellman（DBDH）**。配对方案中的所有归约都使用这些配对感知的假设。

## 3. MOV / Frey–Rück 攻击

配对让攻击者能把 DLP 从 $\mathbb{G}_1$ *转移*到 $\mathbb{F}_{p^k}^{\times}$：给定 $P, aP$，计算 $e(P, Q)$ 与 $e(aP, Q) = e(P, Q)^a$，从而把 ECDLP 归约为有限域中的 DLP，那里可应用指数演算。这恰好在**嵌入度** $k$ 很小时可行。因此安全曲线需要大的嵌入度，而配对友好曲线被*刻意*构造为小 $k$ 以便配对可计算——这正是其基域素数必须足够大、以使转移后的 DLP 保持困难的原因（例如 BLS12-381 在 12 次扩域下平衡到约 128 位安全）。

## 4. 应用

**BLS 签名.** 以 $\mathbb{G}_1$ 承载公钥、$\mathbb{G}_2$ 承载签名：
- **签名：** $\sigma = x \cdot H(m) \in \mathbb{G}_2$（私钥 $x$，公钥 $X = xP$）。
- **验证：** $e(P, \sigma) \overset{?}{=} e(X, H(m))$。
- **聚合：** $n$ 个签名合并为一个 $\sigma_{\text{agg}} = \sum \sigma_i$，由单次配对检验验证。这正是 BLS 被用于以太坊共识（BLS12-381）的原因——它使数千个验证者签名可在一次配对中验证。

**基于身份的加密（IBE）**——主密钥从身份字符串派生用户私钥，无需查询证书（Boneh–Franklin）。

**多项式承诺 / SNARK.** 对多项式的 KZG 承诺使用配对，以单个群元素证明 $p(z) = y$，是 Groth16 与许多基于配对的 SNARK 的骨架（见《零知识证明》笔记）。

**基于属性与函数式加密**同样依赖配对。

## 5. 安全意义小结

1. **绝不要在配对群上复用基于 DDH 的方案**（朴素 ElGamal、标准 DH 假设）——那里的 DDH 已被攻破。
2. **在归约中使用配对感知的假设**（BDH、DBDH、co-CDH）。
3. **选择配对友好曲线**，在 $\mathbb{G}_T$ 中具有足够安全性（扩域 DLP 是约束瓶颈——「第 $k$ 次扩域必须足够大」）。
4. **检查子群成员资格**——若点未经验证，配对协议易受小子群攻击。
5. 配对同样**会被 Shor 攻破**；在后量子环境下，基于配对的 SNARK 必须被基于哈希（STARK）或基于格（折叠）的替代方案取代。

## 来源

- NIST CSRC — 基于配对的密码学：https://csrc.nist.gov/projects/pairing-based-cryptography
- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——第 15 章：配对：https://toc.cryptobook.us/
- IACR Cryptology ePrint Archive（BLS 签名）：https://eprint.iacr.org/
