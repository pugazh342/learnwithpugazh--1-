import { Link } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      id={`project-card-${project.slug}`}
      className="group flex flex-col justify-between p-6 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#D1D5DB] hover:shadow-xs transition-all"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-md font-semibold">
            {project.category}
          </span>
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]">
            {project.status}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#111827] group-hover:text-[#4F46E5] transition-colors leading-snug">
          <Link to={`/projects/${project.slug}`} className="focus:outline-hidden">
            {project.title}
          </Link>
        </h3>

        <p className="mt-2.5 text-sm text-[#667085] leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technologies tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech, idx) => (
            <span
              key={idx}
              className="text-xs font-mono bg-[#F7F8FA] text-[#4B5563] border border-[#E5E7EB] px-2 py-0.5 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-xs font-mono text-[#9CA3AF] self-center">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#667085] hover:text-[#111827] transition-colors"
              aria-label="View source code on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#667085] hover:text-[#111827] transition-colors"
              aria-label="View live deployment"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] group-hover:translate-x-0.5 transition-transform"
          aria-label={`Read case study for ${project.title}`}
        >
          <span>Read Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
