---
title: "OWASP 速查表系列 — 防御目录"
description: "一份聚焦防御、涵盖约 130 篇 OWASP 速查表的应用安全目录，并附有将其映射到 ASVS、MASVS、Proactive Controls 与 Top 10 的交叉索引。"
pubDate: 2026-08-17
tags: ["攻防安全", "OWASP", "应用安全", "防御", "速查表"]
lang: "zh"
langLink: "/en/notes/cheat-sheet-series/"
---

**速查表系列（Cheat Sheet Series）** 是一组简明、聚焦防御的指南，覆盖具体的应用安全主题。它是 OWASP 三位一体中*修复*的一环：Top 10 识别风险，WSTG 测试风险，而速查表告诉你如何防范风险。该系列还提供**交叉索引**，把速查表映射到 ASVS、MASVS、Proactive Controls 与 Top 10。它包含约 130 篇速查表，以 CC BY-SA 4.0 许可分发。

## 组织与索引

- **字母索引（Index Alphabetical）**（Glossary）——完整的字母顺序列表。
- **ASVS 索引**——把速查表映射到 ASVS 要求。
- **MASVS 索引**——映射到移动应用安全验证标准（Mobile Application Security Verification Standard）。
- **Proactive Controls 索引**——映射到 OWASP Top 10 Proactive Controls。
- **Top 10 索引**——映射到 OWASP Top 10 类别。

## 值得关注的速查表（按关注点分组）

**注入防御**
SQL 注入防范、LDAP 注入防范、OS 命令注入防御、注入防范（通用）、Java 注入防范、查询参数化、XSS 过滤器绕过、XML 外部实体防范、反序列化。

**访问控制与认证**
访问控制、授权、认证、多因素认证、密码存储、忘记密码、会话管理、凭据填充防范、安全问题的选择与使用、IDOR 防范。

**数据保护与密码学**
密码学存储、密钥管理、TLS、TLS 密码套件字符串、传输层保护、密钥管理（Secrets Management）、证书固定（Pinning）。

**基础设施与云**
Docker 安全、Kubernetes 安全、安全云架构、Serverless FaaS 安全、基础设施即代码安全、网络分段、CI/CD 安全、GitHub Actions 安全、微服务安全、零信任架构。

**AI / LLM（较新）**
LLM 提示注入防范、AI Agent 安全、RAG 安全、安全 AI 模型运维、借助 AI 的安全编码、MCP 安全。

**Web 基础**
跨站脚本防范、基于 DOM 的 XSS 防范、CSRF 防范、点击劫持防御、内容安全策略（CSP）、HTTP 头、HTTP 严格传输安全（HSTS）、WebSocket 安全、SSRF 防范、子域接管防范、文件上传、REST 安全、REST 评估、GraphQL、gRPC 安全、NoSQL 安全、原型污染防范、DOM Clobbering 防范、XS Leaks。

**SDLC / 流程**
威胁建模、安全代码审查、安全产品设计、软件供应链安全、攻击面分析、易受攻击依赖项管理、日志、错误处理、业务逻辑安全、事务授权。

## 攻防两端的用法

- **攻击视角**：阅读*防御*指南，就能确切了解一个加固良好的目标长什么样，以及它的缺口在哪里。例如，CSP 速查表列举了抗绕过的指令——渗透测试者正是针对这些具体控制来测试。
- **防御视角**：用 Top 10 / ASVS 索引，为报告中的每项发现找到精确的修复方法。
- **交叉核对**：每篇速查表都是紧凑的综合；当需要精确时，请对照主标准（WSTG/ASVS）与厂商文档进行核对。

## 来源

- OWASP Cheat Sheet Series：https://cheatsheetseries.owasp.org/
