---
title: "Intelligence Gathering Overview"
description: "The first technical phase of a penetration test: collect as much target information as possible before exploitation, feeding threat modeling and vulnerability analysis."
pubDate: 2026-09-07
tags: ["Penetration Testing", "Reconnaissance", "OSINT", "Intelligence Gathering"]
lang: "en"
langLink: "/zh/notes/intelligence-gathering-overview/"
---

## Passive vs Active

| | **Passive (OSINT)** | **Active** |
|---|---|---|
| Definition | Does not directly touch the target system; obtains information only from third-party public channels | Directly interacts with the target (sends requests/probes) |
| Methods | Search engines, certificate transparency, WHOIS, DNS, GitHub, tender/bid information, cloud drives/document sites | Port scanning, service probing, directory enumeration, active DNS queries, fingerprinting |
| Detectable by the target | Essentially invisible | Will be found in logs/IDS |
| Legal risk | Low (still mind data compliance) | Higher; must stay within authorized scope |

## Typical Passive Sources

- **Search engines (Google Dorking / site search)**
- **Certificate Transparency logs** (crt.sh, etc.) — can enumerate subdomains
- **Passive DNS enumeration** (historical DNS, dnsdumpster, etc.)
- **WHOIS / RDAP** — registrant, contacts, network block ownership
- **Code hosting platforms** (secrets/internal domains leaked on GitHub)
- **Social platforms / job postings / document sharing** — leak tech stacks and internal naming
- **Internet-wide scanning such as Shodan / Censys** — asset exposure surface

## Typical Active Techniques

- Liveness detection (ICMP/TCP)
- Port scanning and service version identification → see Port Scanning and Service Enumeration
- Web directory/file brute-forcing, fingerprinting
- DNS zone transfer / subdomain brute-forcing → see DNS Enumeration

## Key Points

- Process: **passive first, active second**; broad first (asset surface), then deep (single-point detail).
- Intelligence must be **recorded and organized** (asset inventory, tech stack, entry-point hypotheses) as input for later phases.
- Every step is premised on RoE authorization; active probing is performed only within authorized network blocks.

## Related

- Penetration Testing Methodology (PTES)
- Port Scanning and Service Enumeration
- DNS Enumeration

## Sources

- PTES Intelligence Gathering phase: http://www.pentest-standard.org/index.php/Intelligence_Gathering
- OWASP WSTG (reconnaissance chapter): https://owasp.org/www-project-web-security-testing-guide/
