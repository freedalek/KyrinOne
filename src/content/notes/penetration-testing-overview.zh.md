---
title: "渗透测试概述"
description: "渗透测试是什么：授权与范围、类型（白盒/灰盒/黑盒）、与漏洞扫描和红队对抗的区别，以及使其合法化的交战规则。"
pubDate: 2026-09-07
tags: ["渗透测试", "攻防安全", "基础", "红队"]
lang: "zh"
langLink: "/en/notes/penetration-testing-overview/"
---

## 定义

渗透测试是在合同与法律框架内模拟网络攻击，目的是赶在真实攻击者之前发现并证明弱点。交付物不仅是漏洞清单，还包括**影响证明**与**修复建议**。

## 类型

| 维度       | 类型                                      | 说明                                     |
| ---------- | ----------------------------------------- | ---------------------------------------- |
| 信息透明度 | White-box 白盒                            | 测试者获得源码/架构/凭据等完整信息       |
|            | Grey-box 灰盒                             | 只给部分信息（如普通用户权限、部分凭据） |
|            | Black-box 黑盒                            | 只给目标范围，模拟外部攻击者             |
| 视角       | External 外部                             | 从互联网对边界资产测试                   |
|            | Internal 内部                             | 模拟已进入内网 / 内部威胁                |
| 范围侧重   | Network / Web / Mobile / Wireless / Cloud | 按被测对象划分                           |

## 与相邻概念的区分

- **Vulnerability scanning（漏洞扫描）**：用自动化工具找已知漏洞，通常不停留在利用阶段。
- **Penetration test（渗透测试）**：在扫描/人工分析基础上**验证可利用性**并评估实际影响。
- **Red team（红队对抗）**：以目标（objectives，如「拿到核心域控」）为导向的长期、高对抗演练，通常多阶段、带规避，不等于一次性的渗透测试。

## 要点小结

- 一切测试以**书面授权与范围（Rules of Engagement）**为前提；未授权即非法。
- 渗透测试遵循**方法论与阶段流程**，而非随机打点。
- 输出包含报告，须按严重度分级并给出可复现证据与修复建议。

## 关联

- 渗透测试方法论（PTES）
- 交战规则与范围界定（Rules of Engagement and Scoping）
- 报告与修复（Reporting and Remediation）

## 来源

- PTES — The Penetration Testing Execution Standard: http://www.pentest-standard.org/
- OWASP Web Security Testing Guide (WSTG): https://owasp.org/www-project-web-security-testing-guide/
- NIST SP 800-115 (Technical Guide to Information Security Testing and Assessment)
