# LearnWithPugazh Security Specification & Test Protocol

## 1. Data Invariants
1. **Public Readability**: Anyone can read `/projects/{projectId}`, `/roadmaps/{roadmapId}`, and `/labs/{labId}`.
2. **Email-Only Admin Access**: Only authenticated users with email `kpugazhmani21@gmail.com` (case-insensitive) AND `email_verified == true` can create, update, or delete `/projects`, `/roadmaps`, and `/labs`. No separate `/admins` collection-based privilege exists.
3. **Private User State Isolation**: `/users/{userId}` documents containing user emails, bookmarks, and learning history can ONLY be read and written by the authenticated owner (`request.auth.uid == userId`). No blanket listing is permitted.
4. **Non-Elevated Role Modification**: Users cannot elevate their own permissions or add themselves to any admin collection.
5. **Payload Bounding**: All string fields (titles, summaries, slugs, architecture notes, lab steps, validation) and arrays must be strictly constrained in length to protect against wallet-denial attacks and storage poisoning.
6. **Path Integrity**: Path document IDs must match valid character patterns `^[a-zA-Z0-9_\\-]+$` and not exceed 128 characters.
7. **Schema Whitelist (Shadow-Property Protection)**: Every collection's documents must conform to an explicit `allowedKeys` whitelist. Extra fields (e.g. `isAdmin: true`, `__rootAccess`) are rejected at the rules layer.

## 2. Firestore Database Schema (Authoritative)

### `/projects/{slug}` — Projects Collection
Document ID = project `slug` (URL-safe, ≤128 chars).
```
{
  title:        string  (1–200)
  slug:         string  (1–128, matches ^[a-zA-Z0-9_-]+$)
  category:     string? (≤100)
  description:  string? (≤10000)
  problem:      string? (≤10000)
  technologies: string[] (≤50 entries, each ≤100 chars)
  featured:     bool?
  createdAt:    string? (ISO 8601)
  updatedAt:    string? (ISO 8601)
}
```
Allowed CRUD: Public read, Admin (verified email match) create/update/delete.

### `/roadmaps/{slug}` — Roadmaps Collection
Document ID = roadmap `slug`.
```
{
  title:             string  (1–200)
  slug:              string  (1–128)
  description:       string? (≤10000)
  difficulty:        string? (≤50)
  estimatedDuration: string? (≤50)
  stages:            map[]  (≤30 stages; each {title: string 1–200, ...})
  createdAt:         string? (ISO 8601)
  updatedAt:         string? (ISO 8601)
}
```
Allowed CRUD: Public read, Admin create/update/delete.

### `/labs/{slug}` — Labs Collection
Document ID = lab `slug`.
```
{
  id:                  string  (1–128)
  labNumber:           string  (1–20, e.g. "LAB 03")
  title:               string  (1–200)
  slug:                string  (1–128)
  category:            string  (1–100)
  categorySlug:        string  (1–100)
  difficulty:          enum    ('Beginner' | 'Intermediate' | 'Advanced')
  estimatedTime:       string  (1–50, e.g. "30–45 minutes")
  tools:               string[] (≤30)
  prerequisites:       string[] (≤30)
  objectives:          string[] (≤30)
  topologyDescription: string  (1–10000)
  conceptExplanation:  string  (1–10000)
  setupInstructions:   string[]? (≤50)
  steps:               map[]   (≤100; each has stepNumber: int, title 1–200, explanation ≤10000, command?, tip?)
  validation:          map[]   (≤30; each has testDescription, command, expectedResult, howYouKnowItWorked)
  troubleshooting:     map[]?  (≤50; each has symptom, probableCause, systematicCheck, resolution)
  challenge:           map?    ({description, requirement, collapsibleSolution})
  whatYouLearned:      string[]? (≤30)
  nextLab:             map?    ({title, slug})
  relatedTopics:       map[]?  ({title, slug, categorySlug})
  relatedProjects:     map[]?  ({title, slug})
  instagramPost:       map?    ({title, postUrl, caption})
  createdAt:           string? (ISO 8601)
  updatedAt:           string? (ISO 8601)
}
```
Allowed CRUD: Public read, Admin create/update/delete.

