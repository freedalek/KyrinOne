---
title: "Side-Channel Attacks"
description: "Breaking cryptosystems through their physical implementation rather than their mathematics: timing, power, electromagnetic, cache, and fault attacks, and the defense hierarchy."
pubDate: 2026-08-16
tags: ["Cryptography", "Side Channels", "Timing Attacks", "Fault Attacks", "Implementation Security"]
lang: "en"
langLink: "/zh/notes/side-channels/"
---

A side-channel attack breaks a cryptosystem not through its mathematics but through the physical
implementation — timing, power consumption, electromagnetic emission, caches, or induced faults.
A scheme can be *provably secure* on paper and trivially broken if its implementation leaks.

## 1. The Taxonomy

| Channel | What is observed | Classic examples |
|---------|------------------|------------------|
| Timing | execution-time differences | RSA square-and-multiply, cache-induced timing, string compares |
| Power (SPA/DPA) | instantaneous / statistical power traces | AES S-box lookup, RSA exponentiation |
| Electromagnetic (EM) | radiated fields | localized versions of power attacks |
| Cache | cache hits/misses (prime+probe, flush+reload) | AES T-tables, RSA sliding window |
| Fault injection | induced errors (glitching, laser) | RSA-CRT Bellcore attack, signature forgery |
| Acoustic / thermal | sound / heat | acoustic key extraction (historical RSA) |

## 2. Timing Attacks

**Mechanism.** If execution time depends on secret data (e.g., secret-dependent branches, secret
indices into memory, or variable-count loops), an attacker measuring time across many runs recovers
the secret.

**Classic case — square-and-multiply RSA.** A naive modular exponentiation multiplies only when a
secret exponent bit is 1, so each bit's processing time differs. An attacker correlating measured
time with exponent bits reconstructs the private key (Kocher).

**Modern case — non-constant-time comparisons.** `memcmp`-style early-exit comparisons of MACs or
signatures leak the length of the matching prefix, enabling byte-by-byte forgery.

**Mitigation:** **constant-time programming** — no secret-dependent branches, no secret-dependent
memory indices, no variable-count loops; use carry-less arithmetic and constant-time compare
functions. This is the baseline requirement for all cryptographic code.

## 3. Power Analysis

- **Simple Power Analysis (SPA)** reads a single trace: the shape of an AES round or an RSA
  multiply/square reveals the operation sequence and, with it, the key bits.
- **Differential Power Analysis (DPA)** statistically correlates many traces with a hypothesized key
  byte (using the S-box output as a power model) to recover keys even in the presence of noise.

**Mitigation:** **masking** (split secret state into $d+1$ shares so every intermediate is
independent of the real value; $d$-th-order masking resists $d$-th-order DPA), **hiding**
(randomize the operation order / insert dummy ops), and hardware countermeasures (dual-rail logic,
noise).

## 4. Fault Attacks

**Bellcore attack on RSA-CRT.** Inject a single fault during the CRT recombination so that one
partial signature $\hat{S}_p$ is wrong. The attacker computes
$\gcd(S - \hat{S}, N)$, which reveals a prime factor of $N$. A single bit-flip breaks RSA-CRT.

**Fault attacks on PQC.** Lattice decapsulation and hash-based signatures are being hardened against
faults; a fault in ML-KEM's secret-shuffle or in a signing nonce can leak the key.

**Mitigation:** verify before output (recompute and compare), use redundancy, and detect
environmental anomalies (glitch detectors on hardware).

## 5. Cache Attacks

**Flush+Reload / Prime+Probe.** The attacker monitors shared cache lines to learn which T-table
entries (AES) or which Montgomery operands (RSA) the victim accessed, reconstructing the secret.
These attacks cross process and VM boundaries (Meltdown/Spectre are related microarchitectural
leaks).

**Mitigation:** **AES-NI** (hardware AES, no T-tables), **constant-time table-free implementations**,
and cache isolation / per-process flushing.

## 6. The Defense Hierarchy

1. **Constant-time algorithms** (foundation — nothing else helps if timing leaks).
2. **Masking and blinding** (defeat DPA; RSA blinding $r^e m$ randomizes each exponentiation).
3. **Fault detection** (verify results, redundancy, sensors).
4. **Formal/automated verification** of constant-time and masking correctness (dudect-style leakage
   testing, side-channel certification like CAVP/FIPS 140-3 testing).

## 7. Security Implications Summary

1. **The math can be right while the implementation is broken** — side-channels are a first-class
   security property, not an afterthought.
2. **Secret-dependent control flow and memory access are the root cause** — eliminate both.
3. **PQC is not automatically side-channel safe** — lattice decapsulation has novel leakage surfaces
   (rejection sampling, secret-dependent shuffles) requiring new countermeasures.
4. **Fault injection turns a signature oracle into a factoring oracle** (Bellcore) — always verify
   signatures/decryptions before releasing them.
5. **Certification (FIPS 140-3, CAVP)** and leakage testing are the industry bar for shipping
   cryptographic modules.

## Sources

- Side-channel & CAVP context: https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- Boneh–Shoup, Ch. on timing and implementation security: https://toc.cryptobook.us/
- Side-channel attack literature: https://eprint.iacr.org/
