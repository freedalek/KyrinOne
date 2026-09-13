---
title: "Standards Landscape: How the Security Ontologies Interrelate"
description: "The five Tier 0 security standards — CVE, CWE, CAPEC, CVSS, and ATT&CK — their roles, granularity, and cross-references, plus abstraction, scoring, attack-chain reasoning, and provenance."
pubDate: 2026-08-16
tags: ["Offensive Security", "CVE", "CWE", "CAPEC", "CVSS", "MITRE ATT&CK"]
lang: "en"
langLink: "/zh/notes/standards-landscape/"
---

This file explains the vocabulary and relationships between the five primary Tier 0 standards. It is the shared mental model the rest of the domain relies on.

## The Five Standards and Their Roles

| Standard | Maintainer | Names… | Granularity | Direction |
|----------|-----------|--------|-------------|-----------|
| **CVE** | CVE Program (operated by MITRE) | a specific *vulnerability instance* | one flaw in one product | instance |
| **CWE** | MITRE (sponsored by CISA) | a *weakness class* (root cause) | a category of defect | cause |
| **CAPEC** | MITRE | an *attack pattern* | a way to exploit | action |
| **CVSS** | FIRST | a *severity score* | 0.0–10.0 | impact |
| **ATT&CK** | MITRE | an *adversary behavior* (tactic/technique) | observed TTP | behavior |

### Concrete Example Chain

1. An application concatenates user input into a shell command → **CWE-78** (OS Command Injection).
2. An adversary abuses this with a crafted payload → **CAPEC-88** (OS Command Injection, an attack pattern).
3. The specific product flaw is published → **CVE-2024-XXXXX**.
4. Its severity is computed → **CVSS v4.0** vector, e.g., `CVSS:4.0/AV:N/AC:L/...` → numeric score.
5. The defender maps the adversary's *behavior* to **ATT&CK** → T1190 *Exploit Public-Facing Application* → T1059.004 *Unix Shell* → privilege escalation, etc.

The key insight: **CWE is a property of the *victim code*; CAPEC is a property of the *attacker's method*; CVE is the *record*; CVSS is the *score*; ATT&CK is the *playbook*.** They are orthogonal views of the same incident and are often cross-referenced in their official metadata.

## CWE ↔ CAPEC ↔ ATT&CK Cross-References

- CAPEC attack patterns carry an explicit `Related Weaknesses` field that links each pattern to the CWE entries it can exploit. This is the canonical bridge from "attacker action" to "root cause."
- CWE entries carry `Related Attack Patterns` (CAPEC) and frequently reference CVE records as `Observed Examples`.
- ATT&CK techniques are linked to detection data sources (telemetry) and to mitigations, but ATT&CK is behavior-focused and does **not** enumerate CWE entries directly; the CWE/CAPEC bridge is the standard way to connect a technique to the underlying code flaw.

## Abstraction Model (CWE)

CWE is not a flat list. Entries are arranged by abstraction level (see 02_CWE/CWE-Model.md):

```
Pillar (most abstract, e.g., CWE-284 Improper Access Control)
  └─ Class (e.g., CWE-285 Improper Authorization)
       └─ Base (e.g., CWE-862 Missing Authorization)
            └─ Variant (technology-specific)
```

Special grouping entries: **Category** (groups weaknesses by common trait, not itself a weakness), **View/Graph** (a curated slice, e.g., CWE-1000 Research Concepts), **Chain** (weaknesses reachable consecutively), **Composite** (weaknesses that must coexist).

## Severity vs. Likelihood

- **CVSS** measures *technical severity* of one vulnerability (Base, with optional Threat and Environmental modifiers). It is deliberately not a risk score.
- **EPSS** (FIRST) estimates *probability of exploitation*, complementary to CVSS. CWSS is MITRE's weakness-level scoring (used in the CWE Top 25 methodology).
- **CWE Top 25** ranks weaknesses by a composite score that combines prevalence in CVE data, severity (CVSS), and known exploitation (CISA KEV), not by raw count alone.

## Attack-Chain Reasoning

Offensive security work is organized as a *chain*, not a single shot. The domain's phase model (see 07_Offensive-Phases/Offensive-Kill-Chain.md) maps cleanly onto ATT&CK tactics:

```
Recon → Initial Access → Execution → Persistence → Privilege Escalation
      → Defense Evasion → Credential Access → Discovery
      → Lateral Movement → Collection → C2 → Exfiltration → Impact
```

Each hop has a *prerequisite* (what the adversary must already control), a *mechanism* (how the hop works technically), and *telemetry* (what a defender can log to detect it). This prerequisite→mechanism→telemetry triad is the backbone of every file in this knowledge base.

## Provenance and Freshness

- All facts in this build were fetched live on **2026-08-17** unless a page states otherwise.
- MITRE CWE currently reports **version 4.20** (Research Concepts view) and a **2025 CWE Top 25** ("Page Last Updated: December 15, 2025").
- MITRE CAPEC reports **559 total attack patterns** and lists **CAPEC version 3.9** in its news.
- OWASP Top 10 current release is **2025**; ASVS current stable is **5.0.0**; WSTG stable is **4.2** with **5.0** in development.
- FIRST CVSS current standard is **v4.0** (v3.1 archived).

## Sources

- https://attack.mitre.org/
- https://cwe.mitre.org/
- https://capec.mitre.org/
- https://www.cve.org/
- https://www.first.org/cvss/
