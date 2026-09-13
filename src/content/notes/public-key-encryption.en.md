---
title: "Public-Key Encryption"
description: "Asymmetric encryption from RSA to ElGamal and hybrid KEM/DEM: security definitions, why textbook RSA fails, and the move to OAEP and KEMs."
pubDate: 2026-08-16
tags: ["Cryptography", "Public-Key", "RSA", "ElGamal", "KEM"]
lang: "en"
langLink: "/zh/notes/public-key-encryption/"
---

Public-key (asymmetric) encryption separates the ability to *encrypt* (public key $pk$) from the
ability to *decrypt* (secret key $sk$). It solves key distribution but is orders of magnitude slower
than symmetric encryption, so in practice it is used to transport/agree on a symmetric key.

## 1. Security Definitions

- **IND-CPA (semantic security):** the ciphertext of a chosen message is indistinguishable from the
  ciphertext of a random one, even under adaptive chosen-plaintext queries. Requires *randomized*
  encryption.
- **IND-CCA (chosen-ciphertext attack):** additionally, the adversary may decrypt chosen
  ciphertexts (except the challenge). This is the standard for deployed public-key encryption;
  **Bleichenbacher's attack** on RSA PKCS#1 v1.5 showed why CCA is the right target.

## 2. RSA Encryption

**KeyGen.** Generate primes $p, q$; $N = pq$; choose $e$ with $\gcd(e, \varphi(N)) = 1$; compute
$d = e^{-1} \bmod \varphi(N)$. Public key $(N, e)$, secret key $d$.

**Encrypt (textbook).** $c = m^e \bmod N$. **Decrypt.** $m = c^d \bmod N$.

**Correctness** follows from Euler's theorem: $m^{ed} \equiv m \pmod N$.

**Textbook RSA is broken in multiple ways:**
- **Deterministic** → not even CPA-secure (encrypting the same message twice gives the same
  ciphertext; a dictionary attack works).
- **Multiplicative homomorphism** $E(m_1) E(m_2) = E(m_1 m_2)$ enables blinding/fake-signature and
  chosen-ciphertext attacks.
- Small $e$ (e.g., 3) with a short message enables the **broadcast attack** (Håstad): the same $m$
  sent to many recipients is recovered via CRT.

**Padded RSA.** **RSA-OAEP** (PKCS#1 v2.2, RFC 8017) adds a Feistel-style mask that makes the
scheme randomized and provably **IND-CCA secure** in the random-oracle model assuming the RSA
problem is hard. **PKCS#1 v1.5 padding** is legacy and CCA-insecure (Bleichenbacher), though still
widespread in TLS prior to 1.3.

## 3. ElGamal Encryption

**Setup.** Cyclic group $\mathbb{G}$ of prime order $q$, generator $g$.

**KeyGen.** $sk = x \leftarrow \mathbb{Z}_q$, $pk = h = g^x$.

**Encrypt.** For $r \leftarrow \mathbb{Z}_q$: $c = (c_1, c_2) = (g^r,\ m \cdot h^r)$.

**Decrypt.** $m = c_2 / c_1^{x} = m \cdot g^{xr} / g^{rx}$.

**Security.** ElGamal is **IND-CPA secure under DDH**; it is *malleable* (multiply $c_2$ to scale
$m$) and so is not CCA-secure without a transform (e.g., Cramer–Shoup, or signing). It is the
standard example of the gap between CPA and CCA.

## 4. Hybrid Encryption (KEM/DEM)

Modern public-key encryption is **hybrid**: a **KEM** (key-encapsulation mechanism) uses the public
key to transport a random symmetric key, which a **DEM** (data-encapsulation mechanism, i.e., an
AEAD) uses to encrypt the payload.

$$ (c_{\text{kem}}, k) = \mathrm{Encaps}(pk); \qquad c_{\text{dem}} = \mathrm{AEAD}(k, m). $$

The KEM/DEM separation is now the *preferred* interface (used by NIST PQC — ML-KEM is a KEM — and
TLS 1.3). It sidesteps message-length limits, gives clean CCA reductions, and isolates the
asymmetric part to key transport only.

**RSA-KEM** (RFC 5990) and **ECIES** (elliptic-curve integrated encryption scheme, using ECDH as a
KEM) are the standard classical KEMs.

## 5. Security Implications Summary

1. **Never use textbook RSA**; use OAEP (or a KEM).
2. **RSA PKCS#1 v1.5 is legacy** and CCA-vulnerable; avoid in new designs.
3. **ElGamal is CPA-only**; it is malleable — don't use it without integrity protection.
4. **Prefer hybrid KEM/DEM** encryption (RSA-KEM, ECIES, or the PQC KEMs) over raw asymmetric
   encryption of messages.
5. Key sizes: RSA ≥ 2048-bit (112-bit) or 3072-bit (128-bit) classical security; all classical
   public-key encryption is broken by Shor's algorithm and must be replaced per the PQC transition.

## Sources

- NIST CSRC — Cryptographic Standards and Guidelines (SP 800-56B, FIPS 186): https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- IETF RFC Editor — RFC 8017 (PKCS#1 v2.2): https://www.rfc-editor.org/
- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Ch. 11–12: https://toc.cryptobook.us/
- Katz–Lindell, *Introduction to Modern Cryptography* — Ch. 11/12: https://www.cs.umd.edu/~jkatz/imc.html
