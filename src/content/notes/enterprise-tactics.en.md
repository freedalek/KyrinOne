---
title: "ATT&CK Enterprise — Tactics & Techniques"
description: "A walk through all 15 Enterprise tactics: each tactic's goal, prerequisite, mechanism families, telemetry, and detection opportunities, plus cross-tactic attack-chain relationships."
pubDate: 2026-08-17
tags: ["Offensive Security", "MITRE ATT&CK", "Enterprise", "Detection Engineering", "Threat Modeling"]
lang: "en"
langLink: "/zh/notes/enterprise-tactics/"
---

The Enterprise matrix currently lists **15 tactics** (technique counts as shown on the live site). This file walks each tactic: its goal, prerequisite, mechanism families, telemetry, and detection opportunities. Top-level technique IDs are listed per tactic; representative sub-techniques are noted where they matter for detection.

## Tactic Index (with technique counts)

| # | Tactic | ID | Techniques | Goal |
|---|--------|-----|-----------|------|
| 1 | Reconnaissance | TA0043 | 12 | learn about the victim from outside |
| 2 | Resource Development | TA0042 | 9 | acquire/prepare infrastructure & capabilities |
| 3 | Initial Access | TA0001 | 11 | get a foothold |
| 4 | Execution | TA0002 | 20 | run adversary-controlled code |
| 5 | Persistence | TA0003 | 22 | maintain access across reboots/re-auth |
| 6 | Privilege Escalation | TA0004 | 13 | gain higher permissions |
| 7 | Stealth | TA0005 | 30 | avoid detection |
| 8 | Defense Impairment | TA0112 | 18 | degrade/disable defensive controls |
| 9 | Credential Access | TA0006 | 17 | steal account material |
| 10 | Discovery | TA0007 | 34 | learn the environment from inside |
| 11 | Lateral Movement | TA0008 | 9 | move through the network |
| 12 | Collection | TA0009 | 17 | gather target data |
| 13 | Command and Control | TA0011 | 18 | communicate with the adversary |
| 14 | Exfiltration | TA0010 | 9 | remove data |
| 15 | Impact | TA0040 | 15 | disrupt/destroy/ransom |

> Note: historically "Defense Evasion" (TA0005) has been split on the current matrix into **Stealth** (TA0005) and **Defense Impairment** (TA0112). Content previously filed under Defense Evasion now distributes across these two tactics.

---

## 1. Reconnaissance (TA0043) — 12 techniques

**Goal / prerequisite.** Occurs before any foothold, entirely from the attacker's own infrastructure. No victim-system access required; the adversary needs only internet access and time.

**Techniques.** T1595 Active Scanning (IP blocks / vulnerability / wordlist), T1592 Gather Victim Host Information, T1589 Gather Victim Identity Information, T1590 Gather Victim Network Information, T1591 Gather Victim Org Information, T1598 Phishing for Information, T1597 Search Closed Sources, T1596 Search Open Technical Databases (DNS, WHOIS, certs, CDNs), T1593 Search Open Websites/Domains, T1594 Search Victim-Owned Websites, T1682 Query Public AI Services, T1681 Search Threat Vendor Data.

**Mechanism.** Passive (WHOIS, passive DNS, certificate transparency, search engines, public code repos) and active (port/service scans, wordlist brute-force of subdomains/URLs).

**Telemetry.** Recon from *outside* is mostly invisible to the victim's internal logs — the signals live in *external* telemetry: DNS query logs, web server access logs (for scans against public assets), firewall/IDS logs at the perimeter.

**Detection.** Volumetric heuristics (burst of 404s, many subdomain lookups), non-browser user-agent clusters, cert-transparency monitoring, honeypot/decoy assets. Correlate pre-access recon with later Initial Access from the same source IP.

## 2. Resource Development (TA0042) — 9 techniques

**Goal / prerequisite.** Build the means to attack: infrastructure, accounts, and payloads. No victim access; requires only attacker-side resources (or compromise of third parties).

**Techniques.** T1583 Acquire Infrastructure, T1586 Compromise Accounts, T1584 Compromise Infrastructure, T1587 Develop Capabilities, T1585 Establish Accounts, T1588 Obtain Capabilities, T1608 Stage Capabilities, T1650 Acquire Access, T1683 Generate Content.

**Mechanism.** Registering domains/VPS/botnets, purchasing credentials/exploits, building malware, standing up phishing/Malvertising/SEO-poisoning infrastructure.

