---
title: "Penetration Testing Overview"
description: "What penetration testing is: authorized scope, types (white/grey/black box), how it differs from scanning and red teaming, and the rules of engagement that make it legal."
pubDate: 2026-09-07
tags: ["Penetration Testing", "Offensive Security", "Fundamentals", "Red Team"]
lang: "en"
langLink: "/zh/notes/penetration-testing-overview/"
---

## Definition

Penetration testing (pentest) is a legal, contracted simulation of cyberattacks against an organization's systems, performed to identify weaknesses before real adversaries exploit them. Its deliverable is not just a list of flaws, but **proof of impact** and **remediation guidance**.

## Types

| Dimension | Type | Description |
|-----------|------|-------------|
| Information | White-box | Tester gets full information (source, architecture, credentials) |
| | Grey-box | Partial information (e.g. a normal user account, some credentials) |
| | Black-box | Only the target scope, simulating an external attacker |
| Perspective | External | Testing perimeter assets from the internet |
| | Internal | Simulating a foothold inside the network / an insider |
| Focus | Network / Web / Mobile / Wireless / Cloud | By target type |

## How It Differs from Adjacent Concepts

- **Vulnerability scanning** — automated tools find known issues; usually stops before exploitation.
- **Penetration test** — builds on scanning/manual analysis to **prove exploitability** and assess real impact.
- **Red team** — a long, high-adversarial, objective-driven exercise (e.g. "capture the domain controller"), usually multi-stage and evasive; not the same as a one-off pentest.

## Key Points

- Everything rests on **written authorization and scope (Rules of Engagement)**; without authorization it is illegal.
- A pentest follows a **methodology and phased process**, not random probing.
- The output is a report, graded by severity, with reproducible evidence and remediation guidance.

## Related

- Penetration Testing Methodology (PTES)
- Rules of Engagement and Scoping
- Reporting and Remediation

## Sources

- PTES — The Penetration Testing Execution Standard: http://www.pentest-standard.org/
- OWASP Web Security Testing Guide (WSTG): https://owasp.org/www-project-web-security-testing-guide/
- NIST SP 800-115 (Technical Guide to Information Security Testing and Assessment)
