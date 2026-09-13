---
title: "DNS Enumeration"
description: "Using DNS records to discover subdomains, hostnames, services, and the assets behind them — often the single richest source of information during reconnaissance."
pubDate: 2026-09-07
tags: ["Penetration Testing", "Reconnaissance", "DNS", "Enumeration"]
lang: "en"
langLink: "/zh/notes/dns-enumeration/"
---

## Key Record Types (RFC 1035, etc.)

| Type | Purpose | Penetration relevance |
|------|---------|-----------------------|
| A / AAAA | IPv4 / IPv6 address | Asset location |
| CNAME | Alias | Exposes internal hostnames/third-party services (e.g. cloud storage) |
| MX | Mail server | Mail gateways/internal naming |
| NS | Authoritative name server | Potential management entry point |
| TXT | Arbitrary text | Often leaks SPF/DKIM, verification strings, even keys |
| SOA | Zone authority info | Admin email, serial number |
| SRV (RFC 2782) | Service location | Discovering AD/internal service records |

## Techniques

1. **Subdomain enumeration (brute-forcing)**: use wordlists + public subdomain data (crt.sh certificate transparency, dnsdumpster, brute-force tools) to collect `*.target.com`.
2. **Zone Transfer (AXFR)**: if the NS server is misconfigured (`allow-transfer` open), the entire zone can be pulled directly — very rare but high value.
3. **Reverse resolution / adjacent network blocks**: reverse-look up domains from known IPs to map the target's IP asset surface.
4. **Watch for wildcard records**: distinguish real subdomains from `*.` wildcard results.

## Common Tools

`dig`, `host`, `nslookup` (basics); `amass`, `subfinder`, `massdns` (large scale); `dnsrecon` (includes zone transfer detection).

## Key Points

- First find the **root domain + NS ownership**, then enumerate subdomains, then dig deeper into high-value subdomains (VPN, mail, AD, dev, git).
- Zone transfers and internal naming in TXT records are often overlooked high-value findings.
- Results go into the asset inventory for later scanning and web enumeration (see Web Enumeration and Fingerprinting).

## Related

- Intelligence Gathering Overview
- Web Enumeration and Fingerprinting

## Sources

- RFC 1035 (domain names and DNS spec): https://www.rfc-editor.org/rfc/rfc1035
- RFC 2782 (SRV): https://www.rfc-editor.org/rfc/rfc2782
- OWASP WSTG (subdomain and infrastructure reconnaissance): https://owasp.org/www-project-web-security-testing-guide/
