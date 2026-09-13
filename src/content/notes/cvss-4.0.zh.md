---
title: "FIRST CVSS v4.0 — 严重度评分"
description: "CVSS v4.0 严重度评分：四个度量组、CVSS-B/BT/BE/BTE 命名、向量字符串，以及相对 v3.1 的关键变化。"
pubDate: 2026-08-17
tags: ["攻防安全", "CVSS", "漏洞管理", "严重度评分"]
lang: "zh"
langLink: "/en/notes/cvss-4.0/"
---

**CVSS（Common Vulnerability Scoring System，通用漏洞评分系统）** 是由 FIRST 的 CVSS-SIG 维护的开放框架，用于传达软件/硬件漏洞的*技术严重度*。它是*漏洞*评分，而非*风险*评分——除可选的度量组外，它刻意排除与环境相关的威胁可能性。v4.0 是当前标准；v3.1 已归档。

## 度量组（v4.0）

CVSS v4.0 由四个度量组构成：

| 组 | 回答的问题 | 是否强制 |
|-------|---------------------|-----------|
| **Base（基础）** | 该缺陷本身有多严重？ | 是 |
| **Threat（威胁）** | 威胁态势如何变化（利用成熟度）？ | 否 |
| **Environmental（环境）** | 在*我的*环境中它有多严重（缓解措施/重要性）？ | 否 |
| **Supplemental（补充）** | 额外属性（安全性、自动化、恢复、紧迫性） | 否（信息性） |

### 基础度量（v4.0）
- **Attack Vector (AV) 攻击向量**——Network / Adjacent / Local / Physical。
- **Attack Complexity (AC) 攻击复杂度**——Low / High。
- **Attack Requirements (AT) 攻击前提条件**——None / Present（v4.0 新增：是否必须存在特殊条件）。
- **Privileges Required (PR) 所需权限**——None / Low / High。
- **User Interaction (UI) 用户交互**——None / Passive / Active（v4.0 把「Required」拆分为 Passive/Active）。
- **Impact 影响**——对**易受攻击系统（VC、VI、VA）**与**后续系统（SC、SI、SA）**的机密性/完整性/可用性。旧的 `Scope` 度量在 v4.0 中**被废止**，由这种明确的双系统影响取代。

### 威胁度量
从 v3.x 的「Temporal（时序）」更名而来。已简化：**Exploit Maturity (E) 利用成熟度**——Unproven / Proof-of-Concept / Attacked。（Remediation Level 与 Report Confidence 已废止。）

### 环境度量
安全需求（CR/IR/AR）与修改后的基础度量；另新增 **Safety (MSI:S, MSA:S)**，用于消费者评估的安全影响（OT/ICS 侧重）。

### 补充度量（不影响评分）
**Safety (S)**、**Automatable (A)**、**Recovery (R)**、**Value Density (V)**、**Vulnerability Response Effort (RE)**、**Provider Urgency (U)**。

## 评分命名（v4.0）

标准为组合了哪些组引入了明确命名：

- **CVSS-B**——仅基础。
- **CVSS-BT**——基础 + 威胁。
- **CVSS-BE**——基础 + 环境。
- **CVSS-BTE**——基础 + 威胁 + 环境（「完整」评分）。

## 向量字符串

CVSS v4.0 向量是一个紧凑字符串，例如：

```
CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

每个度量是键:值；数值评分依据已发布的查找表由基础（以及可选的威胁/环境）度量计算得出。

## 攻防两端的实际使用

- **分诊**——基础评分对*严重度*排序；结合 **EPSS**（利用可能性）做真正的优先级排序（CVSS + EPSS = 业界标准组合）。
- **报告**——渗透测试发现应引用 CVE 与 CVSS 向量，而非光秃秃的数字，以便评分可复现。
- **陷阱**——CVSS 不捕捉业务背景（那是环境度量的事），且仅基础评分若脱离向量引用，常常误导。始终报告向量字符串。

## v4.0 与 v3.1（需知的关键变化）

- Scope 废止 → 明确的易受攻击/后续系统影响。
- UI 拆分为 Passive/Active；新增 AT（攻击前提条件）。
- Temporal → Threat（简化）；RL/RC 废止。
- 新增补充组；明确的 OT/ICS 安全考量。

## 来源

- FIRST CVSS: https://www.first.org/cvss/
- FIRST CVSS v4.0: https://www.first.org/cvss/v4-0/
