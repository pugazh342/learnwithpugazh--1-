import { Link } from 'react-router-dom';
import { Instagram, Github, Linkedin, Mail } from 'lucide-react';
import { LearnWithPugazhLogo } from './LearnWithPugazhLogo';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-900 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="inline-block hover:scale-[1.02] transition-transform">
              <LearnWithPugazhLogo size="md" showText={true} showTagline={true} />
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              A modern technical publication and hands-on learning platform for networking, systems, and fullstack engineering.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com/learnwithpugazh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 shadow-2xs hover:scale-105 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/learnwithpugazh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 shadow-2xs hover:scale-105 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/pugazh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 shadow-2xs hover:scale-105 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@learnwithpugazh.dev"
                aria-label="Contact Email"
                className="w-8 h-8 rounded-xl border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 shadow-2xs hover:scale-105 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Col */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-900 font-bold mb-4">
              Explore Tracks
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li>
                <Link to="/learn" className="hover:text-zinc-950 transition-colors">
                  Learn Topics
                </Link>
              </li>
              <li>
                <Link to="/roadmaps" className="hover:text-zinc-950 transition-colors">
                  Learning Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/labs" className="hover:text-zinc-950 transition-colors">
                  Practical Labs
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-zinc-950 transition-colors">
                  Open Source Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Col */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-900 font-bold mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li>
                <a
                  href="https://instagram.com/learnwithpugazh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <span className="text-xs text-zinc-500 font-mono">@learnwithpugazh</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/learnwithpugazh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 transition-colors"
                >
                  GitHub Repositories
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/pugazh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 transition-colors"
                >
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>

          {/* About Col */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-900 font-bold mb-4">
              Creator &amp; Bio
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li>
                <Link to="/about" className="hover:text-zinc-950 transition-colors">
                  About Pugazhmani K
                </Link>
              </li>
              <li>
                <Link to="/about#contact" className="hover:text-zinc-950 transition-colors">
                  Contact &amp; Collaboration
                </Link>
              </li>
              <li>
                <span className="text-xs text-zinc-400 block mt-4 font-mono font-bold">
                  LEARN &bull; BUILD &bull; SHARE
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} LearnWithPugazh &bull; Engineering with precision and depth.</p>
          <div className="flex items-center gap-6 font-mono text-xs">
            <span className="text-zinc-600 font-bold">v1.0.0 Production</span>
            <Link to="/about" className="hover:text-zinc-950 transition-colors font-sans">
              Bio &amp; Manifesto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
