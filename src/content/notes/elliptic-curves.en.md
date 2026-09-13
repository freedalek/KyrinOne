---
title: "Elliptic Curves"
description: "The group of points on an elliptic curve and its cryptographic use: the group law, the ECDLP, curve representations, and the standard curves P-256, secp256k1, Curve25519 and Ed25519."
pubDate: 2026-08-16
tags: ["Cryptography", "Elliptic Curves", "ECDLP", "Curve25519", "Ed25519"]
lang: "en"
langLink: "/zh/notes/elliptic-curves/"
---

Elliptic-curve cryptography replaces $\mathbb{F}_p^{\times}$ with the group of points on a curve,
yielding the same hardness (ECDLP) at much smaller key sizes — ~256 bits for 128-bit security.

## 1. Definition and the Group Law

**Definition (Weierstrass form).** Over a field $\mathbb{F}$ of characteristic $\neq 2, 3$, an
elliptic curve is
$$ E : y^2 = x^3 + ax + b, \qquad 4a^3 + 27b^2 \neq 0 \quad(\text{non-singularity}). $$
The point set is $E(\mathbb{F}) = \{(x,y) \in \mathbb{F}^2 : y^2 = x^3 + ax + b\} \cup \{\mathcal{O}\}$,
where $\mathcal{O}$ is the "point at infinity" (the identity).

**Group law (chord-and-tangent).** For $P = (x_1, y_1)$, $Q = (x_2, y_2)$:
- If $x_1 \neq x_2$, the line through $P, Q$ meets the curve at a third point $R'$; define
  $P + Q = -R'$ (reflection across the $x$-axis). Slope $\lambda = (y_2 - y_1)/(x_2 - x_1)$.
- Doubling ($P = Q$, $y_1 \neq 0$): $\lambda = (3x_1^2 + a)/(2y_1)$.
- $P + (-P) = \mathcal{O}$; $\mathcal{O}$ is the identity.

With these formulas, $E(\mathbb{F})$ is an **abelian group**. Point addition costs one inversion
(or, with projective coordinates, none until the final affine conversion).

## 2. The Elliptic-Curve Discrete Logarithm Problem (ECDLP)

**Definition.** Given $P$ and $Q = nP$, find $n$.

**Hardness.** For a well-chosen curve, the best known algorithm is generic — Pollard's rho in
$O(\sqrt{q})$ — giving ~128-bit security for a curve whose largest prime-order subgroup has
order $q \approx 2^{256}$. Unlike $\mathbb{F}_p^{\times}$, **no subexponential index-calculus attack
is known** for general elliptic curves. This is the entire motivation for ECC's short keys.

**Weak classes of curves** must be avoided:
- **Anomalous curves** ($\#E(\mathbb{F}_p) = p$) → Smart's linear-time attack.
- **Low embedding degree** → MOV/Frey–Rück attacks transfer ECDLP into $\mathbb{F}_{p^k}$ via
  pairings when $k$ is small (see the Pairings note).
- **Supersingular curves** in multiplicative-transfer settings (though supersingular curves are
  safe for *isogeny*-based PQC, a different mechanism).
- **Singular curves** ($4a^3 + 27b^2 = 0$) → the group degenerates and DLP becomes easy.

## 3. Curve Representations

| Form | Equation | Notes |
|------|----------|-------|
| Weierstrass | $y^2 = x^3 + ax + b$ | FIPS 186-5 NIST curves (P-256…) |
| Montgomery | $By^2 = x^3 + Ax^2 + x$ | X25519/X448 (RFC 7748); fast, constant-time $x$-only ladder |
| (twisted) Edwards | $ax^2 + y^2 = 1 + dx^2 y^2$ | Ed25519 (RFC 8032); complete addition laws |

**Montgomery ladder.** X25519 transmits only the $x$-coordinate and uses a differential-addition
ladder, so every operation is a fixed sequence — naturally constant-time and easy to harden.

**Complete addition laws** on Edwards curves have no exceptional cases (no doubling branch), which
removes a class of side-channel and correctness bugs.

## 4. Standard Curves

| Curve | Standard | Form | Security | Notes |
|-------|----------|------|----------|-------|
| P-256 / P-384 / P-521 | FIPS 186-5 | Weierstrass | 128/192/256-bit | NIST; verifiably (pseudo-)random seeds |
| secp256k1 | SEC 2 | Weierstrass | 128-bit | Bitcoin/Ethereum; $a = 0$ |
| Curve25519 | RFC 7748 | Montgomery | 128-bit | X25519 DH; constant-time |
| Ed25519 | RFC 8032 | twisted Edwards | 128-bit | EdDSA signatures |
| BLS12-381 | (draft RFC 9380/industry) | pairing-friendly | ~128-bit | pairings, ZK, Ethereum 2.0 |

## 5. Security Implications Summary

1. **Validate points** — accept only points on the curve and (for prime-order groups) in the correct
   subgroup; unvalidated points enable **invalid-curve** and **small-subgroup** attacks that leak the
   secret scalar.
2. **Use a safe curve** with prime (or near-prime) order and adequate embedding degree; don't
   roll your own parameters.
3. **ECDLP = generic hardness** justifies 256-bit keys, but any curve-specific weakness (embedding
   degree, anomaly, singular) voids it.
4. **All ECC is Shor-broken** — ECDH/ECDSA/EdDSA must be migrated to PQC schemes under NIST IR 8547.

## Sources

- NIST CSRC — Cryptographic Standards and Guidelines (FIPS 186-5 elliptic curves): https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- IETF RFC Editor — RFC 7748 (Curve25519/X448); RFC 8032 (Ed25519): https://www.rfc-editor.org/
- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Ch. 15: https://toc.cryptobook.us/
- CryptoHack — Elliptic Curves course: https://cryptohack.org/
