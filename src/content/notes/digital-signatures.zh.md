---
title: "数字签名"
description: "提供真实性与不可否认性的签名方案——RSA-PSS、DSA/ECDSA 与 EdDSA——及其安全定义，以及导致其失效的随机数管理失误。"
pubDate: 2026-08-16
tags: ["密码学", "数字签名", "RSA", "ECDSA", "EdDSA"]
lang: "zh"
langLink: "/en/notes/digital-signatures/"
---

数字签名方案让持有私钥的一方能对消息 $m$ 生成签名 $\sigma$，任何人都可用公钥验证。与 MAC 不同，签名提供**不可否认性**：只有签名者才能生成 $\sigma$。

## 1. 安全定义

**定义（EUF-CMA——选择消息攻击下的存在性不可伪造）.** 即使获得了对敌手自选消息的签名，任何高效敌手也无法对*新*消息伪造有效签名，除非概率可忽略。更强的变体**强不可伪造性**（sEUF-CMA）还禁止对已签名消息生成*不同*的签名（与签名可延展性相关）。

**签名方案也是证书（X.509）、TLS 握手认证、代码签名以及（通过 Fiat–Shamir 变换）零知识证明的构件。**

## 2. RSA 签名

**全域哈希（FDH）.** 签名 $\sigma = H(m)^d \bmod N$；验证 $H(m) \equiv \sigma^e \pmod N$。在随机预言机模型下，假设 RSA 问题困难则可证明安全。实践中哈希用 **PSS**（概率签名方案，RFC 8017）编码，这是推荐的填充；**PKCS#1 v1.5** 签名填充仍被广泛使用，且（在摘要信息正确时）*并未*被证明可攻破，但 PSS 更受推荐。

**Bleichenbacher 式**攻击针对的是*加密*填充，而非 PSS；签名方面的类似隐患是校验不足的确定性编码（例如对截断填充的小 $e$ 立方根攻击）。

## 3. DSA 与 ECDSA

**DSA（FIPS 186）.** 参数：素数 $p$、$q \mid (p-1)$、$\mathbb{F}_p^{\times}$ 中阶为 $q$ 的生成元 $g$；私钥 $x$，公钥 $y = g^x$。

- **签名** $m$（哈希 $h = H(m)$）：取 $k \leftarrow \mathbb{Z}_q^{*}$，计算
  $r = (g^k \bmod p) \bmod q$、$s = k^{-1}(h + x r) \bmod q$；输出 $(r, s)$。
- **验证：** 计算 $w = s^{-1}$、$u_1 = h w$、$u_2 = r w$；当且仅当
  $(g^{u_1} y^{u_2} \bmod p) \bmod q = r$ 时接受。

**ECDSA** 是椭圆曲线群上的 DSA：$r = (kG)_x \bmod q$、$s = k^{-1}(h + x r) \bmod q$。它在 FIPS 186-5 中标准化，曲线为 P-256/P-384/P-521。

**关键要求.** 随机数 $k$ 必须**均匀随机且每次签名唯一**。若 $k$ 在两次签名中被复用，私钥可被直接恢复：
$$ x = \frac{s_1 h_2 - s_2 h_1}{r (s_2 - s_1)} \bmod q. $$
这种「随机数复用导致密钥泄露」是现实中最常被利用的失误之一（PlayStation 3、许多有缺陷的钱包）。**RFC 6979** 从消息与密钥确定性地导出 $k$（$k = H(x, m)$），同时消除了随机性与复用失误。

## 4. EdDSA（Ed25519，RFC 8032）

EdDSA 是 Edwards/扭曲 Edwards 曲线上的 Schnorr 式签名，设计目标是：
- **确定性**（每次签名无随机性，因此不存在随机数误用导致的密钥泄露）。
- **常数时间**，且不含依赖秘密的分支。
- **紧凑**：Ed25519 以 32 字节密钥和 64 字节签名提供 128 位安全。

**签名.** $r = H(h_b \mathbin{\Vert} m)$（来自密钥的 512 位哈希），$R = rB$，
$s = r + H(R \mathbin{\Vert} A \mathbin{\Vert} m) \cdot a$，输出 $(R, s)$。
**验证.** 检查 $sB = R + H(R \Vert A \Vert m) A$。

**Schnorr 签名**是基础：它对密钥是线性的（$s = k + c x$），从而支持门限签名、多签名（MuSig）以及 ECDSA 所缺乏的聚合。比特币 Taproot 正是出于这些性质而采用了 Schnorr（BIP-340）。

## 5. 对比

| 方案 | 标准 | 假设 | 备注 |
|--------|----------|-----------|-------|
| RSA-PSS | RFC 8017 | RSA | 密钥大，无密钥复用陷阱 |
| DSA | FIPS 186-5 | DLP | 随机数关键；遗留 |
| ECDSA | FIPS 186-5 | ECDLP | 随机数关键；不可聚合 |
| Ed25519 | RFC 8032 | ECDLP（Schnorr） | 确定性、常数时间、小 |
| ML-DSA | FIPS 204 | Module-LWE | 后量子替代（见《后量子》笔记） |

## 6. 安全意义小结

1. **随机数管理是 ECDSA/DSA 的首要失误**——使用 RFC 6979 的确定性方法或 EdDSA。
2. **用足够强的哈希对消息求哈希**；对弱哈希或截断哈希的签名是可伪造的。
3. **签名可延展性**在签名被用作标识符或用于共识（区块链交易）时很重要：优先选择 sEUF-CMA 方案或规范化 $s$（low-$s$ 规则）。
4. 所有经典签名（RSA/ECDSA/DSA/EdDSA）都会被 Shor 算法攻破；应按 PQC 迁移到 ML-DSA/SLH-DSA。

## 来源

- NIST CSRC — Cryptographic Standards and Guidelines（FIPS 186-5 数字签名标准）：https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- IETF RFC Editor — RFC 8017（RSA-PSS）；RFC 8032（EdDSA）：https://www.rfc-editor.org/
- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——第 13 章：https://toc.cryptobook.us/
