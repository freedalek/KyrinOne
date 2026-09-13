import rss from '@astrojs/rss';
import { useTranslations } from '../../i18n';
import { getDisplayEntries, entryUrl, type CollectionName } from '../../lib/content';

export async function getStaticPaths() {
  return [
    { params: { lang: 'en' } },
    { params: { lang: 'zh' } },
  ];
}

export async function GET(context: any) {
  const lang = context.params.lang as 'en' | 'zh';
  const t = useTranslations(lang);

  const collections: CollectionName[] = [
    'blog',
    'notes',
    'research',
    'writeups',
    'projects',
    'stream',
    'investigations',
    'prompts',
  ];

  const feedItems: Array<{ title: string; link: string; pubDate: Date; description?: string }> = [];

  for (const name of collections) {
    const display = await getDisplayEntries(lang, name);
    for (const it of display) {
      // Feed stays in the current language; skip fallback entries.
      if (it.isFallback) continue;
      const d = it.entry.data;
      if (!d.title) continue;
      feedItems.push({
        title: d.title,
        link: `https://www.kyrin.one${entryUrl(lang, name, it.entry.id)}`,
        pubDate: d.pubDate as Date,
        description: d.description,
      });
    }
  }

  feedItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: `Kyrin Labs - ${lang === 'en' ? 'Security Research' : '安全研究'}`,
    description: t('seo.description'),
    site: `https://www.kyrin.one/${lang}/`,
    items: feedItems.map((item) => ({
      title: item.title,
      pubDate: item.pubDate,
      description: item.description,
      link: item.link,
    })),
    customData: `<language>${lang === 'en' ? 'en-us' : 'zh-cn'}</language>`,
  });
}
