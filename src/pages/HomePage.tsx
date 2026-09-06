import {  useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Network, Globe, Instagram } from 'lucide-react';
import { categories } from '../data/categories';
import { labs as staticLabs } from '../data/labs';
import { fetchLabsFromFirestore } from '../services/firestoreData';
import { LabCard } from '../components/LabCard';
import { InstagramReelsExplorer } from '../components/InstagramReelsExplorer';
import { PortfolioShowcase } from '../components/PortfolioShowcase';
import { LearnWithPugazhLogo } from '../components/LearnWithPugazhLogo';
import { useHeadMetadata } from '../hooks/useHeadMetadata';
import { Lab } from '../types';

export function HomePage() {
  useHeadMetadata({
    title: 'LearnWithPugazh — Master Systems, Networking & Fullstack Engineering',
    rawTitle: true,
    description: 'Interactive engineering laboratory and companion platform for @learnwithpugazh. Explore RFC standards, packet traces, Cisco topologies, and deep dives.',
    type: 'website',
    keywords: ['systems engineering', 'computer networking', 'linux kernel', 'fullstack development', 'learnwithpugazh'],
  });

  const [labs, setLabs] = useState<Lab[]>(staticLabs);

  useEffect(() => {
    let isMounted = true;
    fetchLabsFromFirestore().then((list) => {
      if (isMounted && list.length > 0) setLabs(list);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="pt-10 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Official Platform Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white text-xs font-mono text-zinc-900 font-bold shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <LearnWithPugazhLogo size="xs" showText={false} />
              <span>@learnwithpugazh</span>
              <span className="text-zinc-300">&bull;</span>
              <span className="text-zinc-500 font-medium">Official Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.08]">
              Where 60s Reels Become <br />
              <span className="text-gradient-3d-graphite">
                Production Depth.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 max-w-2xl leading-relaxed">
              The portfolio and interactive engineering laboratory of <strong>Pugazhmani K</strong>. Created specifically for our community to dive beyond short-form videos into RFC standards, packet traces, Cisco topologies, and real CLI configurations.
            </p>

            {/* 3D CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#reels-explorer"
                id="hero-cta-reels"
                className="btn-3d-primary px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold inline-flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Reel Deep-Dive Index</span>
              </a>

              <Link
                to="/learn"
                id="hero-cta-start-learning"
                className="btn-3d-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold inline-flex items-center gap-2"
              >
                <span>Browse Curriculums</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </Link>

              <Link
                to="/about"
                id="hero-cta-portfolio"
                className="px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Creator Bio</span>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-zinc-200 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono">10,000+</div>
                <div className="text-xs text-zinc-500 font-medium mt-0.5">Instagram Community</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono">60+</div>
                <div className="text-xs text-zinc-500 font-medium mt-0.5">In-Depth Guides</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono">100%</div>
                <div className="text-xs text-zinc-500 font-medium mt-0.5">First Principles</div>
              </div>
            </div>
          </div>

            {/* Right Hero Visual: Student Learning & Deep-Work Sanctuary */}
          <div className="lg:col-span-5 space-y-4">
            {/* Student Learning Visual Card */}
            <div className="relative rounded-3xl overflow-hidden card-3d border border-zinc-200 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.08)] group">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/hero-student-learning.jpg"
                  alt="Student deeply engaged in learning technology, networking concepts, and systems architecture with textbooks, notebook, and laptop at a bright sunlit table"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                  width={800}
                  height={600}
                />
                {/* Floating Top Badge */}
                <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md border border-white/60 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold text-zinc-900 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Deep Study &bull; First Principles</span>
                </div>

                {/* Floating Bottom Info */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-zinc-900">
                  <div className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider font-semibold">
                    Hands-On Engineering Desk
                  </div>
                  <div className="text-sm sm:text-base font-bold text-zinc-900 tracking-tight flex items-center justify-between mt-0.5">
                    <span>Theory &bull; Schematics &bull; Real Labs</span>
                    <span className="text-[10px] font-mono bg-zinc-900/10 backdrop-blur-xs px-2 py-0.5 rounded-md text-zinc-800 border border-zinc-200/50">
                      RFC &amp; Code Depth
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* The Reel-to-Reality Pipeline Overview */}
            <div className="p-4 sm:p-5 rounded-2xl card-3d space-y-3">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center justify-between font-bold">
                <span>The 3-Step Learning Pipeline</span>
                <span className="text-zinc-800 font-bold flex items-center gap-1.5 bg-zinc-100 px-2.5 py-0.5 rounded-full border border-zinc-200 text-[10px]">
                  Reels &rarr; Depth
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <div className="text-[10px] font-mono font-bold text-zinc-500">STEP 01</div>
                  <div className="text-xs font-bold text-zinc-900 mt-0.5">60s Hook</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">Instagram</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <div className="text-[10px] font-mono font-bold text-zinc-500">STEP 02</div>
                  <div className="text-xs font-bold text-zinc-900 mt-0.5">RFC Study</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">Deep Dives</div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <div className="text-[10px] font-mono font-bold text-zinc-500">STEP 03</div>
                  <div className="text-xs font-bold text-zinc-900 mt-0.5">CLI Lab</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">Topologies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTAGRAM REELS TO DEEP DIVES SECTION */}
      <section id="reels-explorer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <InstagramReelsExplorer />
      </section>

      {/* 3. PORTFOLIO & CREATOR CREDIBILITY */}
      <section id="portfolio-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioShowcase />
      </section>

      {/* 4. EXPLORE CURRICULUM DISCIPLINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-800 font-bold bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-200 shadow-2xs">
              01 &bull; Core Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-2.5 tracking-tight">
              Curated <span className="text-gradient-3d-graphite">Engineering Tracks</span>
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Structured from fundamentals to enterprise architecture.
            </p>
          </div>
          <Link
            to="/learn"
            className="text-xs font-bold text-zinc-800 hover:text-black inline-flex items-center gap-1 shrink-0"
          >
            <span>View All Curriculums</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="card-3d p-6 sm:p-7 rounded-3xl flex flex-col justify-between"
            >
              <div>
                {/* 3D Graphite Icon Block */}
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-b from-zinc-800 via-zinc-900 to-black text-white flex items-center justify-center mb-5 shadow-[0_6px_16px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] border border-zinc-700">
                  {cat.iconName === 'Network' && <Network className="w-6 h-6 drop-shadow-xs" />}
                  {cat.iconName === 'Globe' && <Globe className="w-6 h-6 drop-shadow-xs" />}
                  {cat.iconName === 'Terminal' && <Terminal className="w-6 h-6 drop-shadow-xs" />}
                </div>

                <div className="text-xs font-mono text-zinc-500 font-bold mb-1">
                  {cat.topicCount} Core Topics
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  {cat.name}
                </h3>

                <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                  {cat.description}
                </p>

                {/* Subtopic pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cat.groups.slice(0, 4).map((g) => (
                    <span
                      key={g.name}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200 shadow-2xs font-medium"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/learn/${cat.slug}`}
                className="btn-3d-white w-full py-2.5 px-4 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5"
              >
                <span>Explore {cat.name} Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRACTICAL HANDS-ON LABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-800 font-bold bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-200 shadow-2xs">
              02 &bull; Interactive Sandbox
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-2.5 tracking-tight">
              Hands-on <span className="text-gradient-3d-graphite">Network &amp; Systems Labs</span>
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Stop memorizing commands. Configure Cisco switches, verify IP routes, and test packet flows.
            </p>
          </div>
          <Link
            to="/labs"
            className="text-xs font-bold text-zinc-800 hover:text-black inline-flex items-center gap-1 shrink-0"
          >
            <span>Browse All {labs.length} Labs</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {labs.slice(0, 3).map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>
      </section>

      {/* 6. INSTAGRAM COMMUNITY FOOTER CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden p-8 sm:p-14 rounded-3xl card-3d bg-gradient-to-b from-white via-zinc-50 to-zinc-100 text-center space-y-6 border-zinc-200">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-b from-zinc-800 via-zinc-900 to-black flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] border border-zinc-700">
              <Instagram className="w-7 h-7 drop-shadow-xs" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold block">
              Join 10,000+ Engineers
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Follow <span className="text-gradient-3d-graphite">@learnwithpugazh</span> on Instagram
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Get 60-second visual engineering carousels and reels in your daily feed, then return here anytime for the verified source code, network topologies, and production guides.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="https://instagram.com/learnwithpugazh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-primary px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold inline-flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @learnwithpugazh</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </a>

            <Link
              to="/about"
              className="btn-3d-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold inline-flex items-center gap-2"
            >
              <span>Connect with Pugazh</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
