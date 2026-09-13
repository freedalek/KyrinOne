---
title: "标准全景：安全本体之间的关系"
description: "五大 Tier 0 安全标准——CVE、CWE、CAPEC、CVSS 与 ATT&CK——各自的角色、粒度与交叉引用，以及抽象层次、评分、攻击链推理与来源时效。"
pubDate: 2026-08-16
tags: ["攻防安全", "CVE", "CWE", "CAPEC", "CVSS", "MITRE ATT&CK"]
lang: "zh"
langLink: "/en/notes/standards-landscape/"
---

本文解释五大 Tier 0 标准之间的术语与关系，是本领域其余内容共同依赖的心智模型。

## 五大标准及其角色

| 标准 | 维护方 | 命名对象 | 粒度 | 方向 |
|------|--------|----------|------|------|
| **CVE** | CVE 计划（由 MITRE 运营） | 具体的*漏洞实例* | 某产品中的单个缺陷 | 实例 |
| **CWE** | MITRE（由 CISA 资助） | *弱点类别*（根因） | 一类缺陷 | 原因 |
| **CAPEC** | MITRE | *攻击模式* | 一种利用方式 | 动作 |
| **CVSS** | FIRST | *严重性评分* | 0.0–10.0 | 影响 |
| **ATT&CK** | MITRE | *攻击者行为*（战术/技术） | 观测到的 TTP | 行为 |

### 具体的示例链

1. 某应用把用户输入拼接进 shell 命令 → **CWE-78**（OS 命令注入）。
2. 攻击者用构造的载荷利用它 → **CAPEC-88**（OS 命令注入，一种攻击模式）。
3. 该产品的具体缺陷被公开 → **CVE-2024-XXXXX**。
4. 其严重性被计算 → **CVSS v4.0** 向量，如 `CVSS:4.0/AV:N/AC:L/...` → 数值评分。
5. 防御者把攻击者的*行为*映射到 **ATT&CK** → T1190 *利用面向公众的应用* → T1059.004 *Unix Shell* → 权限提升，等等。

关键洞见：**CWE 是*受害者代码*的属性；CAPEC 是*攻击者手法*的属性；CVE 是*记录*；CVSS 是*评分*；ATT&CK 是*剧本*。** 它们是同一起事件的不同正交视角，且常在各自的官方元数据中相互引用。

## CWE ↔ CAPEC ↔ ATT&CK 交叉引用

- CAPEC 攻击模式带有显式的 `Related Weaknesses` 字段，把每个模式链接到它可利用的 CWE 条目。这是从「攻击者动作」到「根因」的标准桥梁。
- CWE 条目带有 `Related Attack Patterns`（CAPEC），并常以 `Observed Examples` 引用 CVE 记录。
- ATT&CK 技术链接到检测数据源（遥测）与缓解措施，但 ATT&CK 以行为为中心，**不**直接枚举 CWE 条目；CWE/CAPEC 桥接是把技术连接到其底层代码缺陷的标准方式。

## 抽象模型（CWE）

CWE 不是一张扁平清单。条目按抽象层次分层（见 02_CWE/CWE-Model.md）：

```
Pillar（最抽象，如 CWE-284 Improper Access Control）
  └─ Class（如 CWE-285 Improper Authorization）
       └─ Base（如 CWE-862 Missing Authorization）
            └─ Variant（技术特定）
```

特殊的分组条目：**Category**（按共同特征归组弱点，本身不是弱点）、**View/Graph**（精选切片，如 CWE-1000 Research Concepts）、**Chain**（须*依次*到达才可利用的弱点）、**Composite**（须*同时存在*才可利用的弱点）。

## 严重性 vs. 可能性

- **CVSS** 衡量单个漏洞的*技术严重性*（Base，可叠加 Threat 与 Environmental 修正）。它刻意不是风险评分。
- **EPSS**（FIRST）估计*被利用概率*，与 CVSS 互补。CWSS 是 MITRE 的弱点级评分（用于 CWE Top 25 方法学）。
- **CWE Top 25** 按综合评分对弱点排序，该评分融合了 CVE 数据中的普遍性、严重性（CVSS）与已知利用情况（CISA KEV），而非仅凭原始计数。

## 攻击链推理

攻防工作以*链*的方式组织，而非单点一击。本领域的阶段模型（见 07_Offensive-Phases/Offensive-Kill-Chain.md）可清晰地映射到 ATT&CK 战术：

```
侦察 → 初始访问 → 执行 → 持久化 → 权限提升
     → 防御规避 → 凭据访问 → 发现
     → 横向移动 → 收集 → C2 → 数据外发 → 影响
```

每一跳都有*前置条件*（攻击者必须已控制什么）、*机制*（该跳在技术层面如何运作）与*遥测*（防御者可记录什么来检测它）。这一「前置条件→机制→遥测」三元组是本知识库每个文件的骨架。

## 来源与时效

- 本次构建中的所有事实均于 **2026-08-17** 实时抓取，除非页面另有说明。
- MITRE CWE 当前报告 **版本 4.20**（Research Concepts 视图）与 **2025 CWE Top 25**（"Page Last Updated: December 15, 2025"）。
- MITRE CAPEC 报告 **共 559 个攻击模式**，并在其新闻中列出 **CAPEC 版本 3.9**。
- OWASP Top 10 当前发布版本为 **2025**；ASVS 当前稳定版为 **5.0.0**；WSTG 稳定版为 **4.2**，**5.0** 正在开发中。
- FIRST CVSS 当前标准为 **v4.0**（v3.1 已归档）。

## 来源

- https://attack.mitre.org/
- https://cwe.mitre.org/
- https://capec.mitre.org/
- https://www.cve.org/
- https://www.first.org/cvss/
