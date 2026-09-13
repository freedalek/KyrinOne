---
title: "OWASP Top 10:2025 — Web 应用安全风险"
description: "2025 年 OWASP Top 10 这份 Web 应用安全风险基线意识文档，及其相对 2021 版的变化与同 CWE Top 25 2025 的对应关系。"
pubDate: 2026-08-17
tags: ["攻防安全", "OWASP", "Web 安全", "风险管理", "CWE"]
lang: "zh"
langLink: "/en/notes/owasp-top10-2025/"
---

OWASP Top 10 是业界关于 Web 应用安全风险的基线意识文档，代表了对最关键风险的广泛共识。**2025** 版（当前版本）对 2021 版清单进行了重新排序，并替换了部分内容。

## 2025 清单

| 排名 | ID | 类别 | 涵盖内容 |
|-----:|---|----------|----------------|
| 1 | A01 | 访问控制失效（Broken Access Control） | IDOR、授权缺失/错误、权限提升 |
| 2 | A02 | 安全配置错误（Security Misconfiguration） | 默认配置、暴露的调试接口、宽松的 CORS/头、未修补配置 |
| 3 | A03 | 软件供应链失效（Software Supply Chain Failures） | 易受攻击/恶意依赖项、SBOM 缺口、构建流水线 |
| 4 | A04 | 密码学失效（Cryptographic Failures） | 弱/缺失 TLS、密钥管理不当、明文密钥 |
| 5 | A05 | 注入（Injection） | SQL/NoSQL/OS/LDAP/XPath 注入、XSS、SSTI |
| 6 | A06 | 不安全设计（Insecure Design） | 缺失威胁建模、设计模式缺陷 |
| 7 | A07 | 认证失效（Authentication Failures） | 弱认证、会话固定、凭据填充 |
| 8 | A08 | 软件或数据完整性失效（Software or Data Integrity Failures） | 反序列化、CI/CD 完整性、插件更新 |
| 9 | A09 | 安全日志与告警失效（Security Logging and Alerting Failures） | 审计/检测不足 |
| 10 | A10 | 异常条件处理不当（Mishandling of Exceptional Conditions） | 未捕获异常、错误泄露、资源耗尽 |

## 相对 2021 版的变化

2021 版清单为：A01 访问控制失效、A02 密码学失效、A03 注入、A04 不安全设计、A05 安全配置错误、A06 易受攻击和过时的组件、A07 身份识别与认证失效、A08 软件和数据完整性失效、A09 安全日志与监控失效、A10 SSRF。

2025 版的关键变化：
- **A02 安全配置错误** 与 **A03 软件供应链失效** 排名大幅上升。
- **「易受攻击和过时的组件」** 与 **SSRF** 不再作为独立的 Top 10 条目出现（被并入供应链/更宽泛的类别）。
- **A10 异常条件处理不当** 是新条目（错误处理、异常泄露、资源限制）——呼应了 CWE Top 25 对 CWE-770 资源耗尽与 CWE-200 信息暴露的关注。

## 与 CWE Top 25 2025 的对应

两份清单相互印证，合起来阅读即界定了现代 Web 攻击面：

- **A01 访问控制失效** ↔ CWE-862 授权缺失（#4）、CWE-863（#17）、CWE-639 IDOR（#24）、CWE-284（#19）、CWE-306 认证缺失（#21）。
- **A05 注入** ↔ CWE-79 XSS（#1）、CWE-89 SQLi（#2）、CWE-78 OS 命令注入（#9）、CWE-94 代码注入（#10）。
- **A04 密码学 / A08 完整性** ↔ CWE-502 反序列化（#15）。
- **A10 异常条件** ↔ CWE-770 资源耗尽（#25）、CWE-200 信息暴露（#20）。

一以贯之的主题是：**访问控制（而非注入）是 Web 的头号风险**，而内存安全/注入类问题在原生代码中仍占主导。

## 方法论说明

Top 10 是数据驱动的：2025 版收集了漏洞数据集（2021–2024），计算的是*发生率*（包含 ≥1 个某 CWE 实例的应用占比），而非原始发现数量；对排名靠前的 CWE 应用 CWSS 评分，并对两个类别采用社区调查。详见「Making of OWASP Top 10」数据分析计划。

## 来源

- OWASP Top 10:2025：https://owasp.org/Top10/2025/
