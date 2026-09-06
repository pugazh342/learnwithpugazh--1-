import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Instagram, Mail, Sparkles, FolderGit2 } from 'lucide-react';
import { projects } from '../data/projects';

export function PortfolioShowcase() {
  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
            <span>ENGINEERING PORTFOLIO &amp; LABS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Built by <span className="text-gradient-3d-graphite">Pugazhmani K</span>
          </h2>
          <p className="text-sm text-zinc-600 mt-1 max-w-2xl">
            Systems &amp; Network Engineer, Open-Source Builder, and Content Creator teaching 10K+ followers how computer systems operate at machine level.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/about"
            className="btn-3d-white px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
          >
            <span>Full Bio &amp; Story</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
          <Link
            to="/projects"
            className="btn-3d-primary px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
          >
            <span>All Projects</span>
            <FolderGit2 className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Creator & Engineer Profile Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl card-3d flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <img
                src="/profile/profile.jpg"
                alt="Pugazhmani K"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-zinc-200 shadow-2xs"
              />
              <div>
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <span>Pugazhmani K</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 inline-block" title="Available for consulting &amp; collaborations"></span>
                </h3>
                <p className="text-xs text-zinc-600 font-mono font-bold">
                  @learnwithpugazh
                </p>
                <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                  Network &amp; Systems Engineer &bull; Technical Educator
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed">
              Bridging the gap between conceptual theory and production engineering. I create visual packet breakdowns on Instagram and build production architectures across networking, Linux kernels, and distributed systems.
            </p>

            {/* Quick 3D Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-center shadow-2xs">
              <div className="bg-white py-2 rounded-xl border border-zinc-200/80 shadow-2xs">
                <div className="text-lg font-black text-zinc-900 font-mono">10K+</div>
                <div className="text-[10px] text-zinc-500 uppercase font-mono font-semibold">Followers</div>
              </div>
              <div className="bg-white py-2 rounded-xl border border-zinc-200/80 shadow-2xs">
                <div className="text-lg font-black text-zinc-900 font-mono">60+</div>
                <div className="text-[10px] text-zinc-500 uppercase font-mono font-semibold">Guides</div>
              </div>
              <div className="bg-white py-2 rounded-xl border border-zinc-200/80 shadow-2xs">
                <div className="text-lg font-black text-zinc-900 font-mono">15+</div>
                <div className="text-[10px] text-zinc-500 uppercase font-mono font-semibold">Labs</div>
              </div>
            </div>

            {/* Competency tags */}
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                Core Engineering Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Cisco IOS', 'Linux Sockets', 'Wireshark', 'Docker', 'BGP / OSPF', 'TypeScript', 'Packet Tracer'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200 shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com/learnwithpugazh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 shadow-2xs hover:scale-105 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/learnwithpugazh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 shadow-2xs hover:scale-105 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/pugazh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 shadow-2xs hover:scale-105 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@learnwithpugazh.dev"
                aria-label="Contact Email"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 shadow-2xs hover:scale-105 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <Link
              to="/about#contact"
              className="text-xs font-bold text-zinc-900 hover:underline flex items-center gap-1"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3 h-3 text-zinc-500" />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Systems Terminal & Featured Case Studies */}
        <div className="lg:col-span-7 space-y-6">
          {/* Simulated Engineer Terminal */}
          <div className="rounded-3xl border border-zinc-300 bg-white text-zinc-700 p-5 font-mono text-xs shadow-[0_8px_20px_-4px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,1)]">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                <span className="text-[11px] text-zinc-500 ml-2">pugazh@workstation: ~/production-systems</span>
              </div>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm font-semibold">
                STATUS: ALL NODES ONLINE
              </span>
            </div>

            <div className="pt-3 space-y-2 text-zinc-600">
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="text-zinc-400">$</span>
                <span>curl -s https://api.learnwithpugazh.dev/v1/health</span>
              </div>
              <div className="text-zinc-500 pl-4 leading-relaxed">
                {'{\n  "creator": "Pugazhmani K",\n  "status": "Teaching & Building",\n  "current_focus": ["eBPF telemetry", "802.1Q subinterface routing", "Distributed Consensus"],\n  "followers": "10,000+ passionate engineers"\n}'}
              </div>

              <div className="flex items-center gap-2 text-zinc-500 pt-1">
                <span className="text-zinc-400">$</span>
                <span>netstat -tlpn | grep -E "BGP|DNS|HTTPS"</span>
              </div>
              <div className="text-zinc-600 pl-4 font-mono text-[11px]">
                tcp 0 0 0.0.0.0:179 LISTEN (BGP-Speaker) | udp 0.0.0.0:53 (Bind9-Master)
              </div>
            </div>
          </div>

          {/* Featured Production Case Studies */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
              Selected Architecture Case Studies
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 2).map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="card-3d group p-5 rounded-3xl flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-800 bg-zinc-100 px-2.5 py-0.5 rounded-md border border-zinc-200">
                        {project.category}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {project.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1">
                      {project.title}
                    </h4>

                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-900">
                    <span>Inspect Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
