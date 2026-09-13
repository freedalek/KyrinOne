---
title: "Port Scanning and Service Enumeration"
description: "Port scanning discovers which ports are open while service enumeration identifies what runs behind them, together producing the service inventory that defines the attack surface."
pubDate: 2026-09-07
tags: ["Port Scanning", "Service Enumeration", "Nmap", "Reconnaissance"]
lang: "en"
langLink: "/zh/notes/port-scanning-and-service-enumeration/"
---

## Port States (nmap)

- **open**: a service is listening; can be probed further.
- **closed**: reachable but no service.
- **filtered**: dropped by a firewall/ACL, state indeterminate (default TCP SYN receives no response).
- **unfiltered** (ACK scan only): reachable but open/closed cannot be determined.
- **open|filtered / closed|filtered**: cannot be distinguished (common for UDP / FIN-type scans).

## TCP Scan Types (nmap semantics)

| Option | Name | Key principle |
|--------|------|---------------|
| `-sS` | SYN scan (half-open) | Send SYN; SYN/ACK = open, RST = closed, no response = filtered; default and most common (requires privileges) |
| `-sT` | TCP connect | Full three-way handshake (connect system call); default fallback without privileges |
| `-sA` | ACK scan | Probes firewall rules (unfiltered/filtered); does not determine open/closed |
| `-sN/-sF/-sX` | NULL/FIN/Xmas | Based on RFC 793 behavior differences; many systems drop open ports and RST closed ones; unreliable and error-prone |
| `-sU` | UDP scan | Sends UDP probes; ICMP port-unreachable = closed; no response is often open\|filtered; slow and uncertain |

## Service Enumeration

- `-sV` (version detection): identifies service and application versions → used to match known vulnerabilities (see Vulnerability Identification).
- Banner grabbing: connect directly to the port and read the banner (`nc`).
- Default scripts `-sC` / NSE (`--script`) and `-O` (OS fingerprinting).
- Common port quick reference (IANA registered): 22 SSH · 80/443 HTTP(S) · 21 FTP · 25 SMTP · 53 DNS · 139/445 SMB · 389/636 LDAP(S) · 1433 MSSQL · 3306 MySQL · 5432 PostgreSQL · 6379 Redis · 27017 MongoDB · 3389 RDP · 5985/5986 WinRM · 9100 printing.

## Key Points

- Scanning priority: first sweep all ports / popular ports to map the surface, then use `-sV` to go deep on "open services."
- **An open port ≠ exploitable**: the service version and authentication method must still be confirmed.
- UDP scanning is slow and often produces false positives; focus on common UDP services such as 53/161/500/4500.

## Related

- Intelligence Gathering Overview
- Vulnerability Identification
- Web Enumeration and Fingerprinting

## Sources

- Nmap official documentation (Reference Guide / port scanning techniques chapter): https://nmap.org/book/toc.html
- RFC 793 (TCP): https://www.rfc-editor.org/rfc/rfc793 (TCP)
- IANA Service Name and Transport Protocol Port Number Registry: https://www.iana.org/assignments/service-names-port-numbers/
