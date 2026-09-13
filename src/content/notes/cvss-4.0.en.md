---
title: "FIRST CVSS v4.0 — Severity Scoring"
description: "CVSS v4.0 severity scoring: its four metric groups, the CVSS-B/BT/BE/BTE naming, vector strings, and the key changes from v3.1."
pubDate: 2026-08-17
tags: ["Offensive Security", "CVSS", "Vulnerability Management", "Severity Scoring"]
lang: "en"
langLink: "/zh/notes/cvss-4.0/"
---

**CVSS (Common Vulnerability Scoring System)** is an open framework maintained by FIRST's CVSS-SIG
for communicating the *technical severity* of a software/hardware vulnerability. It is a
*vulnerability* score, not a *risk* score — it deliberately excludes environment-specific threat
likelihood beyond the optional metric groups. v4.0 is the current standard; v3.1 is archived.

## The Metric Groups (v4.0)

CVSS v4.0 is composed of four metric groups:

| Group | Question it answers | Mandatory? |
|-------|---------------------|-----------|
| **Base** | How severe is the flaw intrinsically? | Yes |
| **Threat** | How has the threat landscape changed (exploit maturity)? | No |
| **Environmental** | How severe is it *in my* environment (mitigations/importance)? | No |
| **Supplemental** | Extra attributes (safety, automation, recovery, urgency) | No (informational) |

### Base metrics (v4.0)
- **Attack Vector (AV)** — Network / Adjacent / Local / Physical.
- **Attack Complexity (AC)** — Low / High.
- **Attack Requirements (AT)** — None / Present (new in v4.0: whether special conditions must exist).
- **Privileges Required (PR)** — None / Low / High.
- **User Interaction (UI)** — None / Passive / Active (v4.0 splits "Required" into Passive/Active).
- **Impact** — Confidentiality/Integrity/Availability for **Vulnerable System (VC, VI, VA)** and
  **Subsequent Systems (SC, SI, SA)**. The old `Scope` metric is **retired** in v4.0 and replaced by
  this explicit dual-system impact.

### Threat metrics
Renamed from "Temporal" in v3.x. Simplified: **Exploit Maturity (E)** — Unproven / Proof-of-Concept /
Attacked. (Remediation Level and Report Confidence are retired.)

### Environmental metrics
Security Requirements (CR/IR/AR) and modified Base metrics; plus new **Safety (MSI:S, MSA:S)** for
consumer-assessed safety impact (OT/ICS focus).

### Supplemental metrics (do not affect the score)
**Safety (S)**, **Automatable (A)**, **Recovery (R)**, **Value Density (V)**, **Vulnerability
Response Effort (RE)**, **Provider Urgency (U)**.

## Score Nomenclature (v4.0)

The standard introduces explicit naming for which groups are combined:

- **CVSS-B** — Base only.
- **CVSS-BT** — Base + Threat.
- **CVSS-BE** — Base + Environmental.
- **CVSS-BTE** — Base + Threat + Environmental (the "full" score).

## Vector String

A CVSS v4.0 vector is a compact string, e.g.:

```
CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

Each metric is key:value; the numeric score is computed from the Base (and optionally Threat/
Environmental) metrics per the published lookup tables.

## Practical Usage Offensively & Defensively

- **Triage** — Base score ranks *severity*; combine with **EPSS** (exploitation likelihood) for true
  prioritization (CVSS + EPSS = the industry-standard pair).
- **Reporting** — a pentest finding should cite the CVE and a CVSS vector, not a bare number, so the
  score is reproducible.
- **Pitfalls** — CVSS does not capture business context (that's Environmental), and Base-only scores
  routinely mislead if quoted without the vector. Always report the vector string.

## v4.0 vs v3.1 (key changes to know)

- Scope retired → explicit Vulnerable/Subsequent system impacts.
- UI split into Passive/Active; new AT (Attack Requirements).
- Temporal → Threat (simplified); RL/RC retired.
- New Supplemental group; explicit OT/ICS safety considerations.

## Sources

- FIRST CVSS: https://www.first.org/cvss/
- FIRST CVSS v4.0: https://www.first.org/cvss/v4-0/
