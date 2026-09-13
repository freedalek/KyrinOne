---
title: "反弹 Shell 与绑定 Shell"
description: "获得代码执行后与攻击机建立双向交互的两种基本 shell 通道：反向（目标连回来）与正向绑定（目标开端口等你连）。"
pubDate: 2026-09-07
tags: ["反弹 Shell", "绑定 Shell", "Payload", "Netcat"]
lang: "zh"
langLink: "/en/notes/reverse-and-bind-shells/"
---

## Reverse Shell（反弹 / 反向）— 更常用

- **过程**：目标机器主动向攻击机监听的端口发起 TCP 连接。
- **优点**：目标出站方向通常受限较少；攻击机可在 NAT 后。
- **缺点**：需要攻击机有公网可达地址；出站防火墙仍可能拦截。

## Bind Shell（绑定 / 正向）

- **过程**：目标机器在某端口监听，攻击机主动去连。
- **优点**：不需要攻击机公网地址/监听。
- **缺点**：入站连接常被目标防火墙拦；需要猜测端口可用；NAT 场景难用。

## 常用工具

- `nc`（netcat）基本收发；`ncat`（Nmap 版，支持加密与更稳定连接）
- Metasploit `meterpreter` payload → 见 Payload 与 Metasploit 基础
- 多种语言 one-liner（bash/python/powershell）常用于 Windows/Linux 免文件执行
- 带加密的通道（如 `msfvenom` + TLS、SSH 隧道回连）用于规避检测

## 要点小结

- **Reverse + 监听是默认选择**；bind shell 只在网络拓扑需要时使用。
- 交互稳定性：优先加 `pty`/终端仿真（`script`、`python pty`、socat），获得完整 TTY 便于提权操作。
- 连接会被杀软/EDR 与网络监控关注；加密与混淆见后续卡片。
- 拿到 shell 后立即记录上下文：`id`、`whoami`、IP、权限 → 进入 权限提升概述。

## 关联

- 漏洞利用与初始访问
- Payload 与 Metasploit 基础
- 权限提升概述

## 来源

- PortSwigger Web Security Academy（shell 与利用基础）：https://portswigger.net/web-security
- HackTricks（shell 速查）：https://book.hacktricks.xyz/
