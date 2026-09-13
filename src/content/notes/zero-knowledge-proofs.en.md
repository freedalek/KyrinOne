---
title: "Zero-Knowledge Proofs"
description: "Interactive proofs that reveal nothing beyond the truth of a statement: formal definitions, Sigma protocols, Fiat–Shamir, SNARKs/STARKs, and commitments."
pubDate: 2026-08-16
tags: ["Cryptography", "Zero-Knowledge", "Sigma Protocols", "SNARK", "STARK"]
lang: "en"
langLink: "/zh/notes/zero-knowledge-proofs/"
---

A zero-knowledge proof lets a prover $\mathcal{P}$ convince a verifier $\mathcal{V}$ that a
statement $x$ is true **without revealing anything beyond its truth**. It is the foundation of
private authentication, digital-signature theory, and the SNARK/STARK systems behind modern
blockchain scaling and private computation.

## 1. Formal Definitions

An interactive proof system for a language $\mathcal{L}$ (with relation $\mathcal{R}$) must satisfy:

1. **Completeness.** If $x \in \mathcal{L}$ and the prover is honest, the verifier accepts with
   overwhelming probability.
2. **Soundness.** If $x \notin \mathcal{L}$, no (even cheating, unbounded) prover can make the
   verifier accept except with negligible probability.
3. **Zero-knowledge.** For every verifier $\mathcal{V}^*$, there is a simulator that produces a
   transcript indistinguishable from a real interaction **using only the public input** — i.e., the
   verifier learns nothing beyond the truth of the statement.

**Zero-knowledge is defined via simulation**, not via "the verifier couldn't compute it." The
simulation paradigm is what turns an intuitive privacy claim into a precise cryptographic property.

## 2. Sigma Protocols

A **Σ-protocol** is a 3-move protocol for a relation with a special **honest-verifier
zero-knowledge** (HVZK) and **special soundness** structure.

**Schnorr's protocol** (proving knowledge of $x$ with $h = g^x$):
1. **Commit:** prover sends $a = g^r$ for random $r$.
2. **Challenge:** verifier sends $c \leftarrow \mathbb{Z}_q$.
3. **Response:** prover sends $z = r + c x \bmod q$.
4. **Verify:** accept iff $g^z = a \cdot h^c$.

- **Completeness:** $g^{r + cx} = g^r (g^x)^c$. ✓
- **Special soundness:** from two accepting transcripts $(a, c_1, z_1), (a, c_2, z_2)$ with
  $c_1 \neq c_2$, one extracts $x = (z_1 - z_2)/(c_1 - c_2)$. This **extractor** runs in $O(1)$
  expected time, giving a *proof of knowledge*.
- **HVZK:** the simulator picks $c, z$ uniformly and sets $a = g^z h^{-c}$; the transcript
  $(a, c, z)$ is identically distributed to the real one.

## 3. Fiat–Shamir Transform

The Fiat–Shamir heuristic turns a public-coin Σ-protocol into a **non-interactive** proof by
replacing the verifier's random challenge with a hash of the transcript:
$$ c = H(x \mathbin{\Vert} a). $$

In the **random-oracle model**, the resulting NIZK is secure (sound by rewinding the random
oracle; ZK inherited from HVZK). In practice the hash must bind $x$ and $a$ — a *weak* Fiat–Shamir
that hashes only $a$ is vulnerable to forgery (a documented class of bugs). Schnorr signatures and
EdDSA are Fiat–Shamir NIZKs.

## 4. SNARKs and STARKs

- **SNARK** — *Succinct Non-interactive ARgument of Knowledge.* Prover cost is super-linear but the
  proof is tiny ($O(1)$ or $O(\log n)$) and verification is cheap. Construction via:
  1. **Arithmetization** — encode computation as an arithmetic circuit / constraint system (R1CS,
     Plonk-ish, AIR).
  2. **Commitment** — commit to the witness: **KZG** (pairings; trusted setup) or **inner-product
     argument** (Bulletproofs; no trusted setup) or **folding** (Nova/Sangria).
  3. **Succinct argument** — a PCP/IOP compiled with a Merkle-tree or pairing-based opening.
  Examples: **Groth16** (KZG, tiny proofs, trusted setup), **PLONK** (universal setup), **Halo2**
  (recursive, no trusted setup), **Nova** (folding/incrementally verifiable computation).

- **STARK** — *Scalable Transparent ARgument of Knowledge.* Hash-based (Merkle/Reed–Solomon IOP),
  **no trusted setup**, and — being hash-based — **post-quantum**. Larger proofs (~100s of KB) but
  fast prover and logarithmic/constant verification. Used where transparency and quantum-resistance
  matter.

**The trusted-setup caveat.** Pairing-based SNARKs require a structured reference string whose
generation is "toxic waste"; a party who can rerun the ceremony can forge proofs. Universal/updatable
setups (PLONK, powers-of-tau) and transparent systems (STARK, Bulletproofs, Nova) avoid or weaken
this.

## 5. Commitments

A **commitment** binds a value $m$ (hiding) such that the committer cannot later open to a different
value (binding):
- **Pedersen:** $\mathrm{Com}(m; r) = g^m h^r$ — perfectly hiding, computationally binding; the
  standard for Schnorr-based Σ-protocols and range proofs.
- **Hash commitments:** $\mathrm{Com}(m) = H(r \mathbin{\Vert} m)$ — binding in the random-oracle
  model.
- **KZG:** a polynomial commitment with constant-size openings and a homomorphic structure,
  central to SNARKs.

## 6. Security Implications Summary

1. **Soundness vs. knowledge** — a *proof of knowledge* (extractable) is stronger than mere
   soundness and is what signatures need.
2. **Fiat–Shamir must hash the full statement** — weak hashing yields forgeries.
3. **Trusted setup is a real risk** — prefer universal or transparent schemes where feasible.
4. **Quantum resistance** — hash-based STARKs survive; pairing-based SNARKs do not.
5. **Non-interactivity ≠ non-malleability** — a NIZK can be replayed; bind it to a context/identity
   (simulation-extractable or strongly-bound variants) in protocol use.

## Sources

- Boneh–Shoup, Ch. 19–20: sigma protocols and ZK: https://toc.cryptobook.us/
- Katz–Lindell, Ch. on ZK proofs: https://www.cs.umd.edu/~jkatz/imc.html
- SNARK/STARK literature: https://eprint.iacr.org/
- Zero-Knowledge Proofs category: https://cryptohack.org/
