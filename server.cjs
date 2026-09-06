const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const MAX_REQUEST_SIZE = 10 * 1024 * 1024;
const FIREBASE_AUTH_HOST = 'focal-theory-lpthm.firebaseapp.com';
const ALLOWED_AUTH_PATHS = ['/__/auth/', '/__/auth'];
const WHITELISTED_HOSTS = new Set([
  FIREBASE_AUTH_HOST,
  'learnwithpugazh.dev',
  'www.learnwithpugazh.dev',
]);

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function sanitizePathname(rawPath) {
  const decoded = decodeURIComponent(rawPath);
  const clean = decoded.split('?')[0].replace(/\/$/, '') || '/';
  if (!/^[\/a-zA-Z0-9_\-\.%~]+$/.test(clean) || clean.includes('..')) {
    return null;
  }
  return clean;
}

// Use dist directory if it has been built, otherwise fallback to ROOT
function getServingDir() {
  const distIndex = path.join(DIST, 'index.html');
  if (fs.existsSync(distIndex)) {
    return DIST;
  }
  return ROOT;
}

// Zero-dependency MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.map': 'application/json'
};

const SITE_URL = 'https://learnwithpugazh.dev';
const SITE_NAME = 'LearnWithPugazh';
const DEFAULT_TITLE = 'LearnWithPugazh — Master Systems, Networking & Fullstack Engineering';
const DEFAULT_DESC =
  'Interactive engineering laboratory and companion platform for @learnwithpugazh. Explore RFC standards, packet traces, Cisco configurations, and deep dives by Pugazhmani K.';
const DEFAULT_IMAGE = `${SITE_URL}/logo.svg`;
const GLOBAL_KEYWORDS =
  'LearnWithPugazh, Pugazhmani K, @learnwithpugazh, systems engineering, computer networking tutorials, interactive networking labs, Cisco packet tracer guide, Linux server administration, fullstack web development, RFC standards explained';

/**
 * Resolve SEO metadata for server-side HTML prerendering
 */
