---
title: "Penetration Testing Methodology (PTES)"
description: "The PTES seven-phase penetration testing methodology, from pre-engagement interactions to the final report, plus reference frameworks such as OSSTMM, OWASP WSTG, and NIST SP 800-115."
pubDate: 2026-09-07
tags: ["Penetration Testing", "PTES", "Methodology", "Fundamentals"]
lang: "en"
langLink: "/zh/notes/penetration-testing-methodology-ptes/"
---

## The 7 Phases (PTES v1.0)

1. **Pre-engagement Interactions** — authorization letter, scope, time window, contacts, legal boundaries, and reporting requirements; the compliance foundation of the entire process.
2. **Intelligence Gathering** — passively/actively collect target information (OSINT, DNS, fingerprinting, etc.).
3. **Threat Modeling** — based on the collected information, analyze the attack surface, trust relationships, possible attack paths, and business impact.
4. **Vulnerability Analysis** — after port/service enumeration, combine known vulnerability databases with manual analysis to determine exploitable weaknesses.
5. **Exploitation** — actually trigger vulnerabilities to gain an initial foothold or further control.
6. **Post Exploitation** — assess the value of the foothold: privilege escalation, lateral movement, data access, and persistence (per the RoE).
7. **Reporting** — deliver to technical and management audiences: process, findings, evidence, risk rating, and remediation guidance.

## Other Frameworks

- **OSSTMM** (Open Source Security Testing Methodology Manual) — a testing methodology focused on **measurement/verification**.
- **OWASP WSTG** — a hands-on manual for web application testing (information gathering → configuration → authentication → input validation → business logic…).
- **NIST SP 800-115** — the US National Institute of Standards and Technology's technical guide to security testing and assessment.

> A methodology is a skeleton, not a rigid process: in real projects the phases iterate (for example, returning to enumeration when exploitation is blocked).

## Key Points

- Phase 1 (authorization/scope) **cannot be skipped**; it is the source of the test's legality.
- Each phase has clear **inputs/outputs**; for example, the output of intelligence gathering is the input to threat modeling.
- Reporting (phase 7) should be recorded throughout the engagement, not written at the very end.

## Related

- Penetration Testing Overview
- Rules of Engagement and Scoping
- Reporting and Remediation

## Sources

- PTES official main page and 7-phase definition: http://www.pentest-standard.org/index.php/Main_Page
- OWASP WSTG: https://owasp.org/www-project-web-security-testing-guide/
- NIST SP 800-115: https://csrc.nist.gov/publications/detail/sp/800-115/final
