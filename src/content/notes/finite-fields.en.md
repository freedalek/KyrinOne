---
title: "Finite Fields"
description: "Galois fields as the ground structure for AES, GHASH, elliptic curves and secret sharing: construction, arithmetic, the binary field, and the role of field polynomials."
pubDate: 2026-08-16
tags: ["Cryptography", "Finite Fields", "Foundations", "AES"]
lang: "en"
langLink: "/zh/notes/finite-fields/"
---

Finite fields (Galois fields) are the ground structures for AES, most hash functions, elliptic-curve
coordinates, secret sharing, and Reed–Solomon-based erasure coding.

## 1. Existence and Uniqueness

**Theorem (classification of finite fields).** A finite field exists iff its size is $q = p^n$ for a
prime $p$ and $n \ge 1$. Any two fields of the same size are isomorphic; the field of order $q$ is
denoted $\mathbb{F}_q$ (or $GF(q)$).

**Construction.** $\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$. To build $\mathbb{F}_{p^n}$, take the
polynomial ring $\mathbb{F}_p[x]$ and reduce modulo an **irreducible** polynomial $f(x)$ of degree
$n$:
$$ \mathbb{F}_{p^n} \cong \mathbb{F}_p[x] / (f(x)). $$
Elements are polynomials of degree $< n$ with coefficients in $\mathbb{F}_p$.

## 2. Arithmetic

**Addition/subtraction** is coefficient-wise mod $p$.

**Multiplication** is polynomial multiplication followed by reduction mod $f(x)$.

**Inversion** uses the extended Euclidean algorithm in $\mathbb{F}_p[x]$ (Bézout's identity for
polynomials).

**Frobenius automorphism.** The map $\sigma : x \mapsto x^p$ is a field automorphism of
$\mathbb{F}_{p^n}$ fixing $\mathbb{F}_p$. It is used to define the **trace**
$\operatorname{Tr}(a) = \sum_{i=0}^{n-1} a^{p^i}$ and the **norm**, both of which land in
$\mathbb{F}_p$.

## 3. The Binary Field $\mathbb{F}_{2^m}$

For $p = 2$, addition is XOR (coefficient arithmetic mod 2, no carries), which is extremely cheap
in hardware. Elements are bit strings of length $m$, and multiplication mod an irreducible binary
polynomial. Standard examples include:

- AES uses $\mathbb{F}_{2^8}$ with $f(x) = x^8 + x^4 + x^3 + x + 1$ (0x11B) for its S-box
  inversion and MixColumns step (see the Symmetric Crypto note).
- GCM's GHASH operates in $\mathbb{F}_{2^{128}}$.

## 4. The Prime Field $\mathbb{F}_p$ and Elliptic Curves

Elliptic-curve cryptography uses curves over $\mathbb{F}_p$ with $p$ a large prime (e.g.,
NIST P-256 has a 256-bit $p$, secp256k1 has $p = 2^{256} - 2^{32} - 977$). The curve's points form
a group whose order is $\approx p$; discrete log in this group is the ECDLP (see the Elliptic Curves note).

## 5. Field Polynomials in Practice

**Irreducible vs. primitive.** An irreducible $f(x)$ suffices to build the field. A **primitive**
polynomial's root is a generator of $\mathbb{F}_{q}^{\times}$. AES and many LFSR-based stream
ciphers choose primitive polynomials so that the "multiply by $x$" operation cycles through all
nonzero elements.

**Discrete logarithm in finite fields.** Over $\mathbb{F}_p$, DLP is solved by the **index calculus**
method in subexponential time, which is why prime-field DLP requires much larger parameters
(2048–3072-bit $p$) than elliptic-curve DLP (~256-bit) — index calculus does not carry over to
generic elliptic-curve groups.

## 6. Why Finite Fields Are Cryptographically Central

| Structure | Use |
|-----------|-----|
| $\mathbb{F}_2$ / $\mathbb{F}_{2^8}$ | AES S-box, byte mixing |
| $\mathbb{F}_{2^{128}}$ | GCM authentication (GHASH) |
| $\mathbb{F}_p$ (large prime) | DH, DSA, ElGamal, EC coordinates |
| $\mathbb{F}_p$ (small, e.g. $p \equiv 1 \pmod 4$) | zero-knowledge/MPC arithmetic circuits (e.g. Baby Bear, Goldilocks, Mersenne primes) |
| $\mathbb{F}_{p^n}$ | pairing-friendly extensions, erasure coding |

## Sources

- NIST CSRC — Cryptographic Standards and Guidelines (FIPS 197 AES; Galois fields): https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Appendix A: https://toc.cryptobook.us/
- CryptoHack — Mathematics: https://cryptohack.org/
