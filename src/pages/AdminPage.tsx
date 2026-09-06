import {  useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Save,
  X,
  Database,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  Compass,
  Wrench,
  Search,
  Lock,
  LogOut,
} from 'lucide-react';
import { useAuth, ADMIN_EMAIL } from '../context/AuthContext';
import {
  fetchProjectsFromFirestore,
  fetchRoadmapsFromFirestore,
  fetchLabsFromFirestore,
  saveProjectToFirestore,
  deleteProjectFromFirestore,
  saveRoadmapToFirestore,
  deleteRoadmapFromFirestore,
  saveLabToFirestore,
  deleteLabFromFirestore,
  seedAllDefaultsToFirestore,
} from '../services/firestoreData';
import { Project, Roadmap, Lab, DifficultyLevel } from '../types';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function AdminPage() {
  useHeadMetadata({
    title: 'Admin Portal & Content Manager | LearnWithPugazh',
    description: 'Administrative dashboard for updating engineering projects, roadmaps, and managing Firestore collections.',
    type: 'website',
    noIndex: true,
  });

  const {
    user,
    isAdmin,
    loading: authLoading,
    signInWithGoogle,
    signOutUser,
    authError,
    isSigningIn,
    devBypassSignIn,
  } = useAuth();

  const isDevEnvironment = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.endsWith('.local')
  );

  const [activeTab, setActiveTab] = useState<'projects' | 'roadmaps' | 'labs' | 'database'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal states for Project
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [savingProject, setSavingProject] = useState(false);

  // Modal states for Roadmap
  const [editingRoadmap, setEditingRoadmap] = useState<Roadmap | null>(null);
  const [isNewRoadmap, setIsNewRoadmap] = useState(false);
  const [savingRoadmap, setSavingRoadmap] = useState(false);

  // Modal states for Lab
  const [editingLab, setEditingLab] = useState<Lab | null>(null);
  const [isNewLab, setIsNewLab] = useState(false);
  const [savingLab, setSavingLab] = useState(false);

  // Seeding state
  const [seeding, setSeeding] = useState(false);


  // Load projects, roadmaps, labs
  const loadContent = async () => {
    setLoadingData(true);
    try {
      const [pList, rList, lList] = await Promise.all([
        fetchProjectsFromFirestore(),
        fetchRoadmapsFromFirestore(),
        fetchLabsFromFirestore(),
      ]);
      setProjects(pList);
      setRoadmaps(rList);
      setLabs(lList);
    } catch (err) {
      console.error('Error loading admin content:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadContent();
    }
  }, [isAdmin]);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Handlers for Project CRUD
  const handleOpenNewProject = () => {
    setEditingProject({
      id: `project-${Date.now()}`,
      title: '',
      slug: '',
      description: '',
      category: 'Systems & Networking',
      status: 'Completed',
      featured: false,
      technologies: ['TypeScript', 'Linux', 'Networking'],
      problem: '',
      idea: '',
      approach: '',
      architecturePoints: ['Edge ingress routing', 'Real-time telemetry buffer'],
      implementationHighlights: [],
      challenges: [],
      learnings: [],
      results: [],
      relatedTopics: [],
      relatedLabs: [],
    });
    setIsNewProject(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title || !editingProject.slug) {
      showNotification('Project Title and Slug are required.', 'error');
      return;
    }
    setSavingProject(true);
    try {
      await saveProjectToFirestore(editingProject);
      showNotification(`Project "${editingProject.title}" saved successfully!`);
      setEditingProject(null);
      setIsNewProject(false);
      await loadContent();
    } catch (err) {
      console.error(err);
      showNotification('Failed to save project to Firestore.', 'error');
    } finally {
      setSavingProject(false);
    }
  };

  const handleDeleteProject = async (slug: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}"? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteProjectFromFirestore(slug);
      showNotification(`Project "${title}" deleted from database.`);
      await loadContent();
    } catch (err) {
      console.error(err);
      showNotification('Failed to delete project.', 'error');
    }
  };

  // Handlers for Roadmap CRUD
  const handleOpenNewRoadmap = () => {
    setEditingRoadmap({
      id: `roadmap-${Date.now()}`,
      title: '',
      slug: '',
      description: '',
      estimatedDuration: '6 Months',
      difficulty: 'Intermediate',
      iconName: 'Network',
      overview: '',
      stages: [
        {
          id: `stage-1-${Date.now()}`,
          number: 1,
          title: 'Foundations & Architecture',
          description: 'Core concepts and environment setup',
          topics: [],
        },
      ],
    });
    setIsNewRoadmap(true);
  };

  const handleSaveRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoadmap || !editingRoadmap.title || !editingRoadmap.slug) {
      showNotification('Roadmap Title and Slug are required.', 'error');
      return;
    }
    setSavingRoadmap(true);
    try {
      await saveRoadmapToFirestore(editingRoadmap);
      showNotification(`Roadmap "${editingRoadmap.title}" saved successfully!`);
      setEditingRoadmap(null);
      setIsNewRoadmap(false);
      await loadContent();
    } catch (err) {
      console.error(err);
      showNotification('Failed to save roadmap to Firestore.', 'error');
    } finally {
      setSavingRoadmap(false);
    }
  };

  const handleDeleteRoadmap = async (slug: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete roadmap "${title}"? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteRoadmapFromFirestore(slug);
      showNotification(`Roadmap "${title}" deleted from database.`);
      await loadContent();
    } catch (err) {
      console.error(err);
      showNotification('Failed to delete roadmap.', 'error');
    }
  };

  // Seed Handler
  const handleSeedDefaults = async () => {
    if (!window.confirm('Seed initial projects and roadmaps from curated repository data into Firestore?')) {
      return;
    }
    setSeeding(true);
    try {
      const result = await seedAllDefaultsToFirestore();
      showNotification(`Successfully seeded ${result.projectsCount} projects, ${result.roadmapsCount} roadmaps, and ${result.labsCount} labs to Firestore!`);
      await loadContent();
    } catch (err) {
      console.error(err);
      showNotification('Seeding failed. Verify your admin role and permissions.', 'error');
    } finally {
      setSeeding(false);
    }
  };

  // Handlers for Lab CRUD
  const handleOpenNewLab = () => {
    setEditingLab({
      id: `lab-${Date.now()}`,
      labNumber: 'LAB 00',
      title: '',
      slug: '',
      category: 'Networking',
      categorySlug: 'networking',
      difficulty: 'Beginner',
      estimatedTime: '30–45 minutes',
      tools: ['Cisco Packet Tracer'],
      prerequisites: [],
      objectives: [],
      topologyDescription: '',
      conceptExplanation: '',
      setupInstructions: [],
      steps: [
        {
          stepNumber: 1,
          title: 'Configure the device',
          explanation: 'Enter the configuration mode and set the basic parameters.',
          command: '',
          expectedOutput: '',
          tip: '',
        },
      ],
      validation: [],
      troubleshooting: [],
      challenge: {
        description: '',
        requirement: '',
        collapsibleSolution: '',
      },
      whatYouLearned: [],
      relatedTopics: [],
      relatedProjects: [],
    });
    setIsNewLab(true);
  };

  const handleSaveLab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLab || !editingLab.title || !editingLab.slug) {
      showNotification('Lab Title and Slug are required.', 'error');
      return;
    }
    setSavingLab(true);
    try {
      await saveLabToFirestore(editingLab);
      showNotification(`Lab "${editingLab.title}" saved successfully!`);
      setEditingLab(null);
      setIsNewLab(false);
      await loadContent();
    } catch (err) {
      console.error(err);
      showNotification('Failed to save lab to Firestore.', 'error');
    } finally {
      setSavingLab(false);
    }
  };

  const handleDeleteLab = async (slug: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete lab "${title}"? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteLabFromFirestore(slug);
      showNotification(`Lab "${title}" deleted from database.`);
      await loadContent();
    } catch (err) {
      console.error(err);
      showNotification('Failed to delete lab.', 'error');
    }
  };

  // Filtered lists
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRoadmaps = roadmaps.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Authentication Gate Screen
  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-500 font-mono text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-[#3D5AFA]" />
          <span>Verifying administrative authorization...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg">
          <Lock className="w-8 h-8 text-[#3D5AFA]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-zinc-900">
            Admin Authentication Required
          </h1>
          <p className="text-sm text-zinc-600">
            Sign in with the verified platform administrator account to manage projects, roadmaps, and database sync.
          </p>
          <div className="inline-block mt-2 px-3 py-1 bg-zinc-100 rounded-lg text-xs font-mono text-zinc-600">
            Authorized: {ADMIN_EMAIL}
          </div>
        </div>

        {authError && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-800 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>{authError.code}</span>
            </div>
            <p className="leading-relaxed">{authError.message}</p>
            {authError.actionHint && (
              <p className="text-[11px] pt-1 border-t border-amber-200/60 opacity-90">
                💡 {authError.actionHint}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2.5">
          <button
            type="button"
            disabled={isSigningIn}
            onClick={() => signInWithGoogle('popup')}
            className="w-full btn-3d-primary flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold shadow-md disabled:opacity-60"
          >
            {isSigningIn ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{isSigningIn ? 'Connecting...' : 'Sign In with Google (Popup)'}</span>
          </button>

          <button
            type="button"
            disabled={isSigningIn}
            onClick={() => signInWithGoogle('redirect')}
            className="w-full btn-3d-white flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold"
          >
            <span>Sign In with Redirect (Full Window)</span>
          </button>

          <button
            type="button"
            onClick={devBypassSignIn}
            className="w-full mt-2 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors border border-dashed border-zinc-300"
            disabled={!isDevEnvironment}
            title={isDevEnvironment ? 'Dev Mode: Instant Admin Bypass' : 'Dev bypass is disabled in production'}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Dev Mode: Instant Admin Bypass</span>
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-amber-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Unauthorized Account
          </h1>
          <p className="text-sm text-zinc-600">
            You are signed in as <span className="font-mono text-zinc-900">{user.email}</span>, which does not have administrator privileges.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={() => signOutUser()}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-900 transition-colors"
          >
            Sign Out
          </button>
          <button
            type="button"
            onClick={() => signInWithGoogle()}
            className="btn-3d-primary px-4 py-2 text-xs font-semibold rounded-xl"
          >
            Switch Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Status Toast */}
      {statusMessage && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium border shadow-md animate-in fade-in slide-in-from-top-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-700'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white border border-zinc-200/80 rounded-2xl shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#3D5AFA] shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-zinc-900">
                Admin Content Manager
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#3D5AFA]/10 text-[#3D5AFA] border border-[#3D5AFA]/30 rounded-full">
                ADMIN ACCESS
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Live Firestore Database: <span className="font-mono text-zinc-700">focal-theory-lpthm</span> &bull; {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadContent}
            disabled={loadingData}
            title="Refresh database records"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin text-[#3D5AFA]' : ''}`} />
            <span>Sync</span>
          </button>
          <button
            type="button"
            onClick={() => signOutUser()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-rose-500/10 hover:text-rose-600 text-zinc-600 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 bg-zinc-200/70 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'projects'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('roadmaps')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'roadmaps'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Roadmaps ({roadmaps.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('labs')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'labs'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Labs ({labs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'database'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database & Seed</span>
          </button>
        </div>

        {activeTab !== 'database' && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter items..."
                className="pl-9 pr-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#3D5AFA]/50 text-zinc-900 placeholder-zinc-400"
              />
            </div>

            {activeTab === 'projects' && (
              <button
                type="button"
                onClick={handleOpenNewProject}
                className="btn-3d-primary flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </button>
            )}

            {activeTab === 'roadmaps' && (
              <button
                type="button"
                onClick={handleOpenNewRoadmap}
                className="btn-3d-primary flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>New Roadmap</span>
              </button>
            )}

            {activeTab === 'labs' && (
              <button
                type="button"
                onClick={handleOpenNewLab}
                className="btn-3d-primary flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>New Lab</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tab 1: Projects Table */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Title & Slug</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4">Tech Stack</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-500">
                        No projects found. Use "New Project" or seed defaults in the Database tab.
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((p) => (
                      <tr key={p.slug} className="hover:bg-zinc-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-zinc-900 text-sm">
                            {p.title}
                          </div>
                          <div className="font-mono text-[11px] text-zinc-500">
                            /projects/{p.slug}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-600">
                          {p.category}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full ${
                              p.status === 'Completed'
                                ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                                : p.status === 'In Progress'
                                ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                                : 'bg-zinc-100 text-zinc-600 border border-zinc-300'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {p.featured ? (
                            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#3D5AFA]/10 text-[#3D5AFA] rounded-md border border-[#3D5AFA]/30">
                              Yes
                            </span>
                          ) : (
                            <span className="text-zinc-400">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {p.technologies?.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-100 text-zinc-600 rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                            {(p.technologies?.length || 0) > 3 && (
                              <span className="text-[10px] text-zinc-400 font-mono">
                                +{(p.technologies?.length || 0) - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/projects/${p.slug}`}
                              target="_blank"
                              title="View Live Page"
                              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProject(p);
                                setIsNewProject(false);
                              }}
                              title="Edit Project"
                              className="p-1.5 text-zinc-600 hover:text-blue-600 rounded-lg hover:bg-zinc-100"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProject(p.slug, p.title)}
                              title="Delete Project"
                              className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-500/10"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Roadmaps Table */}
      {activeTab === 'roadmaps' && (
        <div className="space-y-4">
          <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Title & Slug</th>
                    <th className="py-3 px-4">Estimated Duration</th>
                    <th className="py-3 px-4">Difficulty</th>
                    <th className="py-3 px-4">Curriculum Stages</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredRoadmaps.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-zinc-500">
                        No roadmaps found. Use "New Roadmap" or seed defaults in the Database tab.
                      </td>
                    </tr>
                  ) : (
                    filteredRoadmaps.map((r) => (
                      <tr key={r.slug} className="hover:bg-zinc-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-zinc-900 text-sm">
                            {r.title}
                          </div>
                          <div className="font-mono text-[11px] text-zinc-500">
                            /roadmaps/{r.slug}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-600">
                          {r.estimatedDuration}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/30">
                            {r.difficulty}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-600 font-mono">
                          {r.stages?.length || 0} stages
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/roadmaps/${r.slug}`}
                              target="_blank"
                              title="View Live Roadmap"
                              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingRoadmap(r);
                                setIsNewRoadmap(false);
                              }}
                              title="Edit Roadmap"
                              className="p-1.5 text-zinc-600 hover:text-blue-600 rounded-lg hover:bg-zinc-100"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteRoadmap(r.slug, r.title)}
                              title="Delete Roadmap"
                              className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-500/10"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Labs Table */}
      {activeTab === 'labs' && (
        <div className="space-y-4">
          <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Lab Number & Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Difficulty</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Steps</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {labs.filter((l) =>
                    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    l.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    l.labNumber.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-500">
                        No labs found. Use "New Lab" or seed defaults in the Database tab.
                      </td>
                    </tr>
                  ) : (
                    labs.filter((l) =>
                      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      l.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      l.labNumber.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((l) => (
                      <tr key={l.slug} className="hover:bg-zinc-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-200">
                              {l.labNumber}
                            </span>
                            <span>{l.title}</span>
                          </div>
                          <div className="font-mono text-[11px] text-zinc-500">
                            /labs/{l.slug}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-600">{l.category}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                            {l.difficulty}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-600 font-mono">{l.estimatedTime}</td>
                        <td className="py-3.5 px-4 text-zinc-600 font-mono">
                          {l.steps?.length || 0} steps
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/labs/${l.slug}`}
                              target="_blank"
                              title="View Live Lab"
                              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingLab(l);
                                setIsNewLab(false);
                              }}
                              title="Edit Lab"
                              className="p-1.5 text-zinc-600 hover:text-blue-600 rounded-lg hover:bg-zinc-100"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLab(l.slug, l.title)}
                              title="Delete Lab"
                              className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-500/10"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Database & Seed Tools */}
      {activeTab === 'database' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border border-zinc-200/80 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#3D5AFA]/10 text-[#3D5AFA]">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900">
                  Firestore Database Status
                </h2>
                <p className="text-xs text-zinc-500">
                  Cloud Firestore Enterprise instance
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono bg-zinc-50 p-4 rounded-xl border border-zinc-200">
              <div className="flex justify-between">
                <span className="text-zinc-500">Connection State:</span>
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active / Connected
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Project ID:</span>
                <span className="text-zinc-800">focal-theory-lpthm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Database ID:</span>
                <span className="text-zinc-800 truncate max-w-[200px]">
                  ai-studio-learnwithpugazh-4e235608...
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Projects Count:</span>
                <span className="text-zinc-800">{projects.length} docs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Roadmaps Count:</span>
                <span className="text-zinc-800">{roadmaps.length} docs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Labs Count:</span>
                <span className="text-zinc-800">{labs.length} docs</span>
              </div>
            </div>

            <a
              href="https://console.firebase.google.com/project/focal-theory-lpthm/firestore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#3D5AFA] hover:underline"
            >
              <span>Open Firebase Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-6 bg-white border border-zinc-200/80 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900">
                  Seed Initial Curated Catalog
                </h2>
                <p className="text-xs text-zinc-500">
                  Bulk sync initial projects and roadmaps into Firestore
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              If your database collections are freshly provisioned or you wish to populate Firestore with all production portfolio projects (Network Monitoring Dashboard, BGP Looking Glass, Packet Latency Engine, etc.) and complete roadmaps, run the seeder below:
            </p>

            <button
              type="button"
              onClick={handleSeedDefaults}
              disabled={seeding}
              className="w-full btn-3d-primary flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold"
            >
              <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
              <span>{seeding ? 'Seeding Firestore...' : 'Seed Default Projects & Roadmaps'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-zinc-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-lg font-bold text-zinc-900">
                {isNewProject ? 'Create New Project' : `Edit: ${editingProject.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">
                    Slug (URL identifier) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">
                    Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Prototype">Prototype</option>
                  </select>
                </div>

                <div className="space-y-1 flex flex-col justify-center pt-4">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-zinc-700">
                    <input
                      type="checkbox"
                      checked={editingProject.featured}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded-sm text-[#3D5AFA]"
                    />
                    <span>Featured on Home</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">
                  Description / Summary
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">
                  Problem Statement
                </label>
                <textarea
                  rows={2}
                  value={editingProject.problem || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, problem: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, liveUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl text-zinc-600 hover:bg-zinc-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProject}
                  className="btn-3d-primary flex items-center gap-2 px-5 py-2 rounded-xl font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingProject ? 'Saving to Database...' : 'Save Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Roadmap Modal */}
      {editingRoadmap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-zinc-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-lg font-bold text-zinc-900">
                {isNewRoadmap ? 'Create New Roadmap' : `Edit: ${editingRoadmap.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingRoadmap(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoadmap} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">
                    Roadmap Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRoadmap.title}
                    onChange={(e) =>
                      setEditingRoadmap({ ...editingRoadmap, title: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">
                    Slug (URL identifier) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRoadmap.slug}
                    onChange={(e) =>
                      setEditingRoadmap({
                        ...editingRoadmap,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={editingRoadmap.estimatedDuration}
                    onChange={(e) =>
                      setEditingRoadmap({
                        ...editingRoadmap,
                        estimatedDuration: e.target.value,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">
                    Difficulty Level
                  </label>
                  <select
                    value={editingRoadmap.difficulty}
                    onChange={(e) =>
                      setEditingRoadmap({
                        ...editingRoadmap,
                        difficulty: e.target.value as DifficultyLevel,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">
                  Description & Target Role
                </label>
                <textarea
                  rows={3}
                  value={editingRoadmap.description}
                  onChange={(e) =>
                    setEditingRoadmap({ ...editingRoadmap, description: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">
                  Overview Details
                </label>
                <textarea
                  rows={3}
                  value={editingRoadmap.overview}
                  onChange={(e) =>
                    setEditingRoadmap({ ...editingRoadmap, overview: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setEditingRoadmap(null)}
                  className="px-4 py-2 rounded-xl text-zinc-600 hover:bg-zinc-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingRoadmap}
                  className="btn-3d-primary flex items-center gap-2 px-5 py-2 rounded-xl font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingRoadmap ? 'Saving to Database...' : 'Save Roadmap'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Lab Modal */}
      {editingLab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-zinc-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-lg font-bold text-zinc-900">
                {isNewLab ? 'Create New Lab' : `Edit: ${editingLab.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingLab(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLab} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Lab Number *</label>
                  <input
                    type="text"
                    required
                    value={editingLab.labNumber}
                    onChange={(e) =>
                      setEditingLab({ ...editingLab, labNumber: e.target.value })
                    }
                    placeholder="LAB 01"
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-semibold text-zinc-700">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingLab.title}
                    onChange={(e) =>
                      setEditingLab({ ...editingLab, title: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingLab.slug}
                    onChange={(e) =>
                      setEditingLab({
                        ...editingLab,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Category</label>
                  <input
                    type="text"
                    value={editingLab.category}
                    onChange={(e) =>
                      setEditingLab({ ...editingLab, category: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Category Slug</label>
                  <input
                    type="text"
                    value={editingLab.categorySlug}
                    onChange={(e) =>
                      setEditingLab({ ...editingLab, categorySlug: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Difficulty</label>
                  <select
                    value={editingLab.difficulty}
                    onChange={(e) =>
                      setEditingLab({ ...editingLab, difficulty: e.target.value as DifficultyLevel })
                    }
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">Estimated Time</label>
                  <input
                    type="text"
                    value={editingLab.estimatedTime}
                    onChange={(e) =>
                      setEditingLab({ ...editingLab, estimatedTime: e.target.value })
                    }
                    placeholder="30–45 minutes"
                    className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Tools (comma separated)</label>
                <input
                  type="text"
                  value={editingLab.tools?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingLab({
                      ...editingLab,
                      tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Concept Explanation</label>
                <textarea
                  rows={3}
                  value={editingLab.conceptExplanation}
                  onChange={(e) =>
                    setEditingLab({ ...editingLab, conceptExplanation: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Topology Description</label>
                <textarea
                  rows={3}
                  value={editingLab.topologyDescription}
                  onChange={(e) =>
                    setEditingLab({ ...editingLab, topologyDescription: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Objectives (one per line)</label>
                <textarea
                  rows={3}
                  value={editingLab.objectives?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingLab({
                      ...editingLab,
                      objectives: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Prerequisites (one per line)</label>
                <textarea
                  rows={2}
                  value={editingLab.prerequisites?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingLab({
                      ...editingLab,
                      prerequisites: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700">Setup Instructions (one per line)</label>
                <textarea
                  rows={2}
                  value={editingLab.setupInstructions?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingLab({
                      ...editingLab,
                      setupInstructions: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-zinc-700">Configuration Steps</label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingLab({
                        ...editingLab,
                        steps: [
                          ...(editingLab.steps || []),
                          {
                            stepNumber: (editingLab.steps?.length || 0) + 1,
                            title: '',
                            explanation: '',
                            command: '',
                            tip: '',
                          },
                        ],
                      })
                    }
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    + Add Step
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {editingLab.steps?.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-zinc-200 bg-zinc-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-zinc-500">
                          STEP 0{step.stepNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingLab({
                              ...editingLab,
                              steps: editingLab.steps.filter((_, i) => i !== idx),
                            })
                          }
                          className="text-rose-500 hover:underline text-[10px] font-bold"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Step title"
                        value={step.title}
                        onChange={(e) => {
                          const next = [...editingLab.steps];
                          next[idx] = { ...next[idx], title: e.target.value };
                          setEditingLab({ ...editingLab, steps: next });
                        }}
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white text-zinc-900"
                      />
                      <textarea
                        rows={2}
                        placeholder="Explanation"
                        value={step.explanation}
                        onChange={(e) => {
                          const next = [...editingLab.steps];
                          next[idx] = { ...next[idx], explanation: e.target.value };
                          setEditingLab({ ...editingLab, steps: next });
                        }}
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white text-zinc-900"
                      />
                      <input
                        type="text"
                        placeholder="Command (optional)"
                        value={step.command || ''}
                        onChange={(e) => {
                          const next = [...editingLab.steps];
                          next[idx] = { ...next[idx], command: e.target.value };
                          setEditingLab({ ...editingLab, steps: next });
                        }}
                        className="w-full p-2 rounded-lg border border-zinc-300 bg-white text-zinc-900 font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setEditingLab(null)}
                  className="px-4 py-2 rounded-xl text-zinc-600 hover:bg-zinc-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLab}
                  className="btn-3d-primary flex items-center gap-2 px-5 py-2 rounded-xl font-bold"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingLab ? 'Saving to Database...' : 'Save Lab'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
