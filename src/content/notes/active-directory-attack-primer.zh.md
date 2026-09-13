---
title: "Active Directory 攻击基础"
description: "域环境（AD）是企业内网渗透的核心战场：对象、信任与认证协议（Kerberos/NTLM）构成了绝大多数横向与提权攻击的原材料。"
pubDate: 2026-09-07
tags: ["渗透测试", "Active Directory", "Kerberos", "NTLM", "Windows"]
lang: "zh"
langLink: "/en/notes/active-directory-attack-primer/"
---

## AD 是什么

- **Active Directory**：微软的目录服务，集中管理域内**用户、计算机、组、策略（GPO）**等对象。
- **DC（域控制器）**：保存 NTDS.dit（含口令散列）与 Kerberos 服务的中心主机。
- 关键对象：`user`、`computer`、`group`（含嵌套）、`OU`；ACL 决定谁能操作谁。

## 认证协议速览

| 协议 | 机制 | 渗透相关要点 |
|------|------|--------------|
| **Kerberos** | 基于票据（TGT/TGS）的对称认证，默认域内协议 | 票据可被离线破解/伪造/重放 → Kerberoasting、AS-REP Roasting、Golden/Silver Ticket、委派攻击 |
| **NTLM** | 挑战-响应（散列参与计算） | Pass-the-Hash、中继（relay）、破解 NTLMv2 |

## 经典攻击原语（概览，细节在高级卡片）

- **枚举**：无需权限即可用匿名/LDAP 查询大量 AD 信息（工具：bloodhound、ldapsearch、PowerView）。
- **Kerberoasting**：请求高权限服务账号的 TGS 票据后离线破解。
- **AS-REP Roasting**：对未启用预认证的账户直接获取可离线破解的 AS-REP。
- **Pass-the-Hash / Ticket**：直接使用散列/票据通过认证。
- **ACL/委派滥用**：利用对象上的错误配置权限（WriteDACL、GenericAll 等）。
- **组策略 / 计划任务 / SYSVOL**：组策略首选项等历史明文口令存放点。

## 要点小结

- 域渗透遵循“**枚举 → 找路径 → 提权/横向 → 达域控**”的路线；BloodHound 把可达关系可视化成图。
- 认证协议本身“设计正确”，攻击多来自**配置与凭据管理缺陷**。
- 相关细节分散在多张卡片：横向移动与内网渗透、提权概述。

## 关联

- 横向移动与内网渗透（Lateral Movement and Pivoting）
- 口令攻击与凭据窃取（Password Attacks and Credential Stealing）

## 来源

- MITRE ATT&CK Enterprise 矩阵: https://attack.mitre.org/matrices/enterprise/
- The Hacker Recipes: https://www.thehacker.recipes/
- HackTricks: https://book.hacktricks.xyz/
- Microsoft AD 文档: https://learn.microsoft.com/en-us/windows-server/identity/
