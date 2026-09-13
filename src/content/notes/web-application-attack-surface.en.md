---
title: "Web Application Attack Surface (OWASP Top 10 2025)"
description: "Using the OWASP Top 10 as the baseline for mapping a web application's attack surface: the 2025 list of ten risk categories, how to use it for coverage checks, and where to start testing."
pubDate: 2026-09-07
tags: ["Web Security", "OWASP", "Attack Surface", "Penetration Testing"]
lang: "en"
langLink: "/zh/notes/web-application-attack-surface/"
---

## OWASP Top 10 — 2025 List

1. **A01 Broken Access Control**
2. **A02 Security Misconfiguration**
3. **A03 Software Supply Chain Failures**
4. **A04 Cryptographic Failures**
5. **A05 Injection**
6. **A06 Insecure Design**
7. **A07 Authentication Failures**
8. **A08 Software or Data Integrity Failures**
9. **A09 Security Logging and Alerting Failures**
10. **A10 Mishandling of Exceptional Conditions**

> Note: The 2025 edition is the current release and differs from the 2021 entries (e.g. the new A03 supply chain and A10 exception handling).

## How to Use It

- Use the list as a **coverage check**: each category should have corresponding test techniques and records.
- Combine it with the OWASP **WSTG** (testing guide) to expand concrete steps per category, and use PortSwigger labs for hands-on practice.
- It is not a "complete set of vulnerabilities" but a "risk ranking"; actual vulnerability forms (a specific injection or logic flaw) require going deep into the specific tech stack.

## Key Points

- A01 Broken Access Control has topped the list for several editions; broken authorization (IDOR) is the most common and most often overlooked class.
- Before security testing, first perform Web-Enumeration-and-Fingerprinting to determine the tech stack, then map it to the corresponding attack surface.
- Each category's "principle–reproduction–remediation" should be captured as its own atomic card; this article serves only as a map entry point.

## Related

- Web-Enumeration-and-Fingerprinting
- Exploitation-and-Initial-Access

## Sources

- OWASP Top 10: https://owasp.org/Top10/
- PortSwigger Web Security Academy: https://portswigger.net/web-security
