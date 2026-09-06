import { SearchResultItem } from '../types';
import { categories } from './categories';
import { topics } from './topics';
import { labs } from './labs';
import { projects } from './projects';
import { roadmaps } from './roadmaps';

export function searchContent(query: string): SearchResultItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const results: SearchResultItem[] = [];

  // Search Roadmaps
  for (const rm of roadmaps) {
    if (
      rm.title.toLowerCase().includes(cleanQuery) ||
      rm.description.toLowerCase().includes(cleanQuery) ||
      rm.overview.toLowerCase().includes(cleanQuery)
    ) {
      results.push({
        id: rm.id,
        title: rm.title,
        type: 'Roadmap',
        category: 'Learning Path',
        description: rm.description,
        url: `/roadmaps/${rm.slug}`,
        badge: rm.estimatedDuration
      });
    }
  }

  // Search Categories
  for (const cat of categories) {
    if (
      cat.name.toLowerCase().includes(cleanQuery) ||
      cat.description.toLowerCase().includes(cleanQuery)
    ) {
      results.push({
        id: `cat-${cat.slug}`,
        title: `${cat.name} Curriculum`,
        type: 'Topic',
        category: cat.name,
        description: cat.description,
        url: `/learn/${cat.slug}`,
        badge: `${cat.topicCount} topics`
      });
    }

    // Search Category group topics
    for (const group of cat.groups) {
      for (const t of group.topics) {
        if (
          t.title.toLowerCase().includes(cleanQuery) ||
          t.summary?.toLowerCase().includes(cleanQuery) ||
          group.name.toLowerCase().includes(cleanQuery)
        ) {
          // avoid duplicate if already in full topics map
          const alreadyAdded = results.some(r => r.url === `/learn/${cat.slug}/${t.slug}`);
          if (!alreadyAdded) {
            results.push({
              id: `group-topic-${t.slug}`,
              title: t.title,
              type: 'Topic',
              category: cat.name,
              description: t.summary || `${group.name} — ${t.difficulty} (${t.readTime})`,
              url: `/learn/${cat.slug}/${t.slug}`,
              badge: t.difficulty
            });
          }
        }
      }
    }
  }

  // Search Full Topics
  for (const [slug, topic] of Object.entries(topics)) {
    if (
      topic.title.toLowerCase().includes(cleanQuery) ||
      topic.description.toLowerCase().includes(cleanQuery) ||
      topic.category.toLowerCase().includes(cleanQuery) ||
      topic.groupName.toLowerCase().includes(cleanQuery)
    ) {
      const existingIdx = results.findIndex(r => r.url === `/learn/${topic.categorySlug}/${slug}`);
      if (existingIdx >= 0) {
        results[existingIdx] = {
          id: topic.id,
          title: topic.title,
          type: 'Topic',
          category: topic.category,
          description: topic.description,
          url: `/learn/${topic.categorySlug}/${slug}`,
          badge: topic.difficulty
        };
      } else {
        results.push({
          id: topic.id,
          title: topic.title,
          type: 'Topic',
          category: topic.category,
          description: topic.description,
          url: `/learn/${topic.categorySlug}/${slug}`,
          badge: topic.difficulty
        });
      }
    }
  }

  // Search Labs
  for (const lab of labs) {
    if (
      lab.title.toLowerCase().includes(cleanQuery) ||
      lab.category.toLowerCase().includes(cleanQuery) ||
      lab.tools.some(tool => tool.toLowerCase().includes(cleanQuery)) ||
      lab.conceptExplanation.toLowerCase().includes(cleanQuery) ||
      lab.objectives.some(o => o.toLowerCase().includes(cleanQuery))
    ) {
      results.push({
        id: lab.id,
        title: `${lab.labNumber}: ${lab.title}`,
        type: 'Lab',
        category: lab.category,
        description: lab.topologyDescription || lab.conceptExplanation.slice(0, 120),
        url: `/labs/${lab.slug}`,
        badge: lab.difficulty
      });
    }
  }

  // Search Projects
  for (const proj of projects) {
    if (
      proj.title.toLowerCase().includes(cleanQuery) ||
      proj.description.toLowerCase().includes(cleanQuery) ||
      proj.category.toLowerCase().includes(cleanQuery) ||
      proj.technologies.some(tech => tech.toLowerCase().includes(cleanQuery)) ||
      proj.problem.toLowerCase().includes(cleanQuery)
    ) {
      results.push({
        id: proj.id,
        title: proj.title,
        type: 'Project',
        category: proj.category,
        description: proj.description,
        url: `/projects/${proj.slug}`,
        badge: proj.status
      });
    }
  }

  return results.slice(0, 12);
}
