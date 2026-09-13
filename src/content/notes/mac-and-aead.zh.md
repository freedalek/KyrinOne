---
title: "消息认证码与认证加密"
description: "MAC 与 AEAD：EUF-CMA 安全性、HMAC 与 CBC-MAC/CMAC、encrypt-then-MAC 组合方式，以及 AES-GCM、ChaCha20-Poly1305 等标准化 AEAD 方案。"
pubDate: 2026-08-16
tags: ["密码学", "MAC", "AEAD", "HMAC", "AES-GCM"]
lang: "zh"
langLink: "/en/notes/mac-and-aead/"
---

## 1. MAC：定义与安全性

**定义（MAC）.** MAC 是一对 $(\mathrm{Sign}, \mathrm{Vrfy})$，其中标签
$t = \mathrm{Sign}(k, m)$ 让持有共享密钥的一方能够验证 $m$ 的完整性与真实性。

**安全性（EUF-CMA —— 选择消息攻击下的存在性不可伪造）.** 即使查询了所选消息的标签，对手也无法以不可忽略的概率为*新*消息生成有效标签。MAC 假定两方共享一个秘密密钥；它们**不**提供不可否认性（两方都可能生成该标签）。

## 2. HMAC

**构造（RFC 2104 / FIPS 198-1）.**
$$ \mathrm{HMAC}(k, m) = H\!\big((k \oplus \mathrm{opad}) \mathbin{\Vert} H((k \oplus \mathrm{ipad}) \mathbin{\Vert} m)\big) $$

内层哈希在 $\mathrm{ipad}$ 下压缩消息；外层哈希「对哈希再哈希」，从而挫败 Merkle–Damgård 的**长度扩展**攻击。HMAC 是一个 **PRF，前提是压缩函数是 PRF**——值得注意的是，即使底层哈希的抗碰撞性可能被削弱，HMAC-SHA-2 依然安全，这就是为什么在 SHA-1 碰撞出现很久之后 HMAC-SHA-1 仍可使用（尽管如今在大多数场景中它也已被弃用）。

**用途.** TLS 记录 MAC（历史上）、HKDF 密钥派生、PBKDF2、挑战-响应认证。

## 3. CBC-MAC 及其陷阱

CBC-MAC 以 CBC 模式、零 IV 加密消息，并输出最后一个分组作为标签。它**仅对固定长度消息**安全；对可变长度消息不安全（通过分组拼接实现长度扩展），除非使用加密末块（EMAC）或加密 CBC-MAC（CMAC，NIST SP 800-38B）构造加以变换。**CMAC** 是标准化的、对固定长度和可变长度都安全的变体。

## 4. 认证加密（AEAD）

**AEAD** 方案在同一个原语中完成加密*与*认证，达到 IND-CCA 安全性：对手既不能伪造密文，也无法从自己选择的密文中获知任何信息。

**定义（AEAD）.** $(\mathrm{Enc}, \mathrm{Dec})$，其中
$\mathrm{Enc}(k, \mathrm{nonce}, m, \mathrm{ad}) = (c, t)$，$\mathrm{ad}$ 为被认证的关联数据；仅当标签验证通过时解密才返回 $m$。

**通用组合方式 —— Encrypt-then-MAC.** 计算 $c = E(k_1, m)$，再
$t = \mathrm{MAC}(k_2, \mathrm{nonce} \mathbin{\Vert} c)$，输出 $(c, t)$。这是唯一能从 CPA 安全加密与安全 MAC 出发可证明地得到 AEAD 安全性的组合方式，也是 TLS 1.3 AEAD 所采用的模板。

## 5. 标准化 AEAD 方案

| 方案 | 标准 | 构造 | 备注 |
|--------|----------|--------------|-------|
| AES-GCM | SP 800-38D | CTR 加密 + $\mathbb{F}_{2^{128}}$ 上的 GHASH 标签 | 硬件加速快；nonce 重用会造成**灾难性**后果 |
| ChaCha20-Poly1305 | RFC 8439 | ChaCha20 + Poly1305（Wegman–Carter MAC） | 软件下常数时间；同样有 nonce 注意事项 |
| AES-CCM | SP 800-38C | CTR + CBC-MAC | IoT/受限环境 |
| AES-GCM-SIV | RFC 8452 | SIV 模式 | 抗 nonce 误用（代价：两轮） |

**GCM 中的 nonce 重用**会完全恢复 GHASH 认证子密钥并对明文做 XOR——单次 nonce 碰撞即同时破坏机密性*与*认证。SIV 模式（RFC 8452）从消息派生 nonce，在 nonce 重用时仍保持安全（至多泄露明文是否相等）。

## 6. 安全意义小结

1. **使用专门的 AEAD**（GCM/ChaCha20-Poly1305），而非自行拼凑的 encrypt-then-MAC。
2. 对给定密钥的 CTR/GCM，**绝不重用 nonce**；使用随机的 96 位 nonce 或计数器。
3. **Encrypt-then-MAC** 是安全的通用组合方式；MAC-then-encrypt 导致了 TLS 填充预言
   攻击。
4. 带密钥的完整性/KDF 用 **HMAC**；固定结构的分组密码 MAC 用 **CMAC**；**Poly1305** 是
   一次性 MAC——必须与每条消息唯一的密钥流配对使用。
5. AES-GCM 标签长度通常为 128 位；缩短标签会按比例削弱抗伪造能力。

## 来源

- NIST CSRC — FIPS 198-1（HMAC）；SP 800-38D（GCM）：https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- RFC 8439（ChaCha20-Poly1305）；RFC 2104（HMAC）：https://www.rfc-editor.org/
- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——第 6–9 章：https://toc.cryptobook.us/
