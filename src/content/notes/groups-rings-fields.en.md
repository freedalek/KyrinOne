---
title: "Groups, Rings, and Fields"
description: "The abstract-algebra backbone of cryptography: group/ring/field axioms, cyclic groups and Lagrange, characteristic, and why these structures define the hard problems security rests on."
pubDate: 2026-08-16
tags: ["Cryptography", "Abstract Algebra", "Foundations", "Group Theory"]
lang: "en"
langLink: "/zh/notes/groups-rings-fields/"
---

Abstract algebra is the structural backbone of cryptography: cyclic groups underlie Diffie–Hellman
and DSA, finite fields underlie AES and elliptic curves, and rings underlie lattice-based PQC. The
axioms here are stated precisely because every security reduction is carried out *inside* these
structures.

## 1. Groups

**Definition (group).** A group is a set $G$ with a binary operation $\cdot$ satisfying:

1. **Closure:** $\forall a,b \in G,\ a \cdot b \in G$.
2. **Associativity:** $\forall a,b,c \in G,\ (a \cdot b) \cdot c = a \cdot (b \cdot c)$.
3. **Identity:** $\exists e \in G$ such that $e \cdot a = a \cdot e = a$ for all $a$.
4. **Inverse:** for each $a$ there is $a^{-1}$ with $a \cdot a^{-1} = a^{-1} \cdot a = e$.

A group is **abelian** if additionally $a \cdot b = b \cdot a$ for all $a, b$. Cryptography uses
abelian groups almost exclusively, written additively for elliptic curves
($P + Q$, identity $\mathcal{O}$) or multiplicatively for $\mathbb{F}_p^{\times}$
($g^a$, identity $1$).

**Definition (order, cyclic).** The **order** $|G|$ is the number of elements. The order of an
element $g$ is the least $n > 0$ with $g^n = e$. A group is **cyclic** if it has a **generator**
$g$ with $G = \langle g \rangle = \{g^0, g^1, \dots, g^{n-1}\}$.

**Theorem (Lagrange).** If $H \le G$ is a subgroup, then $|H|$ divides $|G|$.

**Corollary.** The order of every element divides $|G|$; hence $a^{|G|} = e$ for all $a \in G$.
(Euler's theorem is the special case $G = (\mathbb{Z}/n\mathbb{Z})^{\times}$, $|G| = \varphi(n)$.)

**Theorem (classification of cyclic subgroups).** In a cyclic group of order $n$, for every divisor
$d \mid n$ there is a unique subgroup of order $d$; it is cyclic.

*Security consequence.* For cryptographic use, one works in a cyclic group of **prime order** $q$:
prime order has no nontrivial subgroups, so the Pohlig–Hellman reduction (which breaks a discrete
log of composite order into discrete logs in the prime-power factors) gives no advantage, and every
non-identity element is a generator.

## 2. Rings

**Definition (ring).** A ring $(R, +, \cdot)$ is a set with two operations such that:
$(R, +)$ is an abelian group (identity $0$), $\cdot$ is associative with identity $1$,
multiplication distributes over addition. A ring is **commutative** if $a b = b a$. A **field** is a
commutative ring in which every $a \neq 0$ has a multiplicative inverse.

Examples used in cryptography:

| Ring | Role |
|------|------|
| $\mathbb{Z}$ | integers; Euclidean domain |
| $\mathbb{Z}/n\mathbb{Z}$ | modular arithmetic; RSA works mod $n = pq$ |
| $\mathbb{F}_p[x]$ | polynomial ring; source of finite fields $\mathbb{F}_{p^n}$ |
| $\mathbb{Z}[x] / (x^n + 1)$ | cyclotomic ring; Ring-LWE / Module-LWE PQC schemes |
| $\mathbb{F}_{2^{128}}$ | finite field for GCM's GHASH authentication tag |

**Definition (units).** $a \in R$ is a **unit** if it has a multiplicative inverse. The units form a
group $R^{\times}$ under multiplication. For a field $\mathbb{F}$, $\mathbb{F}^{\times}$ has order
$|\mathbb{F}| - 1$.

## 3. Fields and Their Characteristic

**Definition (characteristic).** The **characteristic** of a field $\mathbb{F}$ is the least $n>0$
with $n \cdot 1 = 0$ (or $0$ if none exists). It is always $0$ or a prime $p$.

**Examples.**

- $\mathbb{Q}, \mathbb{R}, \mathbb{C}$ have characteristic $0$.
- $\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$ has characteristic $p$ and $p$ elements.
- A field of order $p^n$ has characteristic $p$.

**Theorem (subfield structure).** Every finite field $\mathbb{F}_{p^n}$ contains a unique copy of
$\mathbb{F}_{p^d}$ for each $d \mid n$, and no others.

## 4. The Multiplicative Group Is Cyclic

**Theorem.** For every finite field $\mathbb{F}$, the multiplicative group $\mathbb{F}^{\times}$ is
cyclic.

*Consequence.* There exist **primitive elements** $g \in \mathbb{F}^{\times}$ of order
$|\mathbb{F}| - 1$. Discrete-logarithm and Diffie–Hellman schemes are defined over such cyclic
groups; the DLP "how hard is it to recover $a$ from $g^a$?" is the central hardness question (see the Hardness Assumptions note).

## 5. Why These Axioms Matter for Security

1. **Associativity** is what makes Diffie–Hellman correct:
   $(g^a)^b = g^{ab} = (g^b)^a$.
2. **Commutativity** makes the shared secret symmetric; without it, key agreement fails.
3. **Existence of inverses** enables decryption (multiplying by $d = e^{-1} \bmod \varphi(n)$) and
   signature verification.
4. **Prime order** defeats subgroup/Pohlig–Hellman attacks and simplifies proofs of security.
5. **Group structure** is what *defines* the computational problems (DLP, CDH, DDH) that security
   reductions rest on. A scheme is only as strong as the group is "generic" — groups with extra
   structure (e.g., pairings, low embedding degree) can be attacked more easily.

## Sources

- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Appendix A: https://toc.cryptobook.us/
- Katz–Lindell, *Introduction to Modern Cryptography* — number-theory appendix: https://www.cs.umd.edu/~jkatz/imc.html
- CryptoHack — Modular Arithmetic / Elliptic Curves: https://cryptohack.org/
