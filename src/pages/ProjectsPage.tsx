import {  useState, useMemo, useEffect  } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProjectCard } from '../components/ProjectCard';
import { projects as initialProjects } from '../data/projects';
import { fetchProjectsFromFirestore } from '../services/firestoreData';
import { Project } from '../types';
import { Search, FolderGit2, Filter } from 'lucide-react';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function ProjectsPage() {
  useHeadMetadata({
    title: 'Open Source Systems & Production Projects',
    description: 'Real-world engineering projects, open-source repositories, and technical case studies built by Pugazhmani K.',
    type: 'website',
    keywords: ['open source systems', 'fullstack portfolio', 'github projects', 'technical case studies'],
  });

  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    fetchProjectsFromFirestore().then((list) => {
      if (isMounted && list && list.length > 0) {
        setProjectList(list);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['All', 'Networking & Web', 'Networking & Systems', 'Web Development'];

  const filteredProjects = useMemo(() => {
    return projectList.filter((project) => {
      const matchCategory =
        selectedCategory === 'All' ||
        project.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q)) ||
        project.problem.toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [projectList, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Projects' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E7EB] bg-[#F7F8FA] text-xs font-mono text-[#D97706] font-semibold">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PRODUCTION CASE STUDIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          Real Engineering Projects
        </h1>
        <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
          Deep architectural case studies, network monitoring systems, raw packet analyzers, and production API gateways with full technical writeups.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="projects-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, tech (e.g. WebSocket, TypeScript, Redis)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl text-[#111827] placeholder:text-[#9CA3AF] focus:outline-hidden focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="text-xs font-mono text-[#667085] shrink-0">
            Showing <strong className="text-[#111827]">{filteredProjects.length}</strong> of{' '}
            {projectList.length} projects
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F3F4F6]">
          <span className="text-xs font-medium text-[#667085] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#9CA3AF]" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-[#F7F8FA] text-[#4B5563] hover:bg-[#EEF2FF] hover:text-[#4F46E5] border border-[#E5E7EB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F7F8FA] space-y-3">
          <p className="text-base font-semibold text-[#111827]">No projects match your query</p>
          <p className="text-sm text-[#667085]">
            Try adjusting keywords or selecting "All" categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-semibold text-[#4F46E5] hover:bg-[#EEF2FF] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
