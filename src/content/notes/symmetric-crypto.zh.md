---
title: "对称密码学"
description: "对称密码学：从完美保密到 IND-CPA/IND-CCA 的安全定义、分组密码与 AES、流密码、工作模式、生日界，以及 encrypt-then-MAC 组合方式。"
pubDate: 2026-08-16
tags: ["密码学", "对称密码", "AES", "分组密码", "AEAD"]
lang: "zh"
langLink: "/en/notes/symmetric-crypto/"
---

对称密码学使用**单一共享密钥**同时完成加密与解密。它提供机密性（加密）、完整性（MAC），二者结合则提供认证加密（AEAD）。

## 1. 安全定义

**定义（完美保密 —— Shannon）.** 消息空间 $\mathcal{M}$ 上的密码 $(E, D)$ 是完美保密的，若对 $\mathcal{M}$ 上的任意分布、任意 $m$ 以及任意密文 $c$：
$$ \Pr[M = m \mid C = c] = \Pr[M = m]. $$

**定理（Shannon）.** 完美保密要求 $|\mathcal{K}| \ge |\mathcal{M}|$；使用均匀随机 $k$ 的一次一密
$c = m \oplus k$ 是完美保密的，但要求密钥与消息一样长。

由于完美保密并不实用，现代密码学放宽到**计算**意义下的概念：

- **IND-CPA（选择明文攻击下的语义安全）.** 即使自适应地获得所选消息的加密，对手也无法区分
  $E(k, m_0)$ 与 $E(k, m_1)$。这迫使加密必须是*随机化*的（每次加密使用新的 IV/nonce）。
- **IND-CCA（选择密文攻击）.** 对手还可以查询所选密文的解密。AEAD 力求达到这一级别。

## 2. 分组密码与 AES

**分组密码**是一个带密钥的置换 $E : \{0,1\}^k \times \{0,1\}^n \to \{0,1\}^n$；每个密钥
在 $n$ 位分组上选取一个置换。

**AES（FIPS 197）**——即 Rijndael 密码，2001 年标准化：

| 属性 | 取值 |
|----------|-------|
| 分组大小 | 128 位 |
| 密钥长度 | 128 / 192 / 256 位 |
| 轮数 | 10 / 12 / 14 |
| 结构 | 代换-置换网络（SPN） |

每一轮对 $4 \times 4$ 字节的**状态**施加四种变换：
1. **SubBytes** —— S 盒：$\mathbb{F}_{2^8}$ 中的求逆后接一个仿射映射（提供
   非线性，即混淆的来源）。
2. **ShiftRows** —— 循环字节移位（跨列扩散）。
3. **MixColumns** —— $\mathbb{F}_{2^8}$ 中的矩阵乘法（跨行扩散；在
   最后一轮中省略）。
4. **AddRoundKey** —— 与轮密钥做 XOR（轮密钥来自密钥编排）。

**设计原理.** S 盒在有限域中的求逆使非线性最大化，并抵抗线性与差分密码分析；SPN 结构（相对 DES 的 Feistel 网络）使所有比特在几轮之后都依赖于密钥（完全扩散）。

**DES**（历史上的，56 位密钥，Feistel 网络）已被**弃用**；3DES 正在退役。AES 是 NIST SP 800-175B 中强制要求的对称标准。

## 3. 流密码

流密码把密钥 + nonce 扩展为伪随机密钥流，并与明文做 XOR：
$c_i = m_i \oplus \mathrm{PRG}(k, \mathrm{nonce})_i$。

**ChaCha20**（RFC 8439）是广泛使用的现代流密码：512 位状态、ARX 设计
（加法-旋转-XOR）、20 轮。它在没有 AES-NI 的软件环境中很快，并且从构造上就是常数时间的。**Salsa20** 是它的前身。

**RC4** 已被攻破（密钥流有偏置），不得使用。

## 4. 工作模式

分组密码加密固定大小的分组；工作模式将其扩展到任意长度的消息：

| 模式 | 性质 | 备注 |
|------|----------|-------|
| ECB | 确定性 | **不安全**：相同的分组会泄露信息。绝不使用。 |
| CBC | 使用随机 IV 的随机化 | 仅在 IV 随机/不可预测时 CPA 安全；加密不可并行 |
| CTR | 类流 | 可并行，每个密钥需要唯一 nonce |
| GCM | AEAD | CTR 加密 + GHASH 标签；默认 AEAD（SP 800-38D） |
| ChaCha20-Poly1305 | AEAD | 快速软件 AEAD（RFC 8439） |

**定理（CTR/CBC 的 CPA 安全性）.** 若 $E$ 是安全的 PRF/PRP，则 CTR 与随机化 CBC 是
IND-CPA 安全的。直观理解：一个能区分 $E(k, m_0)$ 与 $E(k, m_1)$ 的 IND-CPA 对手将
违背分组密码的伪随机性。

**nonce 误用对 CTR/GCM 是致命的**：重用 nonce 会把两个明文做 XOR
（$c_1 \oplus c_2 = m_1 \oplus m_2$）。使用可预测 IV 的 CBC 也会被攻破（BEAST）。

**填充预言.** 使用 PKCS#7 填充的 CBC 易受填充预言攻击
（例如 Lucky13、POODLE）；这是支持 AEAD 与 encrypt-then-MAC 的经典论据。

## 5. 生日界与密钥长度

随机化模式（CBC/CTR）在约 $\sim 2^{n/2}$ 个分组之后会因生日悖论而泄露信息；对 AES 的 128 位分组而言即约 $\sim 2^{64}$ 个分组（$\approx 2^{68}$ 字节）。协议必须在此界之前更换密钥。

**密钥长度与安全性.** AES-128 提供约 128 位经典安全性，但由于 Grover
算法（平方根加速），其量子安全性约为 64 位；AES-256 是抗量子对称密码学
推荐的安全级别（见后量子）。

## 6. 组合方式：Encrypt-then-MAC 与其他

- **Encrypt-then-MAC**（$c = E(k_1, m)$；$t = \mathrm{MAC}(k_2, c)$）是唯一可证明
  CCA 安全的通用组合方式——在解密*之前*先验证 MAC。
- **MAC-then-encrypt**（SSL/TLS 风格）与 **encrypt-and-MAC**（SSH 风格）都微妙地更弱，并
  导致了真实世界的攻破（Lucky13、POODLE）。

现代建议是使用**专门的 AEAD**（GCM、ChaCha20-Poly1305，或为抗 nonce 误用而选用 AES-GCM-SIV），它把分析打包进一个原语中。

## 来源

- NIST CSRC — FIPS 197（AES）；分组密码技术：https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- RFC 8439（ChaCha20-Poly1305）；RFC 9057（AEAD）：https://www.rfc-editor.org/
- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——第 2–5、9 章：https://toc.cryptobook.us/
- CryptoHack —— 对称密码学课程：https://cryptohack.org/
