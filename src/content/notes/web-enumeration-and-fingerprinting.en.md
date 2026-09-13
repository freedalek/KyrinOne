---
title: "Web Enumeration and Fingerprinting"
description: "Directory and file discovery plus technology-stack fingerprinting of a web application, to locate the concrete attack-surface entry points for later web vulnerability testing."
pubDate: 2026-09-07
tags: ["Web Enumeration", "Fingerprinting", "Content Discovery", "Reconnaissance"]
lang: "en"
langLink: "/zh/notes/web-enumeration-and-fingerprinting/"
---

## Fingerprinting

| Goal | Method | What it identifies |
|------|--------|--------------------|
| HTTP headers | `Server`, `X-Powered-By`, `Set-Cookie` signatures | Middleware, language, framework |
| Pages/behavior | favicon hash, error pages, default paths, response differences | CMS (WordPress/Drupal…), framework (Laravel/Django…) |
| TLS certificate | Certificate CN/SAN, issuer | Domain assets, real hostnames |
| Static assets | Versioned paths, copyright comments, source maps | Specific version → linked known CVEs |

## Content Discovery

- **Dictionary brute-forcing** (distinguish by response status code 200/301/403/404): commonly `SecLists/Discovery/Web-Content`.
- **Distinguish a real 404 from a custom 404** to avoid false positives.
- Watch for hidden paths: `robots.txt`, `sitemap.xml`, `.git/`, `.env`, `backup`, `admin`, `api`, `swagger`.
- Stack-matched wordlists (PHP/JSP/ASP.NET/Go/Node) can significantly raise hit rates.

## Common Tools

`ffuf`, `gobuster`, `dirsearch` (directory brute-forcing); `whatweb`, `wappalyzer` (fingerprinting); `curl`, Burp Suite (manual and extensions).

## Key Points

- Fingerprint results directly determine **attack vector selection** (e.g. Java deserialization vs PHP code execution).
- Directory brute-force output must be deduplicated and cleaned by status code and response size, focusing on genuinely reachable paths.
- For the web application attack-surface inventory (OWASP Top 10 categories), see Web Application Attack Surface.

## Related

- DNS Enumeration
- Port Scanning and Service Enumeration
- Web Application Attack Surface

## Sources

- OWASP WSTG (information gathering / configuration and deployment management testing chapters): https://owasp.org/www-project-web-security-testing-guide/
- PortSwigger Web Security Academy: https://portswigger.net/web-security