**Detection.** Mostly out-of-band for the victim: domain reputation, passive DNS of newly-registered domains resembling the brand, typosquat detection, and third-party threat intel on staged malware. Internally: watch for newly-observed external domains in proxy/DNS logs.

## 3. Initial Access (TA0001) — 11 techniques

**Goal / prerequisite.** Obtain the first foothold. Prerequisite: reconnaissance and staged infrastructure; execution path varies (external exploit vs. user interaction).

**Techniques.** T1566 Phishing (spearphishing attachment/link/service/voice), T1190 Exploit Public-Facing Application, T1133 External Remote Services, T1078 Valid Accounts (default/domain/local/cloud), T1195 Supply Chain Compromise, T1199 Trusted Relationship, T1189 Drive-by Compromise, T1200 Hardware Additions, T1091 Replication Through Removable Media, T1669 Wi-Fi Networks, T1659 Content Injection.

**Mechanisms (the big three).**
- *Phishing* — deliver a malicious attachment or link, relying on the user to execute (see T1204 User Execution).
- *Exploit Public-Facing Application* — abuse a vulnerability in an internet-reachable app (web, VPN, email gateway) to run code. This is the canonical CVE/CWE/CAPEC bridge point.
- *Valid Accounts* — log in with stolen/default credentials, bypassing exploits entirely.

**Telemetry.** Email gateway verdicts (for phishing), web/application server access logs (for T1190), VPN/remote-access authentication logs (for T1133/T1078), and endpoint process-creation following a click.

**Detection.** Detect the *first action* rather than the access itself: post-exploit process spawns (weird parent→child), logons from unusual source IPs/geo, application crash→shell correlation, and the sudden appearance of web shells (T1505.003) on public servers.

## 4. Execution (TA0002) — 20 techniques

**Goal / prerequisite.** Run attacker code on a system. Prerequisite: some foothold or a delivery mechanism that a user unwittingly triggers.

**Techniques.** T1059 Command and Scripting Interpreter (PowerShell, Windows Command Shell, Unix Shell, Python, JavaScript, Visual Basic, AppleScript, Cloud API, and more), T1204 User Execution, T1203 Exploitation for Client Execution, T1106 Native API, T1569 System Services, T1053 Scheduled Task/Job, T1047 Windows Management Instrumentation, T1127 Trusted Developer Utilities Proxy Execution (MSBuild etc.), T1574 Hijack Execution Flow, T1559 Inter-Process Communication, T1648 Serverless Execution, T1674 Input Injection, T1677 Poisoned Pipeline Execution, and others.

**Mechanism.** Scripting engines and OS-native APIs are the workhorse: an adversary prefers `powershell`, `cmd`, `sh`, `python`, or `wmic` over dropping a compiled binary, because they are signed, ubiquitous, and logging-adjacent.

**Telemetry.** Process creation (the richest signal), command-line logging, script-block logging (PowerShell), Sysmon events, EDR process lineage.

**Detection.** Command-line analytics: suspicious flags (`-enc`, `IEX`, base64 blobs), obfuscation, scripting engine spawning a network connection, and anomalous parent→child pairs (e.g., Word spawning PowerShell → likely macro). Correlate with T1027 Obfuscated Files/Information.

## 5. Persistence (TA0003) — 22 techniques

**Goal / prerequisite.** Survive reboots, logoffs, and credential rotation. Prerequisite: code execution on the host.

**Techniques.** T1547 Boot or Logon Autostart Execution (Registry Run Keys, Winlogon Helper, LSASS Driver, etc.), T1053 Scheduled Task/Job (cron, systemd timers, `at`), T1543 Create or Modify System Process (Windows Service, systemd, LaunchDaemon), T1546 Event Triggered Execution (WMI event subscription, shell config, accessibility features, AppInit DLLs…), T1136 Create Account, T1098 Account Manipulation (SSH authorized_keys, cloud roles), T1137 Office Application Startup, T1505 Server Software Component (Web Shell), T1556 Modify Authentication Process, T1542 Pre-OS Boot, and more.

**Mechanism.** Hook one of the many auto-start mechanisms of an OS/app: registry `Run` keys, startup folders, services, launch agents/daemons, scheduled tasks, shell profiles, or replace an authentication component (password filter DLL, PAM, SSP).

**Telemetry.** Registry modification, service/daemon creation, scheduled-task creation, autostart directory writes, account creation, and file creation in known autostart locations.

**Detection.** Monitor for the *creation* of autostart artifacts (new Run keys, new services, new `cron` entries) rather than their execution; baseline known-good autostarts and alert on deltas. Web shells detected by anomalous file writes into web roots and unusual HTTP request patterns.

