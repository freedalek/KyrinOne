---
title: "Pairings (Bilinear Maps)"
description: "Bilinear maps between elliptic-curve groups and the primitives they enable — BLS signatures, identity-based encryption and SNARK commitments — plus the DDH and MOV caveats."
pubDate: 2026-08-16
tags: ["Cryptography", "Pairings", "Bilinear Maps", "BLS", "SNARKs"]
lang: "en"
langLink: "/zh/notes/pairings/"
---

Pairings are bilinear maps between elliptic-curve groups that enable a new class of primitives —
BLS signatures, identity-based encryption, and the polynomial-commitment machinery behind modern
SNARKs. The same structure must be managed carefully, because it *weakens* the DLP in the source
groups.

## 1. Definition

**Definition (bilinear pairing).** Let $\mathbb{G}_1, \mathbb{G}_2, \mathbb{G}_T$ be groups. A
pairing is an efficiently computable map $e : \mathbb{G}_1 \times \mathbb{G}_2 \to \mathbb{G}_T$
that is:

1. **Bilinear:** $e(aP, bQ) = e(P, Q)^{ab}$ for all $P \in \mathbb{G}_1$, $Q \in \mathbb{G}_2$,
   $a, b \in \mathbb{Z}$.
2. **Non-degenerate:** if $P, Q$ are generators, $e(P, Q) \neq 1$.

In practice these are the **Weil** and **Tate** pairings on pairing-friendly elliptic curves
(e.g., BLS12-381, BN254), where $\mathbb{G}_1, \mathbb{G}_2 \subset E(\mathbb{F}_{p^k})$ and
$\mathbb{G}_T \subset \mathbb{F}_{p^k}^{\times}$. For symmetric ("Type-1") pairings
$\mathbb{G}_1 = \mathbb{G}_2$; most modern curves are asymmetric (Type-3), which is more efficient
and secure.

## 2. The Cost: DDH Is Easy

The defining bilinearity breaks DDH in the source groups:

**Claim.** Given $P, aP, bP, cP \in \mathbb{G}_1$, one can test whether $c = ab$ by checking
$$ e(aP, bP) \overset{?}{=} e(cP, P). $$
Bilinearity gives both sides equal to $e(P, P)^{ab}$ iff $c = ab$.

**Consequence.** In pairing groups, the DDH assumption **fails** and must be replaced by
assumptions that are compatible with the pairing: **co-CDH**, **Bilinear Diffie–Hellman (BDH)**
("compute $e(P,P)^{abc}$ from $aP, bP, cP$"), and **Decisional Bilinear Diffie–Hellman (DBDH)**.
All reductions in pairing-based schemes use these pairing-aware assumptions.

## 3. The MOV / Frey–Rück Attack

The pairing lets an attacker *transfer* a DLP from $\mathbb{G}_1$ into $\mathbb{F}_{p^k}^{\times}$:
given $P, aP$, compute $e(P, Q)$ and $e(aP, Q) = e(P, Q)^a$, reducing ECDLP to a DLP in a finite
field, where index calculus applies. This is feasible exactly when the **embedding degree** $k$ is
small. Hence safe curves require a large embedding degree, and pairing-friendly curves are
*deliberately* constructed with a small $k$ to make the pairing computable — which is why their
base-field primes must be large enough to keep the transferred DLP hard (e.g., BLS12-381 balances
~128-bit security against a 12th-degree extension).

## 4. Applications

**BLS signatures.** With $\mathbb{G}_1$ for public keys and $\mathbb{G}_2$ for signatures:
- **Sign:** $\sigma = x \cdot H(m) \in \mathbb{G}_2$ (secret $x$, public $X = xP$).
- **Verify:** $e(P, \sigma) \overset{?}{=} e(X, H(m))$.
- **Aggregation:** $n$ signatures combine into one $\sigma_{\text{agg}} = \sum \sigma_i$, verified
  by a single pairing check. This is why BLS is used in Ethereum consensus (BLS12-381) — it enables
  thousands of validator signatures to be verified in one pairing.

**Identity-based encryption (IBE)** — a master key derives a user's private key from an identity
string, removing the need for certificate lookup (Boneh–Franklin).

**Polynomial commitments / SNARKs.** The KZG commitment to a polynomial uses pairings to prove
$p(z) = y$ with a single group element, the backbone of Groth16 and many pairing-based SNARKs
(see the Zero-Knowledge Proofs note).

**Attribute-based and functional encryption** also rely on pairings.

## 5. Security Implications Summary

1. **Never reuse DDH-based schemes** (plain ElGamal, standard DH assumptions) on pairing groups —
   DDH is broken there.
2. **Use pairing-aware assumptions** (BDH, DBDH, co-CDH) in reductions.
3. **Choose pairing-friendly curves** with adequate security in $\mathbb{G}_T$ (the extension-field
   DLP is the binding constraint — "the $k$-th extension must be large").
4. **Check subgroup membership** — pairing protocols are vulnerable to small-subgroup attacks if
   points are not validated.
5. Pairings are **Shor-broken** as well; pairing-based SNARKs must be replaced by hash-based
   (STARK) or lattice-based (folding) alternatives in a post-quantum setting.

## Sources

- NIST CSRC — Pairing-Based Cryptography: https://csrc.nist.gov/projects/pairing-based-cryptography
- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Ch. 15: pairings: https://toc.cryptobook.us/
- IACR Cryptology ePrint Archive (BLS signatures): https://eprint.iacr.org/
