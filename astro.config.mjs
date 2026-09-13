// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const SITE = 'https://www.kyrin.one';

// Compute article URLs that only exist as a language fallback (the translation
// is missing). Those pages are served with `noindex`; keep them out of the
// sitemap so only real, indexable pages are submitted.
function collectFallbackUrls() {
    const root = path.resolve('src/content');
    const collections = [
        'blog', 'notes', 'research', 'writeups',
        'projects', 'stream', 'investigations', 'prompts',
    ];
    const fallback = new Set();
    for (const collection of collections) {
        const dir = path.join(root, collection);
        if (!fs.existsSync(dir)) continue;
        /** @type {string[]} */
        const files = [];
        /** @param {string} d */
        const walk = (d) => {
            for (const name of fs.readdirSync(d)) {
                const p = path.join(d, name);
                if (fs.statSync(p).isDirectory()) walk(p);
                else if (/^[^_].*\.(en|zh)\.md$/.test(name)) files.push(p);
            }
        };
        walk(dir);
        /** @type {Map<string, Set<string>>} */
        const bySlug = new Map();
        for (const file of files) {
            const rel = path.relative(dir, file).split(path.sep).join('/');
            const lang = rel.endsWith('.en.md') ? 'en' : 'zh';
            const slug = rel.replace(/\.(en|zh)\.md$/, '').replace(/\/index$/, '');
            let langs = bySlug.get(slug);
            if (!langs) {
                langs = new Set();
                bySlug.set(slug, langs);
            }
            langs.add(lang);
        }
        for (const [slug, langs] of bySlug) {
            const enc = slug.split('/').map(encodeURIComponent).join('/');
            for (const lang of ['en', 'zh']) {
                if (!langs.has(lang)) fallback.add(`${SITE}/${lang}/${collection}/${enc}/`);
            }
        }
    }
    return fallback;
}
const fallbackUrls = collectFallbackUrls();

// https://astro.build/config
export default defineConfig({
    site: SITE,
    base: '/',
    output: 'static',
    trailingSlash: 'always',

    devToolbar: {
        enabled: false,
    },

    integrations: [
        mdx(),
        sitemap({
            filter: (page) => !fallbackUrls.has(page),
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en',
                    zh: 'zh',
                },
            },
        }),
    ],

    vite: {
        // @ts-expect-error - tailwind plugin type mismatch with Astro's internal vite
        plugins: [tailwindcss()],
    },

    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh'],
        routing: {
            prefixDefaultLocale: true,
        },
        fallback: {
            zh: 'en',
        },
    },

    markdown: {
        shikiConfig: {
            theme: 'dracula',
            wrap: true,
        },
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
    },
});