### `/users/{uid}` — User Private State
Document ID = Firebase Auth `uid`.
```
{
  userId:        string  (≤128)
  email:         string  (≤150)
  displayName:   string? (≤150)
  photoURL:      string? (≤500)
  savedProjects: string[]? (≤100; each 1–128 chars)
  savedRoadmaps: string[]? (≤100; each 1–128 chars)
  createdAt:     string? (ISO 8601)
  updatedAt:     string? (ISO 8601)
}
```
Allowed CRUD: Owner `get`/`create`/`update`/`delete`, Admin (verified email) `get`/`update`/`delete`, Admin-only `list`.

### `/admins/{adminId}` — Admin Access Registry
Document ID = arbitrary admin `uid`.
Allowed: Owner-or-admin `read`; verified-admin-email-only `write`.

## 3. The "Dirty Dozen" Malicious Payloads
1. **Unauthenticated Project Creation**: Anonymous or unauthenticated write to `/projects/test-hack`. (Expected: PERMISSION_DENIED)
2. **Non-Admin Email Attempted Project Update**: Authenticated user with email != `kpugazhmani21@gmail.com` attempting to edit `/projects/netmon-cli`. (Expected: PERMISSION_DENIED)
3. **Email Verification Spoofing**: User providing `email: kpugazhmani21@gmail.com` with `email_verified: false`. (Expected: PERMISSION_DENIED)
4. **User Document Hijacking**: Authenticated user A attempting to read or write `/users/userB`. (Expected: PERMISSION_DENIED)
5. **Self-Granting Admin Role**: Standard user attempting to create `/admins/{myUid}` or equivalent admin registration. (Expected: PERMISSION_DENIED)
6. **Oversized String Injection**: Injecting a 2MB payload into `project.description`, `roadmap.description`, or `lab.conceptExplanation`. (Expected: PERMISSION_DENIED)
7. **Malformed Document ID**: Creating a project/lab/roadmap with a 2000-character ID or illegal URI characters. (Expected: PERMISSION_DENIED)
8. **Unbounded Array Flooding**: Submitting an array of 5,000 tags/technologies into `project.technologies` or `lab.steps`. (Expected: PERMISSION_DENIED)
9. **Blanket User Scraping**: Attempting a collection list query over `/users` without scoping to `request.auth.uid`. (Expected: PERMISSION_DENIED)
10. **Non-Admin Project Deletion**: Standard user attempting `deleteDoc` on `/projects/netmon-cli`. (Expected: PERMISSION_DENIED)
11. **Shadow Property Injection**: Sending undeclared fields like `__rootAccess: true` during project, roadmap, or lab creation. (Expected: PERMISSION_DENIED)
12. **Catch-All Bypass Attempt**: Querying arbitrary undocumented collections like `/internal_system_secrets`. (Expected: PERMISSION_DENIED)

## 4. Admin Panel CRUD Coverage

The Admin Page at `/admin` (auth-gated to `kpugazhmani21@gmail.com` with `email_verified == true`) provides full CRUD for all three content collections:

| Tab | Create | Read | Update | Delete | Seed |
|-----|--------|------|--------|--------|------|
| Projects | ✓ New Project modal | ✓ Table view | ✓ Edit modal | ✓ Confirm dialog | ✓ Via Database tab |
| Roadmaps | ✓ New Roadmap modal | ✓ Table view | ✓ Edit modal | ✓ Confirm dialog | ✓ Via Database tab |
| Labs | ✓ New Lab modal | ✓ Table view | ✓ Edit modal | ✓ Confirm dialog | ✓ Via Database tab |
| Database & Seed | — | ✓ Connection + counts | — | — | ✓ Seeds projects + roadmaps + labs from `src/data/*.ts` |

All CRUD operations use the same schema (see Section 2) and write through `setDoc(..., { merge: true })` to preserve `createdAt` and only update `updatedAt` server-side. Failed writes surface through the in-app toast system with the Firestore error code.
