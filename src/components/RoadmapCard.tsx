import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Network, Globe, Terminal } from 'lucide-react';
import { Roadmap } from '../types';
import { DifficultyBadge } from './DifficultyBadge';

export function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Network':
        return <Network className="w-5 h-5 text-[#4F46E5]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#2563EB]" />;
      case 'Terminal':
      default:
        return <Terminal className="w-5 h-5 text-[#16A34A]" />;
    }
  };

  return (
    <div
      id={`roadmap-card-${roadmap.slug}`}
      className="group flex flex-col justify-between p-6 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#D1D5DB] hover:shadow-xs transition-all"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-center shrink-0">
            {getIcon(roadmap.iconName)}
          </div>
          <div className="flex items-center gap-2">
            <DifficultyBadge level={roadmap.difficulty} />
            <span className="inline-flex items-center gap-1 text-xs text-[#667085]">
              <Clock className="w-3.5 h-3.5" />
              <span>{roadmap.estimatedDuration}</span>
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#111827] group-hover:text-[#4F46E5] transition-colors leading-snug">
          <Link to={`/roadmaps/${roadmap.slug}`} className="focus:outline-hidden">
            {roadmap.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-[#667085] leading-relaxed">
          {roadmap.description}
        </p>

        {/* Stages preview pills */}
        <div className="mt-4 pt-3 border-t border-[#F3F4F6]">
          <div className="text-xs font-mono uppercase tracking-wider text-[#667085] mb-2">
            {roadmap.stages.length} Sequential Stages:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {roadmap.stages.map((stage, idx) => (
              <span
                key={stage.id}
                className="text-xs px-2 py-0.5 rounded-md bg-[#F7F8FA] text-[#4B5563] border border-[#E5E7EB]"
              >
                {idx + 1}. {stage.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
        <span className="text-xs font-medium text-[#667085]">Structured Curriculum</span>
        <Link
          to={`/roadmaps/${roadmap.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] group-hover:translate-x-0.5 transition-transform"
          aria-label={`Explore ${roadmap.title}`}
        >
          <span>View Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