## 6. Privilege Escalation (TA0004) — 13 techniques

**Goal / prerequisite.** Move from user → admin/SYSTEM/root/domain-admin. Prerequisite: a lower-privileged foothold.

**Techniques.** T1548 Abuse Elevation Control Mechanism (setuid/setgid, Bypass UAC, Sudo caching), T1134 Access Token Manipulation (token impersonation, Parent PID spoofing, SID-History), T1055 Process Injection (DLL injection, process hollowing, APC, Ptrace), T1068 Exploitation for Privilege Escalation (kernel/OS CVE), T1053 Scheduled Task/Job (run as SYSTEM), T1611 Escape to Host (container breakout), T1574 Hijack Execution Flow (unquoted service path, DLL hijacking), T1484 Domain/Tenant Policy Modification.

**Mechanism.** Three families: (a) abuse a misconfigured elevation mechanism (weak service file permissions, unquoted paths, sudo rules), (b) exploit a kernel/OS vulnerability, (c) steal a higher-privileged token/context (impersonation, injection).

**Telemetry.** Process creation with privilege transitions, token/privilege audits, service config changes, kernel event logs.

**Detection.** Alert on integrity-level/uid changes during process life, token impersonation events, service binary path changes, and unusual child processes of high-privilege parents. For exploits, match to CVE-specific signatures.

## 7. Stealth (TA0005) — 30 techniques

**Goal / prerequisite.** Hide activity from analysts and automated tools. Prerequisite: ongoing presence.

**Techniques.** T1564 Hide Artifacts (hidden files, NTFS ADS, hidden users, VBA stomping), T1027 Obfuscated Files or Information (packing, base64, command obfuscation, fileless), T1036 Masquerading (rename legitimate utils, double extension, RLO), T1140 Deobfuscate/Decode, T1055 Process Injection (also a privesc mechanism), T1497 Virtualization/Sandbox Evasion, T1480 Execution Guardrails (environmental keying), T1620 Reflective Code Loading, T1218 System Binary Proxy Execution (regsvr32, rundll32, mshta — LOLBins), T1553 Subvert Trust Controls (code signing, root cert install, MOTW bypass), T1070 Indicator Removal, T1679 Selective Exclusion, and more.

**Mechanism.** Living-off-the-land (abusing signed OS binaries), obfuscation/packing, fileless execution in memory, and masquerading files/processes to look legitimate.

**Telemetry.** Script-block/command-line content, file-hash deviations, signed-binary invocation with unusual arguments, image-load events.

**Detection.** This is where EDR/behavioral analytics earn their keep: command-line obfuscation entropy, LOLBin parent-child anomalies, unsigned code loaded by signed processes, and known dual-use binaries invoked with network/script arguments.

## 8. Defense Impairment (TA0112) — 18 techniques

**Goal / prerequisite.** Degrade the victim's ability to detect or respond. Prerequisite: sufficient privilege to touch security tooling/logging.

**Techniques.** T1562/T1685 Disable or Modify Tools (disable AV/EDR, clear event logs, disable cloud logs/auditd), T1562 Impair Defenses (historical home), T1222 File and Directory Permissions Modification, T1484 Domain/Tenant Policy Modification, T1556 Modify Authentication Process, T1601 Modify System Image, T1686 Disable or Modify System Firewall, T1600 Weaken Encryption, T1689 Downgrade Attack, T1687 Exploitation for Defense Impairment, T1207 Rogue Domain Controller.

**Mechanism.** Stop services, clear/rotate logs, weaken crypto, modify GPO, disable firewalls, or patch the OS image itself.

**Telemetry.** Service stop events, audit-log clear events, security-policy changes, and the *absence* of expected telemetry (a detection signal in itself).

**Detection.** Alert on any event-log clear, AV/EDR service stop, firewall rule deletion, or GPO modification. Treat a sudden silence in an endpoint's telemetry stream as high-severity.

## 9. Credential Access (TA0006) — 17 techniques

**Goal / prerequisite.** Obtain passwords, hashes, tokens, tickets. Prerequisite: execution on a host, often with local admin for dumping.

