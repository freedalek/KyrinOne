---
title: "OWASP WSTG — Web 安全测试指南"
description: "Web 应用安全测试的首要方法论与权威操作清单，包括场景标识符格式、测试类别，以及它如何映射到 ATT&CK 链路。"
pubDate: 2026-08-17
tags: ["攻防安全", "OWASP", "Web 安全", "渗透测试", "方法论"]
lang: "zh"
langLink: "/en/notes/wstg/"
---

**Web 安全测试指南（Web Security Testing Guide，WSTG）** 是测试 Web 应用安全的首要方法论——全球渗透测试者使用的权威*操作*清单。它与 ASVS（「验证什么」）和 Top 10（「什么最重要」）互为补充。稳定版本为 **4.2**（2020 年 12 月）；**5.0** 版正在开发中。

## 场景标识符格式

每个测试都有一个标识符 `WSTG-<category>-<number>`，其中 category 是 4 个字符的大写代码，number 是补零的 01–99。带版本的形式为 `WSTG-v<version>-<category>-<number>`（版本标记去除标点），例如 `WSTG-v41-INFO-02`。报告中**务必固定版本引用**，因为标识符会在版本之间变化。

## 测试类别（WSTG 4.x）

指南将测试归入以下类别（4 字符代码）：

| 代码 | 类别 | 代表性测试 |
|------|----------|---------------------|
| INFO | 信息收集（Information Gathering） | Web 服务器指纹识别、审查 Web 应用元文件、枚举服务器上的应用、识别入口点 |
| CONF | 配置与部署管理（Configuration & Deployment Mgmt） | 测试网络基础设施配置、应用平台配置、文件扩展名/旧备份处理、HTTP 方法 |
| IDNT | 身份管理（Identity Management） | 角色定义、用户注册、账户开通、用户名枚举 |
| AUTHN | 认证（Authentication） | 默认/可猜测凭据、锁定机制薄弱、绕过认证模式、记住密码暴力破解、弱密码修改 |
| AUTHZ | 授权（Authorization） | 目录遍历/文件包含、绕过授权模式、IDOR、权限提升 |
| SESS | 会话管理（Session Management） | 会话固定、Cookie 属性、注销、CSRF、URL 中的令牌 |
| INPV | 输入验证（Input Validation） | XSS、SQLi、LDAP/ORM/XML/SSI/XPath 注入、代码注入、命令注入、格式化字符串、SSTI |
| ERR | 错误处理（Error Handling） | 堆栈跟踪、错误码、异常泄露 |
| CRYPST | 密码学（Cryptography） | 弱 SSL/TLS、填充预言、弱信道 |
| BUSLOGIC | 业务逻辑（Business Logic） | 数据验证、完整性、工作流滥用、限制滥用 |
| CLIENT | 客户端（Client-Side） | DOM XSS、JavaScript 执行、HTML 注入、CSS 注入、WebSocket、点击劫持 |

> 类别代码与确切的测试编号因版本而异；权威列表位于 WSTG 仓库（`wstg/document`）。

## WSTG 如何融入攻击工作流

WSTG 被组织为可端到端执行的*方法论*，但能清晰地映射到 ATT&CK 链路：

- **INFO** ≙ 侦察 / 发现（TA0043 / TA0007）。
- **AUTHN / AUTHZ / IDNT / SESS** ≙ 通过有效账户的初始访问（T1078）与凭据访问（TA0006）。
- **INPV / ERR / CRYPST** ≙ 通过利用面向公众的应用的初始访问（T1190）。
- **CLIENT** ≙ 通过用户执行（T1204）与钓鱼（T1566）的执行。
- **BUSLOGIC** ≙ 介于 OWASP A01 与 A10 之间的功能滥用。

## 配套资源

- **ASVS**——「验证什么」的对应物（见 ASVS）。
- **Cheat Sheet Series**——针对每项 WSTG 发现的防御性修复（见 Cheat Sheet Series）。
- **PortSwigger Web Security Academy**——针对同类漏洞的动手实验（见 Web Attack Surface）。

## 来源

- OWASP Web Security Testing Guide：https://owasp.org/www-project-web-security-testing-guide/
