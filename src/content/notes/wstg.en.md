---
title: "OWASP WSTG — Web Security Testing Guide"
description: "The premier methodology and canonical how-to checklist for testing web application security, its scenario identifier format, testing categories, and how it maps onto the ATT&CK chain."
pubDate: 2026-08-17
tags: ["Offensive Security", "OWASP", "Web Security", "Penetration Testing", "Methodology"]
lang: "en"
langLink: "/zh/notes/wstg/"
---

The **Web Security Testing Guide (WSTG)** is the premier methodology for testing web application
security — the canonical *how-to* checklist used by penetration testers worldwide. It complements the
ASVS ("what to verify") and the Top 10 ("what matters"). The stable release is **4.2** (December 2020);
version **5.0** is in development.

## Scenario Identifier Format

Each test has an identifier `WSTG-<category>-<number>` where category is a 4-char uppercase code and
number is zero-padded 01–99. Versioned form is `WSTG-v<version>-<category>-<number>` (version tag with
punctuation removed), e.g. `WSTG-v41-INFO-02`. **Always version-pin references** in reports, since
identifiers change between versions.

## Testing Categories (WSTG 4.x)

The guide groups tests into these categories (4-char codes):

| Code | Category | Representative tests |
|------|----------|---------------------|
| INFO | Information Gathering | fingerprint web server, review web app meta files, enumerate apps on server, identify entry points |
| CONF | Configuration & Deployment Mgmt | test network infra config, app platform config, file extension/old backup handling, HTTP methods |
| IDNT | Identity Management | role definitions, user registration, account provisioning, username enumeration |
| AUTHN | Authentication | default/guessable creds, weak lockout, bypassing auth schema, remember-password brute force, weak password change |
| AUTHZ | Authorization | directory traversal/file include, bypassing authorization schema, IDOR, privilege escalation |
| SESS | Session Management | session fixation, cookie attributes, logout, CSRF, tokens in URL |
| INPV | Input Validation | XSS, SQLi, LDAP/ORM/XML/SSI/XPath injection, code injection, command injection, format string, SSTI |
| ERR | Error Handling | stack traces, error codes, exception leakage |
| CRYPST | Cryptography | weak SSL/TLS, padding oracle, weak channel |
| BUSLOGIC | Business Logic | data validation, integrity, workflow abuse, limits abuse |
| CLIENT | Client-Side | DOM XSS, JavaScript execution, HTML injection, CSS injection, WebSockets, clickjacking |

> Category codes and exact test numbering are version-specific; the authoritative list lives in the
> WSTG repository (`wstg/document`).

## How WSTG Fits the Offensive Workflow

WSTG is organized as a *methodology* to run end-to-end, but maps cleanly onto the ATT&CK chain:

- **INFO** ≙ Reconnaissance / Discovery (TA0043 / TA0007).
- **AUTHN / AUTHZ / IDNT / SESS** ≙ Initial Access via Valid Accounts (T1078) and Credential Access
  (TA0006).
- **INPV / ERR / CRYPST** ≙ Initial Access via Exploit Public-Facing Application (T1190).
- **CLIENT** ≙ Execution via User Execution (T1204) and Phishing (T1566).
- **BUSLOGIC** ≙ the abuse-of-functionality that lives between OWASP A01 and A10.

## Companion Resources

- **ASVS** — the "what to verify" counterpart (see ASVS).
- **Cheat Sheet Series** — defensive fixes for each WSTG finding (see Cheat Sheet Series).
- **PortSwigger Web Security Academy** — hands-on labs for the same vulnerability classes (see
  Web Attack Surface).

## Sources

- OWASP Web Security Testing Guide: https://owasp.org/www-project-web-security-testing-guide/
