import { Fragment, useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, ArrowRight, ArrowDown } from 'lucide-react';
import { getRoadmapBySlug } from '../data/roadmaps';
import { fetchRoadmapBySlug } from '../services/firestoreData';
import { Roadmap } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { DifficultyBadge, StatusBadge } from '../components/DifficultyBadge';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function RoadmapDetailPage() {
  const { roadmap: roadmapSlug } = useParams<{ roadmap: string }>();

  const [roadmap, setRoadmap] = useState<Roadmap | undefined>(() =>
    roadmapSlug ? getRoadmapBySlug(roadmapSlug) : undefined
  );

  useEffect(() => {
    if (!roadmapSlug) return;
    let isMounted = true;
    fetchRoadmapBySlug(roadmapSlug).then((r) => {
      if (isMounted && r) {
        setRoadmap(r);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [roadmapSlug]);

  useHeadMetadata({
    title: roadmap
      ? (roadmap.title.toLowerCase().endsWith('roadmap') ? roadmap.title : `${roadmap.title} Roadmap`)
      : 'Engineering Roadmap',
    description: roadmap ? `${roadmap.description} Step-by-step milestones, recommended tools, and practical benchmarks.` : 'Roadmap not found.',
    type: 'article',
    keywords: roadmap ? [roadmap.title, 'career roadmap', 'engineering path'] : undefined,
    author: 'Pugazhmani K',
  });

  if (!roadmapSlug) return <Navigate to="/roadmaps" replace />;

  if (!roadmap) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#111827]">Roadmap Not Found</h1>
        <p className="text-sm text-[#667085]">No roadmap found matching "{roadmapSlug}".</p>
        <Link to="/roadmaps" className="text-sm font-semibold text-[#4F46E5] inline-flex items-center gap-1">
          <span>View all available roadmaps</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb
        items={[
          { label: 'Roadmaps', url: '/roadmaps' },
          { label: roadmap.title }
        ]}
      />

      {/* Header */}
      <header className="pb-8 border-b border-[#E5E7EB] space-y-4">
        <div className="flex items-center gap-3 text-xs">
          <DifficultyBadge level={roadmap.difficulty} />
          <span className="inline-flex items-center gap-1 text-xs text-[#667085]">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated Duration: {roadmap.estimatedDuration}</span>
          </span>
          <span className="text-xs font-mono text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-md">
            {roadmap.stages.length} Sequential Stages
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          {roadmap.title}
        </h1>

        <p className="text-lg text-[#667085] leading-relaxed max-w-3xl">
          {roadmap.overview}
        </p>

        {/* Visual Pipeline Bar */}
        <div className="pt-4 overflow-x-auto pb-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono">
            {roadmap.stages.map((stage, idx) => (
              <Fragment key={stage.id}>
                <a
                  href={`#stage-${stage.number}`}
                  className="px-2.5 py-1 rounded-md bg-[#F7F8FA] border border-[#E5E7EB] hover:bg-[#EEF2FF] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors whitespace-nowrap text-[#4B5563]"
                >
                  {stage.number}. {stage.title}
                </a>
                {idx < roadmap.stages.length - 1 && (
                  <span className="text-[#9CA3AF]">→</span>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* Sequential Stages List */}
      <div className="space-y-10">
        {roadmap.stages.map((stage, index) => (
          <section
            key={stage.id}
            id={`stage-${stage.number}`}
            className="scroll-mt-24 relative p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-2xs space-y-6"
          >
            {/* Stage Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3F4F6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#4F46E5] text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  0{stage.number}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                    {stage.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
                    {stage.description}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#667085] self-start sm:self-center">
                {stage.topics.length} {stage.topics.length === 1 ? 'Module' : 'Modules'}
              </span>
            </div>

            {/* Stage Topics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stage.topics.map((t) => (
                <Link
                  key={t.slug}
                  to={`/learn/${t.categorySlug}/${t.slug}`}
                  className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] hover:bg-[#FFFFFF] hover:border-[#4F46E5] hover:shadow-xs transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <DifficultyBadge level={t.difficulty} size="sm" />
                      {t.status !== 'Available' && <StatusBadge status={t.status} />}
                    </div>
                    <h3 className="text-sm font-semibold text-[#111827] group-hover:text-[#4F46E5] transition-colors truncate">
                      {t.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-transform shrink-0 mt-1" />
                </Link>
              ))}
            </div>

            {/* Connector down to next stage */}
            {index < roadmap.stages.length - 1 && (
              <div className="hidden sm:flex justify-center -mb-12 pt-2">
                <div className="w-6 h-6 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] shadow-2xs">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
