---
title: "公钥加密"
description: "从 RSA 到 ElGamal 及混合 KEM/DEM 的非对称加密：安全定义、教科书式 RSA 为何失效，以及向 OAEP 与 KEM 的演进。"
pubDate: 2026-08-16
tags: ["密码学", "公钥", "RSA", "ElGamal", "KEM"]
lang: "zh"
langLink: "/en/notes/public-key-encryption/"
---

公钥（非对称）加密把*加密*能力（公钥 $pk$）与*解密*能力（私钥 $sk$）分离。它解决了密钥分发问题，但比对称加密慢几个数量级，因此实践中用于传输/协商对称密钥。

## 1. 安全定义

- **IND-CPA（语义安全）：** 选定消息的密文与随机消息的密文不可区分，即使在自适应选择明文查询下亦然。需要*随机化*加密。
- **IND-CCA（选择密文攻击）：** 此外，敌手可以解密其选择的密文（挑战密文除外）。这是已部署公钥加密的标准；**Bleichenbacher 攻击**对 RSA PKCS#1 v1.5 说明了为何 CCA 才是正确的目标。

## 2. RSA 加密

**密钥生成.** 生成素数 $p, q$；$N = pq$；选择满足 $\gcd(e, \varphi(N)) = 1$ 的 $e$；计算 $d = e^{-1} \bmod \varphi(N)$。公钥 $(N, e)$，私钥 $d$。

**加密（教科书式）.** $c = m^e \bmod N$。**解密.** $m = c^d \bmod N$。

**正确性**由欧拉定理得出：$m^{ed} \equiv m \pmod N$。

**教科书式 RSA 有多种破绽：**
- **确定性** → 连 CPA 安全都达不到（同一消息加密两次得到相同密文；字典攻击可行）。
- **乘法同态** $E(m_1) E(m_2) = E(m_1 m_2)$ 使盲化/伪造签名与选择密文攻击成为可能。
- 小 $e$（如 3）配合短消息可实现**广播攻击**（Håstad）：同一 $m$ 发送给多个接收者可通过 CRT 恢复。

**填充 RSA.** **RSA-OAEP**（PKCS#1 v2.2，RFC 8017）加入 Feistel 式掩码，使方案随机化，并在随机预言机模型下、假设 RSA 问题困难时可证明 **IND-CCA 安全**。**PKCS#1 v1.5 填充**是遗留方案且 CCA 不安全（Bleichenbacher），尽管在 TLS 1.3 之前仍被广泛使用。

## 3. ElGamal 加密

**设置.** 阶为素数 $q$ 的循环群 $\mathbb{G}$，生成元 $g$。

**密钥生成.** $sk = x \leftarrow \mathbb{Z}_q$，$pk = h = g^x$。

**加密.** 对 $r \leftarrow \mathbb{Z}_q$：$c = (c_1, c_2) = (g^r,\ m \cdot h^r)$。

**解密.** $m = c_2 / c_1^{x} = m \cdot g^{xr} / g^{rx}$。

**安全性.** ElGamal 在 **DDH** 下是 **IND-CPA 安全**的；它是*可延展的*（乘以 $c_2$ 即可缩放 $m$），因此没有变换（如 Cramer–Shoup，或签名）就不具备 CCA 安全性。它是 CPA 与 CCA 之间差距的标准例子。

## 4. 混合加密（KEM/DEM）

现代公钥加密是**混合**的：**KEM**（密钥封装机制）用公钥传输一个随机对称密钥，**DEM**（数据封装机制，即 AEAD）用它加密载荷。

$$ (c_{\text{kem}}, k) = \mathrm{Encaps}(pk); \qquad c_{\text{dem}} = \mathrm{AEAD}(k, m). $$

KEM/DEM 分离如今是*首选*接口（NIST PQC 采用——ML-KEM 就是一种 KEM——TLS 1.3 亦然）。它规避了消息长度限制，给出干净的 CCA 归约，并把非对称部分隔离到仅做密钥传输。

**RSA-KEM**（RFC 5990）与 **ECIES**（椭圆曲线集成加密方案，以 ECDH 作为 KEM）是标准的经典 KEM。

## 5. 安全意义小结

1. **绝不使用教科书式 RSA**；使用 OAEP（或 KEM）。
2. **RSA PKCS#1 v1.5 是遗留方案**且易受 CCA 攻击；在新设计中避免使用。
3. **ElGamal 仅具 CPA 安全性**；它可延展——没有完整性保护就不要使用。
4. **优先选择混合 KEM/DEM** 加密（RSA-KEM、ECIES 或 PQC KEM），而非直接对消息做非对称加密。
5. 密钥长度：RSA ≥ 2048 位（112 位）或 3072 位（128 位）经典安全；所有经典公钥加密都会被 Shor 算法攻破，必须按 PQC 迁移替换。

## 来源

- NIST CSRC — Cryptographic Standards and Guidelines（SP 800-56B、FIPS 186）：https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- IETF RFC Editor — RFC 8017（PKCS#1 v2.2）：https://www.rfc-editor.org/
- Boneh–Shoup，《A Graduate Course in Applied Cryptography》——第 11–12 章：https://toc.cryptobook.us/
- Katz–Lindell，《Introduction to Modern Cryptography》——第 11/12 章：https://www.cs.umd.edu/~jkatz/imc.html
