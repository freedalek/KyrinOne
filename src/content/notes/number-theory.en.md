---
title: "Number Theory for Cryptography"
description: "The integer arithmetic behind RSA, Diffie–Hellman, DSA and elliptic-curve schemes: divisibility, Bézout, Euler/Fermat, CRT, quadratic residues, and primality/factorization."
pubDate: 2026-08-16
tags: ["Cryptography", "Number Theory", "Foundations", "RSA"]
lang: "en"
langLink: "/zh/notes/number-theory/"
---

Number theory supplies the integer arithmetic on which RSA, Diffie–Hellman, DSA, and elliptic-curve
schemes are built. This note states the definitions and theorems with proofs where they are short.

## 1. Divisibility and Modular Arithmetic

**Definition (divisibility).** For integers $a, b$ with $b \neq 0$, we write $b \mid a$ if there
exists $k \in \mathbb{Z}$ with $a = kb$.

**Definition (congruence).** $a \equiv b \pmod{n}$ iff $n \mid (a - b)$. Congruence is an
equivalence relation, and the set of residue classes $\mathbb{Z}/n\mathbb{Z}$ is a ring.

**Theorem (division algorithm).** For $a, n \in \mathbb{Z}$, $n > 0$, there exist unique $q, r$
with $a = qn + r$ and $0 \le r < n$. The remainder $r$ is written $a \bmod n$.

## 2. Greatest Common Divisor and Bézout's Identity

**Definition.** $\gcd(a, b)$ is the largest positive integer dividing both $a$ and $b$.

