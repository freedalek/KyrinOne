---
title: "OWASP ASVS — Application Security Verification Standard"
description: "OWASP ASVS: what it verifies, the requirement identifier format, its chapter structure and verification levels, and how it pairs with WSTG, CWE/CAPEC, and the Top 10."
pubDate: 2026-08-17
tags: ["Offensive Security", "OWASP", "ASVS", "Application Security", "Verification"]
lang: "en"
langLink: "/zh/notes/asvs/"
---

The **ASVS** normalizes *how to verify* web application security controls. Where the WSTG says *how to
test*, the ASVS says *what to verify*, as a checklist of numbered requirements. It is the standard
yardstick for defining the scope and rigor of an application security assessment. The current stable
version is **5.0.0** (released May 2025); the previous stable was 4.0.3.

## Purpose

The ASVS provides a basis for:
1. **A metric** — a yardstick for how much trust to place in an application.
2. **Guidance** — what security controls developers should build.
3. **Procurement** — specifying verification requirements in contracts.

## Requirement Identifier Format

Each requirement is `chapter.section.requirement`, e.g., `1.2.5`. A versioned reference is
`v<version>-<id>`, e.g. `v5.0.0-1.2.5` (lowercase `v`). Version-less IDs are assumed to refer to the
latest standard — so always include the version in reports.

Example (v5.0.0) — requirement `1.2.5`:

> Verify that the application protects against OS command injection and that operating system calls
> use parameterized OS queries or use contextual command line output encoding.

## Chapters (v5.0 structure)

ASVS 5.0 organizes requirements into numbered chapters/sections covering the full control surface,
including (representative, not exhaustive):

1. **Encoding & Sanitization** (XSS/injection prevention)
2. **Authentication** — identity verification, sessions, MFA
3. **Access Control** — authorization, IDOR, least privilege
4. **Validation, Sanitization & Encoding** of input
5. **Cryptography** — key management, TLS, storage
6. **Error Handling & Logging**
7. **Data Protection / Privacy**
8. **Communications** (transport security)
9. **Malicious Code / Business Logic**
10. **Configuration** & deployment
11. **Web services / API security**
12. **Supply chain / dependency** (newer emphasis)
13. **AI/LLM considerations** (newer emphasis)

> Chapter numbering may shift between versions; consult the 5.0.0 PDF/CSV in the GitHub repo for the
> authoritative chapter list.

## Verification Levels

ASVS defines escalating levels of rigor (levels 1–3), where each level adds requirements:
- **Level 1** — opportunist threat model; automated/tool-assisted, low assurance (entry-level).
- **Level 2** — standard level for most applications with sensitive data; manual + tool review.
- **Level 3** — high-assurance for critical systems (finance, healthcare); formal verification.

The level chosen is driven by the application's risk and the required assurance, and must be declared
in the report.

## Relationship to the Rest of the Domain

- **ASVS ↔ WSTG**: ASVS is the "what", WSTG is the "how". A pentest that verifies ASVS requirements
  using WSTG techniques is the industry-standard pairing.
- **ASVS ↔ CWE/CAPEC**: each requirement targets specific CWE root causes, which map to CAPEC attack
  patterns and, ultimately, ATT&CK techniques.
- **ASVS ↔ Top 10**: ASVS controls are organized to defeat the OWASP Top 10 categories; many
  organizations map ASVS requirements to Top 10 entries for coverage reports.

## Users & Adoption

ASVS is embedded in third-party assurance programs (e.g., the CREST OWASP Verification Standard
programme and the App Defense Alliance Web App Profile) and is widely used as a penetration-testing
baseline by consultancies.

## Sources

- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
