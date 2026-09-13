---
title: "Linux Security Model Basics"
description: "Users, permission bits, SUID, sudo, capabilities, services and task scheduling — the shared foundation of Linux privilege escalation and hardening."
pubDate: 2026-09-07
tags: ["Linux", "Privilege Escalation", "Security Model", "Penetration Testing"]
lang: "en"
langLink: "/zh/notes/linux-security-model-basics/"
---

## Users & Permissions

- UID 0 = root; regular users; system accounts. `/etc/passwd` (users), `/etc/shadow` (password hashes, readable by root).
- Three permission groups: owner / group / other, read-write-execute (r/w/x); `setuid` (s/S) makes a program run as its **owner**.
- `sudo`: authorizes specific users to execute commands with privileges—`sudo -l` is the first step of privilege-escalation enumeration.
- ACLs (`setfacl`) provide finer-grained authorization on top of the traditional bits.

## Setuid / SUID

- Binaries owned by root with setuid execute as root. Escalation focus: can they be exploited (writable, abusable arguments, GTFOBins).
- See GTFOBins (https://gtfobins.github.io/) to determine whether a binary can be abused for privilege escalation.

## Capabilities

- Modern Linux splits root's superuser privileges into **capability bits** (e.g. `CAP_DAC_OVERRIDE`, `CAP_SETUID`).
- Misconfiguration (giving an ordinary binary sensitive capabilities via setcap) introduces an escalation surface. See `capabilities(7)`.

## Services, Cron & Files

- systemd services (`/etc/systemd/system`, `/lib/systemd/system`): writable unit files or a replaceable ExecStart → root execution.
- cron: user-writable cron scripts/paths that run with privileges become an escalation surface.
- Writable sensitive files (`/etc/passwd`, `/etc/sudoers`, PATH hijacking) are low-hanging fruit.

## Key Points

- Linux privilege-escalation enumeration main line: **uid/sudo -l → SUID/setcap → writable files and scripts → cron/systemd → kernel version → known exploits**.
- Every place that is "writable and executed with privileges" is an escalation entry point.
- The reverse is the hardening checklist: least privilege, clean up SUID, restrict sudoers, make critical paths read-only.

## Related

- Privilege-Escalation-Overview
- Reverse-and-Bind-Shells

## Sources

- Linux man-pages `capabilities(7)`: https://man7.org/linux/man-pages/man7/capabilities.7.html
- GNU coreutils manual: https://www.gnu.org/software/coreutils/manual/
- HackTricks: https://book.hacktricks.xyz/
