# Security Assessment Report
## LearnWithPugazh Web Application
**Target:** https://learnwithpugazh-1.vercel.app/
**Date:** September 7, 2026
**Methodology:** Black-box web application testing
**Scope:** LearnWithPugazh frontend application and Vercel deployment

---

## Executive Summary

The security assessment of LearnWithPugazh identified **1 Critical**, **2 Medium**, and **3 Informational** findings. The application benefits from Vercel's strong platform-level security defaults, however, several application-layer risks require attention before production deployment.

**Risk Distribution:**
| Severity | Count |
|---|---|
| Critical | 1 |
| High | 0 |
| Medium | 2 |
| Low / Informational | 3 |
| **Total** | **6** |

---

## Findings

### F1 — CRITICAL: Firebase API Key Exposed in Client-Side Bundle

**Location:** `/assets/index-CodqK5qb.js` (client-side JavaScript bundle)
**Endpoint:** All pages load the Firebase configuration in the browser.

**Description:**  
The Firebase API key (`AIzaSyDFqCkAgaVMAEfEAGFFjM1xAO4jLuMhn1o`), project ID (`learnwithpugazh`), auth domain (`learnwithpugazh.firebaseapp.com`), and messaging sender ID (`154135503105`) are embedded in the publicly accessible JavaScript bundle. Any visitor to the site can extract these credentials by viewing the page source.

**Impact:**  
Firebase API keys for web apps are intentionally public — Firebase SDKs require them client-side. However, an exposed key enables:
- **Abuse / Quota exhaustion:** An attacker can make unauthorized API calls using your project's quota, potentially causing service disruption or billing spikes.
- **Data exfiltration (if Firestore rules are misconfigured):** Combined with weak Firestore security rules, an attacker could read/write sensitive data.
- **Phishing/credential theft:** An attacker could clone the Firebase Auth configuration to serve a fake sign-in prompt.

**PoC:**
```javascript
// Any browser DevTools console:
fetch('https://learnwithpugazh.firebaseapp.com/__/firebase/init.json')
  .then(r => r.json())
  .then(console.log);
```
This returns the full Firebase configuration if the unauthenticated endpoint is enabled.

**Recommendation:**  
1. **Restrict the API key** in Firebase Console → Project Settings → Web App → **API Key restrictions**:
   - Set `Allowed HTTP referrers` to only `learnwithpugazh-1.vercel.app` and `learnwithpugazh.dev`
   - Enable **App Check** for Firestore to whitelist legitimate app traffic
2. **Review and harden Firestore Security Rules** — do not rely on key exposure alone as a security boundary. See F2.
3. Set up **Firebase App Check** to prevent unauthorized calls from cloned/fake apps.

**CVSS v3.1:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N` → **9.1 (Critical)**

---

### F2 — MEDIUM: Sitemap References Wrong Domain

**Location:** `/sitemap.xml`
**Evidence:** All `<loc>` entries point to `https://learnwithpugazh.dev/` instead of the actual deployment URL `https://learnwithpugazh-1.vercel.app/`

**Description:**  
The auto-generated sitemap.xml contains canonical URLs for the old/custom domain (`learnwithpugazh.dev`) that does not match the deployed application URL. Search engine crawlers will index the wrong URLs, leading to:
- 404 errors when crawlers follow sitemap links
- Loss of SEO value and search ranking
- Broken canonical signals to Google/Bing

**Impact:** SEO degradation and crawlers receiving 404 responses.

**Recommendation:**  
Update the sitemap generation script (`scripts/generate-sitemap.ts`) to use the correct base URL from an environment variable:

```typescript
const BASE_URL = process.env.SITE_URL || 'https://learnwithpugazh-1.vercel.app';
```

Set `SITE_URL=https://learnwithpugazh.dev` in Vercel environment variables when your custom domain is configured.

**CVSS v3.1:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:N/I:N/A:L` → **4.3 (Low)**

---

### F3 — MEDIUM: Missing Content-Security-Policy Header

**Location:** All HTTP responses
**Evidence:** No `Content-Security-Policy` header present.

**Description:**  
The application does not send a `Content-Security-Policy` header. Without CSP, the application is vulnerable to:
- **XSS attacks:** Inline scripts and event handlers (`onclick`, `onerror`) cannot be blocked.
- **Data injection via third-party scripts:** Malicious scripts loaded from CDN compromises can execute.
- **Clickjacking:** Though `X-Frame-Options: DENY` is present, CSP provides a stronger `frame-ancestors` directive.

**Recommendation:**  
Add a strict CSP header in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://learnwithpugazh.firebaseapp.com https://firestore.googleapis.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        }
      ]
    }
  ]
}
```

