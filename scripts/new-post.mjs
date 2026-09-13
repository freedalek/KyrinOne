#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '..', 'src', 'content');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

const TYPES = [
  ['essay', 'blog', 'Full articles & deep dives'],
  ['note', 'notes', 'Quick references & how-tos'],
  ['research', 'research', 'Security research'],
  ['project', 'projects', 'Projects & tools'],
  ['writeup', 'writeups', 'CTF / lab write-ups'],
  ['prompt', 'prompts', 'Prompt Bank entry'],
  ['investigation', 'investigations', 'Investigation case'],
  ['stream', 'stream', 'Short thoughts & links'],
];

async function main() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║   kyrin.one — New Post Creator       ║');
  console.log('╚══════════════════════════════════════╝\n');

  console.log('Content types:');
  TYPES.forEach(([label, dir, desc], i) => {
    console.log(`  ${i + 1}) ${dir.padEnd(14)} — ${desc}`);
  });
  console.log('     (essay/note/research/project/writeup/stream land in the Knowledge module)');

  const typeChoice = await ask('\nSelect type (1-8): ');
  const selected = TYPES[parseInt(typeChoice, 10) - 1];
  if (!selected) {
    console.log('Invalid choice. Exiting.');
    process.exit(1);
  }
  const type = selected[1];

  console.log('\nLanguages:');
  console.log('  1) English (en)');
  console.log('  2) 中文 (zh)');
  console.log('  3) Both (bilingual)');

  const langChoice = await ask('Select language (1-3): ');
  const langs = { '1': ['en'], '2': ['zh'], '3': ['en', 'zh'] };
  const selectedLangs = langs[langChoice];
  if (!selectedLangs) {
    console.log('Invalid choice. Exiting.');
    process.exit(1);
  }

  const titleEn = await ask('\nEnglish title: ');
  const titleZh = await ask('中文标题 (or leave blank): ');
  const slug = (await ask('URL slug (e.g., my-post-title): ')) ||
    titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const descEn = await ask('\nEnglish description: ');
  const descZh = await ask('中文描述 (或留空): ');

  const tagsEn = (await ask('\nEnglish tags (comma-separated): ')).split(',').map((t) => t.trim()).filter(Boolean);
  const tagsZh = (await ask('中文标签 (逗号分隔，或留空): ')).split(',').map((t) => t.trim()).filter(Boolean);

  const today = new Date().toISOString().split('T')[0];
  const dateStr = (await ask(`\nPublication date (YYYY-MM-DD, default: ${today}): `)) || today;

  let streamType = '';
  if (type === 'stream') {
    console.log('\nStream types:');
    console.log('  1) thought');
    console.log('  2) link');
    console.log('  3) quote');
    console.log('  4) note');
    const st = await ask('Select stream type (1-4): ');
    const stMap = { '1': 'thought', '2': 'link', '3': 'quote', '4': 'note' };
    streamType = stMap[st] || 'thought';
  }

  const extraContent = type === 'stream' ? await ask('\nStream content: ') : '';

  for (const lang of selectedLangs) {
    const title = lang === 'en' ? titleEn : titleZh || titleEn;
    const desc = lang === 'en' ? descEn : descZh || descEn;
    const tags = lang === 'en' ? tagsEn : tagsZh.length > 0 ? tagsZh : tagsEn;

    const otherLang = lang === 'en' ? 'zh' : 'en';
    const hasOtherLang = selectedLangs.length === 2;
    const langLink = hasOtherLang ? `/${otherLang}/${type}/${slug}/` : '';

    let frontmatter = '---\n';
    frontmatter += `title: "${title}"\n`;
    if (type !== 'stream' && desc) frontmatter += `description: "${desc}"\n`;
    frontmatter += `pubDate: ${dateStr}\n`;
    if (tags.length > 0) {
      frontmatter += `tags: [${tags.map((t) => `"${t}"`).join(', ')}]\n`;
    }
    frontmatter += `lang: "${lang}"\n`;
    if (langLink) frontmatter += `langLink: "${langLink}"\n`;
    if (type === 'stream') frontmatter += `type: "${streamType}"\n`;
    frontmatter += '---\n\n';
    frontmatter += type === 'stream' ? extraContent : 'Write your content here...\n';

    const filePath = path.join(contentDir, type, `${slug}.${lang}.md`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, frontmatter);

    console.log(`\n✅ Created: ${filePath}`);
  }

  console.log('\nDone! Happy writing\n');
  rl.close();
}

main().catch(console.error);
