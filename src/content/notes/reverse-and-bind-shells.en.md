---
title: "Reverse and Bind Shells"
description: "The two basic shell channels for establishing bidirectional interaction with the attacker machine after code execution: reverse (the target connects back) and bind (the target opens a port)."
pubDate: 2026-09-07
tags: ["Reverse Shell", "Bind Shell", "Payload", "Netcat"]
lang: "en"
langLink: "/zh/notes/reverse-and-bind-shells/"
---

## Reverse Shell (reverse / callback) — more common

- **Process**: the target machine actively initiates a TCP connection to a port the attacker machine is listening on.
- **Pros**: outbound traffic from the target is usually less restricted; the attacker machine can be behind NAT.
- **Cons**: the attacker machine needs a publicly reachable address; outbound firewalls may still block it.

## Bind Shell

- **Process**: the target machine listens on a port and the attacker machine connects to it.
- **Pros**: no public address/listener needed on the attacker machine.
- **Cons**: inbound connections are often blocked by the target's firewall; the port must be guessed to be available; hard to use in NAT scenarios.

## Common Tooling

- `nc` (netcat) for basic send/receive; `ncat` (Nmap version, supports encryption and more stable connections)
- Metasploit `meterpreter` payload → see Payloads and Metasploit Basics
- Multi-language one-liners (bash/python/powershell), commonly used for fileless execution on Windows/Linux
- Encrypted channels (e.g. `msfvenom` + TLS, SSH tunnel callback) for evading detection

## Key Points

- **Reverse + listener is the default choice**; use a bind shell only when the network topology requires it.
- Interaction stability: prefer adding `pty`/terminal emulation (`script`, `python pty`, socat) to get a full TTY for privilege-escalation work.
- Connections attract attention from AV/EDR and network monitoring; see later cards for encryption and obfuscation.
- Right after getting a shell, record the context: `id`, `whoami`, IP, privileges → move on to Privilege Escalation Overview.

## Related

- Exploitation and Initial Access
- Payloads and Metasploit Basics
- Privilege Escalation Overview

## Sources

- PortSwigger Web Security Academy (shell and exploitation basics): https://portswigger.net/web-security
- HackTricks (shell quick reference): https://book.hacktricks.xyz/
