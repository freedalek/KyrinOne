---
title: "CWE — Weakness Model & Abstraction Hierarchy"
description: "How Common Weakness Enumeration models root-cause defect classes: the Pillar/Class/Base/Variant hierarchy, grouping entries, entry anatomy, views and rankings, and scoring."
pubDate: 2026-08-17
tags: ["Offensive Security", "CWE", "MITRE", "Vulnerability Management", "Secure Coding"]
lang: "en"
langLink: "/zh/notes/cwe-model/"
---

**Common Weakness Enumeration (CWE)** is a community-developed list of software and hardware weakness types that can become vulnerabilities. Where CVE names *instances*, CWE names the *class of mistake* — the root cause. It is sponsored by CISA (DHS) and operated by MITRE.

## Abstraction Levels

CWE entries are deliberately layered by abstraction. Understanding this hierarchy is essential to using CWE correctly:

| Level | Meaning | Example |
|-------|---------|---------|
| **Pillar** | most abstract theme; describes a category of *mistake* | CWE-284 *Improper Access Control* |
| **Class** | still abstract, independent of tech | CWE-285 *Improper Authorization* |
| **Base** | enough detail for detection/prevention methods | CWE-862 *Missing Authorization* |
| **Variant** | technology/language specific | CWE-1022 (web `window.opener` tabnabbing) |

### Grouping (non-weakness) entries

- **Category** — groups weaknesses sharing a trait (not itself a weakness).
- **View / Graph** — a curated slice, e.g., CWE-1000 *Research Concepts* (a graph view of all weaknesses).
- **Chain** — weaknesses that must be reached *consecutively* to be exploitable.
- **Composite** — weaknesses that must *coexist* to be exploitable.

## The "Improper Access Control" Example (from the live Research Concepts view)

The live CWE-1000 view shows the pillar **CWE-284 Improper Access Control** anchoring a rich subtree:

```
284 Improper Access Control (Pillar)
 ├─ 269 Improper Privilege Management (Class)
 │   ├─ 266 Incorrect Privilege Assignment (Base)
 │   ├─ 267 Privilege Defined With Unsafe Actions (Base)
 │   ├─ 268 Privilege Chaining (Base)
 │   ├─ 270 Privilege Context Switching Error (Base)
 │   ├─ 271 Privilege Dropping/Lowering Errors (Class)
 │   │    ├─ 272 Least Privilege Violation
 │   │    ├─ 273 Improper Check for Dropped Privileges
 │   │    └─ 274 Improper Handling of Insufficient Privileges
 │   └─ 648 Incorrect Use of Privileged APIs
 ├─ 282 Improper Ownership Management (Class)
 └─ 285 Improper Authorization (Class)
      ├─ 862 Missing Authorization (Base)
      ├─ 863 Incorrect Authorization (Base)
      └─ 639 Authorization Bypass Through User-Controlled Key (IDOR)
```

This single subtree already captures the most common *access-control* root causes behind web vulnerabilities (IDOR, missing authz, privilege chaining) — directly feeding OWASP A01 and A07.

## CWE Entry Anatomy

A full CWE definition includes: ID + name, description, extended description, relationships (parent/child, `CanPrecede`/`CanFollow`), platforms/languages, **common consequences**, detection methods, potential mitigations, **related attack patterns (CAPEC)**, and **observed examples (CVE)**. The CAPEC and CVE cross-references are what make CWE the hub of the weakness→attack→instance graph.

## Views & Rankings

CWE provides multiple views for different consumers, plus ranked lists:

- **CWE-1000 Research Concepts** — every weakness, organized by behavior abstraction.
- **CWE Top 25 Most Dangerous Software Weaknesses** (see CWE-Top25-2025.md).
- **Top Hardware Weaknesses** (for hardware-security domain).
- **Top 10 KEV Weaknesses** — ranked by presence in CISA's Known Exploited Vulnerabilities catalog.
- **"On the Cusp"** — weaknesses just outside the Top 25.

## Scoring Within CWE

The Top 25 ranking uses a composite **score** (not raw CVE count): it combines prevalence in the year's CVE dataset, average severity, and Known-Exploited-Vulnerability presence. See CWE-Top25-2025.md for the formula context and the 2025 results.

## Relationship to This Domain

- Every web attack in 06_Web-Attacks/ and every ATT&CK technique that exploits a code flaw can be traced to a CWE root cause. The habit to build: **name the CWE before naming the attack.**
- Cross-reference with 03_CAPEC/ (attack patterns) and 04_Vulnerability-Management/ (CVE/CVSS).

## Sources

- https://cwe.mitre.org/
