---
title: "CAPEC — Attack Pattern Model"
description: "How CAPEC catalogs known patterns of attack: what an attack pattern captures, its primary views, and its alignment with CWE and MITRE ATT&CK."
pubDate: 2026-08-17
tags: ["Offensive Security", "CAPEC", "CWE", "ATT&CK", "Threat Modeling"]
lang: "en"
langLink: "/zh/notes/capec-model/"
---

**Common Attack Pattern Enumeration and Classification (CAPEC)** is a dictionary of known *patterns of
attack* — descriptions of how adversaries exploit weaknesses. It is the attacker-method counterpart
to CWE (root causes) and CVE (instances): **CWE says "what is wrong," CAPEC says "how it is attacked."**
The current CAPEC list (v3.9) enumerates 559 attack patterns.

## What an Attack Pattern Captures

A CAPEC pattern is richer than a CWE description. A full pattern typically includes:

- **Description** — the attack method, abstracted from any single vulnerability.
- **Execution Flow** — the ordered steps an attacker follows (attack → exploit → post-conditions).
- **Prerequisites** — the conditions the target must satisfy for the attack to work.
- **Skills / Resources required** — attacker capability level.
- **Consequences** — confidentiality/integrity/availability impact.
- **Related Weaknesses (CWE)** — the canonical bridge to root causes.
- **Example Instances** — real CVE records where the pattern was used.
- **Mitigations** — countermeasures.

This structure is precisely the "prerequisite → mechanism → consequence" triad this domain's
processing rules require, so CAPEC is treated as a primary modeling template.

## CAPEC Views

CAPEC organizes its 559 patterns into multiple **views** (a view is a curated subset with a specific
purpose), the two primary ones being:

- **View 1000 — Mechanisms of Attack** — organizes patterns by *how* the attack works technically
  (injection, protocol manipulation, resource manipulation, etc.).
- **View 3000 — Domains of Attack** — organizes patterns by *domain* (software, hardware, physical,
  social engineering, supply chain, communications).

Additional views/criteria exist for other slice-and-dice perspectives (e.g., by platform).

## CAPEC ↔ CWE ↔ ATT&CK Alignment

The three MITRE taxonomies are designed to interlock:

1. **CAPEC → CWE**: each attack pattern lists the CWE entries it can exploit (`Related Weaknesses`).
   For example, a "Command Injection" attack pattern lists CWE-77/CWE-78.
2. **CAPEC → ATT&CK**: conceptually, an ATT&CK technique describes *behavior in an intrusion*
   (e.g., T1190 Exploit Public-Facing Application), while a CAPEC pattern describes the *generic
   attack method* (e.g., "Buffer Overflow via Environment Variables"). They are complementary:
   ATT&CK is the playbook; CAPEC is the individual play.
3. **CWE → CVE**: CWE entries carry `Observed Examples` pointing at concrete CVEs.

So the full chain is: **ATT&CK technique → CAPEC pattern → CWE weakness → CVE instance → CVSS score.**

## Example: Command Injection Across the Chain

- **CAPEC-88 OS Command Injection** (mechanism: craft input that is concatenated into an OS command).
- Exploits **CWE-78 Improper Neutralization of Special Elements in an OS Command**.
- Produces records like **CVE-… (OS command injection in product X)**.
- Scored with **CVSS v4.0**.
- Defender maps the intrusion to **ATT&CK T1190 (initial access) → T1059.004 (Unix Shell execution)**.

## Using CAPEC Offensively

- **Enumeration of "how"** — given a CWE, look up which CAPEC patterns exploit it to enumerate
  concrete attack paths during a pentest.
- **Test-case generation** — an attack pattern's *execution flow* doubles as a test plan.
- **Gap analysis** — CAPEC's prerequisite/step structure surfaces which defenses block which step.

## Using CAPEC Defensively

- Map requirements (e.g., ASVS controls) to the CAPEC patterns they neutralize.
- Prioritize fixes by the number of CAPEC patterns that target a given CWE.
- Build threat models around the Domains view (View 3000).

## Sources

- MITRE CAPEC: https://capec.mitre.org/