**Techniques.** T1110 Brute Force (password guessing/cracking/spraying/stuffing), T1003 OS Credential Dumping (LSASS memory, SAM, NTDS, LSA secrets, DCSync, `/etc/shadow`), T1558 Steal or Forge Kerberos Tickets (Golden/Silver Ticket, Kerberoasting, AS-REP Roasting), T1555 Credentials from Password Stores (browsers, credential manager, keychain, secrets managers), T1552 Unsecured Credentials (files, registry, shell history, cloud metadata API, GPP), T1040 Network Sniffing, T1056 Input Capture (keylogging), T1111/T1621 MFA Interception/Request Generation, T1528 Steal Application Access Token, T1539 Steal Web Session Cookie, T1649 Steal/Forge Authentication Certificates, T1187 Forced Authentication, T1212 Exploitation for Credential Access.

**Mechanism (AD highlights).** Dumping `lsass.exe` for plaintext/NTLM, extracting the `NTDS.dit` for domain hashes, DCSync to request replication of secrets, Kerberoasting (request SPN tickets and offline-crack), and pass-the-hash/ticket for reuse.

**Telemetry.** Access to sensitive processes (Sysmon LSASS access), DC replication events, Kerberos TGS request anomalies, volume of auth failures (spraying), unusual file access (`/etc/shadow`).

**Detection.** Alert on LSASS access by non-protected processes, Kerberoasting (TGS requests for SPNs with weak encryption types), password-spray signature (many accounts, one password, spread over time), and DCSync (unexpected `DRSUAPI` replication).

## 10. Discovery (TA0007) — 34 techniques

**Goal / prerequisite.** Map the environment to plan the next move. Prerequisite: foothold.

**Techniques.** T1087 Account Discovery, T1082 System Information Discovery, T1016 System Network Configuration Discovery, T1018 Remote System Discovery, T1046 Network Service Discovery, T1135 Network Share Discovery, T1069 Permission Groups Discovery, T1007 System Service Discovery, T1057 Process Discovery, T1012 Query Registry, T1482 Domain Trust Discovery, T1526 Cloud Service Discovery, T1613 Container and Resource Discovery, T1580 Cloud Infrastructure Discovery, and more.

**Mechanism.** Enumerate via OS/cloud APIs: `whoami`, `net user /domain`, `ipconfig`, `nltest`, `BloodHound`-style graph collection, cloud metadata/service enumeration.

**Telemetry.** A burst of read-only enumeration commands from a single account, unusual query volumes, cloud API `List*`/`Describe*` call patterns.

**Detection.** Baseline per-account enumeration; alert on short-window spikes, on non-admin accounts enumerating the domain, and on known recon tooling command-lines (e.g., BloodHound/SharpHound collectors).

## 11. Lateral Movement (TA0008) — 9 techniques

**Goal / prerequisite.** Pivot from one compromised host to others. Prerequisite: credentials or an exploit for a remote service.

**Techniques.** T1021 Remote Services (RDP, SMB/Admin Shares, DCOM, SSH, VNC, WinRM, Cloud Services), T1550 Use Alternate Authentication Material (Pass the Hash, Pass the Ticket, Application Access Token, Web Session Cookie), T1210 Exploitation of Remote Services, T1570 Lateral Tool Transfer, T1563 Remote Service Session Hijacking, T1534 Internal Spearphishing, T1091 Replication Through Removable Media, T1080 Taint Shared Content.

**Mechanism.** Authenticate to a remote service (with stolen material) or exploit it, then transfer tooling (T1570) to the new host. Pass-the-Hash/Ticket reuse the credential material without the cleartext password.

**Telemetry.** New logon types (type 3/10) between hosts, authentication using known-compromised material, SMB/RDP/WinRM connection logs, file-creation of tools on remote shares.

**Detection.** Alert on admin logons from workstation→workstation (unusual source), PtH signatures (NTLM without interactive logon), and lateral transfer of known dual-use tools over SMB/admin shares.

## 12. Collection (TA0009) — 17 techniques

**Goal / prerequisite.** Aggregate data of value. Prerequisite: access to the target data store.

**Techniques.** T1005 Data from Local System, T1039 Data from Network Shared Drive, T1530 Data from Cloud Storage, T1213 Data from Information Repositories (SharePoint, Confluence, code repos, DBs), T1114 Email Collection (incl. Email Forwarding Rule), T1056 Input Capture, T1113 Screen Capture, T1560 Archive Collected Data, T1074 Data Staged, T1025 Data from Removable Media, T1602 Data from Configuration Repository.

**Mechanism.** Read files, query DBs/repos, screenshot, capture keystrokes, then stage/compress the haul (T1560 archive) into a staging directory (T1074).

**Telemetry.** Mass file-read/open patterns, archive-utility invocation (7z/zip/tar), unusual cloud storage API `Get*` volume, mailbox forwarding-rule creation.

