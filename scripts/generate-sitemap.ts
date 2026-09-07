import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { categories } from '../src/data/categories.ts';
import { labs } from '../src/data/labs.ts';
import { projects } from '../src/data/projects.ts';
import { roadmaps } from '../src/data/roadmaps.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.SITE_URL || 'https://learnwithpugazh.dev';
const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml');

interface SitemapUrl {
  loc: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod?: string;
}

export function generateSitemapXml(): string {
  const currentDate = new Date().toISOString().split('T')[0];
  const urls: SitemapUrl[] = [];

  // 1. Static Hub Routes
  urls.push(
    { loc: `${BASE_URL}/`, changefreq: 'daily', priority: '1.0', lastmod: currentDate },
    { loc: `${BASE_URL}/learn`, changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
    { loc: `${BASE_URL}/roadmaps`, changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
    { loc: `${BASE_URL}/labs`, changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
    { loc: `${BASE_URL}/projects`, changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
    { loc: `${BASE_URL}/about`, changefreq: 'monthly', priority: '0.8', lastmod: currentDate }
  );

  // 2. Category Hubs & Topics
  for (const cat of categories) {
    urls.push({
      loc: `${BASE_URL}/learn/${cat.slug}`,
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: currentDate
    });

    for (const group of cat.groups) {
      for (const topic of group.topics) {
        urls.push({
          loc: `${BASE_URL}/learn/${cat.slug}/${topic.slug}`,
          changefreq: 'weekly',
          priority: '0.8',
          lastmod: currentDate
        });
      }
    }
  }

  // 3. Virtual Labs
  for (const lab of labs) {
    urls.push({
      loc: `${BASE_URL}/labs/${lab.slug}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: currentDate
    });
  }

  // 4. Engineering Roadmaps
  for (const rm of roadmaps) {
    urls.push({
      loc: `${BASE_URL}/roadmaps/${rm.slug}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: currentDate
    });
  }

  // 5. Production Projects & Case Studies
  for (const proj of projects) {
    urls.push({
      loc: `${BASE_URL}/projects/${proj.slug}`,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: currentDate
    });
  }

  // Construct XML
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  for (const entry of urls) {
    xmlLines.push('  <url>');
    xmlLines.push(`    <loc>${entry.loc}</loc>`);
    if (entry.lastmod) xmlLines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    xmlLines.push(`    <priority>${entry.priority}</priority>`);
    xmlLines.push('  </url>');
  }

  xmlLines.push('</urlset>');
  xmlLines.push('');

  return xmlLines.join('\n');
}

// Generate and write file
try {
  const xml = generateSitemapXml();
  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
  console.log(`Successfully generated production sitemap at: ${SITEMAP_PATH}`);
  const matchCount = (xml.match(/<url>/g) || []).length;
  console.log(`Total URLs indexed in sitemap: ${matchCount}`);
} catch (error) {
  console.error('Failed to generate sitemap:', error);
  process.exit(1);
}
