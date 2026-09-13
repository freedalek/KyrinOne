---
title: "OWASP Cheat Sheet Series — Defensive Catalog"
description: "A concise, defense-focused catalog of roughly 130 OWASP cheat sheets on application security topics, plus cross-reference indexes mapping them to ASVS, MASVS, Proactive Controls, and the Top 10."
pubDate: 2026-08-17
tags: ["Offensive Security", "OWASP", "Application Security", "Defense", "Cheat Sheets"]
lang: "en"
langLink: "/zh/notes/cheat-sheet-series/"
---

The **Cheat Sheet Series** is a concise collection of high-value, defense-focused guidance on specific
application security topics. It is the *fix* side of the OWASP triad: Top 10 identifies risk, WSTG
tests for it, and the Cheat Sheets tell you how to prevent it. The series also ships **cross-reference
indexes** mapping cheat sheets to ASVS, MASVS, Proactive Controls, and the Top 10. It contains roughly
130 cheat sheets and is distributed under CC BY-SA 4.0.

## Organization & Indexes

- **Index Alphabetical** (Glossary) — full alphabetical list.
- **Index ASVS** — maps cheat sheets to ASVS requirements.
- **Index MASVS** — maps to the Mobile Application Security Verification Standard.
- **Index Proactive Controls** — maps to OWASP Top 10 Proactive Controls.
- **Index Top 10** — maps to OWASP Top 10 categories.

## Notable Cheat Sheets (grouped by concern)

**Injection defenses**
SQL Injection Prevention, LDAP Injection Prevention, OS Command Injection Defense, Injection
Prevention (general), Injection Prevention in Java, Query Parameterization, XSS Filter Evasion,
XML External Entity Prevention, Deserialization.

**Access control & authn**
Access Control, Authorization, Authentication, Multifactor Authentication, Password Storage, Forgot
Password, Session Management, Credential Stuffing Prevention, Choosing/Using Security Questions,
IDOR Prevention.

**Data protection & crypto**
Cryptographic Storage, Key Management, TLS, TLS Cipher String, Transport Layer Protection, Secrets
Management, Pinning.

**Infrastructure & cloud**
Docker Security, Kubernetes Security, Secure Cloud Architecture, Serverless FaaS Security,
Infrastructure as Code Security, Network Segmentation, CI/CD Security, GitHub Actions Security,
Microservices Security, Zero Trust Architecture.

**AI / LLM (newer)**
LLM Prompt Injection Prevention, AI Agent Security, RAG Security, Secure AI Model Ops, Secure Coding
with AI, MCP Security.

**Web fundamentals**
Cross Site Scripting Prevention, DOM based XSS Prevention, CSRF Prevention, Clickjacking Defense,
Content Security Policy, HTTP Headers, HTTP Strict Transport Security, WebSocket Security, SSRF
Prevention, Subdomain Takeover Prevention, File Upload, REST Security, REST Assessment, GraphQL,
gRPC Security, NoSQL Security, Prototype Pollution Prevention, DOM Clobbering Prevention, XS Leaks.

**SDLC / process**
Threat Modeling, Secure Code Review, Secure Product Design, Software Supply Chain Security, Attack
Surface Analysis, Vulnerable Dependency Management, Logging, Error Handling, Business Logic Security,
Transaction Authorization.

## How to Use Offensively & Defensively

- **Offensive**: read the *defense* to know exactly what a well-hardened target looks like, and where
  its gaps are. E.g., the CSP cheat sheet enumerates bypass-resistant directives — a pentester tests
  against those exact controls.
- **Defensive**: use the Top 10 / ASVS index to find the precise fix for each finding in a report.
- **Cross-check**: each cheat sheet is a compact synthesis; verify against the primary standard
  (WSTG/ASVS) and the vendor documentation when precision matters.

## Sources

- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
