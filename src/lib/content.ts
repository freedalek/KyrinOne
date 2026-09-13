// Shared content helpers: language-aware entry resolution and URL building.
// Used by the homepage, case-studies listing and the search index.
import { getCollection } from 'astro:content';

export type CollectionName =
  | 'blog'
  | 'notes'
  | 'writeups'
  | 'research'
  | 'projects'
  | 'investigations'
  | 'prompts'
  | 'stream';

export interface DisplayEntry {
  entry: any;
  slug: string;
  isFallback: boolean;
  versions: any[];
}

// Strip language suffix (.en/.zh) and trailing /index from a content id.
export function cleanSlug(id: string): string {
  return id.replace(/\.(en|zh)$/, '').replace(/\/index$/, '');
}

// Build a language-aware URL for an entry of a given collection.
export function entryUrl(lang: 'en' | 'zh', collection: CollectionName, id: string): string {
  return `/${lang}/${collection}/${cleanSlug(id)}/`;
}

/**
 * Resolve a collection's non-draft entries into one display entry per slug,
 * preferring the requested language and falling back to the other one.
 */
export async function getDisplayEntries(
  lang: 'en' | 'zh',
  collection: CollectionName
): Promise<DisplayEntry[]> {
  const all = (await getCollection(collection)).filter((e) => !e.data.draft);

  const bySlug = new Map<string, any[]>();
  for (const entry of all) {
    const slug = cleanSlug(entry.id);
    if (!bySlug.has(slug)) bySlug.set(slug, []);
    bySlug.get(slug)!.push(entry);
  }

  const result: DisplayEntry[] = [];
  for (const [slug, versions] of bySlug) {
    const match = versions.find((e) => e.data.lang === lang) || versions[0];
    result.push({ entry: match, slug, isFallback: match.data.lang !== lang, versions });
  }

  return result;
}

// Whether both language versions of a slug group exist.
export function hasBoth(versions: any[]): boolean {
  return versions.some((e) => e.data.lang === 'en') && versions.some((e) => e.data.lang === 'zh');
}

export interface ArticleLocale {
  /** Language used for the UI/chrome of the rendered page (the URL language). */
  displayLang: 'en' | 'zh';
  /** Language the entry body is actually written in. */
  realLang: 'en' | 'zh';
  /** True when the page is showing a body written in another language. */
  isFallback: boolean;
  /** Human-readable notice to show when isFallback is true. */
  fallbackNote?: string;
  /** Path of the real-language version of this article. */
  realPath: string;
  /** Cleaned slug (no language suffix / trailing index). */
  slug: string;
}

/**
 * Resolve locale/fallback metadata for a single article entry.
 * On a fallback page the real language differs from the URL language; the page
 * should then be marked noindex and point canonical/hreflang at `realPath`.
 */
export function articleLocale(
  entry: any,
  fallback: boolean,
  collection: CollectionName
): ArticleLocale {
  const realLang = entry.data.lang as 'en' | 'zh';
  const displayLang = (fallback ? (realLang === 'zh' ? 'en' : 'zh') : realLang) as 'en' | 'zh';
  const isFallback = fallback && displayLang !== realLang;
  const slug = cleanSlug(entry.id);
  const realPath = `/${realLang}/${collection}/${slug}/`;
  const fallbackNote = isFallback
    ? displayLang === 'en'
      ? '⚠️ This content is not yet available in English. Showing the Chinese original.'
      : '⚠️ 此内容暂无中文版，以下显示英文原文。'
    : undefined;
  return { displayLang, realLang, isFallback, fallbackNote, realPath, slug };
}

// Build a compact search index entry for a collection item.
export function toSearchItem(
  lang: 'en' | 'zh',
  collection: CollectionName,
  entry: any
): {
  title: string;
  desc: string;
  tags: string[];
  url: string;
  date: string;
  type: CollectionName;
} {
  const d = entry.data;
  const excerpt = entry.body
    ? String(entry.body)
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/[#>*`_~[\]()]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 240)
    : '';
  return {
    title: d.title || d.description || '',
    desc: d.description || excerpt,
    tags: d.tags || [],
    url: entryUrl(lang, collection, entry.id),
    date: d.pubDate ? d.pubDate.toISOString().slice(0, 10) : '',
    type: collection,
  };
}
