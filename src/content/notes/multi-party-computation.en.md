---
title: "Secure Multi-Party Computation and Threshold Cryptography"
description: "How mutually distrusting parties jointly compute a function on private inputs: secret sharing, oblivious transfer and garbled circuits, threat models, and NIST threshold cryptography."
pubDate: 2026-08-16
tags: ["Cryptography", "MPC", "Threshold Cryptography", "Secret Sharing", "Protocols"]
lang: "en"
langLink: "/zh/notes/multi-party-computation/"
---

MPC lets mutually distrusting parties jointly compute a function $f$ on private inputs so that each
learns only its own output and nothing else. It generalizes the "two generals want to know who is
richer" problem to arbitrary computation. Threshold cryptography is MPC specialized to the case
where a *key* is split so no single party can use it alone.

## 1. Secret Sharing

**Definition (Shamir $t$-out-of-$n$ secret sharing).** To share $s \in \mathbb{F}_q$ among $n$
parties with threshold $t$, choose a random polynomial
$$ p(x) = s + a_1 x + \dots + a_{t-1} x^{t-1} $$
with $p(0) = s$, and give party $i$ the share $p(i)$.

- **Correctness:** any $t$ shares interpolate $p$ (Lagrange) and recover
  $s = \sum_{i \in T} \lambda_i p(i)$ where the $\lambda_i$ are the Lagrange coefficients.
- **Privacy:** fewer than $t$ shares reveal nothing about $s$ — for every possible secret $s'$ there
  is a polynomial consistent with the observed shares (perfect secrecy).

**Additive sharing** is the $t = n$ special case: $s = \sum s_i$. **Shamir is linear**, which makes
secret-shared arithmetic trivially additive (parties add shares locally); multiplication requires a
round of interaction (Beaver triples — see below).

## 2. Oblivious Transfer and Garbled Circuits

**1-out-of-2 oblivious transfer (OT).** The sender has $(m_0, m_1)$; the receiver has bit $b$ and
learns $m_b$, while the sender learns nothing about $b$ and the receiver learns nothing about
$m_{1-b}$. OT is a **complete primitive**: given OT, one can build any MPC.

**Yao's garbled circuits** (2-party, constant-round):
1. The garbler encodes a circuit: for each wire, two random labels ($w^0, w^1$); for each gate, a
   garbled table encrypting the output label under the input labels.
2. The evaluator receives the garbled circuit and, via OT, the labels for its own inputs, then
   evaluates gate-by-gate to obtain the output labels.

Garbled circuits are efficient when the circuit is shallow and communication is the bottleneck;
**GMW** (secret-sharing based, round-complexity = circuit depth) and **BGW/SPDZ-family** protocols
(arithmetic-circuit secret sharing with preprocessed **Beaver triples**) are the alternatives for
arithmetic over fields — the latter are the workhorses of large-scale MPC.

**Beaver triple.** A precomputed triple $(a, b, c)$ with $c = ab$ allows multiplying two shared
values $[x], [y]$ in one round: reveal $[x] - [a]$ and $[y] - [b]$, then
$[xy] = [c] + (x-a)[b] + (y-b)[a] + (x-a)(y-b)$.

## 3. Threat Models

| Model | Adversary fraction | Typical tools |
|-------|--------------------|---------------|
| Honest majority ($t < n/2$ or $t < n/3$) | bounded | Shamir/BGW, information-theoretic |
| Dishonest majority | up to $n-1$ | SPDZ, garbled circuits, OT (computational) |
| Covert / abort | misbehave but fear detection | lighter protocols |
| Adaptive | chooses whom to corrupt over time | erasure/complexity overhead |

Honest-majority protocols can be **information-theoretically secure** (no hardness assumptions);
dishonest-majority protocols must be **computationally secure** (e.g., rely on LWE/OT hardness).

## 4. Threshold Cryptography (NIST)

NIST's multi-party threshold cryptography project standardizes schemes where a signing/decryption
key is distributed so that $t$ parties must cooperate, and $< t$ learn nothing.

- **Threshold signatures:** the key $x$ is Shamir-shared; parties jointly produce a valid signature
  on $m$ via MPC over the signing algorithm. This is easy for **Schnorr/EdDSA/BLS** (linear
  signing) and harder for ECDSA (nonlinear inversion — solved with Paillier/LWE-based preprocessing
  or GG18/CGGMP-style protocols).
- **Threshold KEM/decryption:** parties jointly decrypt or decapsulate.
- **Distributed key generation (DKG)** and **proactive refresh** (re-share the key periodically so
  a slow attacker cannot accumulate $t$ shares over time) are essential to deployment.

## 5. Security Implications Summary

1. **Share freshness** — threshold keys must be **proactively refreshed**; otherwise a long-lived
   key is eventually stolen one share at a time.
2. **Match the model to the adversary** — don't claim security in a dishonest-majority setting from
   an honest-majority protocol.
3. **ECDSA threshold is subtle** — use audited protocols (CGGMP, FROST for Schnorr) rather than ad
   hoc constructions.
4. **Abort handling** — many MPC protocols allow an abort denial-of-service; applications need
   identifiable abort or robustness.
5. **Quantum threat** — OT and SPDZ-style protocols often rest on classical assumptions (DDH, LWE);
   LWE-based MPC remains post-quantum, DDH-based does not.

## Sources

- NIST multi-party threshold cryptography: https://csrc.nist.gov/projects/threshold-cryptography
- Boneh–Shoup, Ch. 22–23: threshold and MPC: https://toc.cryptobook.us/
- MPC literature: https://eprint.iacr.org/
