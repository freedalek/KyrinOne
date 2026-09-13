---
title: "Message Authentication Codes and Authenticated Encryption"
description: "MACs and AEAD: EUF-CMA security, HMAC and CBC-MAC/CMAC, encrypt-then-MAC composition, and standardized AEAD schemes such as AES-GCM and ChaCha20-Poly1305."
pubDate: 2026-08-16
tags: ["Cryptography", "MAC", "AEAD", "HMAC", "AES-GCM"]
lang: "en"
langLink: "/zh/notes/mac-and-aead/"
---

## 1. MACs: Definition and Security

**Definition (MAC).** A MAC is a pair $(\mathrm{Sign}, \mathrm{Vrfy})$ such that a tag
$t = \mathrm{Sign}(k, m)$ lets a holder of the shared key verify integrity and authenticity of $m$.

**Security (EUF-CMA — existential unforgeability under chosen-message attack).** Even after
querying tags for chosen messages, an adversary cannot produce a valid tag for a *new* message
except with negligible probability. MACs assume the two parties share a secret key; they do **not**
provide non-repudiation (both parties could have produced the tag).

## 2. HMAC

**Construction (RFC 2104 / FIPS 198-1).**
$$ \mathrm{HMAC}(k, m) = H\!\big((k \oplus \mathrm{opad}) \mathbin{\Vert} H((k \oplus \mathrm{ipad}) \mathbin{\Vert} m)\big) $$

The inner hash compresses the message under $\mathrm{ipad}$; the outer hash "hashes the hash",
which defeats Merkle–Damgård **length-extension** attacks. HMAC is a **PRF under the assumption
that the compression function is a PRF** — notably, HMAC-SHA-2 remains secure even though
collision-resistance of the underlying hash may be weakened, which is why HMAC-SHA-1 stayed usable
long after SHA-1 collisions appeared (though it is now also deprecated in most contexts).

**Uses.** TLS record MACs (historically), HKDF key derivation, PBKDF2, challenge-response auth.

## 3. CBC-MAC and Its Pitfalls

CBC-MAC encrypts the message in CBC mode with zero IV and outputs the last block as the tag. It is
secure **only for fixed-length messages**; it is insecure for variable-length messages (length
extension via block splicing) unless transformed with the encrypt-last-block (EMAC) or
encrypted-CBC-MAC (CMAC, NIST SP 800-38B) constructions. **CMAC** is the standardized fixed-length
and variable-length secure variant.

## 4. Authenticated Encryption (AEAD)

An **AEAD** scheme encrypts *and* authenticates in one primitive, achieving IND-CCA security: the
adversary cannot forge a ciphertext or learn anything from ciphertexts of its choosing.

**Definition (AEAD).** $(\mathrm{Enc}, \mathrm{Dec})$ with
$\mathrm{Enc}(k, \mathrm{nonce}, m, \mathrm{ad}) = (c, t)$ where $\mathrm{ad}$ is authenticated
associated data; decryption returns $m$ only if the tag verifies.

**Generic composition — Encrypt-then-MAC.** Compute $c = E(k_1, m)$ then
$t = \mathrm{MAC}(k_2, \mathrm{nonce} \mathbin{\Vert} c)$, output $(c, t)$. This is the only
composition that is provably AEAD-secure from CPA-secure encryption and a secure MAC, and is the
template used by TLS 1.3 AEADs.

## 5. Standardized AEAD Schemes

| Scheme | Standard | Construction | Notes |
|--------|----------|--------------|-------|
| AES-GCM | SP 800-38D | CTR encryption + GHASH tag in $\mathbb{F}_{2^{128}}$ | hardware-fast; **catastrophic** on nonce reuse |
| ChaCha20-Poly1305 | RFC 8439 | ChaCha20 + Poly1305 (Wegman–Carter MAC) | constant-time software; same nonce caveat |
| AES-CCM | SP 800-38C | CTR + CBC-MAC | IoT/constrained |
| AES-GCM-SIV | RFC 8452 | SIV mode | nonce-misuse resistant (tradeoff: 2 passes) |

**Nonce reuse in GCM** fully recovers the GHASH authentication subkey and XORs plaintexts — a single
nonce collision breaks confidentiality *and* authentication. SIV modes (RFC 8452) derive the nonce
from the message, remaining secure (up to plaintext equality) under nonce reuse.

## 6. Security Implications Summary

1. **Use a dedicated AEAD** (GCM/ChaCha20-Poly1305) rather than home-grown encrypt-then-MAC.
2. **Never reuse a nonce** with a given key for CTR/GCM; use random 96-bit nonces or a counter.
3. **Encrypt-then-MAC** is the safe generic composition; MAC-then-encrypt caused TLS padding-oracle
   breaks.
4. **HMAC** for keyed integrity/KDF; **CMAC** for fixed-structure block-cipher MACs; **Poly1305** is
   a one-time MAC — it must be paired with a unique per-message keystream.
5. AES-GCM tag length is typically 128 bits; shortening the tag weakens forgery resistance
   proportionally.

## Sources

- NIST CSRC — FIPS 198-1 (HMAC); SP 800-38D (GCM): https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- RFC 8439 (ChaCha20-Poly1305); RFC 2104 (HMAC): https://www.rfc-editor.org/
- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Ch. 6–9: https://toc.cryptobook.us/