function resolveServerMetadata(pathname) {
  const cleanPath = pathname.split('?')[0].replace(/\/$/, '') || '/';
  const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;

  // Default fallback
  const meta = {
    title: `${DEFAULT_TITLE}`,
    description: DEFAULT_DESC,
    keywords: GLOBAL_KEYWORDS,
    canonical: canonicalUrl,
    type: 'website',
    image: DEFAULT_IMAGE,
    noIndex: false,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESC,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/learn?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  };

  if (cleanPath === '/') {
    return meta;
  }

  if (cleanPath === '/learn') {
    meta.title = `Engineering Curriculums & Deep Dives | ${SITE_NAME}`;
    meta.description = 'Explore hands-on curriculums covering Computer Networking, Linux Systems, and Full-Stack Engineering from first principles.';
    meta.keywords = 'computer networking, linux tutorials, web development, systems engineering, curriculums, ' + GLOBAL_KEYWORDS;
    return meta;
  }

  const categoryMatch = cleanPath.match(/^\/learn\/([^/]+)$/);
  if (categoryMatch) {
    const slug = categoryMatch[1];
    const categoryNames = {
      networking: 'Computer Networking',
      'web-development': 'Web Development',
      'linux-servers': 'Linux & Servers'
    };
    const name = categoryNames[slug] || slug.replace(/-/g, ' ');
    meta.title = `${name} Curriculum & Deep Dives | ${SITE_NAME}`;
    meta.description = `Master ${name} from first principles with structured modules, core RFC standards, and practical lab exercises.`;
    meta.keywords = `${slug}, ${name}, curriculum, systems architecture, ` + GLOBAL_KEYWORDS;
    meta.jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `${name} Curriculum`,
      description: meta.description,
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL }
    };
    return meta;
  }

  const topicMatch = cleanPath.match(/^\/learn\/([^/]+)\/([^/]+)$/);
  if (topicMatch) {
    const [, catSlug, topicSlug] = topicMatch;
    const formattedTitle = topicSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    meta.title = `${formattedTitle} — Engineering Deep Dive | ${SITE_NAME}`;
    meta.description = `In-depth technical guide to ${formattedTitle}. Architecture breakdown, protocol mechanics, CLI commands, and packet traces.`;
    meta.keywords = `${topicSlug}, ${formattedTitle}, ${catSlug}, engineering guide, packet analysis, ` + GLOBAL_KEYWORDS;
    meta.type = 'article';
    meta.jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: formattedTitle,
      description: meta.description,
      url: canonicalUrl,
      author: { '@type': 'Person', name: 'Pugazhmani K', url: `${SITE_URL}/about` },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL }
    };
    return meta;
  }

  if (cleanPath === '/labs') {
    meta.title = `Interactive Virtual Labs & CLI Sandboxes | ${SITE_NAME}`;
    meta.description = 'Hands-on engineering sandboxes: Cisco packet routing, Linux kernel debugging, Docker networking, and Wireshark analysis.';
    meta.keywords = 'virtual labs, cisco packet tracer, wireshark analysis, linux terminal labs, ' + GLOBAL_KEYWORDS;
    return meta;
  }

  const labMatch = cleanPath.match(/^\/labs\/([^/]+)$/);
  if (labMatch) {
    const labSlug = labMatch[1];
    const formattedTitle = labSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    meta.title = `${formattedTitle} — Virtual Lab Exercise | ${SITE_NAME}`;
    meta.description = `Hands-on virtual lab: ${formattedTitle}. Step-by-step terminal instructions, topology verification, and challenge exercises.`;
    meta.keywords = `${labSlug}, ${formattedTitle}, cisco lab, packet tracer, virtual lab, ` + GLOBAL_KEYWORDS;
    meta.type = 'article';
    meta.jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: formattedTitle,
      description: meta.description,
      url: canonicalUrl,
      author: { '@type': 'Person', name: 'Pugazhmani K' }
    };
    return meta;
  }

  if (cleanPath === '/roadmaps') {
    meta.title = `Structured Developer & Systems Roadmaps | ${SITE_NAME}`;
    meta.description = 'Step-by-step career and engineering skill roadmaps for Network Engineering, Systems Architecture, and DevOps.';
    meta.keywords = 'network engineer roadmap, devops roadmap, sysadmin career guide, ' + GLOBAL_KEYWORDS;
    return meta;
  }

  const roadmapMatch = cleanPath.match(/^\/roadmaps\/([^/]+)$/);
  if (roadmapMatch) {
    const roadmapSlug = roadmapMatch[1];
    const formattedTitle = roadmapSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    meta.title = `${formattedTitle} Roadmap | ${SITE_NAME}`;
    meta.description = `Step-by-step learning progression for ${formattedTitle}. Milestones, recommended tools, and practical benchmarks.`;
    meta.keywords = `${roadmapSlug}, ${formattedTitle}, career roadmap, skill tree, ` + GLOBAL_KEYWORDS;
    meta.type = 'article';
    return meta;
  }

  if (cleanPath === '/projects') {
    meta.title = `Open Source Systems & Production Projects | ${SITE_NAME}`;
    meta.description = 'Real-world engineering projects, open-source repositories, and production case studies built by Pugazhmani K.';
    meta.keywords = 'open source projects, systems engineering code, fullstack portfolio, ' + GLOBAL_KEYWORDS;
    return meta;
  }

  const projectMatch = cleanPath.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const projectSlug = projectMatch[1];
    const formattedTitle = projectSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    meta.title = `${formattedTitle} — Technical Case Study | ${SITE_NAME}`;
    meta.description = `Production engineering case study: ${formattedTitle}. Architecture breakdown, key technical decisions, and implementation details.`;
    meta.keywords = `${projectSlug}, ${formattedTitle}, case study, portfolio project, ` + GLOBAL_KEYWORDS;
    meta.type = 'article';
    return meta;
  }

  if (cleanPath === '/about') {
    meta.title = `About Pugazhmani K & LearnWithPugazh | Creator & Brand | ${SITE_NAME}`;
    meta.description = 'Learn the story behind LearnWithPugazh, our core engineering pillars, creator background, and official brand identity.';
    meta.keywords = 'about pugazhmani k, learnwithpugazh bio, technical educator, ' + GLOBAL_KEYWORDS;
    return meta;
  }

  if (cleanPath === '/admin') {
    meta.title = `Admin Portal | ${SITE_NAME}`;
    meta.description = 'Administrative portal for LearnWithPugazh.';
    meta.noIndex = true;
    return meta;
  }

  return meta;
}

/**
 * Injects SEO tags into HTML before serving
 */
function injectSeoIntoHtml(htmlContent, metadata) {
  const jsonLdString = metadata.jsonLd ? JSON.stringify(metadata.jsonLd) : null;
  const robotsValue = metadata.noIndex
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const keywords = escapeHtml(metadata.keywords);
  const canonical = escapeHtml(metadata.canonical);
  const image = escapeHtml(metadata.image);
  const ogType = escapeHtml(metadata.type);

  let seoTags = `
    <!-- Pre-rendered Server SEO Injection -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords}" />
    <meta name="robots" content="${robotsValue}" />
    <meta name="author" content="Pugazhmani K (@learnwithpugazh)" />
    <link rel="canonical" href="${canonical}" />

    <!-- Open Graph -->
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${title}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@learnwithpugazh" />
    <meta name="twitter:creator" content="@learnwithpugazh" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${title}" />
  `;

  if (jsonLdString) {
    const safeJsonLd = jsonLdString.replace(/</g, '\\u003c');
    seoTags += `\n    <script type="application/ld+json" id="site-jsonld-schema">${safeJsonLd}</script>`;
  }

  // Replace default title and description if present, otherwise inject into head
  let modifiedHtml = htmlContent;
  modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/is, '');
  modifiedHtml = modifiedHtml.replace(/<meta name="description".*?>/is, '');
  modifiedHtml = modifiedHtml.replace(/<meta property="og:.*?>/gis, '');
  modifiedHtml = modifiedHtml.replace(/<link rel="canonical".*?>/gis, '');
  modifiedHtml = modifiedHtml.replace('</head>', `${seoTags}\n  </head>`);

  return modifiedHtml;
}

