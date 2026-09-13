import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Generate unique IDs that include language
function generateId({ entry }: { entry: string }): string {
  // e.g., "welcome.en.md" -> "welcome.en"
  // This ensures en and zh versions get different IDs
  return entry.replace(/\.(en|zh)\.md$/, '.$1');
}

const blogCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{en,zh}.md',
    base: './src/content/blog',
    generateId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).optional(),
    lang: z.enum(['en', 'zh']),
    langLink: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{en,zh}.md',
    base: './src/content/projects',
    generateId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh']),
    langLink: z.string().optional(),
    status: z.enum(['active', 'archived', 'completed']).default('active'),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const notesCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{en,zh}.md',
    base: './src/content/notes',
    generateId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh']),
    langLink: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const streamCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{en,zh}.md',
    base: './src/content/stream',
    generateId,
  }),
  schema: z.object({
    title: z.string().optional(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh']),
    type: z.enum(['thought', 'link', 'quote', 'note']).default('thought'),
    url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});


const writeupsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{en,zh}.md',
    base: './src/content/writeups',
    generateId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).optional(),
    lang: z.enum(['en', 'zh']),
    langLink: z.string().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard', 'insane']).optional(),
    platform: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});


const researchCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{en,zh}.md',
    base: './src/content/research',
    generateId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).optional(),
    lang: z.enum(['en', 'zh']),
    langLink: z.string().optional(),
    researchType: z.enum(['threat-hunting', 'vulnerability-analysis', 'web3-security']).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});


const investigationsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{en,zh}.md',
    base: './src/content/investigations',
    generateId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).optional(),
    lang: z.enum(['en', 'zh']),
    langLink: z.string().optional(),
    kind: z.enum(['case', 'investigation']).optional(),
    client: z.string().optional(),
    investigationType: z.enum(['data-leak', 'incident-response', 'ueba']).optional(),
    severity: z.enum(['critical', 'high', 'medium', 'low']).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const promptsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{en,zh}.md',
    base: './src/content/prompts',
    generateId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).optional(),
    lang: z.enum(['en', 'zh']),
    langLink: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  investigations: investigationsCollection,
  prompts: promptsCollection,

  blog: blogCollection,
  notes: notesCollection,
  research: researchCollection,
  writeups: writeupsCollection,
  projects: projectsCollection,
  stream: streamCollection,
};