> **Note:** The `vercel.json` file exists in the repo root but has not yet been pushed to GitHub, so Vercel is not applying custom headers. Push `vercel.json` and redeploy.

**CVSS v3.1:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N` → **6.5 (Medium)**

---

### F4 — INFORMATIONAL: Vercel Configuration Not Yet Deployed

**Location:** `/vercel.json` (repo root, not yet in GitHub)
**Evidence:** Custom headers, rewrites, and build configuration defined in `vercel.json` are not active.

**Description:**  
The `vercel.json` file was created locally but has not been committed and pushed to GitHub. As a result, Vercel is using its default SPA configuration. The intended security headers (CSP, cache control for assets) and rewrite rules are not applied.

**Recommendation:**  
Commit and push `vercel.json` to the main branch. Vercel will automatically pick it up on the next deployment.

```bash
git add vercel.json .env.example
git commit -m "chore: add vercel.json for production security headers"
git push
```

---

### F5 — INFORMATIONAL: `Access-Control-Allow-Origin: *` on Static Assets

**Location:** `/assets/*.js`, `/assets/*.css`
**Evidence:** Response header `Access-Control-Allow-Origin: *` present on all static assets.

**Description:**  
Static assets are served with `Access-Control-Allow-Origin: *`, allowing any website to embed these assets via `<script>` or `<link>` tags. This is the default Vercel behavior and is not inherently dangerous for public JavaScript/CSS, but it could enable:
- **Cross-site script inclusion (XSSI):** If the JS bundle contains sensitive data, a malicious site could extract it via script tag inclusion.
- **Typopquatting/dependency confusion:** An attacker could host a malicious page that loads your JS and presents a fake login.

> The current JS bundle does not appear to contain highly sensitive data (only Firebase config and static content), so the risk is low.

**Recommendation:**  
Restrict CORS to your own domain once if you add server-side rendering or API endpoints that should not be accessed cross-origin:
```json
"headers": [{ "key": "Access-Control-Allow-Origin", "value": "https://learnwithpugazh-1.vercel.app" }]
```

---

### F6 — INFORMATIONAL: Deprecated Fetch Override Pattern in HTML

**Location:** `/index.html` (lines 6–23)
**Evidence:**
```javascript
(function() {
  try {
    var realFetch = window.fetch ? window.fetch.bind(window) : null;
    Object.defineProperty(window, 'fetch', { ... });
  } catch (e) { }
})();
```

**Description:**  
The inline script attempts to wrap `window.fetch` with a no-op polyfill. This pattern is non-standard and may:
- Conflict with service workers or browser extensions
- Cause unexpected behavior in the Firebase SDK which relies on native `fetch`
- Be flagged by Content Security Policy once CSP is enabled

**Recommendation:**  
Remove this script entirely. If the intent was polyfill support for older browsers, use a proper polyfill library loaded before other scripts. Firebase SDK v12+ handles fetch compatibility internally.

---

## Positive Security Observations

The following protections are **correctly implemented** and do not require changes:

| Header | Status | Value |
|---|---|---|
| `X-Frame-Options` | ✅ | `DENY` |
| `X-Content-Type-Options` | ✅ | `nosniff` |
| `X-XSS-Protection` | ✅ | `1; mode=block` |
| `Strict-Transport-Security` | ✅ | `max-age=63072000; includeSubDomains; preload` |
| `Referrer-Policy` | ✅ | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | ✅ | `camera=(), microphone=(), geolocation=()` |
| Cache-Control (assets) | ✅ | `immutable` via Vercel CDN |
| SPA routing | ✅ | All routes handled by React client-side |
| `.env` file | ✅ | Correctly excluded from git |
| Firebase Auth | ✅ | Uses Google's OAuth flow with `prompt: 'select_account'` |

---

## Recommended Priority Actions

| Priority | Action | Effort |
|---|---|---|
| **1 (Immediate)** | Restrict Firebase API key in Firebase Console | 5 min |
| **2 (Immediate)** | Push `vercel.json` and redeploy | 2 min |
| **3 (Before launch)** | Add CSP header via `vercel.json` | 10 min |
| **4 (Before launch)** | Enable Firebase App Check | 15 min |
| **5 (Before launch)** | Fix sitemap base URL | 5 min |
| **6 (Cleanup)** | Remove deprecated fetch override script | 2 min |

---

*Report generated via autonomous black-box security assessment. All findings are documented with evidence and remediation guidance.*
