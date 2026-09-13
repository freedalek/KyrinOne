---
title: "Payloads and Metasploit Basics"
description: "Understanding payloads, staged vs stageless delivery, and the Metasploit framework (msfconsole/msfvenom) — the foundation for efficient exploitation."
pubDate: 2026-09-07
tags: ["Payload", "Metasploit", "Tooling", "Exploitation"]
lang: "en"
langLink: "/zh/notes/payloads-and-metasploit-basics/"
---

## Payload Concepts

- **Payload**: the code injected/executed after exploitation (reverse shell, meterpreter, command execution, etc.).
- **Staged / Stageless**:
  - *Stageless*: a single file/packet carries the full functionality; stable but larger.
  - *Staged*: sends a very small **stage0** first to establish a connection, then pulls the real **stage** from the attack machine; smaller and preferred for stealth, but depends on the network.
- **Encoder**: transforms the payload to bypass signature-based detection; modern AV/EDR relies mainly on behavior detection, so encoding alone is no longer a silver bullet.

## Common msfvenom Forms

| Form | Purpose |
|------|---------|
| `-p windows/x64/meterpreter/reverse_tcp` | Reverse-connect meterpreter (staged) |
| `-p linux/x64/shell_reverse_tcp` | Linux stageless reverse shell |
| `-f exe / -f elf / -f raw / -f c` | Output format (choose by delivery method) |
| `-e x86/shikata_ga_nai` | Encoding example (note: limited evasion against modern defenses) |

## Basic msfconsole Session Management

- `use exploit/...` → `set RHOSTS/LHOST/LPORT` → `run`/`exploit`
- On success you get a `meterpreter`/`shell` session; `sessions -l` lists them, `sessions -i N` switches
- Inside a session: `sysinfo`, `getuid`, `getsystem` (privilege escalation attempt), etc.

## Key Points

- **LHOST/LPORT must match the listener**, especially for reverse connections; when the attack machine has multiple NICs, pick the externally reachable address.
- Staged payloads depend on stable outbound connectivity; when changing networks repeatedly, prefer stageless or add a tunnel.
- For reverse-connect entry points see Reverse-and-Bind-Shells; for post-exploitation actions see Privilege-Escalation-Overview.

## Related

- Reverse-and-Bind-Shells
- Exploitation-and-Initial-Access

## Sources

- Metasploit documentation: https://docs.metasploit.com/
- OffSec Metasploit Unleashed: https://www.offsec.com/metasploit-unleashed/
