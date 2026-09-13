---
title: "Penetration Testing — Learning Map"
description: "A curated reading path through the penetration-testing knowledge cards: from definitions and legality to reconnaissance, exploitation, privilege escalation and reporting."
pubDate: 2026-09-07
tags: ["Penetration Testing", "Learning Path", "Offensive Security", "Index"]
lang: "en"
langLink: "/zh/notes/penetration-testing-learning-map/"
---

An entry map for the penetration-testing knowledge base. Each card lives under Notes; the numbering is a suggested reading order, not a hierarchy.

## 1. Overview & Methodology

| # | Card | Summary |
|---|------|-----------|
| 1 | [Penetration Testing Overview](/en/notes/penetration-testing-overview/) | definition, types, vs. scanning and red team |
| 2 | [Penetration Testing Methodology (PTES)](/en/notes/penetration-testing-methodology-ptes/) | the seven-phase methodology skeleton |
| 3 | [Rules of Engagement and Scoping](/en/notes/rules-of-engagement-and-scoping/) | authorization, scope, RoE — the source of legality |
| 4 | [Reporting and Remediation](/en/notes/reporting-and-remediation/) | report structure and the remediation loop |

## 2. Reconnaissance & Enumeration

| # | Card | Summary |
|---|------|-----------|
| 5 | [Intelligence Gathering Overview](/en/notes/intelligence-gathering-overview/) | passive/active collection overview |
| 6 | [DNS Enumeration](/en/notes/dns-enumeration/) | DNS records and subdomain enumeration |
| 7 | [Port Scanning and Service Enumeration](/en/notes/port-scanning-and-service-enumeration/) | port states and scanning techniques (nmap semantics) |
| 8 | [Web Enumeration and Fingerprinting](/en/notes/web-enumeration-and-fingerprinting/) | directory discovery and tech-stack fingerprinting |

## 3. Vulnerabilities & Exploitation

| # | Card | Summary |
|---|------|-----------|
| 9 | [Vulnerability Identification](/en/notes/vulnerability-identification/) | CVE/CWE/CVSS and the identification workflow |
| 10 | [Exploitation and Initial Access](/en/notes/exploitation-and-initial-access/) | from vulnerability to foothold |
| 11 | [Reverse and Bind Shells](/en/notes/reverse-and-bind-shells/) | reverse/bind shell channels |
| 12 | [Payloads and Metasploit Basics](/en/notes/payloads-and-metasploit-basics/) | payload/stager and msf basics |
| 13 | [Web Application Attack Surface](/en/notes/web-application-attack-surface/) | OWASP Top 10:2025 attack-surface checklist |

## 4. Credentials, Privilege Escalation & Lateral Movement

| # | Card | Summary |
|---|------|-----------|
| 14 | [Password Attacks and Credential Stealing](/en/notes/password-attacks-and-credential-stealing/) | online/offline password attacks and credential theft |
| 15 | [Linux Security Model Basics](/en/notes/linux-security-model-basics/) | Linux permission model and escalation surface |
| 16 | [Windows Security Model Basics](/en/notes/windows-security-model-basics/) | Windows token/credential/service model |
| 17 | [Privilege Escalation Overview](/en/notes/privilege-escalation-overview/) | escalation classes and common vectors |
| 18 | [Lateral Movement and Pivoting](/en/notes/lateral-movement-and-pivoting/) | lateral movement and internal pivoting |
| 19 | [Active Directory Attack Primer](/en/notes/active-directory-attack-primer/) | domain-environment attack primitives |
| 20 | [Post-Exploitation and Persistence](/en/notes/post-exploitation-and-persistence/) | post-exploitation goals, persistence and cleanup |

## 5. Tool Index

| # | Card | Summary |
|---|------|-----------|
| 21 | [Pentest Tools Overview](/en/notes/pentest-tools-overview/) | representative tools per phase and selection tips |

## Reading Path

1. Read **1–4** first: understand *what* a pentest is, *why* it is legal, and *what* it delivers.
2. Then **5–8**: learn to map the target.
3. Then **9–13**: understand how vulnerabilities are identified and exploited.
4. Then **14–20**: go deep on credentials/escalation/lateral movement/AD/post-exploitation and connect single flaws into an attack chain.
5. Keep the tools card (**21**) for reference.

## Related

- [Knowledge](/en/knowledge/) — all notes and other content
