---
title: "Key Exchange"
description: "How two parties agree on a shared secret over a public channel — Diffie–Hellman, standardized groups and X25519, authenticated key exchange, KDFs, and the quantum threat."
pubDate: 2026-08-16
tags: ["Cryptography", "Key Exchange", "Diffie–Hellman", "TLS", "Post-Quantum"]
lang: "en"
langLink: "/zh/notes/key-exchange/"
---

Key exchange lets two parties establish a shared secret over a public channel. The shared secret
then keys a symmetric AEAD. Security requires both *secrecy* (an eavesdropper learns nothing) and
*authenticity* (the parties are who they claim to be).

## 1. Diffie–Hellman

**Setup.** Public parameters: cyclic group $\mathbb{G}$ of prime order $q$, generator $g$.

**Protocol.** Alice picks $a \leftarrow \mathbb{Z}_q$, sends $A = g^a$; Bob picks $b$, sends
$B = g^b$; both compute $K = g^{ab}$ ($A^b = B^a$).

**Security.** Passive security relies on **CDH** (an eavesdropper sees $g^a, g^b$ but not $g^{ab}$).
For the derived key to be indistinguishable from random, one assumes the stronger **DDH** and hashes
the raw value through a KDF (the raw $g^{ab}$ is not uniformly random in $\mathbb{G}$).

**Limitations.** Plain Diffie–Hellman is vulnerable to **man-in-the-middle** attacks: Mallory runs
two DH exchanges (one with Alice, one with Bob), so it provides secrecy but **no authentication**.
Authentication is added by signing the ephemeral values (signed-DH) or by using long-term
Diffie–Hellman keys bound in a certificate.

## 2. Standardized DH Groups

- **RFC 7919** specifies fixed finite-field (modular-exponentiation) groups, including 2048-bit and
  3072-bit primes, used in TLS.
- **Elliptic-curve DH (ECDH)** uses $E(\mathbb{F}_p)$ and gives the same security with ~256-bit
  keys (see the Elliptic Curve notes).
- **X25519** (RFC 7748) is the modern constant-time Montgomery-curve Diffie–Hellman, the default in
  TLS 1.3, Signal, WireGuard, and SSH. It only ever transmits the $x$-coordinate and includes a
  **clamping** step (clearing the low 3 bits and high bit, setting bit 254) that makes it resistant
  to small-subgroup and related attacks.

## 3. Authenticated Key Exchange (AKE)

Authenticated key exchange combines DH with authentication to defeat MITM and to bind the session
to the intended peers.

- **Signed Diffie–Hellman:** each party signs their ephemeral public value with a long-term
  signature key. The session is secure if the signature scheme is secure and DH is CDH-hard.
- **Static–ephemeral and ephemeral–ephemeral:** static DH alone lacks **forward secrecy** (one
  long-term key compromise decrypts all past traffic); ephemeral DH provides forward secrecy.
- **TLS 1.3:** ephemeral ECDHE + certificate authentication, deriving keys via HKDF from
  $(g^{ab}, \text{transcript})$. It removed static-DH cipher suites precisely to mandate forward
  secrecy.

**Security properties to track:**

| Property | Meaning |
|----------|---------|
| Mutual/entity authentication | each party is assured of the other's identity |
| Forward secrecy (PFS) | compromise of long-term keys does not reveal past session keys |
| Key confirmation | both parties know the other computed the key |
| Key compromise impersonation (KCI) resistance | knowing your key does not let an attacker impersonate others *to you* |
| Unknown key-share (UKS) resistance | key isn't shared with an unintended party |

## 4. KDFs and the Shared-Secret Pipeline

Raw DH output must be processed by a **key-derivation function** before use:
- **HKDF** (RFC 5869) — extract-then-expand from HMAC; the standard for deriving multiple keys and
  domain separation.
- In TLS 1.3, `HKDF-Extract(0, g^{ab})` → a master secret, then `HKDF-Expand-Label` produces the
  traffic keys with transcript binding.

## 5. Quantum Threat

Both finite-field and elliptic-curve Diffie–Hellman are broken by Shor's algorithm. The quantum-safe
replacement is lattice-based **key encapsulation (ML-KEM, FIPS 203)**, which realizes the same
"transport a shared secret" goal as DH but under LWE hardness (see the Post-Quantum notes). Hybrid
(ECDH + ML-KEM) constructions are recommended during migration.

## Sources

- NIST CSRC — Cryptographic Standards and Guidelines (SP 800-56A): https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- IETF RFC Editor — RFC 7919 (DH groups); RFC 7748 (X25519): https://www.rfc-editor.org/
- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Ch. 21: Authenticated key exchange: https://toc.cryptobook.us/
- CryptoHack — Diffie–Hellman category: https://cryptohack.org/
