---
title: "Web Attack Surface — PortSwigger Web Security Academy Topic Map"
description: "The PortSwigger Web Security Academy's current enumeration of the web attack surface, grouped by family, with mappings to OWASP Top 10 and CWE."
pubDate: 2026-08-17
tags: ["Offensive Security", "Web Security", "PortSwigger", "Attack Surface", "CWE"]
lang: "en"
langLink: "/zh/notes/web-attack-surface/"
---

The Web Security Academy is the reference *hands-on* curriculum for web offensive security. Its topic
list is the most current enumeration of the web attack surface. Each topic has explanatory material
plus interactive labs.

## Complete Topic Map (as of 2026-08-17)

**Injection family**
SQL injection · NoSQL injection · OS command injection · Server-side template injection (SSTI) ·
XML external entity injection (XXE) · GraphQL API vulnerabilities · Prototype pollution.

**Client-side family**
Cross-site scripting (XSS) · DOM-based vulnerabilities · Clickjacking · WebSocket vulnerabilities.

**Broken access control & authn**
Access control · Authentication · OAuth authentication · JWT attacks · CSRF · Business logic
vulnerabilities.

**Request / transport manipulation**
Request smuggling · HTTP Host header attacks · Web cache poisoning · Web cache deception ·
Race conditions · CORS.

**Server-side reachability & data**
Server-side request forgery (SSRF) · Path traversal (directory traversal) · File upload
vulnerabilities · Insecure deserialization · Information disclosure.

**Modern / emerging**
API testing · Web LLM attacks (indirect prompt injection against AI scanners/apps) · Essential skills.

## Mapping to OWASP & CWE

| Academy topic | Primary OWASP Top 10 | Primary CWE |
|---------------|----------------------|-------------|
| SQL injection | A05 Injection | CWE-89 |
| XSS / DOM XSS | A05 Injection | CWE-79 |
| CSRF | A07 Authentication (context-dependent) | CWE-352 |
| Access control / IDOR | A01 Broken Access Control | CWE-639 / 862 |
| Path traversal | A01 | CWE-22 |
| OS command injection | A05 | CWE-78 |
| XXE | A05 | CWE-611 |
| SSRF | A05 | CWE-918 |
| Deserialization | A08 Integrity Failures | CWE-502 |
| File upload | A05 | CWE-434 |
| LLM attacks | (emerging, not yet a Top 10 slot) | CWE-1039 / prompt-injection family |

## Methodological Note

PortSwigger's topics are the *mechanism* layer. To reason like an attacker, pair each topic with:
1. its **CWE root cause** (what is wrong in the code),
2. its **CAPEC attack pattern** (the generic play),
3. its **ATT&CK technique** (the intrusion behavior), and
4. the **OWASP Cheat Sheet** (the fix).

The Academy's lab environment is the standard safe place to practice, and its content tracks current
research (e.g., the newer LLM and web-cache-deception topics) faster than any static standard can.

## Sources

- PortSwigger Web Security Academy: https://portswigger.net/web-security
