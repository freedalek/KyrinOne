---
title: "Web 枚举与指纹识别"
description: "对 Web 应用进行目录/文件发现与技术栈指纹识别，为后续 Web 漏洞测试定位具体的攻击面入口。"
pubDate: 2026-09-07
tags: ["Web 枚举", "指纹识别", "目录发现", "信息收集"]
lang: "zh"
langLink: "/en/notes/web-enumeration-and-fingerprinting/"
---

## 指纹识别

| 目标 | 手段 | 识别内容 |
|------|------|----------|
| HTTP 头 | `Server`, `X-Powered-By`, `Set-Cookie` 特征 | 中间件、语言、框架 |
| 页面/行为 | favicon hash、错误页、默认路径、响应差异 | CMS（WordPress/Drupal…）、框架（Laravel/Django…） |
| TLS 证书 | 证书 CN/SAN、签发机构 | 域名资产、真实主机名 |
| 静态资源 | 版本号路径、版权注释、源码地图 | 具体版本 → 关联已知 CVE |

## 目录与文件发现

- **字典爆破**（基于响应状态码区分 200/301/403/404）：常用 `SecLists/Discovery/Web-Content`。
- **区分真实 404 与自定义 404**，避免误判。
- 关注隐藏路径：`robots.txt`、`sitemap.xml`、`.git/`、`.env`、`backup`、`admin`、`api`、`swagger`。
- 技术栈匹配字典（PHP/JSP/ASP.NET/Go/Node）可显著提升命中率。

## 常用工具

`ffuf`、`gobuster`、`dirsearch`（目录爆破）；`whatweb`、`wappalyzer`（指纹）；`curl`、Burp Suite（手工与扩展）。

## 要点小结

- 指纹结果直接决定**攻击向量选择**（如 Java 反序列化 vs PHP 代码执行）。
- 目录爆破输出要按状态码、响应大小去重与清洗，聚焦真实可达路径。
- Web 应用攻击面清单（OWASP Top 10 分类）见 Web 应用攻击面。

## 关联

- DNS 枚举
- 端口扫描与服务枚举
- Web 应用攻击面

## 来源

- OWASP WSTG（信息收集 / 配置与部署管理测试章节）：https://owasp.org/www-project-web-security-testing-guide/
- PortSwigger Web Security Academy：https://portswigger.net/web-security
