---
title: "MITRE ATT&CK — Framework Model"
description: "How ATT&CK models adversary behavior: tactics, techniques, sub-techniques and procedures; the three matrices; companion domains; and the prerequisite→mechanism→telemetry→detection reading discipline."
pubDate: 2026-08-17
tags: ["Offensive Security", "MITRE ATT&CK", "Threat Modeling", "Detection Engineering"]
lang: "en"
langLink: "/zh/notes/attack-framework/"
---

MITRE ATT&CK® is a globally-accessible knowledge base of **adversary tactics and techniques based on
real-world observations**. It is the de-facto common language for describing offensive behavior, used
across government, industry, and the security product/service community for threat modeling,
detection engineering, and red-team planning.

## Core Data Model

ATT&CK is a matrix organized along two axes:

- **Tactics** — the *why*: the adversary's short-term tactical goal (e.g., Initial Access,
  Persistence, Exfiltration). Tactics have stable IDs like `TA0001`.
- **Techniques** — the *how*: specific methods to achieve a tactic (e.g., T1566 *Phishing*,
  T1078 *Valid Accounts*). Technique IDs like `T1059`.
- **Sub-techniques** — refinements of a technique, denoted `T####.###` (e.g., `T1059.001`
  *PowerShell* under T1059 *Command and Scripting Interpreter*).
- **Procedures** — the concrete implementation of a technique by a specific **group** or **software**
  (the CTI layer).

The model is *behavior-based*: the same technique may be realized by many different malware samples;
ATT&CK decouples "what the adversary does" from "what tool they use."

## The Three Matrices

ATT&CK ships three technology-domain matrices:

1. **Enterprise** — Windows, macOS, Linux, cloud (SaaS/IaaS), containers, network devices, and
   identity/AD. The largest and most-used matrix.
2. **Mobile** — Android and iOS.
3. **ICS** — Industrial Control Systems (OT/SCADA).

This domain's knowledge base focuses on **Enterprise** (see the Enterprise Tactics note).

## Beyond the Matrix

ATT&CK is more than a matrix. Its companion domains are:

| Domain                   | Contents                                                      | Use                        |
| ------------------------ | ------------------------------------------------------------- | -------------------------- |
| **Tactics / Techniques** | the matrix itself                                             | describing behavior        |
| **Mitigations**          | enterprise security controls that counter techniques          | defense                    |
| **Detections**           | Detection Strategies, Analytics (SIGMA-like), Data Components | detection engineering      |
| **CTI**                  | Groups, Software, Campaigns                                   | attribution & threat intel |
| **Assets**               | the asset/technology the technique targets                    | scoping                    |

### Data Components & Detection

ATT&CK explicitly models **Data Sources → Data Components → telemetry** as the bridge between a
technique and what a defender can detect. Every technique lists the data components (e.g., "Process
Creation", "File Modification", "Network Traffic") whose logs could reveal it. This is why ATT&CK is
the backbone of modern detection engineering: it turns "adversary behavior" into "log queries."

## How to Read a Technique

For each technique, four questions are always asked:

1. **Prerequisites** — what access/permissions/position must the adversary already hold?
2. **Mechanism** — how does the technique actually work at a technical level?
3. **Telemetry** — which logs/events (data components) would record this behavior?
4. **Detection opportunity** — what query, anomaly, or correlation would surface it?

Reducing ATT&CK to a technique list is not useful; every entry is treated with this
prerequisite→mechanism→telemetry→detection structure.

## ATT&CK Versioning

ATT&CK is continuously updated (multiple releases per year). The live enterprise matrix fetched on
2026-08-17 lists **15 tactics**, including the newer *Stealth* and
*Defense Impairment* tactics that partition what was historically called "Defense Evasion." Because
technique and tactic IDs are stable but content evolves, always cross-check the live matrix for the
current authoritative list.

## Sources

- MITRE ATT&CK: https://attack.mitre.org/
