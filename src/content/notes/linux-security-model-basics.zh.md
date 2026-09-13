---
title: "Linux 安全模型基础"
description: "理解用户/权限位/SUID/Sudo/能力(capabilities)/服务与任务调度，是 Linux 提权与加固的共同地基。"
pubDate: 2026-09-07
tags: ["Linux", "提权", "安全模型", "渗透测试"]
lang: "zh"
langLink: "/en/notes/linux-security-model-basics/"
---

## 用户与权限

- UID 0 = root；普通用户；系统账号。`/etc/passwd`（用户）、`/etc/shadow`（口令散列，root 可读）。
- 权限三组：owner / group / other，读写执行（r/w/x）；`setuid`(s/S) 使程序以**属主身份**运行。
- `sudo`：授权特定用户以特权执行命令——`sudo -l` 是提权枚举第一步。
- ACL（`setfacl`）在传统位之上提供更细粒度授权。

## Setuid / SUID

- 属 root 且带 setuid 的二进制以 root 执行。提权关注：能否利用（如可写、可利用参数、GTFOBins）。
- 参考 GTFOBins (https://gtfobins.github.io/) 判断某二进制是否可被滥用提权。

## Capabilities / Linux 能力

- 现代 Linux 将 root 的超级权限拆成**能力位**（如 `CAP_DAC_OVERRIDE`、`CAP_SETUID`）。
- 配置不当（setcap 给普通二进制敏感能力）会引入提权面。参考 `capabilities(7)`。

## 服务、计划任务与文件

- systemd 服务（`/etc/systemd/system`、`/lib/systemd/system`）：可写 unit 文件或可替换 ExecStart → root 执行。
- cron：用户可写的 cron 脚本/路径，若以特权运行即提权面。
- 可写敏感文件（`/etc/passwd`、`/etc/sudoers`、PATH 劫持）是低垂果实。

## 要点小结

- Linux 提权枚举主线：**uid/sudo -l → SUID/setcap → 可写文件与脚本 → cron/systemd → 内核版本→已知 exp**。
- 每个"可写且会被特权执行"的地方都是提权入口。
- 反方向即加固清单：最小权限、清理 SUID、限制 sudoers、只读关键路径。

## 关联

- Privilege-Escalation-Overview
- Reverse-and-Bind-Shells

## 来源

- Linux man-pages `capabilities(7)`: https://man7.org/linux/man-pages/man7/capabilities.7.html
- GNU coreutils manual: https://www.gnu.org/software/coreutils/manual/
- HackTricks: https://book.hacktricks.xyz/
