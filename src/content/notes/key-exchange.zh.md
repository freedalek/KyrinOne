---
title: "密钥交换"
description: "双方如何在公开信道上协商共享密钥——Diffie–Hellman、标准化群与 X25519、认证密钥交换、KDF，以及量子威胁。"
pubDate: 2026-08-16
tags: ["密码学", "密钥交换", "Diffie–Hellman", "TLS", "后量子"]
lang: "zh"
langLink: "/en/notes/key-exchange/"
---

密钥交换让双方在公开信道上建立共享密钥。该共享密钥随后用于对称 AEAD 的密钥。安全性同时要求*保密性*（窃听者学不到任何信息）与*真实性*（双方确实是其所声称的身份）。

## 1. Diffie–Hellman

**设置.** 公开参数：阶为素数 $q$ 的循环群 $\mathbb{G}$，生成元 $g$。

**协议.** Alice 选取 $a \leftarrow \mathbb{Z}_q$，发送 $A = g^a$；Bob 选取 $b$，发送 $B = g^b$；双方计算 $K = g^{ab}$（$A^b = B^a$）。

**安全性.** 被动安全性依赖 **CDH**（窃听者看到 $g^a, g^b$ 但得不到 $g^{ab}$）。要使派生密钥与随机不可区分，需假设更强的 **DDH**，并将原始值经 KDF 哈希（原始的 $g^{ab}$ 在 $\mathbb{G}$ 中并非均匀随机）。

**局限.** 朴素 Diffie–Hellman 易受**中间人**攻击：Mallory 运行两次 DH 交换（一次与 Alice，一次与 Bob），因此它只提供保密性而**没有认证**。认证可通过签名临时值（signed-DH）或使用绑定在证书中的长期 Diffie–Hellman 密钥来加入。

## 2. 标准化 DH 群

- **RFC 7919** 规定了固定的有限域（模幂）群，包括 TLS 中使用的 2048 位与 3072 位素数。
- **椭圆曲线 DH（ECDH）** 使用 $E(\mathbb{F}_p)$，以约 256 位密钥提供同等安全性（见《椭圆曲线》笔记）。
- **X25519**（RFC 7748）是现代常数时间的 Montgomery 曲线 Diffie–Hellman，是 TLS 1.3、Signal、WireGuard 与 SSH 的默认选择。它只传输 $x$ 坐标，并包含**钳制**步骤（清除低 3 位与最高位，设置第 254 位），使其能抵抗小子群及相关攻击。

## 3. 认证密钥交换（AKE）

认证密钥交换把 DH 与认证结合，以击败 MITM 并将会话绑定到预期的对等方。

- **签名 Diffie–Hellman：** 各方用长期签名密钥对其临时公钥值签名。若签名方案安全且 DH 满足 CDH 困难，则会话安全。
- **静态–临时与临时–临时：** 仅静态 DH 缺乏**前向保密**（一个长期密钥泄露会解密所有历史流量）；临时 DH 提供前向保密。
- **TLS 1.3：** 临时 ECDHE + 证书认证，通过 HKDF 从 $(g^{ab}, \text{transcript})$ 派生密钥。它移除静态 DH 密码套件正是为了强制前向保密。

**需要跟踪的安全属性：**

| 属性 | 含义 |
|----------|---------|
| 双向/实体认证 | 各方确信对方的身份 |
| 前向保密（PFS） | 长期密钥泄露不会暴露过去的会话密钥 |
| 密钥确认 | 双方都知道对方已算出密钥 |
| 抗密钥泄露冒充（KCI） | 知道你的密钥并不能让攻击者*对你*冒充他人 |
| 抗未知密钥共享（UKS） | 密钥不会与意外的第三方共享 |

## 4. KDF 与共享密钥流水线

原始 DH 输出在使用前必须经**密钥派生函数**处理：
- **HKDF**（RFC 5869）——基于 HMAC 的 extract-then-expand；是派生多个密钥与域分离的标准。
- 在 TLS 1.3 中，`HKDF-Extract(0, g^{ab})` → 主密钥，随后 `HKDF-Expand-Label` 结合转录绑定生成流量密钥。

## 5. 量子威胁

有限域与椭圆曲线 Diffie–Hellman 都会被 Shor 算法攻破。量子安全的替代方案是基于格的**密钥封装（ML-KEM，FIPS 203）**，它实现与 DH 相同的「传输共享密钥」目标，但基于 LWE 困难性（见《后量子》笔记）。迁移期间推荐混合（ECDH + ML-KEM）构造。

## 来源

- NIST CSRC — Cryptographic Standards and Guidelines（SP 800-56A）：https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- IETF RFC Editor — RFC 7919（DH 群）；RFC 7748（X25519）：https://www.rfc-editor.org/
- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——第 21 章：认证密钥交换：https://toc.cryptobook.us/
- CryptoHack — Diffie–Hellman 类别：https://cryptohack.org/
