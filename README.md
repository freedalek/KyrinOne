# kyrin.one — Digital Investigator

> **kyr**`in`**.one** · *Key Your Reasoning **IN**to **ONE*** · *将你的思考汇聚于**一***

`digital-investigator@kyrin: ~/kyrin.one $` — Independent digital investigator, security
researcher and digital forensics analyst. This repository is the source of the site
served at **https://www.kyrin.one** (GitHub Pages), built as a bilingual, geek-styled
knowledge platform.

- **Site:** https://www.kyrin.one
- **Author:** freedalek / Kyrin
- **Stack:** Astro (output: `static`) · Tailwind CSS v4 · TypeScript

---

## `$ whoami`

I trace **data leaks**, reconstruct **attack paths** and hunt **dormant threats** —
turning scattered signals into a coherent picture.

| EN | 中文 |
| -- | ---- |
| Digital Investigation | 数字调查 |
| Data Leak Investigation | 数据泄漏调查 |
| Threat Analysis | 威胁分析 |
| Threat Hunting | 威胁狩猎 |

**Research & learning** (in progress): reverse engineering, blockchain on-chain tracing,
smart-contract auditing, cryptanalysis — see the roadmap on the homepage.

## `$ ls modules/`

The top bar splits the site into **four** modules:

| Module | Route | Content |
| ------ | ----- | ------- |
| **Home** / 首页 | `/{lang}/` | Identity, services, latest & featured, contact |
| **Investigations** / 调查案例 | `/{lang}/investigations/` | Real case files & investigation reports (data leak / incident response / threat hunting) |
| **Prompt Bank** / 提示词银行 | `/{lang}/prompts/` | Reusable, battle-tested prompts for LLM workflows, forensics & investigation tooling |
| **Knowledge** / 知识库 | `/{lang}/knowledge/` | Essays, notes, research, write-ups, projects & stream — merged into one place, filter by **kind** and **tag** |

Plus **Search** (`/{lang}/search/`, build-time index + client filtering) and an **RSS**
feed at `/{lang}/rss.xml`.

> The Knowledge module aggregates several content collections (`blog`, `notes`,
> `research`, `writeups`, `projects`, `stream`) behind a single listing page. Every card
> carries its kind and an EN/ZH availability indicator, and a `?type=…&tag=…` filter bar
> narrows the list client-side — so classification works on a purely static host.
> Content types are told apart by **tags**, exactly as on the live site.

## `$ cat content/`

Content lives in **Markdown collections** under `src/content/`:

```
src/content/
├── investigations/   # → Investigations module (merged cases + investigations)
├── prompts/          # → Prompt Bank module
├── blog/             # ┐
├── notes/            # │
├── research/         # ├→ Knowledge module
├── writeups/         # │
├── projects/         # │
└── stream/           # ┘
```

Files are named `<slug>.en.md` / `<slug>.zh.md` (same slug, language suffix); the two
versions share a slug so the site pairs them and falls back `zh → en`. Nested folders
are allowed (e.g. `writeups/Ethernaut/<level>/`). `langLink` must include the trailing
slash (the site runs `trailingSlash: 'always'`).

```yaml
---
title: "Article title"
description: "Short summary"
pubDate: 2026-01-15
tags: ["tag1", "tag2"]
lang: "en"
draft: false
---
```

Schemas are defined in **`src/content.config.ts`** and enforced at build time by Zod; a
missing required field or a wrong enum value fails `npm run build`.

## `$ npm run …`

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview   # preview the production build
npm run new-post  # interactive bilingual post wizard
```

Deployment is automatic: pushing `main` triggers `.github/workflows/deploy.yml`, which
builds the site and publishes it to GitHub Pages (`public/CNAME` → `www.kyrin.one`).

## `$ ls features/`

- **Bilingual** — every article can ship as `<slug>.en.md` + `<slug>.zh.md`; listings default
  to the current language with an "include other languages" toggle, and untranslated pages are
  marked `noindex`.
- **Knowledge base** — `notes` holds the reference/study cards (cryptography, offensive
  security, penetration testing), with **KaTeX** rendering for math.
- **Diagrams** — ` ```mermaid ` fences render client-side (lazy-loaded).
- **Search** — build-time JSON index with client-side filtering (`/{lang}/search/`).
- **Tags & kinds** — frequency-sorted tags (collapsed to the top 12) plus kind filters.
- **Paging** — listings show 20 items and load more on demand.
- **Featured** — `featured: true` in front-matter promotes an article to the homepage.
- **RSS & sitemap** — `/{lang}/rss.xml` and an i18n sitemap (fallback pages excluded).

## License

MIT — see `LICENSE`.
