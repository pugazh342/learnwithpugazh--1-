# LearnWithPugazh

Engineering learning platform covering systems, networking, and fullstack development.

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in your Firebase credentials in .env.local
npm run dev
```

## Deploy to Vercel

### 1. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database** and **Authentication** (Email/Password)
3. Copy your web app config into `.env.local`:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
4. Deploy `firestore.rules` from the repo root to secure your Firestore instance

### 2. Connect to Vercel

**Option A — Vercel CLI:**
```bash
npm i -g vercel
vercel
```
Follow the prompts. Add your Firebase env vars in the Vercel dashboard under Settings → Environment Variables.

**Option B — GitHub Import:**
1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo
4. Add your Firebase env vars under Environment Variables (Production)
5. Click Deploy

### 3. Domain & Firestore Security

Update your Firebase console **Authorized domains** to include your Vercel deployment URL (e.g. `yourapp.vercel.app`) for authentication to work.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run lint` | TypeScript check |
| `npm run preview` | Preview production build |
