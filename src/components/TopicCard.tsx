import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { DifficultyBadge, StatusBadge } from './DifficultyBadge';
import { DifficultyLevel, ContentStatus } from '../types';

interface TopicCardProps {
  title: string;
  slug: string;
  categorySlug: string;
  categoryName?: string;
  difficulty: DifficultyLevel;
  readTime: string;
  summary?: string;
  status?: ContentStatus;
}

export function TopicCard({
  title,
  slug,
  categorySlug,
  categoryName,
  difficulty,
  readTime,
  summary,
  status = 'Available'
}: TopicCardProps) {
  return (
    <div
      id={`topic-card-${slug}`}
      className="group flex flex-col justify-between p-5 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#D1D5DB] hover:shadow-xs transition-all"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <DifficultyBadge level={difficulty} />
            {status !== 'Available' && <StatusBadge status={status} />}
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-[#667085]">
            <Clock className="w-3.5 h-3.5" />
            <span>{readTime}</span>
          </span>
        </div>

        {categoryName && (
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#667085] mb-1">
            {categoryName}
          </div>
        )}

        <h3 className="text-base font-semibold text-[#111827] group-hover:text-[#4F46E5] transition-colors leading-snug">
          <Link to={`/learn/${categorySlug}/${slug}`} className="focus:outline-hidden">
            {title}
          </Link>
        </h3>

        {summary && (
          <p className="mt-2 text-xs text-[#667085] leading-relaxed line-clamp-2">
            {summary}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
        <span className="text-xs font-medium text-[#667085]">Full Guide</span>
        <Link
          to={`/learn/${categorySlug}/${slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#4F46E5] group-hover:translate-x-0.5 transition-transform"
          aria-label={`Read ${title}`}
        >
          <span>Start Reading</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
