import {  useState  } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Network, Globe, Terminal, Cloud, Shield, GitBranch } from 'lucide-react';
import { categories, upcomingCategories } from '../data/categories';
import { Breadcrumb } from '../components/Breadcrumb';
import { searchContent } from '../data/search';
import { SearchResultItem } from '../types';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function LearnPage() {
  useHeadMetadata({
    title: 'Engineering Curriculums & Deep Dives',
    description: 'Explore hands-on curriculums covering Computer Networking, Linux Systems, and Full-Stack Engineering from first principles.',
    type: 'website',
    keywords: ['curriculums', 'computer networking', 'linux tutorials', 'web development', 'deep dives'],
  });

  const [filterQuery, setFilterQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

  const handleSearchChange = (val: string) => {
    setFilterQuery(val);
    if (val.trim()) {
      setSearchResults(searchContent(val));
    } else {
      setSearchResults([]);
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network':
        return <Network className="w-5 h-5 text-[#4F46E5]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#2563EB]" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-[#16A34A]" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-[#0284C7]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#DC2626]" />;
      case 'GitBranch':
      default:
        return <GitBranch className="w-5 h-5 text-[#D97706]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: 'Learn' }]} />

      {/* Hero */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-bold">
          LEARN
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
          Understand technology. <br className="hidden sm:inline" />
          Don’t just memorize it.
        </h1>
        <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
          Comprehensive, structured deep-dives into computer networking, Linux operating systems, and modern web application development.
        </p>

        {/* Search UI */}
        <div className="pt-2">
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search topics, technologies, concepts... (e.g. DNS, VLAN, React)"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] text-sm text-[#111827] placeholder:text-[#9CA3AF] shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>
        </div>
      </div>

      {/* Live Search Results if searching */}
      {filterQuery.trim() && (
        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#667085]">
            <span>Search results for "{filterQuery}"</span>
            <span>{searchResults.length} matches</span>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-sm text-[#667085] py-4">No matching content found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#4F46E5] transition-colors flex items-start justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-[11px] font-mono text-[#667085]">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span className="text-[#4F46E5] font-semibold">{item.type}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#111827] group-hover:text-[#4F46E5]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#667085] line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#4F46E5] shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Primary Categories */}
      <section className="space-y-6">
        <div className="border-b border-[#E5E7EB] pb-3">
          <h2 className="text-xl font-bold text-[#111827]">
            Core Technical Curriculums
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 sm:p-7 rounded-3xl border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#D1D5DB] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-center">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                    {cat.topicCount} Topics
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#111827] mb-2">
                  {cat.name}
                </h3>

                <p className="text-sm text-[#667085] leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Sub-groups preview */}
                <div className="space-y-3 pt-3 border-t border-[#F3F4F6]">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#667085]">
                    Sections &amp; Modules:
                  </div>
                  <ul className="space-y-2 text-xs">
                    {cat.groups.slice(0, 5).map((group) => (
                      <li key={group.name} className="flex items-center justify-between text-[#4B5563]">
                        <span className="font-medium text-[#111827]">{group.name}</span>
                        <span className="text-[#9CA3AF] font-mono">{group.topics.length} topics</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F3F4F6]">
                <Link
                  to={`/learn/${cat.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#4F46E5] hover:bg-[#4338CA] text-white inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore {cat.name} Modules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Future Categories */}
      <section className="space-y-6 pt-6">
        <div className="border-b border-[#E5E7EB] pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#111827]">
            Expanding Soon
          </h2>
          <span className="text-xs text-[#667085] font-mono">In Active Architecture</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {upcomingCategories.map((item) => (
            <div
              key={item.name}
              className="p-5 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F7F8FA]/60"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center">
                  {getCategoryIcon(item.iconName)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">{item.name}</h4>
                  <span className="text-[10px] font-mono text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.2 rounded-sm">
                    {item.status}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#667085] mt-2">
                Planned topics: {item.topics}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
