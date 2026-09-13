---
title: "Lateral Movement and Pivoting"
description: "How attackers use compromised hosts and reused credentials to move across a network, and how pivoting exposes otherwise unreachable internal segments."
pubDate: 2026-09-07
tags: ["Penetration Testing", "Lateral Movement", "Pivoting", "Active Directory", "Offensive Security"]
lang: "en"
langLink: "/zh/notes/lateral-movement-and-pivoting/"
---

## Concepts

- **Lateral movement**: moving from a compromised host to other hosts within the same network/domain (TA0008).
- **Pivoting**: using a compromised host as a "relay point" so the attack machine can reach internal segments that are not directly reachable behind it.

## Common Lateral Techniques (mostly the Windows ecosystem)

- **Pass-the-Hash / Pass-the-Ticket**: directly reuse NTLM hashes or Kerberos tickets, no plaintext password required.
- **Remote management protocol abuse**: SMB (PsExec-style), WMI, WinRM, RDP, DCOM.
- **AD attack primitives**: Kerberoasting, AS-REP Roasting, ACL abuse, delegation attacks, etc. → see Active Directory Attack Primer.
- **Credential reuse**: the same local admin password/service password unlocks multiple machines (the lateral version of password spraying).

## Pivoting

- **SOCKS proxy / port forwarding**: run a proxy on the compromised host (e.g. Metasploit `route`, `socks_proxy`, Chisel, frp, SSH dynamic forwarding); the attack machine reaches the internal network through the proxy.
- **Watch the traffic path**: tunnel traffic may be discovered by in-depth network devices inside the target; control the probing tempo carefully.

## Key Points

- **Lateral movement = credentials + reachability**: first collect usable credentials/tickets (see Password Attacks and Credential Stealing), then decide on the movement protocol.
- Keep an **audit record** of sessions/credentials; the report needs the complete attack chain (initial → lateral → target).
- Once inside a domain environment, AD enumeration and escalation usually follow closely.

## Related

- Privilege Escalation Overview
- Active Directory Attack Primer
- Password Attacks and Credential Stealing

## Sources

- MITRE ATT&CK TA0008: https://attack.mitre.org/tactics/TA0008/
- HackTricks: https://book.hacktricks.xyz/
- The Hacker Recipes: https://www.thehacker.recipes/
