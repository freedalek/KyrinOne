---
title: "CAPEC — 攻击模式模型"
description: "CAPEC 如何编目已知的攻击模式：一个攻击模式包含什么、它的主要视图，以及与 CWE 和 MITRE ATT&CK 的对应关系。"
pubDate: 2026-08-17
tags: ["攻防安全", "CAPEC", "CWE", "ATT&CK", "威胁建模"]
lang: "zh"
langLink: "/en/notes/capec-model/"
---

**Common Attack Pattern Enumeration and Classification（CAPEC，通用攻击模式枚举与分类）** 是一部已知*攻击模式*的词典——描述攻击者如何利用弱点。它是 CWE（根因）与 CVE（实例）在攻击方法层面的对应物：**CWE 说明「错在哪」，CAPEC 说明「如何被攻击」。** 当前 CAPEC 列表（v3.9）收录 559 个攻击模式。

## 一个攻击模式包含什么

CAPEC 模式比 CWE 描述更丰富。一个完整模式通常包含：

- **描述（Description）**——攻击方法，从任何单一漏洞中抽象出来。
- **执行流程（Execution Flow）**——攻击者遵循的有序步骤（攻击 → 利用 → 后置条件）。
- **前置条件（Prerequisites）**——攻击得逞所需目标满足的条件。
- **所需技能 / 资源**——攻击者能力水平。
- **后果（Consequences）**——机密性/完整性/可用性影响。
- **相关弱点（CWE）**——通向根因的规范桥梁。
- **示例实例（Example Instances）**——使用该模式的真实 CVE 记录。
- **缓解措施（Mitigations）**——对策。

这一结构恰是本领域处理规则所要求的「前置条件 → 机制 → 后果」三元组，因此 CAPEC 被视为首要建模模板。

## CAPEC 视图

CAPEC 将其 559 个模式组织为多个**视图（views）**（视图是带有特定目的的精选子集），两个主要视图为：

- **View 1000 — Mechanisms of Attack（攻击机制）**——按攻击在技术层面*如何*运作来组织模式（注入、协议操纵、资源操纵等）。
- **View 3000 — Domains of Attack（攻击领域）**——按*领域*组织模式（软件、硬件、物理、社会工程、供应链、通信）。

还存在其他视图/判据，用于其他切片视角（例如按平台）。

## CAPEC ↔ CWE ↔ ATT&CK 的对应

这三套 MITRE 分类法被设计为相互咬合：

1. **CAPEC → CWE**：每个攻击模式列出它可利用的 CWE 条目（`Related Weaknesses`）。例如，「命令注入」攻击模式列出 CWE-77/CWE-78。
2. **CAPEC → ATT&CK**：概念上，ATT&CK 技术描述*入侵中的行为*（如 T1190 利用面向公众的应用），而 CAPEC 模式描述*通用攻击方法*（如「通过环境变量进行缓冲区溢出」）。二者互补：ATT&CK 是战术手册，CAPEC 是其中的单个战术动作。
3. **CWE → CVE**：CWE 条目带有指向具体 CVE 的 `Observed Examples`。

因此完整链条是：**ATT&CK 技术 → CAPEC 模式 → CWE 弱点 → CVE 实例 → CVSS 评分。**

## 示例：命令注入贯穿整个链条

- **CAPEC-88 OS 命令注入**（机制：构造被拼接进 OS 命令的输入）。
- 利用 **CWE-78 OS 命令中特殊元素的不当中和**。
- 产生诸如 **CVE-…（产品 X 中的 OS 命令注入）** 的记录。
- 用 **CVSS v4.0** 评分。
- 防御者把入侵映射到 **ATT&CK T1190（初始访问）→ T1059.004（Unix Shell 执行）**。

## 攻击性使用 CAPEC

- **「如何」的枚举**——给定一个 CWE，查出哪些 CAPEC 模式可利用它，从而在渗透测试中枚举具体攻击路径。
- **测试用例生成**——攻击模式的*执行流程*可直接充当测试计划。
- **差距分析**——CAPEC 的前置条件/步骤结构会揭示哪些防御能阻断哪一步。

## 防御性使用 CAPEC

- 把需求（如 ASVS 控制项）映射到它们所化解的 CAPEC 模式。
- 按针对某 CWE 的 CAPEC 模式数量来确定修复优先级。
- 围绕「领域」视图（View 3000）构建威胁模型。

## 来源

- MITRE CAPEC: https://capec.mitre.org/
