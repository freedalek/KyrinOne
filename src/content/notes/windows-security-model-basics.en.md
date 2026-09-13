---
title: "Windows Security Model Basics"
description: "Windows permissions revolve around tokens, ACLs, services and the registry; local credentials and privileges are concentrated in system-level mechanisms such as SAM, LSASS and UAC."
pubDate: 2026-09-07
tags: ["Windows", "Privilege Escalation", "Security Model", "Penetration Testing"]
lang: "en"
langLink: "/zh/notes/windows-security-model-basics/"
---

## Accounts & Credential Stores

- **SAM**: local account password hashes (`%SystemRoot%\system32\config\SAM`).
- **LSASS**: the logon session process, caches credentials of logged-on users (plaintext/NTLM/Kerberos tickets)—a target for mimikatz and similar.
- **Domain environment**: the DC's NTDS.dit stores all domain user hashes → see Active-Directory-Attack-Primer.
- Built-in accounts: `Administrator`, `SYSTEM` (highest local privilege), service accounts.

## Token & Privileges

- **Access token**: generated at logon, containing the SID, group memberships, and **privileges** (e.g. `SeImpersonatePrivilege`, `SeBackupPrivilege`).
- Tokens can be stolen/forged (token impersonation); `SeImpersonate` is often abused by the potato family for privilege escalation.
- UAC provides two levels: standard user and elevated administrator; interactive processes are usually de-privileged.

## Services & Registry

- **Services**: run under some account. Writable service binaries, modifiable ImagePath, unquoted service paths → SYSTEM execution (classic escalation).
- **Registry**: `Run/RunOnce`, `HKLM\SYSTEM\CurrentControlSet\Services` are common persistence and escalation locations.
- **Scheduled tasks**: scripts running with high privileges can be hijacked if writable.

## Key Points

- Windows privilege-escalation enumeration main line: **whoami /priv → writable service and scheduled-task points → registry autoruns → token privileges → known exploits**.
- For evasion and bypass, see LOLBAS "Living Off the Land" binaries.
- Tool quick reference: `whoami /all`, `sc qc`, `accesschk`, `winpeas`, mimikatz—but you must understand what the output means.
- The ultimate goal on domain hosts is to compromise the DC and dump NTDS.dit; local SYSTEM is only a relay station.

## Related

- Privilege-Escalation-Overview
- Active-Directory-Attack-Primer
- Lateral-Movement-and-Pivoting

## Sources

- Microsoft Learn (Windows Security): https://learn.microsoft.com/en-us/windows/security/
- HackTricks: https://book.hacktricks.xyz/
- LOLBAS: https://lolbas-project.github.io/
