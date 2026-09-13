---
title: "Payload 与 Metasploit 基础"
description: "理解 payload（在目标上执行的东西）与 stager 结构，以及 Metasploit 框架（msfconsole/msfvenom）的组织方式，是高效利用的基础。"
pubDate: 2026-09-07
tags: ["Payload", "Metasploit", "工具", "漏洞利用"]
lang: "zh"
langLink: "/en/notes/payloads-and-metasploit-basics/"
---

## Payload 概念

- **Payload**：漏洞利用后注入/执行的一段代码（反弹 shell、meterpreter、执行命令等）。
- **Staged / Stageless**：
  - *Stageless（单一）*：一个文件/数据包携带完整功能，稳定但体积大。
  - *Staged（分阶段）*：先传很小的 **stage0** 建立连接，再从攻击机拉取真正的 **stage**；体积小、隐蔽性偏好，但依赖网络。
- **Encoder**：对 payload 做变形以绕过基于特征的检测；现代 AV/EDR 主要靠行为检测，单纯编码已不再万能。

## msfvenom 常见形态

| 形态 | 用途 |
|------|------|
| `-p windows/x64/meterpreter/reverse_tcp` | 反连 meterpreter（分阶段） |
| `-p linux/x64/shell_reverse_tcp` | Linux 无分阶段反弹 shell |
| `-f exe / -f elf / -f raw / -f c` | 输出格式（按投放方式选） |
| `-e x86/shikata_ga_nai` | 编码示例（注意现代规避效果有限） |

## msfconsole 基本会话管理

- `use exploit/...` → `set RHOSTS/LHOST/LPORT` → `run`/`exploit`
- 成功得到 `meterpreter`/`shell` 会话；`sessions -l` 列出，`sessions -i N` 切换
- 会话内 `sysinfo`、`getuid`、`getsystem`（提权尝试）等

## 要点小结

- **LHOST/LPORT 要与监听一致**，尤其反弹型；注意攻击机多网卡时选对外地址。
- 分阶段 payload 依赖稳定的出站；多次换网络时优先考虑 stageless 或加隧道。
- 反连入口见 Reverse-and-Bind-Shells；拿到权限后的动作见 Privilege-Escalation-Overview。

## 关联

- Reverse-and-Bind-Shells
- Exploitation-and-Initial-Access

## 来源

- Metasploit 官方文档: https://docs.metasploit.com/
- OffSec Metasploit Unleashed: https://www.offsec.com/metasploit-unleashed/
