---
title: "Rules of Engagement and Scoping"
description: "How to define in writing what will and will not be tested, what is permitted and forbidden, and the boundary conditions before a penetration test begins — the first gate for legality and compliance."
pubDate: 2026-09-07
tags: ["Penetration Testing", "Rules of Engagement", "Scoping", "Legal", "Methodology"]
lang: "en"
langLink: "/zh/notes/rules-of-engagement-and-scoping/"
---

## Core Elements

| Element | Content |
|---------|---------|
| **Authorization** | A **written authorization letter** issued by someone at the target organization with the authority to sign (may include third-party vendor/cloud provider terms) |
| **Scope** | Explicitly define in-scope (testable) and out-of-scope (forbidden) IPs/domains/systems/interfaces; **systems outside the boundary must not be touched** |
| **Time window** | The time period during which testing is allowed; attack-defense exercises on production systems often avoid business peak hours |
| **Testing depth** | Permitted intensity: whether DoS/destructive operations, social engineering, and file writes/service installation are allowed |
| **Contact & communication** | Emergency contacts, incident reporting process, and regular progress communication methods |
| **Data handling** | How real data encountered during testing is protected, retained, and destroyed |
| **Emergency stop** | The circuit-breaker mechanism when an incident occurs (business disruption, scope violation) |
| **Report format** | Report structure, rating criteria, deadlines, and retest scope |

## Key Points

- **An unauthorized "test" is legally an attack** (many countries apply laws such as the Computer Fraud and Abuse Act); written authorization is an indispensable safeguard.
- Even if a scope violation "incidentally discovers a vulnerability", you should **stop and report** it and must not continue to exploit it.
- Cloud/hosted environments (AWS, Azure, third-party SaaS) may require an additional vendor authorization process.
- Distinguish the RoE from the penetration testing **methodology**: the RoE governs "what you may do", while the methodology governs "how to do it".

## Related

- Penetration Testing Overview
- Penetration Testing Methodology (PTES)
- Reporting and Remediation

## Sources

- PTES Pre-engagement phase: http://www.pentest-standard.org/index.php/Pre-engagement
- NIST SP 800-115 (authorization and rules guidance): https://csrc.nist.gov/publications/detail/sp/800-115/final
