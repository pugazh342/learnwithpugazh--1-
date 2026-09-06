import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { HeadMetadataManager } from './hooks/useHeadMetadata';

// Route-level code splitting for performance and fast initial paint
const LearnPage = lazy(() => import('./pages/LearnPage').then((m) => ({ default: m.LearnPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const TopicPage = lazy(() => import('./pages/TopicPage').then((m) => ({ default: m.TopicPage })));
const RoadmapsPage = lazy(() => import('./pages/RoadmapsPage').then((m) => ({ default: m.RoadmapsPage })));
const RoadmapDetailPage = lazy(() => import('./pages/RoadmapDetailPage').then((m) => ({ default: m.RoadmapDetailPage })));
const LabsPage = lazy(() => import('./pages/LabsPage').then((m) => ({ default: m.LabsPage })));
const LabDetailPage = lazy(() => import('./pages/LabDetailPage').then((m) => ({ default: m.LabDetailPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));

// Subtle high-performance loading fallback matching the titanium design system
function PageLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-300 border-t-zinc-800 animate-spin" />
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Loading...</span>
      </div>
    </div>
  );
}

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <HeadMetadataManager />
          <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-zinc-900 relative selection:bg-zinc-800 selection:text-white">
            {/* Ambient 3D Lighting Mesh */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-zinc-300/20 via-zinc-200/10 to-transparent blur-3xl rounded-full" />
              <div className="absolute top-1/3 -right-40 w-[600px] h-[400px] bg-gradient-to-bl from-zinc-300/15 via-slate-200/10 to-transparent blur-3xl rounded-full" />
              <div className="absolute top-2/3 -left-40 w-[600px] h-[400px] bg-gradient-to-tr from-zinc-200/20 via-neutral-100/10 to-transparent blur-3xl rounded-full" />
            </div>
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header onOpenSearch={() => setIsSearchOpen(true)} />

              <main className="flex-1">
                <Suspense fallback={<PageLoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/learn" element={<LearnPage />} />
                    <Route path="/learn/:category" element={<CategoryPage />} />
                    <Route path="/learn/:category/:topic" element={<TopicPage />} />
                    <Route path="/roadmaps" element={<RoadmapsPage />} />
                    <Route path="/roadmaps/:roadmap" element={<RoadmapDetailPage />} />
                    <Route path="/labs" element={<LabsPage />} />
                    <Route path="/labs/:slug" element={<LabDetailPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </Suspense>
              </main>

              <Footer />
            </div>

            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />
            <AuthModal />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
