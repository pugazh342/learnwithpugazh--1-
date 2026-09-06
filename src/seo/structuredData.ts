/**
 * Schema.org JSON-LD Structured Data Generators for LearnWithPugazh
 * Compatible with Google Rich Results for TechArticle, Course, HowTo, BreadcrumbList, Organization, and WebSite.
 */

import { Topic, Lab, Project, Roadmap, Category } from '../types';

export const SITE_URL = 'https://learnwithpugazh.dev';
export const SITE_NAME = 'LearnWithPugazh';
export const AUTHOR_NAME = 'Pugazhmani K';
export const AUTHOR_SOCIALS = [
  'https://instagram.com/learnwithpugazh',
  'https://github.com/learnwithpugazh',
  'https://linkedin.com/in/pugazh'
];

/**
 * Generate WebSite Schema with SearchAction
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'A modern technical learning platform and developer portfolio covering Computer Networking, Web Development, and Linux Systems.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/learn?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'en-US'
  };
}

/**
 * Generate Person & Organization Schema for creator Pugazhmani K
 */
export function generateAuthorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#author`,
    name: AUTHOR_NAME,
    alternateName: ['learnwithpugazh', 'Pugazh'],
    url: `${SITE_URL}/about`,
    jobTitle: 'Systems Engineer & Technical Educator',
    sameAs: AUTHOR_SOCIALS,
    knowsAbout: [
      'Computer Networking',
      'Cisco IOS',
      'Linux Kernel',
      'Fullstack Web Architecture',
      'Distributed Systems'
    ]
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

/**
 * Generate TechArticle Schema for Curriculum Topics
 */
export function generateTechArticleSchema(topic: Topic, categoryName: string, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${canonicalUrl}#article`,
    headline: topic.title,
    description: topic.description || topic.practicalSummary,
    url: canonicalUrl,
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
      sameAs: AUTHOR_SOCIALS
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`
      }
    },
    articleSection: categoryName,
    keywords: [topic.title, categoryName, ...(topic.prerequisites || [])].join(', '),
    proficiencyLevel: topic.difficulty,
    dependencies: (topic.prerequisites || []).join(', '),
    datePublished: '2025-01-01T00:00:00Z',
    dateModified: new Date().toISOString()
  };
}

/**
 * Generate Course Schema for Category Hubs
 */
export function generateCourseSchema(category: Category, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${canonicalUrl}#course`,
    name: `${category.name} Curriculum & Deep Dives`,
    description: category.description,
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    },
    educationalLevel: 'Beginner to Advanced',
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `${category.topicCount} modules`
    }
  };
}

/**
 * Generate LearningResource & HowTo Schema for Virtual Labs
 */
export function generateLabSchema(lab: Lab, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${canonicalUrl}#lab`,
    name: `${lab.labNumber}: ${lab.title}`,
    description: lab.conceptExplanation || lab.topologyDescription,
    url: canonicalUrl,
    totalTime: 'PT45M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    tool: (lab.tools || []).map((t) => ({
      '@type': 'HowToTool',
      name: t
    })),
    step: (lab.steps || []).map((s) => ({
      '@type': 'HowToStep',
      name: s.title,
      text: `${s.explanation} ${s.command ? 'Command: ' + s.command : ''}`.trim(),
      position: s.stepNumber
    })),
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME
    }
  };
}

/**
 * Generate SoftwareSourceCode & Project Schema for Case Studies
 */
export function generateProjectSchema(project: Project, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': `${canonicalUrl}#project`,
    name: project.title,
    description: project.description || project.problem,
    url: canonicalUrl,
    codeRepository: project.githubUrl || 'https://github.com/learnwithpugazh',
    programmingLanguage: project.technologies,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME
    }
  };
}

/**
 * Generate Course/Credential Schema for Roadmaps
 */
export function generateRoadmapSchema(roadmap: Roadmap, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${canonicalUrl}#roadmap`,
    name: roadmap.title.toLowerCase().endsWith('roadmap') ? roadmap.title : `${roadmap.title} Roadmap`,
    description: roadmap.description,
    url: canonicalUrl,
    timeRequired: roadmap.estimatedDuration,
    educationalLevel: roadmap.difficulty,
    isAccessibleForFree: true,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    }
  };
}
