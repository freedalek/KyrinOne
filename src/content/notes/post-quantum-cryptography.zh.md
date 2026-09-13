---
title: "后量子密码学"
description: "抵御量子计算机的密码学：Shor/Grover 威胁、基于格的方案、NIST FIPS 203/204/205、其他 PQC 家族，以及 NIST 迁移时间表。"
pubDate: 2026-08-16
tags: ["密码学", "后量子", "格密码", "NIST 标准", "迁移"]
lang: "zh"
langLink: "/en/notes/post-quantum-cryptography/"
---

后量子密码学（PQC）是指能够抵御拥有大规模量子计算机的敌手的密码学。Shor 算法攻破了所有广泛部署的公钥密码（RSA、有限域 DH/DSA、椭圆曲线密码）；PQC 用即使对量子计算机也被认为困难的方案来替代它们。

## 1. 量子威胁

**Shor 算法**在量子计算机上、给定足够量子比特时，可在多项式时间内分解整数并计算离散对数。它直接攻破 RSA、DSA、Diffie–Hellman、ECDH、ECDSA 与 EdDSA——基本上今天在用的每一种公钥原语。

**Grover 算法**对搜索给出平方根加速：它把对称密码的有效密钥长度和哈希的原像抗性减半。应对方法很简单，就是**更大的密钥**：AES-256 与 SHA-384/512 仍然是量子充分的；无需替换。

**威胁模型小结：**

| 原语 | 量子影响 | 应对 |
|-----------|----------------|----------|
| RSA / DH / DSA / ECC | **被攻破**（Shor） | 替换为 PQC |
| AES、SHA-2/3、HMAC | Grover 平方根 | 使用 AES-256 / SHA-384+ |
| 对称/AEAD 协议 | 其余不变 | 保留，使用更大密钥 |

## 2. 基于格的密码学

占主导地位的 PQC 家族。安全性建立在格问题（**SVP**、**LWE**、Ring/Module-LWE——见 01_Hardness/Hardness-Assumptions.md）的最坏情况到平均情况困难性之上。

**LWE 密钥封装（简化）.** 公钥为 $(A, \mathbf{b} = A\mathbf{s} + \mathbf{e})$，其中秘密 $\mathbf{s}$ 很短、误差 $\mathbf{e}$ 很小；封装计算一个有噪声的共享值和一个协调提示；解封装用 $\mathbf{s}$ 恢复该值。攻击者必须区分有噪声样本与均匀样本，即求解 LWE。

## 3. NIST PQC 标准（FIPS 203 / 204 / 205）

这些标准于 **2024 年 8 月**发布，是主要的 PQC 标准：

| FIPS | 方案 | 类型 | 基于 | 角色 |
|------|--------|------|----------|------|
| FIPS 203 | **ML-KEM**（CRYSTALS-Kyber） | KEM | Module-LWE | 密钥建立 |
| FIPS 204 | **ML-DSA**（CRYSTALS-Dilithium） | 签名 | Module-LWE（含 SIS） | 签名 |
| FIPS 205 | **SLH-DSA**（SPHINCS+） | 签名 | 基于哈希（无状态） | 签名（备用，不含格） |

**ML-KEM** 取代 Diffie–Hellman/ECDH 与 RSA-KEM 用于密钥建立。**ML-DSA** 取代 ECDSA/EdDSA/RSA-PSS。**SLH-DSA** 是无状态的基于哈希的签名，签名更大，但安全性*仅*依赖哈希函数的安全性——当格假设减弱时，它是保守的兜底方案。

**Falcon**（格签名）与 **HQC**（基于编码的 KEM）也被额外选中，正在走向标准化；**XMSS/LMS** 是有状态、基于哈希的签名，已在 SP 800-208 中标准化（用于状态可管理的固件/代码签名）。

## 4. 其他 PQC 家族

- **基于编码：** McEliece/Niederreiter —— 公钥很大（约 1 MB），但安全性经长期研究；HQC 是现代选中的 KEM。
- **基于哈希：** Merkle 树签名（LMS/XMSS 有状态；SPHINCS+ 无状态）—— 安全性仅来自哈希原像抗性。
- **基于同源：** 由同源图上的游走构造的密钥交换；**SIKE 于 2022 年被彻底攻破**（Castryck–Decru），是该领域的警示。
- **多变量：** 基于求解有限域上的二次系统（如 Rainbow，已被攻破；UOV 仍是额外一轮签名的候选）。

## 5. 迁移（NIST IR 8547）

NIST 在 **IR 8547** 中的过渡时间表要求**到 2035 年**从 NIST 标准中弃用并移除量子易受攻击的算法，高风险系统则需更早迁移。推荐的迁移路径：

1. **清点** RSA/ECC/DH 的使用位置（证书、TLS、代码签名、静态加密）。
2. **过渡期采用混合方案：** 并排运行经典方案（ECDH/ECDSA）与 PQC 方案（ML-KEM/ML-DSA），使得任一家族被攻破时安全性仍成立。
3. **优先保障机密性** —— 「先收集、后解密」攻击使静态加密数据成为最紧迫的目标。
4. **密码敏捷性** —— 为算法替换而设计，因为 PQC 参数与标准仍在成熟之中。

## 6. 安全意义小结

1. **对称密码只需更大密钥**（AES-256、SHA-384/512）；公钥密码需要替换。
2. **不要等「大型」量子计算机** —— 「先收集、后解密」是当前对长期秘密的威胁。
3. **SLH-DSA 是多样性之选** —— 在不希望依赖格假设的地方使用它。
4. **同源需谨慎** —— SIKE 的攻破表明年轻的 PQC 假设也可能失败；应多样化并使用混合方案。
5. **实现尚不成熟** —— PQC（尤其是格解封装）的侧信道与故障攻击加固是活跃的研究领域（见 07_Attacks）。

## 来源

- FIPS 203/204/205；NIST IR 8547：https://csrc.nist.gov/projects/post-quantum-cryptography
- RFC 9180 及 ML-KEM 相关草案：https://www.rfc-editor.org/
- Boneh–Shoup，第 17 章：基于格的密码学：https://toc.cryptobook.us/
- Lattices and Isogenies 分类：https://cryptohack.org/
