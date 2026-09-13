---
title: "口令攻击与凭据窃取"
description: "口令是最常见的薄弱环节：在线与离线攻击的区别、字典/规则/喷洒等猜测模式，以及从内存、文件与数据库中直接获取已存储凭据的高效路径。"
pubDate: 2026-09-07
tags: ["口令攻击", "凭据窃取", "离线破解", "渗透测试"]
lang: "zh"
langLink: "/en/notes/password-attacks-and-credential-stealing/"
---

## 在线与离线

| | **在线 (Online)** | **离线 (Offline)** |
|---|---|---|
| 原理 | 直接向服务提交登录尝试 | 拿到口令散列后本地破解 |
| 工具 | Hydra、medusa、Burp Intruder | hashcat、John the Ripper |
| 瓶颈 | 目标服务的速率限制/锁定策略 | 本地 GPU/CPU 算力 |
| 风险 | 易触发锁定/告警 | 需先获得散列 |

## 口令猜测基本模式

- **Brute force 纯爆破**：穷举空间大，现实很少用。
- **Dictionary / wordlist 字典**：基于常见口令与泄露词库（rockyou 等）。
- **Rule / mangling 规则**：对字典做变形（加数字、大小写、年份）。
- **Password spraying 喷洒**：少量常见口令 × 大量账号，规避锁定（相对低速分散）。
- **默认口令**：厂商默认/弱口令清单针对具体设备。

## 凭据获取与窃取（更高效路径）

- 目标系统本地：`/etc/shadow`、SAM、浏览器保存的密码、配置文件硬编码密钥。
- Windows：内存中的口令散列/明文（LSASS，mimikatz 等）→ 后续 AD 卡片深入。
- Web 应用：数据库中的口令散列、`.env`、备份文件。
- 历史泄露（HaveIBeenPwned/rockyou）与同口令复用。

## 要点小结

- 散列类型决定破解速度（`$2y$` bcrypt 慢，MD5/NTLM 快）；先识别散列格式（`hashid`）。
- **喷洒优先于爆破**：现代企业普遍有锁定策略。
- 拿到凭据后关注**复用与提权**：同一口令可能打开多台机器/多个系统。

## 关联

- Exploitation-and-Initial-Access
- Active-Directory-Attack-Primer

## 来源

- hashcat wiki: https://hashcat.net/wiki/
- John the Ripper: https://www.openwall.com/john/
- HackTricks: https://book.hacktricks.xyz/