**Detection.** Alert on bulk file access anomalies, on archiving followed shortly by outbound transfer (chain to Exfiltration), and on mailbox rule creation (a classic collection+persistence signal).

## 13. Command and Control (TA0011) — 18 techniques

**Goal / prerequisite.** Maintain a control channel to a compromised asset. Prerequisite: execution on the host and network egress.

**Techniques.** T1071 Application Layer Protocol (HTTP/HTTPS, DNS, mail), T1573 Encrypted Channel, T1572 Protocol Tunneling, T1090 Proxy (incl. Domain Fronting), T1568 Dynamic Resolution (Fast Flux, DGA), T1105 Ingress Tool Transfer, T1219 Remote Access Tools, T1008 Fallback Channels, T1104 Multi-Stage Channels, T1095 Non-Application Layer Protocol, T1571 Non-Standard Port, T1132 Data Encoding, T1001 Data Obfuscation, T1205 Traffic Signaling (port knocking).

**Mechanism.** Beacon over a common protocol to blend in, encrypted/tunneled, with dynamic resolution (DGA domains) or proxies to resist blocking/takedown.

**Telemetry.** DNS query patterns (NXDOMAIN storms for DGA, long/subdomain-heavy queries), proxy/web filter logs, unusual beacons (periodic, low-jitter), outbound connections from odd processes.

**Detection.** DGA detection via NXDOMAIN entropy and lexical analysis of domains; beaconing via periodicity analysis on netflow/proxy; protocol-tunneling via anomalous traffic over non-standard ports; ingress-tool-transfer via executable downloads to suspicious locations.

## 14. Exfiltration (TA0010) — 9 techniques

**Goal / prerequisite.** Move collected data out. Prerequisite: collected data staged + egress.

**Techniques.** T1041 Exfiltration Over C2 Channel, T1567 Exfiltration Over Web Service (cloud storage, webmail), T1020 Automated Exfiltration, T1011 Exfiltration Over Other Network Medium, T1048 Exfiltration Over Alternative Protocol (HTTP/DNS/SMB), T1052 Exfiltration Over Physical Medium, T1041/C2-channel reuse.

**Mechanism.** Reuse the C2 channel or abuse a sanctioned channel (cloud storage API, email) to push data out, often chunked, compressed, or scheduled (T1020) to blend in.

**Telemetry.** Outbound byte-volume anomalies, uploads to cloud-storage domains from non-browser processes, DNS queries with unusually large/long payloads (DNS exfil).

**Detection.** Track egress volume per host/account against baseline; detect data leaving via unusual protocols (DNS TXT with high entropy, SMB to external); correlate large internal collection (§12) with subsequent outbound bursts.

## 15. Impact (TA0040) — 15 techniques

**Goal / prerequisite.** Disrupt availability or integrity (ransom, wipe, DoS). Prerequisite: sufficient privilege; often the terminal stage.

**Techniques.** T1486 Data Encrypted for Impact (ransomware), T1485 Data Destruction, T1490 Inhibit System Recovery (delete shadow copies/backups), T1498 Network Denial of Service, T1491 Defacement, T1489 Service Stop, T1495 Firmware Corruption, T1561 Disk Wipe, T1529 System Shutdown/Reboot, and more.

**Mechanism.** Encrypt/wipe data, destroy backups first (to force ransom), then disrupt services.

**Telemetry.** Mass file-write/rename/encrypt bursts, volume-shadow-copy deletion commands (`vssadmin delete shadows`), backup-tool interactions.

**Detection.** Alert on bulk file-extension changes, shadow-copy deletion, backup tampering, and rapid encryption-like I/O — ideally with automatic isolation/playbook response, since Impact is the last chance to stop the attack.

---

## Cross-Tactic Relationships (attack-chain reasoning)

- **Initial Access → Execution**: T1566 Phishing requires T1204 User Execution to land code.
- **Execution → Persistence**: code execution writes an autostart artifact (T1547/T1053).
- **Persistence → Privilege Escalation**: many autostarts also elevate (service as SYSTEM).
- **Credential Access → Lateral Movement**: dumped hashes/tickets (T1003/T1558) are reused via T1550.
- **Collection → C2 → Exfiltration**: staged data (T1074) rides the C2 channel out (T1041).
- **Stealth/Defense Impairment** run *in parallel* across the whole chain, protecting every other stage.
- **Discovery** runs continuously, feeding each subsequent pivot decision.

## Sources

- https://attack.mitre.org/matrices/enterprise/
- https://attack.mitre.org/
