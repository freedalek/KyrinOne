---
title: "CWE —— 弱点模型与抽象层次"
description: "通用弱点枚举（CWE）如何建模根因缺陷类别：Pillar/Class/Base/Variant 层次、分组条目、条目解剖、视图与排名，以及评分方法。"
pubDate: 2026-08-17
tags: ["攻防安全", "CWE", "MITRE", "漏洞管理", "安全编码"]
lang: "zh"
langLink: "/en/notes/cwe-model/"
---

**通用弱点枚举（Common Weakness Enumeration，CWE）** 是一份由社区共同开发的软件与硬件弱点类型清单，这些弱点类型可能演变为漏洞。CVE 命名的是*实例*，而 CWE 命名的是*错误类别*——根因。它由 CISA（美国国土安全部）资助、由 MITRE 运营。

## 抽象层次

CWE 条目刻意按抽象程度分层。理解这一层次结构对正确使用 CWE 至关重要：

| 层次 | 含义 | 示例 |
|------|------|------|
| **Pillar（支柱）** | 最抽象的主题；描述一类*错误* | CWE-284 *Improper Access Control* |
| **Class（类）** | 仍然抽象，与技术无关 | CWE-285 *Improper Authorization* |
| **Base（基础）** | 细节足以支撑检测/防御方法 | CWE-862 *Missing Authorization* |
| **Variant（变体）** | 技术/语言特定 | CWE-1022（Web `window.opener` tabnabbing） |

### 分组（非弱点）条目

- **Category（类别）**——按共同特征归组弱点（本身不是弱点）。
- **View / Graph（视图/图）**——精选切片，如 CWE-1000 *Research Concepts*（所有弱点的图视图）。
- **Chain（链）**——须*依次*到达才可利用的弱点。
- **Composite（复合）**——须*同时存在*才可利用的弱点。

## 「Improper Access Control」示例（取自在线 Research Concepts 视图）

在线 CWE-1000 视图显示支柱 **CWE-284 Improper Access Control** 锚定着一棵丰富的子树：

```
284 Improper Access Control (Pillar)
 ├─ 269 Improper Privilege Management (Class)
 │   ├─ 266 Incorrect Privilege Assignment (Base)
 │   ├─ 267 Privilege Defined With Unsafe Actions (Base)
 │   ├─ 268 Privilege Chaining (Base)
 │   ├─ 270 Privilege Context Switching Error (Base)
 │   ├─ 271 Privilege Dropping/Lowering Errors (Class)
 │   │    ├─ 272 Least Privilege Violation
 │   │    ├─ 273 Improper Check for Dropped Privileges
 │   │    └─ 274 Improper Handling of Insufficient Privileges
 │   └─ 648 Incorrect Use of Privileged APIs
 ├─ 282 Improper Ownership Management (Class)
 └─ 285 Improper Authorization (Class)
      ├─ 862 Missing Authorization (Base)
      ├─ 863 Incorrect Authorization (Base)
      └─ 639 Authorization Bypass Through User-Controlled Key (IDOR)
```

仅这一棵子树就已囊括 Web 漏洞背后最常见的*访问控制*根因（IDOR、缺失授权、权限链）——直接对应 OWASP A01 与 A07。

## CWE 条目解剖

一份完整的 CWE 定义包括：ID + 名称、描述、扩展描述、关系（父/子、`CanPrecede`/`CanFollow`）、平台/语言、**常见后果**、检测方法、潜在缓解措施、**相关攻击模式（CAPEC）**，以及**已观测示例（CVE）**。正是 CAPEC 与 CVE 的交叉引用，使 CWE 成为「弱点→攻击→实例」图谱的枢纽。

## 视图与排名

CWE 为不同使用者提供多个视图，以及若干排名清单：

- **CWE-1000 Research Concepts**——按行为抽象组织的全部弱点。
- **CWE Top 25 最危险软件弱点**（见 CWE-Top25-2025.md）。
- **Top Hardware Weaknesses**（面向硬件安全领域）。
- **Top 10 KEV Weaknesses**——按在 CISA 已知被利用漏洞目录中的出现情况排名。
- **"On the Cusp"**——刚好落在 Top 25 之外的弱点。

## CWE 内部的评分

Top 25 排名使用综合**评分**（而非原始 CVE 计数）：它融合了当年 CVE 数据集中的普遍性、平均严重性，以及已知被利用漏洞的出现情况。公式背景与 2025 年结果见 CWE-Top25-2025.md。

## 与本领域的关系

- 06_Web-Attacks/ 中的每个 Web 攻击，以及每个利用代码缺陷的 ATT&CK 技术，都可追溯到某个 CWE 根因。需要养成的习惯：**先说出 CWE，再说出攻击。**
- 与 03_CAPEC/（攻击模式）和 04_Vulnerability-Management/（CVE/CVSS）交叉引用。

## 来源

- https://cwe.mitre.org/
