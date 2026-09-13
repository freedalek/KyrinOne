---
title: "DNS 枚举"
description: "通过解析目标域的 DNS 记录发现子域名、主机名、服务及其背后的资产，DNS 常是信息收集阶段信息量最大的单一来源。"
pubDate: 2026-09-07
tags: ["渗透测试", "侦察", "DNS", "枚举"]
lang: "zh"
langLink: "/en/notes/dns-enumeration/"
---

## 常见记录类型（RFC 1035 等）

| 类型 | 作用 | 渗透意义 |
|------|------|----------|
| A / AAAA | IPv4 / IPv6 地址 | 资产定位 |
| CNAME | 别名 | 暴露内部主机名/第三方服务（如云存储） |
| MX | 邮件服务器 | 邮件网关/内网命名 |
| NS | 权威域名服务器 | 潜在管理入口 |
| TXT | 任意文本 | 常泄露 SPF/DKIM、验证字符串甚至密钥 |
| SOA | 区域权威信息 | 管理员邮箱、序列号 |
| SRV (RFC 2782) | 服务定位 | 发现 AD/内部服务记录 |

## 枚举手法

1. **子域枚举（爆破）**：用字典 + 公开子域数据（crt.sh 证书透明、dnsdumpster、暴力枚举工具）收集 `*.target.com`。
2. **域传送 (Zone Transfer, AXFR)**：若 NS 服务器配置错误（`allow-transfer` 开放），可直接拉取整个区域——非常少见但高价值。
3. **反向解析 / 相邻网段**：从已知 IP 反查域名，画出目标 IP 资产面。
4. **通配符记录注意**：需区分真实子域与 `*.` 通配结果。

## 常用工具

`dig`、`host`、`nslookup`（基础）；`amass`、`subfinder`、`massdns`（大规模）；`dnsrecon`（含域传送检测）。

## 要点小结

- 先找**根域名 + NS 归属**，再枚举子域，再对高价值子域（VPN、邮件、AD、dev、git）深入。
- 域传送、TXT 中的内部命名常是被忽略的高价值发现。
- 结果进入资产清单，供后续扫描与 Web 枚举使用（见 Web Enumeration and Fingerprinting（Web 枚举与指纹识别））。

## 关联

- 情报收集（侦察）概述（Intelligence Gathering Overview）
- Web 枚举与指纹识别（Web Enumeration and Fingerprinting）

## 来源

- RFC 1035（域名与 DNS 规范）: https://www.rfc-editor.org/rfc/rfc1035
- RFC 2782（SRV）: https://www.rfc-editor.org/rfc/rfc2782
- OWASP WSTG（子域与基础设施侦察）: https://owasp.org/www-project-web-security-testing-guide/
