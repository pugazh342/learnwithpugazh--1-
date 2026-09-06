import {  useState, useMemo  } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowUpRight, Search, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
import { instagramReels } from '../data/instagramReels';

export function InstagramReelsExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Networking', 'Linux', 'Security'];

  const filteredReels = useMemo(() => {
    return instagramReels.filter((reel) => {
      const matchesCat = selectedCategory === 'All' || reel.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        reel.reelTitle.toLowerCase().includes(query) ||
        reel.reelCaption.toLowerCase().includes(query) ||
        reel.keyInsight.toLowerCase().includes(query) ||
        reel.includes.some((inc) => inc.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-2xs mb-2.5">
            <Instagram className="w-3.5 h-3.5 text-zinc-700" />
            <span>@learnwithpugazh Companion Hub</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            From 60s Reel to <span className="text-gradient-3d-graphite">Production Mastery</span>
          </h3>
          <p className="text-sm text-zinc-600 mt-1">
            Watched a reel on Instagram? Unlock the full RFC standards, packet topologies, and CLI guides here.
          </p>
        </div>

        <a
          href="https://instagram.com/learnwithpugazh"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-3d-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 self-start sm:self-center"
        >
          <Instagram className="w-4 h-4" />
          <span>Follow @learnwithpugazh</span>
          <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 text-zinc-400" />
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-white p-2.5 rounded-2xl border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Reel topic (e.g. DNS, chmod, VLAN)..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Reels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReels.map((reel) => {
          const deepDiveUrl = reel.topicSlug
            ? `/learn/${reel.category.toLowerCase()}/${reel.topicSlug}`
            : reel.labSlug
            ? `/labs/${reel.labSlug}`
            : '/learn';

          return (
            <div
              key={reel.id}
              className="card-3d group flex flex-col justify-between p-6 rounded-3xl"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200 shadow-2xs">
                    {reel.reelNumber}
                  </span>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <span className="font-semibold text-zinc-700">{reel.reach} views</span>
                    <span>&bull;</span>
                    <span>{reel.duration}</span>
                  </div>
                </div>

                {/* Title and Hook */}
                <div>
                  <h4 className="text-lg font-bold text-zinc-900 leading-snug group-hover:text-zinc-600 transition-colors">
                    {reel.reelTitle}
                  </h4>
                  <p className="text-xs text-zinc-600 font-semibold mt-1">
                    "{reel.reelHook}"
                  </p>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    {reel.reelCaption}
                  </p>
                </div>

                {/* What's Included Badge List */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Included in Full Deep Dive:
                  </div>
                  <ul className="space-y-1.5">
                    {reel.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-zinc-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Insight Box */}
                <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 shadow-2xs">
                  <span className="font-bold text-zinc-900 font-mono block mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
                    Deep Takeaway:
                  </span>
                  {reel.keyInsight}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                >
                  <Instagram className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Watch Reel</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>

                <Link
                  to={deepDiveUrl}
                  className="btn-3d-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Full Guide ({reel.deepDiveTime})</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReels.length === 0 && (
        <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-300 bg-white shadow-xs">
          <p className="text-sm text-zinc-600">
            No reels found matching your query "{searchQuery}". Try searching for "DNS", "VLAN", or "Linux".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs font-bold text-zinc-900 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
