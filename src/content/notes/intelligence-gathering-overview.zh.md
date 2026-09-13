---
title: "情报收集（侦察）概述"
description: "渗透测试的第一技术阶段：在动手利用前尽可能多地收集目标信息，为威胁建模与漏洞分析提供输入。"
pubDate: 2026-09-07
tags: ["渗透测试", "侦察", "OSINT", "情报收集"]
lang: "zh"
langLink: "/en/notes/intelligence-gathering-overview/"
---

## 被动与主动

| | **Passive 被动 (OSINT)** | **Active 主动** |
|---|---|---|
| 定义 | 不直接接触目标系统，仅从第三方公开渠道获取 | 直接与目标交互（发请求/探测） |
| 手段 | 搜索引擎、证书透明度、WHOIS、DNS、GitHub、招投标信息、网盘/文库 | 端口扫描、服务探测、目录枚举、DNS 主动查询、指纹识别 |
| 是否易被目标发现 | 基本不可见 | 会被日志/IDS 发现 |
| 法律风险 | 低（仍需注意数据合规） | 较高，必须在授权范围内 |

## 常见被动来源

- **搜索引擎（Google Dorking / 站内搜索）**
- **证书透明度日志**（crt.sh 等）— 可枚举子域名
- **DNS 被动枚举**（历史 DNS、dnsdumpster 等）
- **WHOIS / RDAP** — 注册人、联系人、网段归属
- **代码托管平台**（GitHub 泄露的密钥/内网域名）
- **社交平台 / 招聘信息 / 文档分享** — 泄露技术栈与内部命名
- **Shodan / Censys 等互联网测绘** — 资产暴露面

## 常见主动手段

- 存活探测（ICMP/TCP）
- 端口扫描与服务版本识别 → 见 Port Scanning and Service Enumeration（端口扫描与服务枚举）
- Web 目录/文件爆破、指纹识别
- DNS 域传送/子域爆破 → 见 DNS Enumeration（DNS 枚举）

## 要点小结

- 流程：**先被动、后主动**；先广（资产面）后深（单点细节）。
- 情报要**记录与整理**（资产清单、技术栈、入口猜测），作为后续阶段的输入。
- 每一步都以 RoE 授权为前提；主动探测只在授权网段内进行。

## 关联

- 渗透测试方法论（PTES）
- 端口扫描与服务枚举（Port Scanning and Service Enumeration）
- DNS 枚举（DNS Enumeration）

## 来源

- PTES Intelligence Gathering 阶段: http://www.pentest-standard.org/index.php/Intelligence_Gathering
- OWASP WSTG（侦察章节）: https://owasp.org/www-project-web-security-testing-guide/
