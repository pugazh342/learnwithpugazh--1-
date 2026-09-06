import { Link } from 'react-router-dom';
import { Instagram, ArrowUpRight, BookOpen } from 'lucide-react';

interface InstagramCardProps {
  title?: string;
  caption?: string;
  postUrl?: string;
  topicTitle?: string;
  topicSlug?: string;
  labSlug?: string;
  category?: string;
  reach?: string;
  duration?: string;
  deepDiveTime?: string;
  variant?: 'compact' | 'featured';
}

export function InstagramCard({
  title = 'Bite-Sized Technical Concepts',
  caption = 'Short-form visual breakdowns of complex networking, Linux systems, and web architecture on Instagram.',
  postUrl = 'https://instagram.com/learnwithpugazh',
  topicTitle,
  topicSlug,
  labSlug,
  category,
  reach = '50K+',
  duration = '60s Reel',
  deepDiveTime = '15 min read',
  variant = 'compact'
}: InstagramCardProps) {
  const targetDeepDiveUrl = topicSlug 
    ? `/learn/${category?.toLowerCase() || 'networking'}/${topicSlug}` 
    : labSlug 
    ? `/labs/${labSlug}` 
    : null;

  return (
    <div
      id={`instagram-card-${topicTitle ? topicTitle.toLowerCase().replace(/\s+/g, '-') : 'general'}`}
      className={`group relative rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-lg hover:shadow-indigo-500/5 flex flex-col justify-between ${
        variant === 'featured' ? 'p-6' : 'p-5'
      }`}
    >
      <div>
        {/* Top bar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1 font-mono">
                <span>@learnwithpugazh</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <div className="text-[11px] text-slate-500">
                {reach} Views &bull; {duration}
              </div>
            </div>
          </div>

          <span className="text-[10px] font-mono font-semibold bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full border border-rose-200">
            Instagram Reel
          </span>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
            {title}
          </h4>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {caption}
          </p>
        </div>
      </div>

      {/* Footer / Dual Links: Instagram Watch + Full Deep Dive */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
        >
          <Instagram className="w-3.5 h-3.5" />
          <span>Watch Reel</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>

        {targetDeepDiveUrl ? (
          <Link
            to={targetDeepDiveUrl}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-100 transition-colors shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Full Deep Dive ({deepDiveTime})</span>
          </Link>
        ) : (
          <span className="text-[11px] text-slate-400 font-mono">
            {deepDiveTime} guide
          </span>
        )}
      </div>
    </div>
  );
}
