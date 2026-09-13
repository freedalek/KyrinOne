---
title: "Digital Signatures"
description: "Signature schemes that give authenticity and non-repudiation — RSA-PSS, DSA/ECDSA and EdDSA — their security definitions, and the nonce-management failures that break them."
pubDate: 2026-08-16
tags: ["Cryptography", "Digital Signatures", "RSA", "ECDSA", "EdDSA"]
lang: "en"
langLink: "/zh/notes/digital-signatures/"
---

A digital signature scheme lets the holder of a secret key produce a signature $\sigma$ on a message
$m$ that anyone can verify with the public key. Unlike MACs, signatures provide **non-repudiation**:
only the signer could have produced $\sigma$.

## 1. Security Definition

**Definition (EUF-CMA — existential unforgeability under chosen-message attack).** Even after
obtaining signatures on adversarially chosen messages, no efficient adversary can forge a valid
signature on a *new* message except with negligible probability. A stronger variant,
**strong unforgeability** (sEUF-CMA), also forbids producing a *different* signature on an already
signed message (relevant against signature malleability).

**Signature schemes are also used as the building block of certificates (X.509), TLS handshake
auth, code signing, and (via the Fiat–Shamir transform) zero-knowledge proofs.**

## 2. RSA Signatures

**Full-domain hash (FDH).** Sign $\sigma = H(m)^d \bmod N$; verify $H(m) \equiv \sigma^e \pmod N$.
Provably secure in the random-oracle model assuming the RSA problem is hard. In practice the hash is
encoded with **PSS** (probabilistic signature scheme, RFC 8017), which is the recommended
padding; **PKCS#1 v1.5** signature padding is still widely used and is *not* known to be broken
(when the digest info is correct), but PSS is preferred.

**Bleichenbacher-style** attacks target the *encryption* padding, not PSS; the signature analogue
concern is deterministic encodings with insufficient checks (e.g., small-$e$ cube-root attacks on
truncated padding).

## 3. DSA and ECDSA

**DSA (FIPS 186).** Parameters: prime $p$, $q \mid (p-1)$, generator $g$ of order $q$ in
$\mathbb{F}_p^{\times}$; secret $x$, public $y = g^x$.

- **Sign** $m$ (hash $h = H(m)$): pick $k \leftarrow \mathbb{Z}_q^{*}$, compute
  $r = (g^k \bmod p) \bmod q$, $s = k^{-1}(h + x r) \bmod q$; output $(r, s)$.
- **Verify:** compute $w = s^{-1}$, $u_1 = h w$, $u_2 = r w$; accept iff
  $(g^{u_1} y^{u_2} \bmod p) \bmod q = r$.

**ECDSA** is DSA over an elliptic-curve group: $r = (kG)_x \bmod q$,
$s = k^{-1}(h + x r) \bmod q$. It is standardized in FIPS 186-5 with curves P-256/P-384/P-521.

**Critical requirement.** The nonce $k$ must be **uniformly random and unique per signature**. If
$k$ is reused across two signatures, the secret key is recovered directly:
$$ x = \frac{s_1 h_2 - s_2 h_1}{r (s_2 - s_1)} \bmod q. $$
This "nonce-reuse key extraction" is one of the most exploited real-world failures (PlayStation 3,
many flawed wallets). **RFC 6979** derives $k$ deterministically from the message and key
($k = H(x, m)$), eliminating both randomness and reuse failures.

## 4. EdDSA (Ed25519, RFC 8032)

EdDSA is a Schnorr-style signature over Edwards/twisted-Edwards curves, designed to be:
- **Deterministic** (no per-signature randomness, hence no nonce-misuse key extraction).
- **Constant-time** and free of secret-dependent branching.
- **Compact**: Ed25519 gives 128-bit security with 32-byte keys and 64-byte signatures.

**Sign.** $r = H(h_b \mathbin{\Vert} m)$ (from a 512-bit hash of the secret), $R = rB$,
$s = r + H(R \mathbin{\Vert} A \mathbin{\Vert} m) \cdot a$, output $(R, s)$.
**Verify.** Check $sB = R + H(R \Vert A \Vert m) A$.

**Schnorr signatures** are the foundation: linear in the key ($s = k + c x$), which enables
threshold signing, multisignatures (MuSig), and aggregation that ECDSA lacks. Bitcoin Taproot
adopted Schnorr (BIP-340) for exactly these properties.

## 5. Comparison

| Scheme | Standard | Assumption | Notes |
|--------|----------|-----------|-------|
| RSA-PSS | RFC 8017 | RSA | large keys, no key-reuse pitfalls |
| DSA | FIPS 186-5 | DLP | nonce critical; legacy |
| ECDSA | FIPS 186-5 | ECDLP | nonce critical; not aggregatable |
| Ed25519 | RFC 8032 | ECDLP (Schnorr) | deterministic, constant-time, small |
| ML-DSA | FIPS 204 | Module-LWE | post-quantum replacement (see the Post-Quantum notes) |

## 6. Security Implications Summary

1. **Nonce management is the top ECDSA/DSA failure** — use RFC 6979 determinism or EdDSA.
2. **Hash the message with a full-strength hash**; a signature over a weak or truncated hash is
   forgeable.
3. **Signature malleability** matters where signatures are used as identifiers or in consensus
   (blockchain transactions): prefer sEUF-CMA schemes or normalize $s$ (low-$s$ rules).
4. All classical signatures (RSA/ECDSA/DSA/EdDSA) are broken by Shor's algorithm; migrate to
   ML-DSA/SLH-DSA per the PQC transition.

## Sources

- NIST CSRC — Cryptographic Standards and Guidelines (FIPS 186-5 Digital Signature Standard): https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines
- IETF RFC Editor — RFC 8017 (RSA-PSS); RFC 8032 (EdDSA): https://www.rfc-editor.org/
- Boneh–Shoup, *A Graduate Course in Applied Cryptography* — Ch. 13: https://toc.cryptobook.us/
