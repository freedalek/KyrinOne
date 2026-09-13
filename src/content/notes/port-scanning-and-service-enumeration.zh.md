---
title: "端口扫描与服务枚举"
description: "端口扫描发现哪些端口开放，服务枚举确认端口后运行的服务与版本，二者结合得到可攻击面的服务清单。"
pubDate: 2026-09-07
tags: ["端口扫描", "服务枚举", "Nmap", "信息收集"]
lang: "zh"
langLink: "/en/notes/port-scanning-and-service-enumeration/"
---

## 端口状态（nmap）

- **open 开放**：有服务在监听，可进一步探测。
- **closed 关闭**：可到达但无服务。
- **filtered 被过滤**：被防火墙/ACL 丢弃，无法确定（默认 TCP SYN 未收到响应）。
- **unfiltered**（仅 ACK 扫描）：可到达但无法判断开关。
- **open|filtered / closed|filtered**：无法区分（常见于 UDP / FIN 类扫描）。

## TCP 扫描类型（nmap 语义）

| 选项 | 名称 | 原理要点 |
|------|------|----------|
| `-sS` | SYN scan（半开） | 发 SYN，收 SYN/ACK=open，收 RST=closed，无响应=filtered；默认且最常用（需特权） |
| `-sT` | TCP connect | 走完整三次握手（系统调用 connect）；无特权时默认回退 |
| `-sA` | ACK scan | 探测防火墙规则（unfiltered/filtered），不判断开关 |
| `-sN/-sF/-sX` | NULL/FIN/Xmas | 基于 RFC 793 行为差异；许多系统对 open 端口丢弃、closed 回 RST；不可靠且易误判 |
| `-sU` | UDP scan | 发 UDP 探测；ICMP port-unreachable=closed；无响应常为 open\|filtered，慢且不确定 |

## 服务识别

- `-sV`（version detection）：识别服务与应用版本 → 用于匹配已知漏洞（见 漏洞识别）。
- Banner grabbing：直接连端口读 banner（`nc`）。
- 默认脚本 `-sC` / NSE（`--script`）与 `-O`（OS 指纹）。
- 常用端口速查（IANA 注册）：22 SSH · 80/443 HTTP(S) · 21 FTP · 25 SMTP · 53 DNS · 139/445 SMB · 389/636 LDAP(S) · 1433 MSSQL · 3306 MySQL · 5432 PostgreSQL · 6379 Redis · 27017 MongoDB · 3389 RDP · 5985/5986 WinRM · 9100 打印。

## 要点小结

- 扫描优先级：先全端口/热门端口摸清面，再 `-sV` 深入“开着的服务”。
- **端口开放 ≠ 可被利用**：还要确认服务版本与认证方式。
- UDP 扫描慢、常误报，应聚焦 53/161/500/4500 等常见 UDP 服务。

## 关联

- 情报收集概述
- 漏洞识别
- Web 枚举与指纹识别

## 来源

- Nmap 官方文档（Reference Guide / 端口扫描技术章节）：https://nmap.org/book/toc.html
- RFC 793（TCP）：https://www.rfc-editor.org/rfc/rfc793 (TCP)
- IANA 服务名与端口分配表：https://www.iana.org/assignments/service-names-port-numbers/
