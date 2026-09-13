---
title: "Symmetric Cryptography"
description: "Symmetric cryptography: security definitions from perfect secrecy to IND-CPA/IND-CCA, block ciphers and AES, stream ciphers, modes of operation, the birthday bound, and encrypt-then-MAC composition."
pubDate: 2026-08-16
tags: ["Cryptography", "Symmetric", "AES", "Block Ciphers", "AEAD"]
lang: "en"
langLink: "/zh/notes/symmetric-crypto/"
---

Symmetric cryptography uses a **single shared key** for both encryption and decryption. It provides
confidentiality (encryption), integrity (MAC), and, combined, authenticated encryption (AEAD).

## 1. Security Definitions

**Definition (perfect secrecy — Shannon).** A cipher $(E, D)$ over message space $\mathcal{M}$ is
perfectly secure if for every distribution over $\mathcal{M}$, every $m$, and every ciphertext $c$:
$$ \Pr[M = m \mid C = c] = \Pr[M = m]. $$

**Theorem (Shannon).** Perfect secrecy requires $|\mathcal{K}| \ge |\mathcal{M}|$; the one-time pad
$c = m \oplus k$ with uniform $k$ is perfectly secret but requires a key as long as the message.

Because perfect secrecy is impractical, modern cryptography relaxes to **computational** notions:

- **IND-CPA (semantic security under chosen-plaintext attack).** An adversary cannot distinguish
  $E(k, m_0)$ from $E(k, m_1)$ even after adaptively obtaining encryptions of chosen messages.
  This forces *randomized* encryption (fresh IV/nonce per encryption).
- **IND-CCA (chosen-ciphertext attack).** The adversary may also query decryption of chosen
  ciphertexts. AEAD aims for this level.

## 2. Block Ciphers and AES

A **block cipher** is a keyed permutation $E : \{0,1\}^k \times \{0,1\}^n \to \{0,1\}^n$; each key
selects a permutation on $n$-bit blocks.

**AES (FIPS 197)** — the Rijndael cipher, standardized 2001:

| Property | Value |
|----------|-------|
| Block size | 128 bits |
| Key sizes | 128 / 192 / 256 bits |
| Rounds | 10 / 12 / 14 |
| Structure | substitution–permutation network (SPN) |

Each round applies four transformations to a $4 \times 4$ byte **state**:
1. **SubBytes** — the S-box: inversion in $\mathbb{F}_{2^8}$ followed by an affine map (gives
   nonlinearity, the source of confusion).
2. **ShiftRows** — cyclic byte shifts (diffusion across columns).
3. **MixColumns** — a matrix multiply in $\mathbb{F}_{2^8}$ (diffusion across rows; omitted in the
   final round).
4. **AddRoundKey** — XOR with the round key (from the key schedule).

**Design rationale.** The S-box's inversion in a finite field maximizes nonlinearity and is
resistant to linear and differential cryptanalysis; the SPN structure (vs. DES's Feistel network)
makes all bits depend on the key after a few rounds (full diffusion).

**DES** (historical, 56-bit key, Feistel network) is **deprecated**; 3DES is being retired. AES is
the mandated symmetric standard in NIST SP 800-175B.

## 3. Stream Ciphers

A stream cipher expands a key + nonce into a pseudorandom keystream and XORs it with the plaintext:
$c_i = m_i \oplus \mathrm{PRG}(k, \mathrm{nonce})_i$.

**ChaCha20** (RFC 8439) is the widely used modern stream cipher: 512-bit state, ARX design
(addition–rotation–XOR), 20 rounds. It is fast in software without AES-NI and is constant-time by
construction. **Salsa20** is its predecessor.

**RC4** is broken (biased keystream) and must not be used.

## 4. Modes of Operation

Block ciphers encrypt fixed-size blocks; modes extend them to arbitrary-length messages:

| Mode | Property | Notes |
|------|----------|-------|
| ECB | deterministic | **Insecure**: identical blocks leak. Never use. |
| CBC | randomized with random IV | CPA-secure only with random/unpredictable IV; not parallelizable for encryption |
| CTR | stream-like | parallelizable, needs unique nonce per key |
| GCM | AEAD | CTR encryption + GHASH tag; the default AEAD (SP 800-38D) |
| ChaCha20-Poly1305 | AEAD | fast software AEAD (RFC 8439) |

**Theorem (CPA security of CTR/CBC).** If $E$ is a secure PRF/PRP, then CTR and randomized-CBC are
IND-CPA secure. Intuition: an IND-CPA adversary that could tell $E(k, m_0)$ from $E(k, m_1)$ would
violate the pseudorandomness of the block cipher.

**Nonce misuse is fatal** to CTR/GCM: reusing a nonce XORs two plaintexts
($c_1 \oplus c_2 = m_1 \oplus m_2$). CBC with a predictable IV is also broken (BEAST).

**Padding oracles.** CBC with PKCS#7 padding is vulnerable to padding-oracle attacks
(e.g., Lucky13, POODLE); this is the classic argument for AEAD and for encrypt-then-MAC.

## 5. The Birthday Bound and Key Sizes

Randomized modes (CBC/CTR) leak information after $\sim 2^{n/2}$ blocks due to the birthday
paradox; for AES's 128-bit block that is $\sim 2^{64}$ blocks ($\approx 2^{68}$ bytes). Protocols
must re-key before this bound.

**Key sizes vs. security.** AES-128 gives ~128-bit classical security but, due to Grover's
algorithm (square-root speedup), ~64-bit quantum security; AES-256 is the recommended level for
quantum-safe symmetric cryptography (see Post-Quantum).

## 6. Composition: Encrypt-then-MAC vs. Others

- **Encrypt-then-MAC** ($c = E(k_1, m)$; $t = \mathrm{MAC}(k_2, c)$) is the only provably
  CCA-secure generic composition — verify the MAC *before* decryption.
- **MAC-then-encrypt** (SSL/TLS style) and **encrypt-and-MAC** (SSH style) are subtly weaker and
  caused real breaks (Lucky13, POODLE).

The modern recommendation is a **dedicated AEAD** (GCM, ChaCha20-Poly1305, or AES-GCM-SIV for
nonce-misuse resistance), which bundles the analysis into one primitive.

## Sources

- NIST CSRC — FIPS 197 (AES); block cipher techniques: https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- RFC 8439 (ChaCha20-Poly1305); RFC 9057 (AEAD): https://www.rfc-editor.org/
- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Ch. 2–5, 9: https://toc.cryptobook.us/
- CryptoHack — Symmetric Cryptography course: https://cryptohack.org/
