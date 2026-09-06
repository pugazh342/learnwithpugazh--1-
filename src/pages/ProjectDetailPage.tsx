import {  useState, useEffect  } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, CheckCircle2, AlertCircle, Lightbulb, Code2, ArrowRight } from 'lucide-react';
import { getProjectBySlug } from '../data/projects';
import { fetchProjectBySlug } from '../services/firestoreData';
import { Project } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { CodeBlock } from '../components/CodeBlock';
import { InstagramCard } from '../components/InstagramCard';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function ProjectDetailPage() {
  const { project: projectSlug, slug } = useParams<{ project?: string; slug?: string }>();
  const activeSlug = projectSlug || slug;

  const [project, setProject] = useState<Project | undefined>(() =>
    activeSlug ? getProjectBySlug(activeSlug) : undefined
  );

  useEffect(() => {
    if (!activeSlug) return;
    let isMounted = true;
    fetchProjectBySlug(activeSlug).then((p) => {
      if (isMounted && p) {
        setProject(p);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [activeSlug]);

  useHeadMetadata({
    title: project ? `${project.title} — Technical Case Study` : 'Project Case Study',
    description: project ? `${project.description || project.problem} Architecture breakdown, key technical decisions, and implementation details.` : 'Project case study not found.',
    type: 'article',
    keywords: project ? [project.title, ...(project.technologies || []), 'case study'] : undefined,
    author: 'Pugazhmani K',
  });

  if (!activeSlug) return <Navigate to="/projects" replace />;

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#111827]">Project Not Found</h1>
        <p className="text-sm text-[#667085]">No case study found matching "{activeSlug}".</p>
        <Link to="/projects" className="text-sm font-semibold text-[#4F46E5] inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Projects</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb
        items={[
          { label: 'Projects', url: '/projects' },
          { label: project.title }
        ]}
      />

      {/* Header */}
      <header className="space-y-4 pb-8 border-b border-[#E5E7EB]">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-mono uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-md font-semibold">
            {project.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium border bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]">
            {project.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* Technologies and External Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono bg-[#F7F8FA] text-[#4B5563] border border-[#E5E7EB] px-2.5 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] hover:bg-[#F7F8FA] text-[#111827] border border-[#E5E7EB] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View Source</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Problem vs Idea */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-[#DC2626] font-mono text-xs uppercase tracking-wider font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>The Problem Statement</span>
          </div>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-[#16A34A] font-mono text-xs uppercase tracking-wider font-bold">
            <Lightbulb className="w-4 h-4" />
            <span>The Engineering Approach</span>
          </div>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            {project.approach || project.idea}
          </p>
        </div>
      </div>

      {/* Architecture Highlights */}
      {project.architecturePoints && project.architecturePoints.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-xl font-bold text-[#111827]">
              System Architecture &amp; Key Design Decisions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.architecturePoints.map((point, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] flex items-start gap-3.5"
              >
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4F46E5] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Implementation Highlights & Code Snippets */}
      {project.implementationHighlights && project.implementationHighlights.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#4F46E5]" />
              <span>Implementation Highlights</span>
            </h2>
          </div>

          <div className="space-y-6">
            {project.implementationHighlights.map((hl, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-2xs space-y-3"
              >
                <h3 className="text-base font-bold text-[#111827]">
                  {hl.title}
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  {hl.description}
                </p>
                {hl.codeSnippet && (
                  <div className="mt-4">
                    <CodeBlock
                      code={hl.codeSnippet.code}
                      language={hl.codeSnippet.language}
                      caption={hl.codeSnippet.caption || hl.title}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      {project.challenges && project.challenges.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-xl font-bold text-[#111827]">
              Engineering Obstacles &amp; Resolutions
            </h2>
          </div>

          <div className="space-y-3">
            {project.challenges.map((c, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-2 text-xs"
              >
                <div className="font-bold text-[#111827] text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                  <span>Challenge: {c.challenge}</span>
                </div>
                <div className="pl-4 border-l-2 border-[#16A34A] text-[#4B5563] text-xs sm:text-sm mt-2">
                  <strong className="text-[#16A34A]">How it was solved:</strong> {c.howSolved}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Measurable Results */}
      {project.results && project.results.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 text-zinc-900 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Production Metrics
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Measurable Outcomes
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-600 pt-2">
            {project.results.map((res, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Key Learnings */}
      {project.learnings && project.learnings.length > 0 && (
        <section className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] space-y-3">
          <h3 className="text-base font-bold text-[#111827]">
            Engineering Takeaways
          </h3>
          <ul className="space-y-2 text-xs text-[#4B5563]">
            {project.learnings.map((l, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#4F46E5] font-bold">•</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Instagram Guides */}
      {project.instagramPosts && project.instagramPosts.length > 0 && (
        <div className="max-w-md">
          {project.instagramPosts.map((post, idx) => (
            <InstagramCard
              key={idx}
              title={post.title}
              postUrl={post.postUrl}
            />
          ))}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-between">
        <Link
          to="/projects"
          className="text-xs font-semibold text-[#667085] hover:text-[#111827] inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Engineering Projects</span>
        </Link>

        {project.relatedLabs && project.relatedLabs.length > 0 && (
          <Link
            to={`/labs/${project.relatedLabs[0].slug}`}
            className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Try Related Lab: {project.relatedLabs[0].title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
