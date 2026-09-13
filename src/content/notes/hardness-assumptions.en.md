---
title: "Hardness Assumptions"
description: "The computational hardness assumptions underlying public-key cryptography: the generic-group problems DLP, CDH and DDH, factoring and RSA, hardness on elliptic curves, and the post-quantum lattice problems."
pubDate: 2026-08-16
tags: ["Cryptography", "Hardness Assumptions", "Public-Key", "Lattices", "Post-Quantum"]
lang: "en"
langLink: "/zh/notes/hardness-assumptions/"
---

Every public-key scheme rests on a *computational hardness assumption*: a problem believed (but not
proven) to be infeasible. These assumptions form a **reduction lattice** — an attacker that breaks
the scheme implies an attacker that solves the underlying problem. This file defines the standard
assumptions and their relative strengths.

## 1. The Generic-Group Problems: DLP, CDH, DDH

Fix a cyclic group $\mathbb{G}$ of prime order $q$ with generator $g$, written multiplicatively.

**Definition (Discrete Logarithm Problem, DLP).** Given $g$ and $h = g^x$, find $x \in \mathbb{Z}_q$.

**Definition (Computational Diffie–Hellman, CDH).** Given $g$, $g^a$, $g^b$, compute $g^{ab}$.

**Definition (Decisional Diffie–Hellman, DDH).** Distinguish $(g, g^a, g^b, g^{ab})$ from
$(g, g^a, g^b, g^c)$ where $a, b, c$ are uniform. Formally, for all efficient $\mathcal{A}$:
$$ \left|\Pr[\mathcal{A}(g,g^a,g^b,g^{ab})=1] - \Pr[\mathcal{A}(g,g^a,g^b,g^c)=1]\right| \le \mathrm{negl}. $$

**Reduction chain.** DDH $\Rightarrow$ CDH $\Rightarrow$ DLP: solving DLP solves CDH (compute $a$
and $b$), and solving CDH solves DDH (compute $g^{ab}$ and compare). The reverse implications are
not known in general.

**Where they are used.** DLP → DSA/ElGamal; CDH → Diffie–Hellman key exchange; DDH → ElGamal
encryption's IND-CPA security and many ZK proofs.

**Generic algorithms.** The best *generic* algorithm is Pollard's rho in $O(\sqrt{q})$ group
operations, which (by Shoup's lower bound) is optimal for generic groups. Hence a 256-bit group
order $q$ gives ~128-bit security. **Pohlig–Hellman** reduces DLP to DLP in the prime-power factors
of $q$, so $q$ must be prime (or nearly prime).

## 2. Factoring and the RSA Assumption

**Definition (Factoring).** Given $N = pq$ (large primes $p, q$), recover $p, q$.

**Definition (RSA problem).** Given $N$, $e$ with $\gcd(e, \varphi(N)) = 1$, and $c$, find $m$ such
that $m^e \equiv c \pmod N$.

**Definition (RSA assumption).** The RSA problem is hard for random $m$.

**Relation.** The RSA problem reduces to factoring (if you can factor you can compute
$d = e^{-1} \bmod \varphi(N)$), but it is not known whether factoring reduces to RSA. The **strong
RSA** and **Φ-hiding** assumptions underpin some ZK/accumulator constructions.

**Best attacks.** GNFS gives subexponential time for factoring (see Number Theory). Hence RSA moduli
of 2048–3072 bits for 112–128-bit security. Small-$d$ attacks (Wiener, Boneh–Durfee) and the $e = 3$
broadcast attack justify proper padding (OAEP/PSS) and large $d$.

## 3. Hardness on Elliptic Curves

ECDLP = DLP in the group of points $E(\mathbb{F}_p)$. No index-calculus analogue is known for
well-chosen curves, so the best attack is generic (Pollard rho in $O(\sqrt{q})$). This is why ECC
achieves 128-bit security with ~256-bit keys. Attacks on special curves — **MOV/Frey–Rück** (using
pairings when the embedding degree is small), **anomalous curves** ($\#E = p$, attacked by
Smart's algorithm), and **supersingular curves** in some settings — motivate the choice of
"safe" curves (see Elliptic Curve).

## 4. Lattice Problems (Post-Quantum)

Lattices give the main quantum-resistant assumptions.

**Definition (SVP / CVP).** The **Shortest Vector Problem** asks for the shortest nonzero vector in
a lattice $\mathcal{L}$; **CVP** asks for the closest lattice vector to a target.

**Definition (LWE — Learning With Errors).** Given a secret $\mathbf{s} \in \mathbb{Z}_q^n$ and
samples $(\mathbf{a}_i, b_i = \langle \mathbf{a}_i, \mathbf{s} \rangle + e_i \bmod q)$ with small
error $e_i$, distinguish them from uniform $(\mathbf{a}_i, u_i)$. Ring-LWE and Module-LWE restrict
$\mathbf{a}_i$ to a cyclotomic ring / module for efficiency.

**Reduction.** LWE is (worst-case) as hard as solving approximate SVP/GapSVP in arbitrary lattices
(Regev). This worst-case-to-average-case reduction is the strongest evidence for lattice hardness
and the reason NIST selected lattice schemes for PQC (see Post-Quantum).

## 5. The Hardness Map

| Assumption | Structure | Quantum-broken? | Basis of |
|------------|-----------|-----------------|----------|
| DLP (generic) | cyclic group $\mathbb{G}$ | Yes (Shor) | DSA, ElGamal, DH |
| CDH / DDH | cyclic group | Yes | DH key exchange, ElGamal |
| Factoring | $\mathbb{Z}/N\mathbb{Z}$ | Yes (Shor) | RSA |
| ECDLP | $E(\mathbb{F}_p)$ | Yes (Shor) | ECDH, ECDSA, EdDSA |
| RSA | $\mathbb{Z}/N\mathbb{Z}$ | Yes | RSA encryption/signatures |
| LWE / SVP / CVP | lattices | **No** (believed) | ML-KEM, ML-DSA, FHE, many ZKP |
| Hash preimage/collision | hash functions | No (Grover square-root) | signatures, commitments |

## 6. Using Assumptions Correctly

1. **Match the assumption to the scheme** — a DDH-based proof does not transfer to a group where
   DDH is easy (e.g., pairing groups where DDH is broken but the weaker assumptions hold).
2. **Watch the group representation** — a "generic" group is an idealization; concrete groups can
   leak via small subgroups, low embedding degree, or non-prime order.
3. **Record which variant** — CDH vs. DDH vs. Gap-DH vs. strong-DH each carry different guarantees.
4. **Quantum threat** — any assumption solvable by Shor's algorithm must be phased out per the
   NIST IR 8547 transition timeline.

## Sources

- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Ch. 16: Attacks on number-theoretic assumptions: https://toc.cryptobook.us/
- Katz–Lindell, *Introduction to Modern Cryptography* — Ch. 8/9, factoring and DLP: https://www.cs.umd.edu/~jkatz/imc.html
- Survey of lattice assumptions: https://eprint.iacr.org/
