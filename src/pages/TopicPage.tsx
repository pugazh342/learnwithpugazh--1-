import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, ArrowRight, Wrench, ChevronRight } from 'lucide-react';
import { getTopicBySlug } from '../data/topics';
import { getCategoryBySlug } from '../data/categories';
import { Breadcrumb } from '../components/Breadcrumb';
import { DifficultyBadge, StatusBadge } from '../components/DifficultyBadge';
import { TableOfContents } from '../components/TableOfContents';
import { CodeBlock, Callout } from '../components/CodeBlock';
import { TechnicalDiagram } from '../components/TechnicalDiagram';
import { InstagramCard } from '../components/InstagramCard';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function TopicPage() {
  const { category: categorySlug, topic: topicSlug } = useParams<{ category: string; topic: string }>();

  const topic = categorySlug && topicSlug ? getTopicBySlug(categorySlug, topicSlug) : undefined;
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  useHeadMetadata({
    title: topic ? `${topic.title} — ${category ? category.name : 'Engineering Guide'}` : 'Engineering Deep Dive',
    description: topic ? (topic.description || topic.practicalSummary || 'Comprehensive systems engineering deep dive.') : 'Comprehensive systems engineering deep dive by Pugazhmani K.',
    type: 'article',
    keywords: topic ? [topic.title, category?.name || 'Systems', ...(topic.prerequisites || [])] : undefined,
    author: 'Pugazhmani K',
  });

  if (!categorySlug || !topicSlug) {
    return <Navigate to="/learn" replace />;
  }

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#111827]">Topic In Active Development</h1>
        <p className="text-sm text-[#667085]">
          The detailed guide for <span className="font-mono text-[#111827]">{topicSlug}</span> is currently being finalized in the curriculum roadmap.
        </p>
        <div className="pt-2">
          <Link
            to={`/learn/${categorySlug}`}
            className="text-sm font-semibold text-[#4F46E5] inline-flex items-center gap-1.5"
          >
            <span>Back to {category ? category.name : 'Category'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const tocItems = (topic.tableOfContents || []).map((item) => ({
    id: `section-${item.id}`,
    label: item.label,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Learn', url: '/learn' },
          { label: topic.category, url: `/learn/${topic.categorySlug}` },
          { label: topic.title }
        ]}
      />

      {/* Main Header */}
      <header className="pb-8 mb-8 border-b border-[#E5E7EB] space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono uppercase tracking-wider text-[#667085] bg-[#F7F8FA] px-2.5 py-1 rounded-md border border-[#E5E7EB]">
            {topic.groupName}
          </span>
          <DifficultyBadge level={topic.difficulty} />
          {topic.status !== 'Available' && <StatusBadge status={topic.status} />}
          <span className="inline-flex items-center gap-1 text-xs text-[#667085] ml-2">
            <Clock className="w-3.5 h-3.5" />
            <span>{topic.estimatedTime || topic.readTime || '10 min read'}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.12]">
          {topic.title}
        </h1>

        <p className="text-lg text-[#667085] max-w-3xl leading-relaxed">
          {topic.description}
        </p>

        {topic.prerequisites && topic.prerequisites.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-[#667085]">
            <span className="font-semibold text-[#111827]">Prerequisites:</span>
            {topic.prerequisites.map((req, i) => (
              <span key={i} className="font-mono bg-[#F7F8FA] border border-[#E5E7EB] px-2 py-0.5 rounded-md text-[#4B5563]">
                {req}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content Layout: Sticky TOC + Main Technical Prose */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Table of Contents sidebar */}
        <TableOfContents items={tocItems} />

        {/* Technical Article Body */}
        <main className="flex-1 min-w-0 space-y-12 leading-relaxed text-[#111827]">
          {topic.sections && topic.sections.length > 0 ? (
            topic.sections.map((section, index) => (
              <section
                key={section.id}
                id={`section-${section.id}`}
                className="scroll-mt-28 space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-md">
                    0{index + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-[#111827]">
                    {section.title}
                  </h2>
                </div>

                <div className="prose prose-neutral max-w-none text-base text-[#374151] space-y-3 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>

                {section.diagramType && (
                  <div className="my-6">
                    <TechnicalDiagram type={section.diagramType} />
                  </div>
                )}

                {section.codeBlock && (
                  <div className="my-4">
                    <CodeBlock
                      code={section.codeBlock.code}
                      language={section.codeBlock.language}
                      caption={section.codeBlock.caption}
                    />
                  </div>
                )}

                {section.callout && (
                  <div className="my-4">
                    <Callout
                      type={section.callout.type}
                      title={section.callout.title}
                      message={section.callout.message}
                    />
                  </div>
                )}

                {section.table && (
                  <div className="my-6 overflow-x-auto border border-[#E5E7EB] rounded-xl shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#F7F8FA] border-b border-[#E5E7EB] font-mono text-[#111827]">
                        <tr>
                          {section.table.headers.map((h, i) => (
                            <th key={i} className="px-4 py-2.5 font-bold uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E7EB] font-mono bg-[#FFFFFF]">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#F9FAFB]">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-2.5 text-[#374151]">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))
          ) : null}

          {/* 08. CHALLENGE / SELF-TEST */}
          {topic.challenge && (
            <section id="section-challenge" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-md">
                  08
                </span>
                <h2 className="text-2xl font-bold text-[#111827]">
                  Knowledge Challenge &amp; Problem Scenario
                </h2>
              </div>

              <div className="p-6 rounded-2xl border border-[#4F46E5]/20 bg-[#EEF2FF]/30 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#4F46E5] font-bold">
                    Problem Scenario
                  </span>
                  <p className="text-base font-semibold text-[#111827]">
                    {topic.challenge.question}
                  </p>
                </div>

                {topic.challenge.hint && (
                  <div className="pt-2">
                    <Callout
                      type="note"
                      title="Engineering Hint"
                      message={topic.challenge.hint}
                    />
                  </div>
                )}

                {topic.challenge.answer && (
                  <div className="pt-2">
                    <Callout
                      type="tip"
                      title="Model Answer"
                      message={topic.challenge.answer}
                    />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 09. RELATED TOPICS & RESOURCES */}
          <section id="section-related" className="scroll-mt-28 space-y-6 pt-6 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-md">
                09
              </span>
              <h2 className="text-2xl font-bold text-[#111827]">
                Related Topics &amp; Practical Labs
              </h2>
            </div>

            {/* Link to Lab if available */}
            {(topic.labSlug || (topic.relatedLabs && topic.relatedLabs.length > 0)) && (
              <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#16A34A] font-semibold">
                  <Wrench className="w-4 h-4" />
                  <span>Hands-on Simulation Recommended</span>
                </div>
                <h3 className="text-lg font-bold text-[#111827]">
                  {topic.labTitle || (topic.relatedLabs && topic.relatedLabs[0]?.title) || 'Hands-on Lab'}
                </h3>
                <p className="text-xs sm:text-sm text-[#667085]">
                  {topic.practicalSummary || 'Practice configuring and testing this exact concept with real CLI commands in our interactive lab environment.'}
                </p>
                <div className="pt-2">
                  <Link
                    to={`/labs/${topic.labSlug || (topic.relatedLabs && topic.relatedLabs[0]?.slug)}`}
                    className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-2xs"
                  >
                    <span>Launch Interactive Lab</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Related Topics list */}
            {topic.relatedTopics && topic.relatedTopics.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#667085] font-semibold">
                  Explore Related Guides
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {topic.relatedTopics.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/learn/${rel.categorySlug}/${rel.slug}`}
                      className="p-4 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#4F46E5] hover:shadow-xs transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-1 min-w-0 pr-2">
                        <div className="text-xs font-bold text-[#111827] group-hover:text-[#4F46E5] transition-colors truncate">
                          {rel.title}
                        </div>
                        <div className="flex items-center gap-2">
                          <DifficultyBadge level={rel.difficulty} />
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#4F46E5] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Instagram visual card if present */}
            {topic.instagramPost && (
              <div className="pt-2 max-w-md">
                <InstagramCard
                  title={topic.instagramPost.title}
                  postUrl={topic.instagramPost.postUrl}
                  caption={topic.instagramPost.caption}
                />
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
