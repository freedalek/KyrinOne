---
title: "提权概述"
description: "提权是什么：横向与纵向提权、其存在的原因，以及 Linux 与 Windows 上的常见路径。"
pubDate: 2026-09-07
tags: ["渗透测试", "提权", "攻防安全", "Linux", "Windows"]
lang: "zh"
langLink: "/en/notes/privilege-escalation-overview/"
---

## 横向与纵向

- **Horizontal 横向提权（权限不变，换目标）**：从一个普通用户切到另一个普通用户/服务账号，本质是借用他人的身份与凭据（常与横向移动重叠）。
- **Vertical 纵向提权（权限上升）**：普通用户 → 本地管理员 / root / SYSTEM；OS 或应用层缺陷或配置错误所致。

## 提权为何存在

- **补丁缺失**：已知本地提权 CVE（内核漏洞等）。
- **配置错误**：SUID/特权位（Linux）、服务权限、可写文件、计划任务、注册表、docker 组等。
- **凭据泄露**：文件/环境/历史命令中的 root/管理员口令。
- **应用逻辑**：可被滥用的特权组件（sudo、runas、服务账户）。

## 常见路径

**Linux**：SUID 二进制（参考 GTFOBins）、`sudo -l` 可执行项、cron/可写脚本、内核 exp、不安全的文件权限、capabilities、docker/lxd 组成员。

**Windows**：服务（未引号路径、可写服务二进制/服务权限）、注册表自动启动项、AlwaysInstallElevated、存储的凭据（`cmdkey`、凭据管理器）、令牌操作（SeImpersonate → potato 系列）、内核 exp（参考 LOLBAS / HackTricks）。

## 要点小结

- **先枚举再动手**：没有系统化枚举（用户/权限/服务/文件/历史/计划任务）就别急着跑 exp。
- 优先“低垂果实”：可写脚本、硬编码口令、错误配置——通常快于打内核 exp。
- 每个平台都有速查/工具（Linux 可用 `linpeas` 等枚举脚本），但**理解输出比跑脚本更重要**。
- 成功提权后及时记录证据并继续横向移动与内网渗透。

## 关联

- 反弹与绑定 Shell（Reverse and Bind Shells）
- 横向移动与内网渗透（Lateral Movement and Pivoting）
- Active Directory 攻击基础（Active Directory Attack Primer）

## 来源

- GTFOBins: https://gtfobins.github.io/
- LOLBAS Project: https://lolbas-project.github.io/
- HackTricks: https://book.hacktricks.xyz/
- MITRE ATT&CK TA0004: https://attack.mitre.org/tactics/TA0004/
