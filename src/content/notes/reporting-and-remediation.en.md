---
title: "Reporting and Remediation"
description: "How to turn penetration testing results into a report that lets decision-makers understand risk, engineers apply fixes, and evidence be reproduced and traced."
pubDate: 2026-09-07
tags: ["Penetration Testing", "Reporting", "Remediation", "CVSS"]
lang: "en"
langLink: "/zh/notes/reporting-and-remediation/"
---

## Report Structure

| Section | Content |
|---------|---------|
| **Executive Summary** | For management: overall risk level, key conclusions, and quantification (e.g. "domain controller reachable", "1000+ employee credentials obtainable") |
| **Scope & Methodology** | Test scope, time window, standards/methods used, and constraints |
| **Findings** | For each: title, **severity (CVSS v4.0 score/vector)**, affected assets, reproduction steps, evidence (screenshots/requests), impact, and remediation guidance |
| **Retest & Appendix** | Post-fix verification results, full evidence package, tools, and timeline |

## Severity & Scoring

- Use **CVSS v4.0** to score technical severity, then combine business context (asset value, exploitability, exposure) for final risk ranking.
- Rating criteria must be consistent throughout; avoid "every finding is High".

## Remediation Guidance

- Each finding comes with **actionable** remediation (configuration, patch, code, process).
- Prioritize by risk and cost; distinguish "root-cause fixes" from "mitigations".
- Schedule a **retest** to close the loop after remediation, verifying the vulnerability is actually eliminated rather than bypassed.

## Key Points

- **Evidence first**: reproduction steps must let an engineer replay them independently; screenshots/requests/logs must retain the original records.
- Report writing must distinguish readers: management looks at risk and business impact, engineers look at reproduction and remediation.
- Negative results should also be written (items tested but found secure) to increase the report's credibility.

## Related

- Penetration Testing Overview
- Rules of Engagement and Scoping

## Sources

- PTES Reporting phase: http://www.pentest-standard.org/index.php/Reporting
- FIRST CVSS: https://www.first.org/cvss/
