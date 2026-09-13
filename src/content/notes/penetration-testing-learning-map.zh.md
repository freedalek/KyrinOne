---
title: "渗透测试 — 学习地图"
description: "渗透测试知识卡片的精选阅读路径：从定义与合法性，到侦察、利用、提权与报告。"
pubDate: 2026-09-07
tags: ["渗透测试", "学习路径", "攻防安全", "索引"]
lang: "zh"
langLink: "/en/notes/penetration-testing-learning-map/"
---

渗透测试知识库的入口地图。每张卡片都存放在「笔记」中；编号仅表示建议的阅读顺序，不代表层级。

## 1. 总览与方法论

| # | 卡片 | 说明 |
|---|------|--------|
| 1 | [渗透测试概述](/zh/notes/penetration-testing-overview/) | 定义、类型，与扫描和红队对抗的区别 |
| 2 | [渗透测试方法论（PTES）](/zh/notes/penetration-testing-methodology-ptes/) | 七阶段方法论骨架 |
| 3 | [交战规则与范围界定](/zh/notes/rules-of-engagement-and-scoping/) | 授权、范围、RoE——合法性的来源 |
| 4 | [报告与修复](/zh/notes/reporting-and-remediation/) | 报告结构与修复闭环 |

## 2. 侦察与枚举

| # | 卡片 | 说明 |
|---|------|--------|
| 5 | [情报收集总览](/zh/notes/intelligence-gathering-overview/) | 被动/主动情报收集总览 |
| 6 | [DNS 枚举](/zh/notes/dns-enumeration/) | DNS 记录与子域枚举 |
| 7 | [端口扫描与服务枚举](/zh/notes/port-scanning-and-service-enumeration/) | 端口状态与扫描技术（nmap 语义） |
| 8 | [Web 枚举与指纹识别](/zh/notes/web-enumeration-and-fingerprinting/) | 目录发现与技术栈指纹 |

## 3. 漏洞与利用

| # | 卡片 | 说明 |
|---|------|--------|
| 9 | [漏洞识别](/zh/notes/vulnerability-identification/) | CVE/CWE/CVSS 与漏洞识别流程 |
| 10 | [利用与初始访问](/zh/notes/exploitation-and-initial-access/) | 从漏洞到立足点 |
| 11 | [反弹与绑定 Shell](/zh/notes/reverse-and-bind-shells/) | 反弹/绑定 shell 通道 |
| 12 | [Payload 与 Metasploit 基础](/zh/notes/payloads-and-metasploit-basics/) | payload/stager 与 msf 基础 |
| 13 | [Web 应用攻击面](/zh/notes/web-application-attack-surface/) | OWASP Top 10:2025 攻击面清单 |

## 4. 口令、提权与横向

| # | 卡片 | 说明 |
|---|------|--------|
| 14 | [口令攻击与凭据窃取](/zh/notes/password-attacks-and-credential-stealing/) | 在线/离线口令攻击与凭据窃取 |
| 15 | [Linux 安全模型基础](/zh/notes/linux-security-model-basics/) | Linux 权限模型与提权面 |
| 16 | [Windows 安全模型基础](/zh/notes/windows-security-model-basics/) | Windows 令牌/凭据/服务模型 |
| 17 | [提权总览](/zh/notes/privilege-escalation-overview/) | 提权分类与通用向量 |
| 18 | [横向移动与跳板](/zh/notes/lateral-movement-and-pivoting/) | 横向移动与内网跳板 |
| 19 | [Active Directory 攻击入门](/zh/notes/active-directory-attack-primer/) | 域环境攻击原语入门 |
| 20 | [后渗透与持久化](/zh/notes/post-exploitation-and-persistence/) | 后渗透目标与持久化/清理 |

## 5. 工具索引

| # | 卡片 | 说明 |
|---|------|--------|
| 21 | [渗透测试工具总览](/zh/notes/pentest-tools-overview/) | 按阶段的代表工具与选型提示 |

## 学习路径

1. 先读 **1–4**：理解渗透测试**是什么、凭什么合法、交付什么**。
2. 再走 **5–8**：学会把目标「摸清楚」。
3. 然后 **9–13**：理解漏洞**如何被识别与利用**。
4. 之后 **14–20**：深入口令/提权/横向/AD/后渗透，把「单点漏洞」连成「攻击链」。
5. 工具卡 **21** 随时查阅。

## 关联

- [知识库](/zh/knowledge/) —— 全部笔记与其他内容
