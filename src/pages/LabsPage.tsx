import {  useState, useMemo, useEffect  } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { LabCard } from '../components/LabCard';
import { labs as staticLabs } from '../data/labs';
import { fetchLabsFromFirestore } from '../services/firestoreData';
import { Search, Filter, Wrench } from 'lucide-react';
import { DifficultyLevel, Lab } from '../types';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function LabsPage() {
  useHeadMetadata({
    title: 'Interactive Virtual Labs & CLI Sandboxes',
    description: 'Hands-on engineering sandboxes: Cisco packet routing, Linux kernel debugging, Docker networking, and Wireshark trace analysis.',
    type: 'website',
    keywords: ['virtual labs', 'cisco packet tracer', 'wireshark labs', 'docker network sandbox', 'linux terminal'],
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

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Networking', 'Linux & Servers', 'Web Development'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      const matchCategory =
        selectedCategory === 'All' ||
        lab.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchDifficulty =
        selectedDifficulty === 'All' || lab.difficulty === selectedDifficulty;

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        lab.title.toLowerCase().includes(q) ||
        lab.labNumber.toLowerCase().includes(q) ||
        lab.tools.some((t) => t.toLowerCase().includes(q)) ||
        lab.topologyDescription.toLowerCase().includes(q) ||
        lab.objectives.some((o) => o.toLowerCase().includes(q));

      return matchCategory && matchDifficulty && matchQuery;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Labs' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E7EB] bg-[#F7F8FA] text-xs font-mono text-[#16A34A] font-semibold">
          <Wrench className="w-3.5 h-3.5" />
          <span>HANDS-ON SIMULATIONS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          Practical Engineering Labs
        </h1>
        <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
          Step-by-step technical blueprints. Configure routers, segment VLANs, harden servers, and test connectivity systematically with real CLI syntax.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="labs-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by lab number, title, tool (e.g. OSPF, VLAN, SSH)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl text-[#111827] placeholder:text-[#9CA3AF] focus:outline-hidden focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          {/* Counts */}
          <div className="text-xs font-mono text-[#667085] shrink-0">
            Showing <strong className="text-[#111827]">{filteredLabs.length}</strong> of{' '}
            {labs.length} labs
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#F3F4F6]">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-[#667085] mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#9CA3AF]" />
              Track:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#4F46E5] text-white'
                    : 'bg-[#F7F8FA] text-[#4B5563] hover:bg-[#EEF2FF] hover:text-[#4F46E5] border border-[#E5E7EB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-[#667085] mr-1">Level:</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff as DifficultyLevel | 'All')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-[#111827] text-white'
                    : 'bg-[#F7F8FA] text-[#4B5563] hover:bg-[#F3F4F6] border border-[#E5E7EB]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Labs Grid */}
      {filteredLabs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F7F8FA] space-y-3">
          <p className="text-base font-semibold text-[#111827]">No labs match your active filter</p>
          <p className="text-sm text-[#667085]">
            Try clearing search keywords or selecting "All" categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-semibold text-[#4F46E5] hover:bg-[#EEF2FF] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
