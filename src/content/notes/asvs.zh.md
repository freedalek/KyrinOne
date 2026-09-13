---
title: "OWASP ASVS — 应用安全验证标准"
description: "OWASP ASVS：它验证什么、需求标识符格式、章节结构与验证级别，以及它如何与 WSTG、CWE/CAPEC 和 Top 10 配合。"
pubDate: 2026-08-17
tags: ["攻防安全", "OWASP", "ASVS", "应用安全", "验证"]
lang: "zh"
langLink: "/en/notes/asvs/"
---

**ASVS** 规范化了*如何验证* Web 应用安全控制。WSTG 讲*如何测试*，ASVS 则讲*验证什么*，以编号需求清单的形式呈现。它是界定应用安全评估范围与严格程度的标准标尺。当前稳定版本为 **5.0.0**（2025 年 5 月发布）；此前的稳定版本为 4.0.3。

## 目的

ASVS 为以下方面提供基础：
1. **度量**——衡量对某应用应给予多少信任的标尺。
2. **指南**——开发者应构建哪些安全控制。
3. **采购**——在合同中规定验证需求。

## 需求标识符格式

每个需求形如 `chapter.section.requirement`，例如 `1.2.5`。带版本的引用为 `v<version>-<id>`，例如 `v5.0.0-1.2.5`（小写 `v`）。不带版本的 ID 默认指最新标准——因此报告中务必包含版本。

示例（v5.0.0）——需求 `1.2.5`：

> 验证应用能防护 OS 命令注入，且操作系统调用使用参数化的 OS 查询，或使用上下文相关的命令行输出编码。

## 章节（v5.0 结构）

ASVS 5.0 将需求组织为覆盖完整控制面的编号章节/小节，包括（代表性而非穷尽）：

1. **编码与净化（Encoding & Sanitization）**（XSS/注入防护）
2. **身份认证（Authentication）**——身份验证、会话、MFA
3. **访问控制（Access Control）**——授权、IDOR、最小权限
4. **输入的验证、净化与编码**
5. **密码学（Cryptography）**——密钥管理、TLS、存储
6. **错误处理与日志**
7. **数据保护 / 隐私**
8. **通信（Communications）**（传输安全）
9. **恶意代码 / 业务逻辑**
10. **配置（Configuration）**与部署
11. **Web 服务 / API 安全**
12. **供应链 / 依赖**（较新的侧重）
13. **AI/LLM 考量**（较新的侧重）

> 章节编号可能随版本变化；请查阅 GitHub 仓库中的 5.0.0 PDF/CSV 以获取权威章节列表。

## 验证级别

ASVS 定义逐级提高的严格程度（级别 1–3），每一级都增加需求：
- **级别 1**——机会主义威胁模型；自动化/工具辅助，低保证（入门级）。
- **级别 2**——适用于大多数处理敏感数据的应用的标准级别；人工 + 工具审查。
- **级别 3**——面向关键系统（金融、医疗）的高保证；形式化验证。

所选级别由应用风险与所需保证决定，且必须在报告中声明。

## 与领域其余部分的关系

- **ASVS ↔ WSTG**：ASVS 是「什么」，WSTG 是「如何」。用 WSTG 技术验证 ASVS 需求的渗透测试是业界标准搭配。
- **ASVS ↔ CWE/CAPEC**：每个需求针对特定的 CWE 根因，这些根因又映射到 CAPEC 攻击模式，并最终映射到 ATT&CK 技术。
- **ASVS ↔ Top 10**：ASVS 控制项的组织方式旨在挫败 OWASP Top 10 类别；许多组织把 ASVS 需求映射到 Top 10 条目以生成覆盖报告。

## 用户与采用

ASVS 被嵌入第三方保证计划（如 CREST OWASP Verification Standard 计划与 App Defense Alliance Web App Profile），并被咨询公司广泛用作渗透测试基线。

## 来源

- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
