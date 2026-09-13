---
title: "渗透测试方法论（PTES 七阶段）"
description: "PTES 将渗透测试划分为七个阶段，从交互前沟通到最终报告，并介绍 OSSTMM、OWASP WSTG、NIST SP 800-115 等其他参照框架。"
pubDate: 2026-09-07
tags: ["渗透测试", "PTES", "方法论", "基础"]
lang: "zh"
langLink: "/en/notes/penetration-testing-methodology-ptes/"
---

## 七个阶段（PTES v1.0）

1. **Pre-engagement Interactions 交互前沟通** — 授权书、范围、时间窗、联络人、法律边界、报告要求；是整个过程的合规基础。
2. **Intelligence Gathering 情报收集** — 被动/主动收集目标信息（OSINT、DNS、指纹等）。
3. **Threat Modeling 威胁建模** — 基于已收集信息分析攻击面、信任关系、可能的攻击路径与业务影响。
4. **Vulnerability Analysis 漏洞分析** — 端口/服务枚举后结合已知漏洞库与人工分析，判定可被利用的弱点。
5. **Exploitation 利用** — 实际触发漏洞，获取初始立足点或进一步控制。
6. **Post Exploitation 后渗透** — 判断立足点的价值：提权、横向移动、数据访问、持久化（依据 RoE）。
7. **Reporting 报告** — 面向技术与管理层交付：过程、发现、证据、风险评级与修复建议。

## 其他参照框架

- **OSSTMM**（Open Source Security Testing Methodology Manual）— 偏重**度量/验证**的测试方法论。
- **OWASP WSTG** — Web 应用测试的实操手册（信息收集→配置→认证→输入校验→业务逻辑…）。
- **NIST SP 800-115** — 美国标准技术研究院的安全测试与评估技术指南。

> 方法论是骨架，不是死流程：真实项目中各阶段会循环迭代（如利用受阻后回到枚举）。

## 要点小结

- 阶段 1（授权/范围）**不可跳过**，它是测试合法性的来源。
- 每个阶段都有明确的**输入/输出**；例如情报收集的输出是威胁建模的输入。
- 报告（阶段 7）应贯穿全程记录，而非最后补写。

## 关联

- 渗透测试概述（Penetration Testing Overview）
- 交战规则与范围界定（Rules of Engagement and Scoping）
- 报告与修复（Reporting and Remediation）

## 来源

- PTES 官方主页面与 7 阶段定义: http://www.pentest-standard.org/index.php/Main_Page
- OWASP WSTG: https://owasp.org/www-project-web-security-testing-guide/
- NIST SP 800-115: https://csrc.nist.gov/publications/detail/sp/800-115/final
