---
title: "攻击杀伤链 — 阶段模型"
description: "攻防安全的端到端链路推理模型：映射到 MITRE ATT&CK 战术的十二个阶段，每阶段都按前置条件、机制、遥测与检测来解读。"
pubDate: 2026-08-17
tags: ["攻防安全", "杀伤链", "MITRE ATT&CK", "威胁建模", "检测工程"]
lang: "zh"
langLink: "/en/notes/offensive-kill-chain/"
---

本文给出攻防安全的端到端*链路推理*模型。它是《企业战术》中逐战术细节所依附的心智骨架。每个阶段都回答同样四个问题：**前置条件、机制、遥测、检测**——外加攻击者想达成什么，以及防御者应留意什么。

## 链路

```
Reconnaissance ──► Enumeration ──► Initial Access ──► Privilege Escalation
     ▲                                                      │
     │                Command & Control ◄───────────────────┤
     │                       │                              │
     │                       ▼                              ▼
 Exfiltration ◄── Collection ◄── Lateral Movement ◄── Credential Access
                                                     (and Persistence
                                                      + Defense Evasion
                                                      run in parallel)
```

## 逐阶段详解

### 1. 侦察（Reconnaissance）（≙ ATT&CK TA0043）
- **目标**：从外部了解目标。
- **前置条件**：无（可访问互联网）。
- **机制**：被动（WHOIS、DNS、证书透明度、搜索引擎、代码仓库、OSINT）与主动（端口/服务/子域扫描）。
- **遥测**：外部——DNS/Web/边缘日志；受害者只能看到*主动*的那一部分。
- **检测**：扫描量启发式、非浏览器 UA 聚类、诱饵资产。

### 2. 枚举（Enumeration）（≙ TA0007 发现，但贯穿访问前后）
- **目标**：梳理用户、主机、服务、软件版本、漏洞。
- **机制**：服务横幅、版本探测、目录/API 枚举、凭据/字典检查。
- **遥测**：Web 访问日志、认证失败、服务日志。
- **检测**：404/目录爆破特征、限速认证失败、基线偏离。

### 3. 初始访问（Initial Access）（≙ TA0001）
- **目标**：首个立足点。
- **机制**：钓鱼（T1566）、利用面向公众的应用（T1190）、有效账户（T1078）、外部远程服务（T1133）、供应链（T1195）、路过式下载（T1189）。
- **遥测**：邮件网关、应用/Web 日志、VPN/认证日志、EDR 进程创建。
- **检测**：点击后的进程异常、漏洞利用→shell 的关联、异常登录。

### 4. 权限提升（Privilege Escalation）（≙ TA0004）
- **目标**：user → admin/SYSTEM/root/DA。
- **机制**：配置错误的提权（setuid、sudo、服务路径、UAC）、内核漏洞、令牌窃取/注入、容器逃逸。
- **遥测**：权限转换事件、令牌审计、服务配置变更。
- **检测**：完整性级别/uid 变化、模拟（impersonation）事件、异常的高权限子进程。

### 5. 持久化（Persistence）（≙ TA0003）
- **目标**：在重启/重新认证后存活。
- **机制**：自启动（Run 键、服务、cron/systemd、launchd）、计划任务、Web shell、账户创建、认证修改（SSP、PAM、密码过滤器）。
- **遥测**：注册表/服务/任务创建、自启动目录写入、新账户。
- **检测**：相对基线的自启动差异；新账户；Web shell 文件写入。

### 6. 凭据访问（Credential Access）（≙ TA0006）
- **目标**：收集哈希/令牌/票据/密码。
- **机制**：LSASS/SAM/NTDS 转储、DCSync、Kerberoasting/AS-REP、传递哈希/票据（PtH/PtT）、键盘记录、嗅探、云元数据 API。
- **遥测**：LSASS 访问、DC 复制、Kerberos 票据异常、认证失败突发。
- **检测**：LSASS 访问告警、Kerberoasting 特征、DCSync 检测、喷洒特征。

### 7. 防御规避（Defense Evasion）（≙ Stealth TA0005 + Defense Impairment TA0112）
- **目标**：避免/削弱检测。
- **机制**：混淆/加壳、LOLBins、无文件执行、伪装、清除日志、禁用 AV/EDR、修改防火墙/GPO。
- **遥测**：命令行内容、脚本块日志、服务停止/审计清除事件、遥测*静默*。
- **检测**：混淆熵值、LOLBin 异常、事件日志清除告警、EDR 静默。

### 8. 横向移动（Lateral Movement）（≙ TA0008）
- **目标**：跨主机横向扩展。
- **机制**：远程服务（RDP/SMB/SSH/WinRM）、PtH/PtT、远程服务漏洞利用、工具传输。
- **遥测**：跨主机登录、PtH 特征、SMB/WinRM 日志。
- **检测**：异常的 workstation↔workstation 管理员登录、无交互式会话的 NTLM、通过管理共享传输工具。

### 9. 收集（Collection）（≙ TA0009）
- **目标**：聚合目标数据。
- **机制**：文件/数据库/云读取、邮件转发规则、屏幕/键盘捕获、归档与暂存。
- **遥测**：批量文件访问、归档工具启动、云 `Get*` 调用量、邮箱规则。
- **检测**：批量读取异常、归档→外发的链路、邮箱规则创建。

### 10. 命令与控制（Command and Control）（≙ TA0011）
- **目标**：维持控制通道。
- **机制**：HTTP/DNS 信标、加密/隧道通道、DGA/快速通量、代理。
- **遥测**：DNS NXDOMAIN/DGA 模式、代理/Web 日志、netflow 周期性。
- **检测**：DGA 词法/熵分析、信标周期性、隧道异常。

### 11. 数据外发（Exfiltration）（≙ TA0010）
- **目标**：把数据带出。
- **机制**：经 C2 通道、云存储/Web 邮箱、替代协议（DNS/HTTP）、定时执行。
- **遥测**：出站流量异常、非浏览器上传、高熵 DNS。
- **检测**：出站基线偏离、异常协议的数据外发、收集→外发的关联。

### 12. 影响（Impact）（≙ TA0040）——通常是终止阶段
- **目标**：勒索/擦除/拒绝服务。
- **机制**：加密、删除卷影副本/备份、停止服务、篡改页面。
- **遥测**：大规模文件重命名/加密、`vssadmin delete shadows`、备份篡改。
- **检测**：加密突发告警 + 自动隔离剧本。

## 推理原则

1. **是链，不是单发。** 入侵很少是单一动作；要建模并狩猎*序列*。
2. **每一跳都有前置条件。** 问「攻击者必须已经具备什么？」以找出本可打断该链的控制。
3. **遥测是透镜。** 一项技术只有留下日志才对防御有意义——始终说出会记录它的数据组件（ATT&CK）。
4. **并行轨道。** Stealth、Defense Impairment、Persistence 与 Discovery 是*持续*运行于主链旁，而非离散步骤。

## 交叉引用

- 战术级细节与技术 ID：Enterprise Tactics。
- 每一跳背后的根因：CWE。
- 通用攻击打法：CAPEC。
- Web 特定的执行：OWASP 与 Web Attacks。

## 来源

- MITRE ATT&CK：https://attack.mitre.org/
