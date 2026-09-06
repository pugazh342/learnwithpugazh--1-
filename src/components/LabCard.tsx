import { Link } from 'react-router-dom';
import { Clock, Wrench, ArrowRight } from 'lucide-react';
import { DifficultyBadge } from './DifficultyBadge';
import { Lab } from '../types';

export function LabCard({ lab }: { lab: Lab }) {
  return (
    <div
      id={`lab-card-${lab.slug}`}
      className="card-3d group flex flex-col justify-between p-6 rounded-3xl"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-lg shadow-2xs">
            {lab.labNumber}
          </span>
          <DifficultyBadge level={lab.difficulty} />
        </div>

        <div className="text-[11px] font-mono text-zinc-500 font-semibold uppercase tracking-wider mb-1">
          {lab.category}
        </div>

        <h3 className="text-lg font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors leading-snug">
          <Link to={`/labs/${lab.slug}`} className="focus:outline-hidden">
            {lab.title}
          </Link>
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-2">
          {lab.topologyDescription || lab.conceptExplanation}
        </p>

        <div className="mt-4 pt-3 border-t border-zinc-100 grid grid-cols-2 gap-2 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">{lab.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Wrench className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">{lab.tools[0] || 'CLI'}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 font-mono">CLI &amp; Topology</span>
        <Link
          to={`/labs/${lab.slug}`}
          className="btn-3d-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-900"
          aria-label={`Start ${lab.title}`}
        >
          <span>Open Guide</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
