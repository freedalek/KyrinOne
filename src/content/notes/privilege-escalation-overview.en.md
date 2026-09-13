---
title: "Privilege Escalation Overview"
description: "What privilege escalation is: horizontal versus vertical escalation, why it exists, and the common vectors on Linux and Windows."
pubDate: 2026-09-07
tags: ["Penetration Testing", "Privilege Escalation", "Offensive Security", "Linux", "Windows"]
lang: "en"
langLink: "/zh/notes/privilege-escalation-overview/"
---

## Horizontal vs Vertical

- **Horizontal escalation (same privilege, different target)**: switching from one normal user to another normal user/service account; essentially borrowing another's identity and credentials (often overlapping with lateral movement).
- **Vertical escalation (privilege increase)**: normal user → local admin / root / SYSTEM; caused by OS or application-layer flaws or misconfigurations.

## Why Escalation Exists

- **Missing patches**: known local privilege-escalation CVEs (kernel vulnerabilities, etc.).
- **Misconfigurations**: SUID/privileged bits (Linux), service permissions, writable files, scheduled tasks, registry, docker group, etc.
- **Credential leakage**: root/administrator passwords found in files, environment variables, or command history.
- **Application logic**: privileged components that can be abused (sudo, runas, service accounts).

## Common Vectors

**Linux**: SUID binaries (see GTFOBins), executable items from `sudo -l`, cron/writable scripts, kernel exploits, insecure file permissions, capabilities, docker/lxd group membership.

**Windows**: services (unquoted paths, writable service binaries/permissions), registry autorun entries, AlwaysInstallElevated, stored credentials (`cmdkey`, Credential Manager), token manipulation (SeImpersonate → potato family), kernel exploits (see LOLBAS / HackTricks).

## Key Points

- **Enumerate before acting**: without systematic enumeration (users/permissions/services/files/history/scheduled tasks), don't rush to run exploits.
- Prioritize the "low-hanging fruit": writable scripts, hardcoded passwords, misconfigurations—usually faster than kernel exploits.
- Every platform has cheatsheets/tools (on Linux, enumeration scripts such as `linpeas`), but **understanding the output matters more than running the script**.
- After a successful escalation, record evidence promptly and continue with Lateral Movement and Pivoting.

## Related

- Reverse and Bind Shells
- Lateral Movement and Pivoting
- Active Directory Attack Primer

## Sources

- GTFOBins: https://gtfobins.github.io/
- LOLBAS Project: https://lolbas-project.github.io/
- HackTricks: https://book.hacktricks.xyz/
- MITRE ATT&CK TA0004: https://attack.mitre.org/tactics/TA0004/
