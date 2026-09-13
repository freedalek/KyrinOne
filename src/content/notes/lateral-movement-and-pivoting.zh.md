---
title: "横向移动与内网渗透"
description: "攻击者如何借助已控主机与复用凭据在内网横向移动，以及如何通过跳板访问原本不可达的内网段。"
pubDate: 2026-09-07
tags: ["渗透测试", "横向移动", "内网渗透", "Active Directory", "攻防安全"]
lang: "zh"
langLink: "/en/notes/lateral-movement-and-pivoting/"
---

## 概念

- **Lateral movement 横向移动**：在同一网络/域内，从已控主机移动到其他主机（TA0008）。
- **Pivoting 跳板/枢轴**：把已控主机当作“中转点”，使攻击机能够访问其背后不可直达的内网段。

## 常用横向手段（Windows 生态为主）

- **Pass-the-Hash / Pass-the-Ticket**：直接复用 NTLM 散列或 Kerberos 票据，无需明文口令。
- **远程管理协议滥用**：SMB（PsExec 类）、WMI、WinRM、RDP、DCOM。
- **AD 攻击原语**：Kerberoasting、AS-REP Roasting、ACL 滥用、委派攻击等 → 参见 Active Directory 攻击基础。
- **凭据复用**：同一本地管理员口令/服务口令打通多台（密码喷洒的横向版本）。

## 代理与隧道

- **SOCKS 代理 / 端口转发**：在已控主机上起代理（如 Metasploit `route`、`socks_proxy`、Chisel、frp、ssh 动态转发），攻击机通过代理访问内网。
- **注意流量路径**：隧道流量可能被内网纵深设备发现，谨慎控制探测节奏。

## 要点小结

- **横向移动 = 凭据 + 可达性**：先收集能用的凭据/票据（见口令攻击与凭据窃取），再决定移动协议。
- 保持会话/凭据的**审计记录**，报告需要完整攻击链（初始→横向→目标）。
- 进入域环境后，AD 枚举与提权往往接踵而至。

## 关联

- 提权概述（Privilege Escalation Overview）
- Active Directory 攻击基础（Active Directory Attack Primer）
- 口令攻击与凭据窃取（Password Attacks and Credential Stealing）

## 来源

- MITRE ATT&CK TA0008: https://attack.mitre.org/tactics/TA0008/
- HackTricks: https://book.hacktricks.xyz/
- The Hacker Recipes: https://www.thehacker.recipes/
