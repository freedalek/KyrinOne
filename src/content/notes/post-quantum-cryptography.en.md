---
title: "Post-Quantum Cryptography"
description: "Cryptography secure against quantum computers: the Shor/Grover threat, lattice-based schemes, NIST FIPS 203/204/205, other PQC families, and the NIST migration timeline."
pubDate: 2026-08-16
tags: ["Cryptography", "Post-Quantum", "Lattice Cryptography", "NIST Standards", "Migration"]
lang: "en"
langLink: "/zh/notes/post-quantum-cryptography/"
---

Post-quantum cryptography (PQC) is cryptography secure against adversaries equipped with
large-scale quantum computers. Shor's algorithm breaks all widely deployed public-key crypto
(RSA, finite-field DH/DSA, elliptic-curve crypto); PQC replaces them with schemes believed hard
even for quantum computers.

## 1. The Quantum Threat

**Shor's algorithm** factors integers and computes discrete logs in polynomial time on a quantum
computer, given enough qubits. It directly breaks RSA, DSA, Diffie–Hellman, ECDH, ECDSA, and
EdDSA — essentially every public-key primitive in use today.

**Grover's algorithm** gives a square-root speedup for search: it halves the effective key length
of symmetric ciphers and the preimage resistance of hashes. Mitigation is simply **larger keys**:
AES-256 and SHA-384/512 remain quantum-adequate; no replacement is needed.

**Summary of the threat model:**

| Primitive | Quantum impact | Response |
|-----------|----------------|----------|
| RSA / DH / DSA / ECC | **broken** (Shor) | replace with PQC |
| AES, SHA-2/3, HMAC | Grover square-root | use AES-256 / SHA-384+ |
| Symmetric/AEAD protocols | unchanged otherwise | keep, with larger keys |

## 2. Lattice-Based Cryptography

The dominant PQC family. Security rests on the worst-case-to-average-case hardness of lattice
problems (**SVP**, **LWE**, Ring/Module-LWE — see 01_Hardness/Hardness-Assumptions.md).

**LWE key-encapsulation (simplified).** A public key is $(A, \mathbf{b} = A\mathbf{s} + \mathbf{e})$
with a short secret $\mathbf{s}$ and small error $\mathbf{e}$; encapsulation computes a noisy shared
value and a reconciliation hint; decapsulation recovers the value using $\mathbf{s}$. An attacker
must distinguish noisy from uniform samples, i.e., solve LWE.

## 3. NIST PQC Standards (FIPS 203 / 204 / 205)

Released **August 2024**, these are the principal PQC standards:

| FIPS | Scheme | Type | Based on | Role |
|------|--------|------|----------|------|
| FIPS 203 | **ML-KEM** (CRYSTALS-Kyber) | KEM | Module-LWE | key establishment |
| FIPS 204 | **ML-DSA** (CRYSTALS-Dilithium) | signature | Module-LWE (with SIS) | signatures |
| FIPS 205 | **SLH-DSA** (SPHINCS+) | signature | hash-based (stateless) | signatures (backup, no lattices) |

**ML-KEM** replaces Diffie–Hellman/ECDH and RSA-KEM for key establishment. **ML-DSA** replaces
ECDSA/EdDSA/RSA-PSS. **SLH-DSA** is a stateless hash-based signature with larger signatures but
security that rests *only* on hash-function security — it is the conservative fallback in case
lattice assumptions weaken.

**Falcon** (lattice signature) and **HQC** (code-based KEM) were additionally selected and are on
their way to standardization; **XMSS/LMS** are stateful hash-based signatures already standardized
in SP 800-208 (for firmware/code signing where state can be managed).

## 4. Other PQC Families

- **Code-based:** McEliece/Niederreiter — very large public keys (~1 MB) but long-studied security;
  HQC is the modern selected KEM.
- **Hash-based:** Merkle-tree signatures (LMS/XMSS stateful; SPHINCS+ stateless) — security from
  hash preimage resistance only.
- **Isogeny-based:** key exchange from walks on isogeny graphs; **SIKE was completely broken** in
  2022 (Castryck–Decru), a cautionary tale for the field.
- **Multivariate:** based on solving quadratic systems over finite fields (e.g., Rainbow, broken;
  UOV remains a candidate for the extra signature round).

## 5. Migration (NIST IR 8547)

NIST's transition timeline in **IR 8547** calls for deprecating and removing quantum-vulnerable
algorithms from NIST standards **by 2035**, with high-risk systems transitioning much earlier. The
recommended migration path:

1. **Inventory** where RSA/ECC/DH are used (certificates, TLS, code signing, at-rest encryption).
2. **Hybrid schemes** during transition: run classical (ECDH/ECDSA) and PQC (ML-KEM/ML-DSA) side by
   side, so security holds if either family is broken.
3. **Prioritize confidentiality first** — "harvest-now, decrypt-later" attacks make encrypted data
   at rest the most urgent target.
4. **Crypto agility** — design for algorithm swap, since PQC parameters and standards are still
   maturing.

## 6. Security Implications Summary

1. **Symmetric crypto only needs larger keys** (AES-256, SHA-384/512); public-key crypto needs
   replacement.
2. **Don't wait for the "big" quantum computer** — harvest-now/decrypt-later is a current threat to
   long-lived secrets.
3. **SLH-DSA is the diversity play** — rely on it where lattice assumptions are undesirable.
4. **Isogeny caution** — SIKE's break shows young PQC assumptions can fail; diversify and use
   hybrids.
5. **Implementations are immature** — side-channel and fault-attack hardening of PQC (especially
   lattice decapsulation) is an active research area (see 07_Attacks).

## Sources

- FIPS 203/204/205; NIST IR 8547: https://csrc.nist.gov/projects/post-quantum-cryptography
- RFC 9180 ML-KEM-related drafts: https://www.rfc-editor.org/
- Boneh–Shoup, Ch. 17: lattice-based crypto: https://toc.cryptobook.us/
- Lattices and Isogenies categories: https://cryptohack.org/
