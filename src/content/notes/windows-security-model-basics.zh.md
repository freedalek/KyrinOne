---
title: "Windows 安全模型基础"
description: "Windows 权限围绕令牌(Token)/ACL/服务/注册表组织；本地凭据与特权都集中在系统级机制（SAM、LSASS、UAC）中。"
pubDate: 2026-09-07
tags: ["Windows", "提权", "安全模型", "渗透测试"]
lang: "zh"
langLink: "/en/notes/windows-security-model-basics/"
---

## 账号与凭据存储

- **SAM**：本地账号口令散列（`%SystemRoot%\system32\config\SAM`）。
- **LSASS**：登录会话进程，缓存已登录用户的凭据（明文/NTLM/Kerberos 票据）——mimikatz 等攻击目标。
- **域环境**：DC 的 NTDS.dit 存全部域用户散列 → 见 Active-Directory-Attack-Primer。
- 内置账号：`Administrator`、`SYSTEM`（最高本地权限）、服务账号。

## 令牌与特权

- **访问令牌**：登录时生成，含 SID、组成员与**特权**（如 `SeImpersonatePrivilege`、`SeBackupPrivilege`）。
- 令牌可被窃取/伪造（token impersonation）；`SeImpersonate` 常被 potato 系列提权利用。
- UAC 提供两层：标准用户与提升管理员，交互进程通常降权。

## 服务与注册表

- **服务 (services)**：以某账号运行。可写服务二进制、可改 ImagePath、未引号服务路径 → SYSTEM 执行（经典提权）。
- **注册表**：`Run/RunOnce`、`HKLM\SYSTEM\CurrentControlSet\Services` 是持久化与提权常见落点。
- **计划任务**：以高权限运行的脚本若可写，即可被劫持。

## 要点小结

- Windows 提权枚举主线：**whoami /priv → 服务与计划任务可写点 → 注册表自动启动 → 令牌特权 → 已知 exp**。
- 免杀与绕过可参考 LOLBAS 的"Living Off the Land"二进制。
- 工具速查：`whoami /all`、`sc qc`、`accesschk`、`winpeas`、mimikatz——但必须理解输出含义。
- 域内主机最终目标是打域控/抓 NTDS.dit，本地 SYSTEM 只是中继站。

## 关联

- Privilege-Escalation-Overview
- Active-Directory-Attack-Primer
- Lateral-Movement-and-Pivoting

## 来源

- Microsoft Learn（Windows 安全）: https://learn.microsoft.com/en-us/windows/security/
- HackTricks: https://book.hacktricks.xyz/
- LOLBAS: https://lolbas-project.github.io/
