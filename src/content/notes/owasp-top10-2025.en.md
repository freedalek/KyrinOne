---
title: "OWASP Top 10:2025 — Web Application Security Risks"
description: "The 2025 OWASP Top 10 baseline awareness document for web application security risk, its changes from 2021, and its alignment with the CWE Top 25 2025."
pubDate: 2026-08-17
tags: ["Offensive Security", "OWASP", "Web Security", "Risk Management", "CWE"]
lang: "en"
langLink: "/zh/notes/owasp-top10-2025/"
---

The OWASP Top 10 is the industry's baseline awareness document for web application security risk,
representing broad consensus on the most critical risks. The **2025** release (current) reorders and
replaces parts of the 2021 list.

## The 2025 List

| Rank | ID | Category | What it covers |
|-----:|---|----------|----------------|
| 1 | A01 | Broken Access Control | IDOR, missing/incorrect authorization, privilege escalation |
| 2 | A02 | Security Misconfiguration | defaults, exposed debug, permissive CORS/headers, unpatched config |
| 3 | A03 | Software Supply Chain Failures | vulnerable/malicious dependencies, SBOM gaps, build pipeline |
| 4 | A04 | Cryptographic Failures | weak/absent TLS, bad key mgmt, plaintext secrets |
| 5 | A05 | Injection | SQL/NoSQL/OS/LDAP/XPath injection, XSS, SSTI |
| 6 | A06 | Insecure Design | missing threat modeling, flawed design patterns |
| 7 | A07 | Authentication Failures | weak authn, session fixation, credential stuffing |
| 8 | A08 | Software or Data Integrity Failures | deserialization, CI/CD integrity, plugin updates |
| 9 | A09 | Security Logging and Alerting Failures | insufficient audit/detection |
| 10 | A10 | Mishandling of Exceptional Conditions | uncaught exceptions, error leakage, resource exhaustion |

## What Changed vs. 2021

The 2021 list was: A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection,
A04 Insecure Design, A05 Security Misconfiguration, A06 Vulnerable and Outdated Components,
A07 Identification and Authentication Failures, A08 Software and Data Integrity Failures,
A09 Security Logging and Monitoring Failures, A10 SSRF.

Key 2025 changes:
- **A02 Security Misconfiguration** and **A03 Software Supply Chain Failures** rise sharply.
- **"Vulnerable and Outdated Components"** and **SSRF** no longer appear as standalone Top-10 entries
  (subsumed into supply chain / broader categories).
- **A10 Mishandling of Exceptional Conditions** is a new entry (error handling, exception leakage,
  resource limits) — mirroring the CWE Top 25's attention to CWE-770 resource exhaustion and
  CWE-200 information exposure.

## Alignment with CWE Top 25 2025

The two lists reinforce each other and, read together, define the modern offensive web surface:

- **A01 Broken Access Control** ↔ CWE-862 Missing Authz (#4), CWE-863 (#17), CWE-639 IDOR (#24),
  CWE-284 (#19), CWE-306 Missing Authn (#21).
- **A05 Injection** ↔ CWE-79 XSS (#1), CWE-89 SQLi (#2), CWE-78 OS cmd injection (#9), CWE-94 code
  injection (#10).
- **A04 Cryptographic / A08 Integrity** ↔ CWE-502 deserialization (#15).
- **A10 Exceptional Conditions** ↔ CWE-770 resource exhaustion (#25), CWE-200 info exposure (#20).

The consistent theme: **access control (not injection) is the #1 web risk**, and memory-safety /
injection classes remain dominant for native code.

## Methodology Note

The Top 10 is data-driven: the 2025 edition collected vulnerability datasets (2021–2024) and computed
*incidence rate* (fraction of applications containing ≥1 instance of a CWE), not raw finding counts,
with CWSS scoring applied to top CWEs and a community survey for two categories. See the "Making of
OWASP Top 10" data analysis plan for details.

## Sources

- OWASP Top 10:2025: https://owasp.org/Top10/2025/
