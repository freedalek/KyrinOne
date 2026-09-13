---
title: "Web 应用攻击面（OWASP Top 10 2025）"
description: "以 OWASP Top 10 为基线梳理 Web 应用攻击面：2025 版十大风险类别清单、如何用它做覆盖检查，以及各类别的测试切入点。"
pubDate: 2026-09-07
tags: ["Web 安全", "OWASP", "攻击面", "渗透测试"]
lang: "zh"
langLink: "/en/notes/web-application-attack-surface/"
---

## OWASP Top 10 — 2025 清单

1. **A01 访问控制失效（Broken Access Control）**
2. **A02 安全配置错误（Security Misconfiguration）**
3. **A03 软件供应链缺陷（Software Supply Chain Failures）**
4. **A04 加密机制缺陷（Cryptographic Failures）**
5. **A05 注入（Injection）**
6. **A06 不安全设计（Insecure Design）**
7. **A07 认证缺陷（Authentication Failures）**
8. **A08 软件与数据完整性缺陷（Software or Data Integrity Failures）**
9. **A09 安全日志与告警缺失（Security Logging and Alerting Failures）**
10. **A10 异常条件处置不当（Mishandling of Exceptional Conditions）**

> 注：2025 版为当前发布版本，与 2021 版条目不同（如新增 A03 供应链、A10 异常处理）。

## 如何用于测试

- 用清单做**覆盖面检查**：每类问题至少要有对应的测试手法与记录。
- 结合 OWASP **WSTG**（测试指南）逐类别展开具体步骤，及 PortSwigger 训练场做技术练习。
- 它不是"漏洞全集"，而是"风险排序"，实际漏洞形态（如某类注入/某类逻辑洞）需深入具体技术栈。

## 要点小结

- A01 访问控制失效连续多届居首，越权（IDOR）是最常见也最常被忽略的一类。
- 安全测试前先做 Web-Enumeration-and-Fingerprinting，确定技术栈再对照对应攻击面。
- 每个类别的"原理-复现-修复"应沉淀为独立原子卡片，本篇仅作地图入口。

## 关联

- Web-Enumeration-and-Fingerprinting
- Exploitation-and-Initial-Access

## 来源

- OWASP Top 10: https://owasp.org/Top10/
- PortSwigger Web Security Academy: https://portswigger.net/web-security
