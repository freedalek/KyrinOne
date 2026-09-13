---
title: "Password Attacks and Credential Stealing"
description: "Passwords are the most common weak point: online vs offline attacks, guessing modes like dictionary, rules and spraying, and the efficient path of grabbing already-stored credentials."
pubDate: 2026-09-07
tags: ["Password Attacks", "Credential Theft", "Hash Cracking", "Penetration Testing"]
lang: "en"
langLink: "/zh/notes/password-attacks-and-credential-stealing/"
---

## Online vs Offline

| | **Online** | **Offline** |
|---|---|---|
| Principle | Submit login attempts directly to the service | Crack locally after obtaining the password hash |
| Tools | Hydra, medusa, Burp Intruder | hashcat, John the Ripper |
| Bottleneck | Rate limiting/lockout policy of the target service | Local GPU/CPU compute power |
| Risk | Easily triggers lockout/alerts | Requires obtaining the hash first |

## Basic Password Guessing Modes

- **Brute force**: huge search space, rarely used in practice.
- **Dictionary / wordlist**: based on common passwords and leaked wordlists (rockyou, etc.).
- **Rule / mangling**: transform the dictionary (append digits, change case, add years).
- **Password spraying**: a few common passwords × many accounts, avoiding lockouts (relatively slow and spread out).
- **Default passwords**: vendor default/weak password lists targeting specific devices.

## Credential Acquisition and Theft (a more efficient path)

- Local target system: `/etc/shadow`, SAM, browser-saved passwords, hardcoded keys in config files.
- Windows: password hashes/plaintext in memory (LSASS, mimikatz, etc.) → see the AD cards for deeper coverage.
- Web applications: password hashes in databases, `.env`, backup files.
- Historical leaks (HaveIBeenPwned/rockyou) and password reuse.

## Key Points

- The hash type determines cracking speed (`$2y$` bcrypt is slow, MD5/NTLM are fast); identify the hash format first (`hashid`).
- **Spraying before brute force**: modern enterprises generally have lockout policies.
- After obtaining credentials, focus on **reuse and privilege escalation**: the same password may open multiple machines/systems.

## Related

- Exploitation-and-Initial-Access
- Active-Directory-Attack-Primer

## Sources

- hashcat wiki: https://hashcat.net/wiki/
- John the Ripper: https://www.openwall.com/john/
- HackTricks: https://book.hacktricks.xyz/