const server = http.createServer(async (req, res) => {
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > MAX_REQUEST_SIZE) {
    res.writeHead(413, { 'Content-Type': 'text/plain' });
    res.end('Payload Too Large');
    return;
  }

  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    let body = '';
    let aborted = false;
    req.on('data', (chunk) => {
      if (aborted) return;
      body += chunk.toString();
      if (body.length > MAX_REQUEST_SIZE) {
        aborted = true;
        req.destroy();
        res.writeHead(413, { 'Content-Type': 'text/plain' });
        res.end('Payload Too Large');
        return;
      }
    });
  }

  const servingDir = getServingDir();
  const requestUrl = new URL(req.url, 'http://localhost');
  const decodedPath = sanitizePathname(requestUrl.pathname);

  if (decodedPath === null) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
    return;
  }

  const decodedFullPath = decodedPath;

  // Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https://www.google-analytics.com https://*.googleusercontent.com https://lh3.googleusercontent.com https://avatars.githubusercontent.com https://picsum.photos",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://firebase.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://www.googleapis.com wss://*.firebaseio.com",
    "frame-src 'self' https://www.google.com https://accounts.google.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '));
  res.removeHeader('X-Powered-By');

  // Proxy Firebase Auth Handlers (Ensures 1st-party cookie support across all browsers)
  if (decodedFullPath.startsWith('/__/auth')) {
    if (!ALLOWED_AUTH_PATHS.some((p) => decodedFullPath.startsWith(p))) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    const proxyReq = https.request(
      {
        hostname: FIREBASE_AUTH_HOST,
        path: req.url,
        method: req.method,
        headers: {
          host: FIREBASE_AUTH_HOST,
          'user-agent': req.headers['user-agent'] || '',
          'accept': req.headers['accept'] || '*/*',
          'accept-language': req.headers['accept-language'] || '',
          'referer': req.headers['referer'] || '',
          'content-type': req.headers['content-type'] || 'application/json',
          'origin': `https://${requestUrl.hostname}`,
        },
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode, {
          ...proxyRes.headers,
          'access-control-allow-origin': `https://${requestUrl.hostname}`,
          'access-control-allow-credentials': 'true',
        });
        proxyRes.pipe(res);
      }
    );
    proxyReq.on('error', () => {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('Authentication Service Unavailable');
    });
    req.pipe(proxyReq);
    return;
  }

  // Normalize path
  let relativePath = decodedFullPath.replace(/^\//, '');
  const absolutePath = path.resolve(servingDir, relativePath);

  // Ensure path doesn't escape serving directory
  const isInside =
    absolutePath === servingDir ||
    absolutePath.startsWith(servingDir + path.sep) ||
    absolutePath === ROOT ||
    absolutePath.startsWith(ROOT + path.sep);

  if (!isInside) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const getStats = async (p) => {
    try {
      const stats = await fs.promises.stat(p);
      return stats.isFile() ? stats : null;
    } catch {
      return null;
    }
  };

  const serveStaticFile = (filePath, stats, statusCode = 200) => {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);

    const mtime = stats.mtime.toUTCString();
    res.setHeader('Last-Modified', mtime);

    if (req.headers['if-modified-since'] === mtime) {
      res.statusCode = 304;
      res.end();
      return;
    }

    // Caching
    if (ext === '.html' || ext === '.htm') {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (filePath.includes('assets') || filePath.includes('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }

    res.statusCode = statusCode;
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      res.statusCode = 500;
      res.end();
    });
    stream.pipe(res);
  };

  const serveSpaIndex = async (statusCode = 200) => {
    // Prefer dist/index.html if built, otherwise ROOT/index.html
    const indexPath = fs.existsSync(path.join(DIST, 'index.html'))
      ? path.join(DIST, 'index.html')
      : path.join(ROOT, 'index.html');

    try {
      const rawHtml = await fs.promises.readFile(indexPath, 'utf8');
      const metadata = resolveServerMetadata(decodedFullPath);
      const injectedHtml = injectSeoIntoHtml(rawHtml, metadata);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.statusCode = statusCode;
      res.end(injectedHtml);
    } catch {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  };

  try {
    // 1. Exact Match in Serving Dir (e.g. /assets/index.js, /favicon.svg)
    let stats = await getStats(absolutePath);
    if (stats) return serveStaticFile(absolutePath, stats);

    // 2. Fallback check in ROOT/public or ROOT (for static assets when running dist)
    if (servingDir !== ROOT) {
      const rootAssetPath = path.join(ROOT, 'public', relativePath);
      stats = await getStats(rootAssetPath);
      if (stats) return serveStaticFile(rootAssetPath, stats);
    }

    // 3. Static files with extensions that are missing return 404
    if (path.extname(decodedFullPath)) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    // 4. SPA Navigation Fallback for all application routes with prerendered SEO
    return serveSpaIndex(200);
  } catch {
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  const servingDir = getServingDir();
  console.log(`LearnWithPugazh Production Server listening on http://localhost:${PORT}`);
  console.log(`Serving environment: ${servingDir === DIST ? 'Production (dist/)' : 'Development (source root)'}`);
});
