import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategoryBySlug } from '../data/categories';
import { getTopicBySlug } from '../data/topics';
import { getLabBySlug } from '../data/labs';
import { getRoadmapBySlug } from '../data/roadmaps';
import { getProjectBySlug } from '../data/projects';
import { getKeywordsForRoute, GLOBAL_KEYWORDS } from '../seo/keywords';
import {
  generateWebSiteSchema,
  generateAuthorSchema,
  generateBreadcrumbSchema,
  generateTechArticleSchema,
  generateCourseSchema,
  generateLabSchema,
  generateProjectSchema,
  generateRoadmapSchema,
  SITE_URL,
  SITE_NAME,
  AUTHOR_NAME,
} from '../seo/structuredData';

export interface HeadMetadataOptions {
  /** Page title. By default, appends ` | LearnWithPugazh` unless `rawTitle` is true */
  title?: string;
  /** Use the exact title string without appending site name suffix */
  rawTitle?: boolean;
  /** Primary page description for search engines and social cards */
  description?: string;
  /** Optional Open Graph and Twitter image URL */
  image?: string;
  /** Canonical URL or relative path */
  canonical?: string;
  /** Content type for Open Graph: 'website' or 'article' */
  type?: 'website' | 'article';
  /** Comma-separated list or array of search keywords */
  keywords?: string | string[];
  /** Author name for article type */
  author?: string;
  /** Published time ISO string */
  publishedTime?: string;
  /** Modified time ISO string */
  modifiedTime?: string;
  /** Disallow search engine indexing (e.g. for /admin) */
  noIndex?: boolean;
  /** JSON-LD Schema.org object or array of objects */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_TITLE = 'LearnWithPugazh — Master Systems, Networking & Fullstack Engineering';
const DEFAULT_DESCRIPTION =
  'Interactive engineering laboratory and companion platform for @learnwithpugazh. Explore RFC standards, packet traces, Cisco configurations, and deep dives by Pugazhmani K.';
const DEFAULT_IMAGE = '/logo.svg';

/**
 * Safely find or create a meta tag by attribute name ('name' or 'property')
 */
function setMetaTag(attrName: 'name' | 'property', attrValue: string, content?: string): void {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;

  if (content === undefined || content === null || content === '') {
    if (element) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Safely find or create a link tag by rel attribute
 */
function setLinkTag(rel: string, href?: string): void {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!href) {
    if (element) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

/**
 * Inject or update the JSON-LD script tag in document.head
 */
function setJsonLdScript(jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>): void {
  if (typeof document === 'undefined') return;

  const scriptId = 'site-jsonld-schema';
  let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!jsonLd) {
    if (scriptElement) {
      scriptElement.remove();
    }
    return;
  }

  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.id = scriptId;
    scriptElement.type = 'application/ld+json';
    document.head.appendChild(scriptElement);
  }

  try {
    scriptElement.text = JSON.stringify(jsonLd);
  } catch (err) {
    console.warn('Could not serialize JSON-LD script:', err);
  }
}

/**
 * Core utility function to dynamically update head metadata in the document
 */
export function setHeadMetadata(options: HeadMetadataOptions = {}): void {
  if (typeof document === 'undefined') return;

  // 1. Document Title
  const formattedTitle = options.title
    ? options.rawTitle
      ? options.title
      : `${options.title} | ${SITE_NAME}`
    : DEFAULT_TITLE;

  document.title = formattedTitle;

  // 2. Primary Meta Tags
  const description = options.description || DEFAULT_DESCRIPTION;
  setMetaTag('name', 'description', description);

  // Robots directive
  if (options.noIndex) {
    setMetaTag('name', 'robots', 'noindex, nofollow');
  } else {
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  }

  // Keywords
  if (options.keywords) {
    const keywordsStr = Array.isArray(options.keywords)
      ? options.keywords.join(', ')
      : options.keywords;
    setMetaTag('name', 'keywords', keywordsStr);
  } else {
    setMetaTag('name', 'keywords', GLOBAL_KEYWORDS.join(', '));
  }

  // Author
  setMetaTag('name', 'author', options.author || `${AUTHOR_NAME} (@learnwithpugazh)`);

  // 3. Open Graph Tags
  const canonicalUrl = options.canonical
    ? options.canonical.startsWith('http')
      ? options.canonical
      : `${SITE_URL}${options.canonical}`
    : typeof window !== 'undefined'
    ? window.location.href.split('?')[0]
    : SITE_URL;

  const imageUrl = options.image
    ? options.image.startsWith('http')
      ? options.image
      : `${SITE_URL}${options.image}`
    : `${SITE_URL}${DEFAULT_IMAGE}`;

  setMetaTag('property', 'og:site_name', SITE_NAME);
  setMetaTag('property', 'og:locale', 'en_US');
  setMetaTag('property', 'og:title', formattedTitle);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:type', options.type || 'website');
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:image', imageUrl);
  setMetaTag('property', 'og:image:alt', formattedTitle);

  // Open Graph article extensions
  if (options.type === 'article') {
    if (options.publishedTime) {
      setMetaTag('property', 'article:published_time', options.publishedTime);
    }
    if (options.modifiedTime) {
      setMetaTag('property', 'article:modified_time', options.modifiedTime);
    }
    setMetaTag('property', 'article:author', options.author || AUTHOR_NAME);
  } else {
    setMetaTag('property', 'article:published_time', undefined);
    setMetaTag('property', 'article:modified_time', undefined);
    setMetaTag('property', 'article:author', undefined);
  }

  // 4. Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:site', '@learnwithpugazh');
  setMetaTag('name', 'twitter:creator', '@learnwithpugazh');
  setMetaTag('name', 'twitter:title', formattedTitle);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', imageUrl);
  setMetaTag('name', 'twitter:image:alt', formattedTitle);

  // 5. Canonical Link
  setLinkTag('canonical', canonicalUrl);

  // 6. JSON-LD Structured Data
  setJsonLdScript(options.jsonLd);
}

/**
 * Route metadata resolver that automatically provides route-based metadata
 * for standard routes and dynamic parameters when explicit options are not supplied.
 */
export function resolveRouteMetadata(pathname: string): HeadMetadataOptions {
  const cleanPath = pathname.split('?')[0].replace(/\/$/, '') || '/';
  const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;

  // 1. Home
  if (cleanPath === '/') {
    const websiteSchema = generateWebSiteSchema();
    const authorSchema = generateAuthorSchema();
    return {
      title: 'LearnWithPugazh — Master Systems, Networking & Fullstack Engineering',
      rawTitle: true,
      description:
        'Interactive engineering laboratory and companion platform for @learnwithpugazh. Explore RFC standards, packet traces, Cisco configurations, and deep dives.',
      type: 'website',
      canonical: '/',
      keywords: getKeywordsForRoute(),
      jsonLd: [websiteSchema, authorSchema],
    };
  }

  // 2. Curriculums / Learn
  if (cleanPath === '/learn') {
    const breadcrumbSchema = generateBreadcrumbSchema([{ name: 'Learn', url: '/learn' }]);
    return {
      title: 'Engineering Curriculums & Deep Dives',
      description:
        'Explore hands-on curriculums covering Computer Networking, Linux Systems, and Full-Stack Engineering from first principles.',
      type: 'website',
      canonical: '/learn',
      keywords: getKeywordsForRoute('networking'),
      jsonLd: breadcrumbSchema,
    };
  }

  // 3. Category Page: /learn/:category
  const categoryMatch = cleanPath.match(/^\/learn\/([^/]+)$/);
  if (categoryMatch) {
    const categorySlug = categoryMatch[1];
    const category = getCategoryBySlug(categorySlug);
    if (category) {
      const breadcrumbs = generateBreadcrumbSchema([
        { name: 'Learn', url: '/learn' },
        { name: category.name, url: `/learn/${categorySlug}` },
      ]);
      const courseSchema = generateCourseSchema(category, canonicalUrl);
      return {
        title: `${category.name} Curriculum & Deep Dives`,
        description: `${category.description} Explore structured modules, core principles, and practical lab exercises.`,
        type: 'website',
        canonical: `/learn/${categorySlug}`,
        keywords: getKeywordsForRoute(categorySlug),
        jsonLd: [breadcrumbs, courseSchema],
      };
    }
  }

  // 4. Topic Page: /learn/:category/:topic
  const topicMatch = cleanPath.match(/^\/learn\/([^/]+)\/([^/]+)$/);
  if (topicMatch) {
    const [, categorySlug, topicSlug] = topicMatch;
    const topic = getTopicBySlug(categorySlug, topicSlug);
    const category = getCategoryBySlug(categorySlug);
    if (topic) {
      const breadcrumbs = generateBreadcrumbSchema([
        { name: 'Learn', url: '/learn' },
        { name: category?.name || 'Curriculum', url: `/learn/${categorySlug}` },
        { name: topic.title, url: `/learn/${categorySlug}/${topicSlug}` },
      ]);
      const articleSchema = generateTechArticleSchema(topic, category?.name || 'Systems Engineering', canonicalUrl);
      return {
        title: `${topic.title} — ${category?.name || 'Curriculum'}`,
        description: `${topic.description || topic.practicalSummary || 'Detailed systems engineering deep dive.'} Complete with architecture diagrams, packet captures, and terminal commands.`,
        type: 'article',
        canonical: `/learn/${categorySlug}/${topicSlug}`,
        keywords: getKeywordsForRoute(categorySlug, topicSlug),
        author: AUTHOR_NAME,
        jsonLd: [breadcrumbs, articleSchema],
      };
    }
  }

  // 5. Roadmaps Page
  if (cleanPath === '/roadmaps') {
    const breadcrumbs = generateBreadcrumbSchema([{ name: 'Roadmaps', url: '/roadmaps' }]);
    return {
      title: 'Structured Developer & Systems Roadmaps',
      description:
        'Step-by-step career and engineering skill roadmaps for Network Engineering, Systems Architecture, and DevOps.',
      type: 'website',
      canonical: '/roadmaps',
      keywords: getKeywordsForRoute('networking', undefined, undefined, 'networking'),
      jsonLd: breadcrumbs,
    };
  }

  // 6. Roadmap Detail Page: /roadmaps/:roadmap
  const roadmapMatch = cleanPath.match(/^\/roadmaps\/([^/]+)$/);
  if (roadmapMatch) {
    const roadmapSlug = roadmapMatch[1];
    const roadmap = getRoadmapBySlug(roadmapSlug);
    if (roadmap) {
      const formattedTitle = roadmap.title.toLowerCase().endsWith('roadmap')
        ? roadmap.title
        : `${roadmap.title} Roadmap`;
      const breadcrumbs = generateBreadcrumbSchema([
        { name: 'Roadmaps', url: '/roadmaps' },
        { name: roadmap.title, url: `/roadmaps/${roadmapSlug}` },
      ]);
      const roadmapSchema = generateRoadmapSchema(roadmap, canonicalUrl);
      return {
        title: formattedTitle,
        description: `${roadmap.description} Step-by-step milestones, recommended tools, and practical benchmarks.`,
        type: 'article',
        canonical: `/roadmaps/${roadmapSlug}`,
        keywords: getKeywordsForRoute(undefined, undefined, undefined, roadmapSlug),
        author: AUTHOR_NAME,
        jsonLd: [breadcrumbs, roadmapSchema],
      };
    }
  }

  // 7. Labs Page
  if (cleanPath === '/labs') {
    const breadcrumbs = generateBreadcrumbSchema([{ name: 'Labs', url: '/labs' }]);
    return {
      title: 'Interactive Virtual Labs & CLI Environments',
      description:
        'Hands-on engineering sandboxes: Cisco packet routing, Linux kernel debugging, Docker networking, and Wireshark trace analysis.',
      type: 'website',
      canonical: '/labs',
      keywords: getKeywordsForRoute('networking', undefined, 'inter-vlan-routing'),
      jsonLd: breadcrumbs,
    };
  }

  // 8. Lab Detail Page: /labs/:slug
  const labMatch = cleanPath.match(/^\/labs\/([^/]+)$/);
  if (labMatch) {
    const labSlug = labMatch[1];
    const lab = getLabBySlug(labSlug);
    if (lab) {
      const breadcrumbs = generateBreadcrumbSchema([
        { name: 'Labs', url: '/labs' },
        { name: `${lab.labNumber}: ${lab.title}`, url: `/labs/${labSlug}` },
      ]);
      const labSchema = generateLabSchema(lab, canonicalUrl);
      return {
        title: `${lab.title} — Interactive Engineering Lab`,
        description: `${lab.conceptExplanation || lab.topologyDescription || 'Hands-on virtual lab exercise.'} Step-by-step terminal instructions, topology verification, and challenge exercises.`,
        type: 'article',
        canonical: `/labs/${labSlug}`,
        keywords: getKeywordsForRoute(lab.categorySlug, undefined, labSlug),
        author: AUTHOR_NAME,
        jsonLd: [breadcrumbs, labSchema],
      };
    }
  }

  // 9. Projects Page
  if (cleanPath === '/projects') {
    const breadcrumbs = generateBreadcrumbSchema([{ name: 'Projects', url: '/projects' }]);
    return {
      title: 'Open Source Systems & Production Projects',
      description:
        'Real-world engineering projects, open-source repositories, and case studies built by Pugazhmani K.',
      type: 'website',
      canonical: '/projects',
      keywords: getKeywordsForRoute(undefined, undefined, undefined, undefined, 'network-monitoring-dashboard'),
      jsonLd: breadcrumbs,
    };
  }

  // 10. Project Detail Page: /projects/:slug
  const projectMatch = cleanPath.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const projectSlug = projectMatch[1];
    const project = getProjectBySlug(projectSlug);
    if (project) {
      const breadcrumbs = generateBreadcrumbSchema([
        { name: 'Projects', url: '/projects' },
        { name: project.title, url: `/projects/${projectSlug}` },
      ]);
      const projectSchema = generateProjectSchema(project, canonicalUrl);
      return {
        title: `${project.title} — Technical Case Study`,
        description: `${project.description || project.problem || 'Production engineering case study.'} Architecture breakdown, implementation notes, tech stack, and key metrics.`,
        type: 'article',
        canonical: `/projects/${projectSlug}`,
        keywords: getKeywordsForRoute(undefined, undefined, undefined, undefined, projectSlug),
        author: AUTHOR_NAME,
        jsonLd: [breadcrumbs, projectSchema],
      };
    }
  }

  // 11. About Page
  if (cleanPath === '/about') {
    const breadcrumbs = generateBreadcrumbSchema([{ name: 'About', url: '/about' }]);
    const authorSchema = generateAuthorSchema();
    return {
      title: 'About Pugazhmani K & LearnWithPugazh | Creator & Brand',
      description:
        'Learn the story behind LearnWithPugazh, our core engineering pillars, creator background, and official V2.0 brand identity system.',
      type: 'website',
      canonical: '/about',
      keywords: GLOBAL_KEYWORDS,
      jsonLd: [breadcrumbs, authorSchema],
    };
  }

  // 12. Admin Page
  if (cleanPath === '/admin') {
    return {
      title: 'Admin Portal & Content Manager',
      description: 'Administrative dashboard for LearnWithPugazh.',
      type: 'website',
      noIndex: true,
    };
  }

  // Default Fallback
  return {
    title: DEFAULT_TITLE,
    rawTitle: true,
    description: DEFAULT_DESCRIPTION,
    type: 'website',
    canonical: '/',
    keywords: GLOBAL_KEYWORDS,
  };
}

/**
 * Custom React hook to dynamically manage head metadata and structured data
 */
export function useHeadMetadata(options?: HeadMetadataOptions): void {
  const location = useLocation();

  useEffect(() => {
    const routeMetadata = resolveRouteMetadata(location.pathname);
    if (options) {
      setHeadMetadata({ ...routeMetadata, ...options });
    } else {
      setHeadMetadata(routeMetadata);
    }
  }, [
    location.pathname,
    options?.title,
    options?.rawTitle,
    options?.description,
    options?.image,
    options?.canonical,
    options?.type,
    options?.keywords,
    options?.author,
    options?.publishedTime,
    options?.modifiedTime,
    options?.noIndex,
    options?.jsonLd,
  ]);
}

/**
 * Global Head Metadata Manager Component
 * Automatically updates head tags and JSON-LD schema on any route navigation.
 */
export function HeadMetadataManager(): null {
  const location = useLocation();

  useEffect(() => {
    const routeMetadata = resolveRouteMetadata(location.pathname);
    setHeadMetadata(routeMetadata);
  }, [location.pathname]);

  return null;
}
