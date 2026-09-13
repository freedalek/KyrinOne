---
title: "Active Directory Attack Primer"
description: "Active Directory as the core battlefield of enterprise internal penetration: its objects, trusts, and authentication protocols (Kerberos/NTLM) are the raw material for most lateral-movement and privilege-escalation attacks."
pubDate: 2026-09-07
tags: ["Penetration Testing", "Active Directory", "Kerberos", "NTLM", "Windows"]
lang: "en"
langLink: "/zh/notes/active-directory-attack-primer/"
---

## What Is AD

- **Active Directory**: Microsoft's directory service, centrally managing objects such as **users, computers, groups, and policies (GPO)** within a domain.
- **DC (Domain Controller)**: the central host storing NTDS.dit (containing password hashes) and providing Kerberos services.
- Key objects: `user`, `computer`, `group` (including nested), `OU`; ACLs determine who can operate on whom.

## Authentication Protocols at a Glance

| Protocol | Mechanism | Penetration-relevant points |
|----------|-----------|------------------------------|
| **Kerberos** | Ticket-based (TGT/TGS) symmetric authentication, the default intra-domain protocol | Tickets can be cracked offline / forged / replayed → Kerberoasting, AS-REP Roasting, Golden/Silver Ticket, delegation attacks |
| **NTLM** | Challenge-response (the hash participates in the computation) | Pass-the-Hash, relay, cracking NTLMv2 |

## Classic Attack Primitives (overview; details in advanced cards)

- **Enumeration**: query a large amount of AD information anonymously/LDAP without privileges (tools: bloodhound, ldapsearch, PowerView).
- **Kerberoasting**: request the TGS ticket of a high-privilege service account and crack it offline.
- **AS-REP Roasting**: directly obtain a crackable AS-REP for accounts without pre-authentication enabled.
- **Pass-the-Hash / Ticket**: authenticate directly using a hash/ticket.
- **ACL/delegation abuse**: exploit misconfigured permissions on objects (WriteDACL, GenericAll, etc.).
- **Group Policy / scheduled tasks / SYSVOL**: historical plaintext password storage locations such as Group Policy Preferences.

## Key Points

- Domain penetration follows the route "**enumerate → find a path → escalate/lateral → reach the domain controller**"; BloodHound visualizes reachable relationships as a graph.
- The authentication protocols themselves are "designed correctly"; attacks mostly come from **misconfigurations and credential-management weaknesses**.
- Related details are spread across several cards: Lateral Movement and Pivoting, Privilege Escalation Overview.

## Related

- Lateral Movement and Pivoting
- Password Attacks and Credential Stealing

## Sources

- MITRE ATT&CK Enterprise Matrix: https://attack.mitre.org/matrices/enterprise/
- The Hacker Recipes: https://www.thehacker.recipes/
- HackTricks: https://book.hacktricks.xyz/
- Microsoft AD documentation: https://learn.microsoft.com/en-us/windows-server/identity/
