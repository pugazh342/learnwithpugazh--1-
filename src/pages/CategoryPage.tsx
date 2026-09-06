import {  useState  } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Search, Map, ArrowRight, Wrench } from 'lucide-react';
import { getCategoryBySlug } from '../data/categories';
import { getLabsByCategory } from '../data/labs';
import { Breadcrumb } from '../components/Breadcrumb';
import { TopicCard } from '../components/TopicCard';
import { LabCard } from '../components/LabCard';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function CategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>();
  const [query, setQuery] = useState('');

  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  useHeadMetadata({
    title: category ? `${category.name} Curriculum & Deep Dives` : 'Curriculum Category',
    description: category ? `${category.description} Structured modules and practical engineering labs.` : 'Curriculum category not found.',
    type: 'website',
    keywords: category ? [category.name, 'curriculum', 'computer systems', 'engineering'] : undefined,
  });

  if (!categorySlug) return <Navigate to="/learn" replace />;
  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#111827]">Category Not Found</h1>
        <p className="text-sm text-[#667085]">The curriculum category "{categorySlug}" does not exist.</p>
        <Link to="/learn" className="text-sm font-semibold text-[#4F46E5] inline-flex items-center gap-1">
          <span>Return to all curriculums</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const relatedLabs = getLabsByCategory(category.name);

  // Filter topics based on local category query
  const filteredGroups = category.groups.map(group => ({
    ...group,
    topics: group.topics.filter(t =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      (t.summary && t.summary.toLowerCase().includes(query.toLowerCase())) ||
      group.name.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(group => group.topics.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb
        items={[
          { label: 'Learn', url: '/learn' },
          { label: category.name }
        ]}
      />

      {/* Category Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4F46E5] font-semibold">
            <span>Curriculum Track</span>
            <span>•</span>
            <span>{category.topicCount} Topics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            {category.name}
          </h1>
          <p className="text-base text-[#667085] leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {category.roadmapSlug && (
            <Link
              to={`/roadmaps/${category.roadmapSlug}`}
              className="px-4 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold inline-flex items-center gap-2 shadow-2xs transition-colors"
            >
              <Map className="w-4 h-4" />
              <span>View {category.name} Roadmap</span>
            </Link>
          )}
        </div>
      </div>

      {/* Search within category */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Filter ${category.name} topics...`}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-hidden focus:ring-2 focus:ring-[#4F46E5]"
        />
      </div>

      {/* Grouped Topics */}
      <div className="space-y-10">
        {filteredGroups.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] text-sm text-[#667085]">
            No topics matched "{query}".
          </div>
        ) : (
          filteredGroups.map((group) => (
            <section key={group.name} className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-2">
                <h3 className="text-lg font-bold text-[#111827] tracking-tight">
                  {group.name}
                </h3>
                <span className="text-xs font-mono text-[#667085]">
                  {group.topics.length} {group.topics.length === 1 ? 'topic' : 'topics'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.topics.map((topic) => (
                  <TopicCard
                    key={topic.slug}
                    title={topic.title}
                    slug={topic.slug}
                    categorySlug={category.slug}
                    categoryName={category.name}
                    difficulty={topic.difficulty}
                    readTime={topic.readTime}
                    summary={topic.summary}
                    status={topic.status}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* Related Labs inside category */}
      {relatedLabs.length > 0 && (
        <section className="pt-10 border-t border-[#E5E7EB] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#F0FDF4] text-[#16A34A]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111827]">
                  Related Practical Labs
                </h2>
                <p className="text-xs text-[#667085]">
                  Test your understanding of {category.name} in packet tracer and system terminals.
                </p>
              </div>
            </div>
            <Link
              to="/labs"
              className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] inline-flex items-center gap-1"
            >
              <span>All Labs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedLabs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
