---
title: "Hash Functions"
description: "Cryptographic hash functions: security properties, the birthday bound, the Merkle–Damgård construction of SHA-1/SHA-2, the sponge construction of SHA-3, and their applications."
pubDate: 2026-08-16
tags: ["Cryptography", "Hash Functions", "SHA-3", "Merkle–Damgård", "Integrity"]
lang: "en"
langLink: "/zh/notes/hash-functions/"
---

A cryptographic hash function $H : \{0,1\}^{*} \to \{0,1\}^n$ maps arbitrary-length input to a
fixed-length digest. It is the workhorse of integrity, commitments, signatures, and key derivation.

## 1. Security Properties

**Definition.** $H$ is:
- **Preimage-resistant** (one-way): given $y$, finding $x$ with $H(x) = y$ is infeasible.
- **Second-preimage-resistant**: given $x$, finding $x' \neq x$ with $H(x') = H(x)$ is infeasible.
- **Collision-resistant**: finding *any* pair $x \neq x'$ with $H(x) = H(x')$ is infeasible.

**Relationship.** Collision resistance $\Rightarrow$ second-preimage resistance (for most
definitions); neither implies preimage resistance directly, though all three are required in
practice.

**Birthday bound.** Finding collisions generically takes $O(2^{n/2})$ hash evaluations; finding
(pre)images takes $O(2^n)$. A hash must have $n \ge 256$ bits for 128-bit collision security.

**Security implication.** Collision resistance is the *hardest* to achieve and is only needed when
the adversary controls both inputs (e.g., hashing attacker-influenced data). Many uses (HMAC,
hashing a commitment to a random nonce) need only (second-)preimage resistance, which is why some
schemes tolerate weakened collision resistance.

## 2. Merkle–Damgård Construction (SHA-1, SHA-2)

**Construction.** Given a compression function $f : \{0,1\}^n \times \{0,1\}^r \to \{0,1\}^n$, pad
the message to a multiple of $r$ (append `1`, zeros, and the length), then iterate:
$$ h_0 = IV,\qquad h_{i+1} = f(h_i, m_i),\qquad H(m) = h_{L}. $$

**Theorem.** If $f$ is collision-resistant, so is the Merkle–Damgård hash. (Proof: a collision in
the iterated hash yields a collision in $f$ or two different-length messages with the same final
chaining value — both contradict the CR of $f$.)

**Weaknesses.** Merkle–Damgård admits **length-extension attacks**: given $H(m)$ one can compute
$H(m \mathbin{\Vert} \text{pad} \mathbin{\Vert} m')$ without knowing $m$. This breaks naive
`H(secret || data)` MACs (reason HMAC is structured as it is) and motivates the prefix-free design
of SHA-3.

## 3. Standardized Hashes

| Function | Standard | Output | Status |
|----------|----------|--------|--------|
| MD5 | — | 128 | **Broken** (collisions trivial) |
| SHA-1 | FIPS 180-1 | 160 | **Broken** (SHAttered collision 2017); deprecated |
| SHA-256 / SHA-512 | FIPS 180-4 | 256 / 512 | Safe |
| SHA-224 / SHA-384 | FIPS 180-4 | truncated | Safe |
| SHA-3 (224/256/384/512) | FIPS 202 | various | Safe |
| SHAKE128 / SHAKE256 | FIPS 202 | XOF (arbitrary) | Safe (extendable-output) |

**SHA-2** (FIPS 180-4) is Merkle–Damgård over the Davies–Meyer compression function. **SHA-3**
(FIPS 202) is the Keccak **sponge** construction (see below), structurally immune to
length-extension.

## 4. The Sponge Construction (SHA-3)

**Construction.** A sponge with rate $r$ and capacity $c$ (state size $b = r + c$) absorbs input by
XORing $r$-bit blocks into the state and applying a permutation $f$, then squeezes $r$-bit output
blocks, again permuting between blocks.

**Security.** The sponge's collision resistance is $\min(2^{c/2}, 2^{n/2})$ and preimage resistance
is $\min(2^{c}, 2^n)$; the capacity $c$ is the real security parameter. Because input is absorbed
into the state rather than chained, there is no length-extension attack.

**SHAKE** is an XOF — it produces arbitrarily long output, used for deterministic generation, Fiat–
Shamir challenges, and hash-based signatures.

## 5. Applications and Compositions

- **Integrity/commitment:** $c = H(m)$ binds to $m$ if $H$ is collision-resistant.
- **Signature preprocessing:** sign $H(m)$ (full-domain hash), not $m$ directly (RSA-FDH).
- **Merkle trees:** $h = H(H(L) \mathbin{\Vert} H(R))$ — efficient commitments to large sets; the
  basis of Bitcoin's state commitment, transparency logs, and SLH-DSA (see Post-Quantum).
- **Key derivation:** HKDF (RFC 5869) and PBKDF2 (RFC 8018) build on HMAC/hashes to derive keys and
  stretch low-entropy passwords.

## 6. Security Implications Summary

1. Use **SHA-256/SHA-512/SHA-3**; never MD5 or SHA-1 in new designs.
2. **Domain-separate** uses (`H("enc" || x)` vs `H("mac" || x)`) to avoid cross-protocol
   collisions.
3. For a MAC over secret-prefix data, use **HMAC** or SHA-3, not raw Merkle–Damgård hashing.
4. Respect the **birthday bound**: a 128-bit hash is not enough for collision resistance.
5. Grover's algorithm halves preimage security quantumly: a 256-bit hash gives ~128-bit quantum
   preimage resistance, which is fine; 128-bit hashes do not.

## Sources

- NIST CSRC — FIPS 180-4 (SHA-2); FIPS 202 (SHA-3): https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- RFC 6234 (SHA); RFC 8018 (PKCS#5); RFC 8702 (KDF): https://www.rfc-editor.org/
- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Ch. 8: https://toc.cryptobook.us/