**Theorem (Bézout's identity).** For any integers $a, b$ (not both zero), there exist integers
$x, y$ such that
$$ ax + by = \gcd(a, b). $$

*Proof sketch.* Run the Euclidean algorithm: repeatedly replace $(a, b)$ by $(b, a \bmod b)$ until
the remainder is $0$; the last nonzero remainder is $\gcd(a,b)$. Back-substitute the quotients to
recover the coefficients $x, y$. ∎

The **extended Euclidean algorithm** computes $\gcd(a, b)$ *and* the coefficients $x, y$ in
$O(\log(\min(a,b)))$ arithmetic operations. In cryptography it is used to compute **modular
inverses**: if $\gcd(a, n) = 1$, then $x$ from $ax + ny = 1$ satisfies $a x \equiv 1 \pmod n$, so
$x = a^{-1} \bmod n$.

## 3. Euler's Totient Function and the Euler/Fermat Theorems

**Definition.** Euler's totient $\varphi(n)$ is the number of integers in $[1, n]$ coprime to $n$.
The multiplicative group $(\mathbb{Z}/n\mathbb{Z})^{\times}$ has order $\varphi(n)$.

**Theorem.** If $n = \prod p_i^{e_i}$ is the prime factorization, then
$$ \varphi(n) = n \prod_{p \mid n} \left(1 - \frac{1}{p}\right) = \prod_i p_i^{e_i - 1}(p_i - 1). $$

**Theorem (Euler).** If $\gcd(a, n) = 1$ then
$$ a^{\varphi(n)} \equiv 1 \pmod n. $$

**Theorem (Fermat's little theorem).** If $p$ is prime and $p \nmid a$, then
$$ a^{p-1} \equiv 1 \pmod p, \qquad\text{equivalently } a^p \equiv a \pmod p. $$

*Proof (of Fermat via Euler's theorem).* $\varphi(p) = p - 1$, so apply Euler's theorem. ∎

Fermat's little theorem is the basis of the **Fermat primality test** and, together with its
generalization, of RSA correctness: RSA sets $n = pq$, $\varphi(n) = (p-1)(q-1)$, chooses $e$ with
$\gcd(e, \varphi(n)) = 1$, and sets $d = e^{-1} \bmod \varphi(n)$; then
$m^{ed} \equiv m \pmod n$ for all $m$.

## 4. Chinese Remainder Theorem (CRT)

**Theorem (CRT).** Let $n_1, \dots, n_k$ be pairwise coprime and $N = \prod n_i$. The system
$$ x \equiv a_i \pmod{n_i},\quad i = 1, \dots, k $$
has a unique solution modulo $N$, given by
$$ x \equiv \sum_{i=1}^k a_i \cdot \frac{N}{n_i} \cdot \left(\frac{N}{n_i}\right)^{-1} \pmod{n_i} \pmod N. $$

*Significance.* The CRT gives a ring isomorphism
$\mathbb{Z}/N\mathbb{Z} \cong \mathbb{Z}/n_1\mathbb{Z} \times \cdots \times \mathbb{Z}/n_k\mathbb{Z}$.
It is used to **speed up RSA decryption/signing** (compute the operation mod $p$ and mod $q$
separately, then recombine) and appears in attacks on RSA with small decryption exponents.

## 5. Quadratic Residues and Legendre/Jacobi Symbols

**Definition.** $a$ is a **quadratic residue** mod $n$ if $x^2 \equiv a \pmod n$ has a solution
with $\gcd(x, n) = 1$.

**Definition (Legendre symbol).** For odd prime $p$:
$$ \left(\frac{a}{p}\right) = \begin{cases} 1 & a \text{ is a QR mod } p \\ -1 & a \text{ is a non-residue} \\ 0 & p \mid a. \end{cases} $$

**Theorem (Euler's criterion).** $\left(\frac{a}{p}\right) \equiv a^{(p-1)/2} \pmod p$.

**Theorem (quadratic reciprocity).** For distinct odd primes $p, q$,
$$ \left(\frac{p}{q}\right)\left(\frac{q}{p}\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}}. $$

The **Jacobi symbol** extends the Legendre symbol to composite odd moduli and is used in the
Solovay–Strassen primality test. Quadratic residuosity is the hardness assumption behind the
Goldwasser–Micali cryptosystem.

## 6. Primality Testing and Factorization

**Theorem (Fermat test).** If $p$ is prime and $p \nmid a$, then $a^{p-1} \equiv 1 \pmod p$; a
composite $n$ failing this for some $a$ is called a Fermat witness for $n$.

**Miller–Rabin.** A probabilistic compositeness test based on factoring $n-1 = 2^s \cdot d$ and
checking the sequence $a^d, a^{2d}, \dots, a^{2^s d} \pmod n$. It is the standard practical
primality test: for a composite $n$, at least $3/4$ of bases $a$ are witnesses, so $t$ iterations
give error $\le 4^{-t}$. Deterministic variants (known "small" witness sets) are exact below large
bounds.

**Integer factorization** is widely believed to be hard in general. The best known classical
algorithm is the **general number field sieve (GNFS)**, which runs in subexponential time
$$ \exp\left( \left(\sqrt[3]{\tfrac{64}{9}} + o(1)\right) (\ln n)^{1/3} (\ln\ln n)^{2/3} \right). $$
This cost is what makes RSA safe at current key sizes (2048-bit and up), and it is the reason RSA
does **not** survive quantum computers (Shor's algorithm — see the Post-Quantum notes).

## 7. Security Implications Summary

| Number-theoretic fact | Cryptographic use |
|-----------------------|-------------------|
| Extended Euclidean algorithm | modular inversion in RSA/ECDSA |
| Fermat / Euler theorems | RSA correctness, Fermat test |
| CRT | RSA speedup, some attacks |
| Quadratic reciprocity / Legendre | Goldwasser–Micali, Rabin, symbol-based tests |
| Miller–Rabin | parameter generation (prime generation) |
| GNFS subexponential cost | RSA/DH key-size requirements |

## Sources

- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Appendix A: https://toc.cryptobook.us/
- Katz–Lindell, *Introduction to Modern Cryptography* — number-theory appendix: https://www.cs.umd.edu/~jkatz/imc.html
- NIST CSRC — Cryptographic Standards and Guidelines: https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
