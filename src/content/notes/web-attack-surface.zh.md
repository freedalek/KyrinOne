---
title: "Web 攻击面 — PortSwigger Web Security Academy 主题图谱"
description: "PortSwigger Web Security Academy 对 Web 攻击面的最新枚举，按类别分组，并给出到 OWASP Top 10 与 CWE 的映射。"
pubDate: 2026-08-17
tags: ["攻防安全", "Web 安全", "PortSwigger", "攻击面", "CWE"]
lang: "zh"
langLink: "/en/notes/web-attack-surface/"
---

Web Security Academy 是 Web 攻防安全领域权威的*动手*课程。它的主题列表是对 Web 攻击面最新的枚举。每个主题都配有讲解材料与交互式实验。

## 完整主题图谱（截至 2026-08-17）

**注入家族**
SQL 注入 · NoSQL 注入 · OS 命令注入 · 服务端模板注入（SSTI）· XML 外部实体注入（XXE）· GraphQL API 漏洞 · 原型污染。

**客户端家族**
跨站脚本（XSS）· 基于 DOM 的漏洞 · 点击劫持 · WebSocket 漏洞。

**访问控制失效与认证**
访问控制 · 认证 · OAuth 认证 · JWT 攻击 · CSRF · 业务逻辑漏洞。

**请求 / 传输操纵**
请求走私（Request smuggling）· HTTP Host 头攻击 · Web 缓存投毒 · Web 缓存欺骗 · 竞态条件 · CORS。

**服务端可达性与数据**
服务端请求伪造（SSRF）· 路径遍历（目录遍历）· 文件上传漏洞 · 不安全反序列化 · 信息泄露。

**现代 / 新兴**
API 测试 · Web LLM 攻击（针对 AI 扫描器/应用的间接提示注入）· 必备技能。

## 与 OWASP 及 CWE 的映射

| Academy 主题 | 主要 OWASP Top 10 | 主要 CWE |
|---------------|----------------------|-------------|
| SQL 注入 | A05 注入 | CWE-89 |
| XSS / DOM XSS | A05 注入 | CWE-79 |
| CSRF | A07 认证（视上下文而定） | CWE-352 |
| 访问控制 / IDOR | A01 访问控制失效 | CWE-639 / 862 |
| 路径遍历 | A01 | CWE-22 |
| OS 命令注入 | A05 | CWE-78 |
| XXE | A05 | CWE-611 |
| SSRF | A05 | CWE-918 |
| 反序列化 | A08 完整性失效 | CWE-502 |
| 文件上传 | A05 | CWE-434 |
| LLM 攻击 | （新兴，尚未占据 Top 10 席位） | CWE-1039 / 提示注入家族 |

## 方法论说明

PortSwigger 的主题是*机制*层。要像攻击者一样思考，请将每个主题与以下内容配对：
1. 它的 **CWE 根因**（代码中错在哪里），
2. 它的 **CAPEC 攻击模式**（通用打法），
3. 它的 **ATT&CK 技术**（入侵行为），以及
4. 对应的 **OWASP 速查表**（修复方法）。

Academy 的实验环境是练习的标准安全场所，其内容追踪当前研究（例如较新的 LLM 与 Web 缓存欺骗主题）的速度快于任何静态标准。

## 来源

- PortSwigger Web Security Academy：https://portswigger.net/web-security
