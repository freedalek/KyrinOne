---
title: "Offensive Kill Chain — Phase Model"
description: "The end-to-end chain-reasoning model for offensive security: twelve phases mapped to MITRE ATT&CK tactics, each read through prerequisite, mechanism, telemetry, and detection."
pubDate: 2026-08-17
tags: ["Offensive Security", "Kill Chain", "MITRE ATT&CK", "Threat Modeling", "Detection Engineering"]
lang: "en"
langLink: "/zh/notes/offensive-kill-chain/"
---

This file provides the end-to-end *chain reasoning* model for offensive security. It is the mental
skeleton that the tactic-by-tactic detail in Enterprise Tactics hangs on. Each phase answers the same
four questions: **prerequisite, mechanism, telemetry, detection** — plus what the adversary is trying
to achieve and what the defender should watch for.

## The Chain

```
Reconnaissance ──► Enumeration ──► Initial Access ──► Privilege Escalation
     ▲                                                      │
     │                Command & Control ◄───────────────────┤
     │                       │                              │
     │                       ▼                              ▼
 Exfiltration ◄── Collection ◄── Lateral Movement ◄── Credential Access
                                                     (and Persistence
                                                      + Defense Evasion
                                                      run in parallel)
```

## Phase-by-Phase

### 1. Reconnaissance (≙ ATT&CK TA0043)
- **Goal**: learn the target from outside.
- **Prerequisite**: none (internet access).
- **Mechanism**: passive (WHOIS, DNS, cert transparency, search engines, code repos, OSINT) and
  active (port/service/subdomain scanning).
- **Telemetry**: external — DNS/web/edge logs; the victim sees only the *active* subset.
- **Detection**: scan-volume heuristics, non-browser UA clusters, decoy assets.

### 2. Enumeration (≙ TA0007 Discovery, but pre- and post-access)
- **Goal**: map users, hosts, services, software versions, vulnerabilities.
- **Mechanism**: service banners, version probes, directory/API enumeration, credential/wordlist checks.
- **Telemetry**: web access logs, auth failures, service logs.
- **Detection**: 404/dir-burst signatures, rate-limit auth failures, baseline deviation.

### 3. Initial Access (≙ TA0001)
- **Goal**: first foothold.
- **Mechanism**: phishing (T1566), exploit public-facing app (T1190), valid accounts (T1078),
  external remote services (T1133), supply chain (T1195), drive-by (T1189).
- **Telemetry**: email gateway, app/web logs, VPN/auth logs, EDR process creation.
- **Detection**: post-click process anomalies, exploit→shell correlation, anomalous logons.

### 4. Privilege Escalation (≙ TA0004)
- **Goal**: user → admin/SYSTEM/root/DA.
- **Mechanism**: misconfigured elevation (setuid, sudo, service paths, UAC), kernel exploits,
  token theft/injection, container escape.
- **Telemetry**: privilege-transition events, token audits, service config changes.
- **Detection**: integrity-level/uid changes, impersonation events, unusual high-priv children.

### 5. Persistence (≙ TA0003)
- **Goal**: survive reboots/re-auth.
- **Mechanism**: autostarts (Run keys, services, cron/systemd, launchd), scheduled tasks, web shells,
  account creation, authn-modification (SSP, PAM, password filter).
- **Telemetry**: registry/service/task creation, autostart dir writes, new accounts.
- **Detection**: autostart deltas against baseline; new accounts; web-shell file writes.

### 6. Credential Access (≙ TA0006)
- **Goal**: harvest hashes/tokens/tickets/passwords.
- **Mechanism**: LSASS/SAM/NTDS dumping, DCSync, Kerberoasting/AS-REP, pass-the-hash/ticket,
  keylogging, sniffing, cloud metadata API.
- **Telemetry**: LSASS access, DC replication, Kerberos ticket anomalies, auth-failure bursts.
- **Detection**: LSASS access alerts, Kerberoasting signatures, DCSync detection, spray signatures.

### 7. Defense Evasion (≙ Stealth TA0005 + Defense Impairment TA0112)
- **Goal**: avoid/degrade detection.
- **Mechanism**: obfuscation/packing, LOLBins, fileless execution, masquerading, log clearing,
  AV/EDR disable, firewall/GPO modification.
- **Telemetry**: command-line content, script-block logs, service-stop/audit-clear events, telemetry
  *silence*.
- **Detection**: obfuscation entropy, LOLBin anomalies, event-log-clear alerts, EDR silence.

### 8. Lateral Movement (≙ TA0008)
- **Goal**: pivot across hosts.
- **Mechanism**: remote services (RDP/SMB/SSH/WinRM), PtH/PtT, remote-service exploits, tool transfer.
- **Telemetry**: cross-host logons, PtH signatures, SMB/WinRM logs.
- **Detection**: anomalous workstation↔workstation admin logons, NTLM-without-interactive, tool
  transfer over admin shares.

### 9. Collection (≙ TA0009)
- **Goal**: aggregate target data.
- **Mechanism**: file/DB/cloud reads, email forwarding rules, screen/key capture, archiving + staging.
- **Telemetry**: bulk file access, archive-utility spawns, cloud `Get*` volume, mailbox rules.
- **Detection**: bulk-read anomalies, archive→outbound chain, mailbox-rule creation.

### 10. Command and Control (≙ TA0011)
- **Goal**: maintain control channel.
- **Mechanism**: HTTP/DNS beaconing, encrypted/tunneled channels, DGA/fast-flux, proxies.
- **Telemetry**: DNS NXDOMAIN/DGA patterns, proxy/web logs, netflow periodicity.
- **Detection**: DGA lexical/entropy analysis, beaconing periodicity, tunneling anomalies.

### 11. Exfiltration (≙ TA0010)
- **Goal**: remove data.
- **Mechanism**: over C2 channel, cloud storage/webmail, alternative protocols (DNS/HTTP), scheduled.
- **Telemetry**: egress volume anomalies, non-browser uploads, high-entropy DNS.
- **Detection**: egress baseline deviation, unusual-protocol data egress, collection→exfil correlation.

### 12. Impact (≙ TA0040) — often the terminal phase
- **Goal**: ransom/wipe/DoS.
- **Mechanism**: encryption, shadow-copy/backup deletion, service stop, defacement.
- **Telemetry**: mass file-rename/encrypt, `vssadmin delete shadows`, backup tampering.
- **Detection**: encryption-burst alerts + automatic isolation playbooks.

## Reasoning Principles

1. **Chains, not shots.** Rarely is a compromise a single action; model and hunt the *sequence*.
2. **Every hop has a prerequisite.** Ask "what must the attacker already have?" to identify the
   control that would have broken the chain.
3. **Telemetry is the lens.** A technique only matters for defense if it leaves a log — always name
   the data component (ATT&CK) that would record it.
4. **Parallel tracks.** Stealth, Defense Impairment, Persistence, and Discovery run *continuously*
   alongside the main chain, not as discrete steps.

## Cross-references

- Tactic-level detail and technique IDs: Enterprise Tactics.
- Root causes behind each hop: CWE.
- Generic attack plays: CAPEC.
- Web-specific execution: OWASP and Web Attacks.

## Sources

- MITRE ATT&CK: https://attack.mitre.org/
