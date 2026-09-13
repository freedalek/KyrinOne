---
title: "交战规则与范围界定"
description: "测试开始前，以书面形式确定测试什么、不测什么、允许做什么、不许做什么以及边界条件——渗透测试合法合规的第一道闸门。"
pubDate: 2026-09-07
tags: ["渗透测试", "交战规则", "范围界定", "法律", "方法论"]
lang: "zh"
langLink: "/en/notes/rules-of-engagement-and-scoping/"
---

## 核心要素

| 要素 | 内容 |
|------|------|
| **Authorization 授权** | 由目标组织有权签署的人出具的**书面授权书**（可含第三方供应商/云厂商条款） |
| **Scope 范围** | 明确 in-scope（可测）与 out-of-scope（禁测）的 IP/域名/系统/接口；**边界外系统严禁触碰** |
| **Time window 时间窗** | 允许测试的时间段；生产系统的攻防演练常避开业务高峰 |
| **Testing depth 测试深度** | 允许的强度：是否允许 DoS/破坏性操作、是否允许社工、是否允许写文件/装服务 |
| **Contact & communication 联络** | 紧急联络人、事件上报流程、定期进度沟通方式 |
| **Data handling 数据处置** | 测试中接触的真实数据如何保护、留存、销毁 |
| **Emergency stop 紧急中止** | 出现事故（业务中断、越界）时的熔断机制 |
| **Report format 交付要求** | 报告结构、评级口径、时限、复测范围 |

## 要点小结

- **未授权的"测试"在法律上就是攻击行为**（多国适用《计算机欺诈与滥用法》等），书面授权是不可缺的护身符。
- 范围越界即使"顺手发现漏洞"也应**停止并上报**，不得继续利用。
- 云/托管环境（AWS、Azure、第三方 SaaS）可能需要额外的供应商授权流程。
- 区分 RoE 与渗透测试**方法**：RoE 管"能做什么"，方法管"怎么做"。

## 关联

- 渗透测试概述（Penetration Testing Overview）
- 渗透测试方法论（PTES）
- 报告与修复（Reporting and Remediation）

## 来源

- PTES Pre-engagement 阶段说明: http://www.pentest-standard.org/index.php/Pre-engagement
- NIST SP 800-115（授权与规则建议）: https://csrc.nist.gov/publications/detail/sp/800-115/final
