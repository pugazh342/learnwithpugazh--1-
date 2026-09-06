import {  useState  } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { Instagram, Github, Linkedin, Mail, CheckCircle2, Send, Sparkles, Palette } from 'lucide-react';
import { LearnWithPugazhLogo } from '../components/LearnWithPugazhLogo';
import { useHeadMetadata } from '../hooks/useHeadMetadata';

export function AboutPage() {
  useHeadMetadata({
    title: 'About Pugazhmani K & LearnWithPugazh | Creator & Brand',
    description: 'Learn the story behind LearnWithPugazh, our core engineering pillars, creator background, and official brand identity system.',
    type: 'website',
    keywords: ['about pugazhmani k', 'learnwithpugazh', 'brand identity', 'engineering educator', 'bio'],
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: 'About' }]} />

      {/* Hero */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 bg-zinc-100 text-xs font-mono text-zinc-900 font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
          <span>THE MISSION &amp; MANIFESTO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
          Learn. Build. <span className="text-gradient-3d-graphite">Share.</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed">
          Demystifying systems engineering, computer networking, and fullstack software development from first principles.
        </p>
      </div>

      {/* Author & Origin Story */}
      <section className="p-8 sm:p-10 rounded-3xl card-3d space-y-6">
        <div className="flex items-center gap-4">
          <LearnWithPugazhLogo size="xl" showText={false} withContainer={true} />
          <div>
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <span>Pugazhmani K</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 inline-block" title="Active creator & builder"></span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-mono font-bold">
              @learnwithpugazh &bull; Technical Educator &amp; Systems Engineer
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
          <p>
            Welcome to <strong>LearnWithPugazh</strong>. I started this initiative with a simple observation: modern software engineering education is saturated with high-level tutorials that tell you <em>which buttons to click</em> or <em>which libraries to copy-paste</em>, but rarely explain <strong>how things actually operate under the hood</strong>.
          </p>
          <p>
            When an API request fails, when an SSH connection drops, or when a network packet disappears into the void, a superficial understanding will leave you stranded. True engineering autonomy begins when you understand Ethernet frame encapsulation, IP routing tables, kernel process states, and cryptographic handshakes.
          </p>
          <p>
            My goal is to create the single most accessible, mathematically precise, and visually grounded technical resource for anyone aspiring to build and operate reliable computer systems.
          </p>
        </div>
      </section>

      {/* The 3 Core Pillars */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-900">
          The Three Operational Pillars
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl card-3d space-y-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 text-white font-mono font-bold flex items-center justify-center text-xs shadow-[0_4px_10px_rgba(0,0,0,0.25)] border border-zinc-700">
              01
            </div>
            <h4 className="text-base font-bold text-zinc-900 font-mono">LEARN DEEPLY</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Dissect RFC specifications, protocol headers, and algorithmic time complexity. Never settle for memorizing commands without knowing what the machine is executing.
            </p>
          </div>

          <div className="p-6 rounded-3xl card-3d space-y-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-zinc-700 to-zinc-900 text-white font-mono font-bold flex items-center justify-center text-xs shadow-[0_4px_10px_rgba(0,0,0,0.25)] border border-zinc-600">
              02
            </div>
            <h4 className="text-base font-bold text-zinc-900 font-mono">BUILD PRACTICALLY</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Theory without application is fragile. Every topic is complemented by real Packet Tracer topologies, Linux CLI labs, or TypeScript fullstack services.
            </p>
          </div>

          <div className="p-6 rounded-3xl card-3d space-y-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 text-white font-mono font-bold flex items-center justify-center text-xs shadow-[0_4px_10px_rgba(0,0,0,0.25)] border border-zinc-700">
              03
            </div>
            <h4 className="text-base font-bold text-zinc-900 font-mono">SHARE OPENLY</h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Distill complex engineering into bite-sized visual Instagram infographics and open source GitHub codebases for the global developer community.
            </p>
          </div>
        </div>
      </section>

      {/* Official Brand Identity Presentation */}
      <section className="p-8 sm:p-10 rounded-3xl card-3d space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-100 text-[11px] font-mono text-zinc-900 font-bold mb-1.5">
              <Palette className="w-3.5 h-3.5 text-zinc-600" />
              <span>BRAND IDENTITY V2.0</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
              Visual System &amp; Brand Marks
            </h3>
          </div>
          <div className="text-xs font-mono text-zinc-500 font-bold">
            A simple idea. A bigger impact.
          </div>
        </div>

        {/* Logo Applications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Light Icon */}
          <div className="p-5 rounded-2xl bg-[#EFECF8] border border-[#DDD6FE] flex flex-col items-center justify-center text-center gap-3">
            <LearnWithPugazhLogo size="lg" showText={false} variant="color" />
            <div>
              <div className="text-xs font-mono font-bold text-zinc-900">Light Icon</div>
              <div className="text-[10px] font-mono text-zinc-500">#EFECF8 Mist</div>
            </div>
          </div>

          {/* Dark Icon */}
          <div className="p-5 rounded-2xl bg-[#1F212E] border border-[#373A4F] flex flex-col items-center justify-center text-center gap-3">
            <LearnWithPugazhLogo size="lg" showText={false} variant="color" />
            <div>
              <div className="text-xs font-mono font-bold text-white">Dark Icon</div>
              <div className="text-[10px] font-mono text-zinc-400">#1F212E Navy</div>
            </div>
          </div>

          {/* Solid White Mark */}
          <div className="p-5 rounded-2xl bg-[#1F212E] border border-[#373A4F] flex flex-col items-center justify-center text-center gap-3">
            <LearnWithPugazhLogo size="lg" showText={false} variant="white" />
            <div>
              <div className="text-xs font-mono font-bold text-white">White Mark</div>
              <div className="text-[10px] font-mono text-zinc-400">Monochrome</div>
            </div>
          </div>

          {/* Solid Dark Mark */}
          <div className="p-5 rounded-2xl bg-[#EFECF8] border border-[#DDD6FE] flex flex-col items-center justify-center text-center gap-3">
            <LearnWithPugazhLogo size="lg" showText={false} variant="monochrome" />
            <div>
              <div className="text-xs font-mono font-bold text-zinc-900">Dark Mark</div>
              <div className="text-[10px] font-mono text-zinc-500">Monochrome</div>
            </div>
          </div>
        </div>

        {/* Palette Swatches */}
        <div className="pt-2">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-3">
            Official Color Palette
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-xl border border-zinc-200 bg-white space-y-2">
              <div className="h-7 rounded-lg bg-[#3D5AFA]"></div>
              <div>
                <div className="text-[11px] font-bold text-zinc-900">#3D5AFA</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase">Primary Sapphire</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-zinc-200 bg-white space-y-2">
              <div className="h-7 rounded-lg bg-[#511CC5]"></div>
              <div>
                <div className="text-[11px] font-bold text-zinc-900">#511CC5</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase">Deep Violet</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-zinc-200 bg-white space-y-2">
              <div className="h-7 rounded-lg bg-[#EFECF8] border border-zinc-200"></div>
              <div>
                <div className="text-[11px] font-bold text-zinc-900">#EFECF8</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase">Light Mist</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-zinc-200 bg-white space-y-2">
              <div className="h-7 rounded-lg bg-[#1F212E]"></div>
              <div>
                <div className="text-[11px] font-bold text-zinc-900">#1F212E</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase">Charcoal Navy</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-zinc-200 bg-white space-y-2">
              <div className="h-7 rounded-lg bg-[#7A6181]"></div>
              <div>
                <div className="text-[11px] font-bold text-zinc-900">#7A6181</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase">Slate Grey</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Channels */}
      <section className="p-8 sm:p-10 rounded-3xl card-3d bg-gradient-to-b from-white via-zinc-50 to-zinc-100 space-y-6 border-zinc-200">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold block mb-1">
            Get In Touch
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
            Connect &amp; Collaborate
          </h3>
          <p className="text-sm text-zinc-600 mt-1">
            Whether you want to suggest a new lab topic, report an erratum, or discuss engineering architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://instagram.com/learnwithpugazh"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-400 transition-all shadow-2xs hover:shadow-xs flex items-center gap-3.5 group hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white flex items-center justify-center transition-colors">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-500">Instagram</div>
              <div className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">@learnwithpugazh</div>
            </div>
          </a>

          <a
            href="https://github.com/learnwithpugazh"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-400 transition-all shadow-2xs hover:shadow-xs flex items-center gap-3.5 group hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white flex items-center justify-center transition-colors">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-500">GitHub</div>
              <div className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">learnwithpugazh</div>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/pugazh"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-400 transition-all shadow-2xs hover:shadow-xs flex items-center gap-3.5 group hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white flex items-center justify-center transition-colors">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-500">LinkedIn</div>
              <div className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">Pugazhmani K</div>
            </div>
          </a>

          <a
            href="mailto:contact@learnwithpugazh.dev"
            className="p-4 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-400 transition-all shadow-2xs hover:shadow-xs flex items-center gap-3.5 group hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white flex items-center justify-center transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-500">Email</div>
              <div className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">kpugazhmani21@gmail.com</div>
            </div>
          </a>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="p-8 sm:p-10 rounded-3xl card-3d space-y-6">
        <h3 className="text-xl font-bold text-zinc-900">
          Send a Direct Message
        </h3>

        {formSubmitted ? (
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-zinc-900">Message Received!</h4>
            <p className="text-xs text-zinc-600">
              Thank you for reaching out, {formData.name}. Pugazh will respond shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Chen"
                  className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your thoughts, suggestions, or collaboration inquiries..."
                className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 focus:bg-white transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-3d-primary px-6 py-2.5 rounded-xl text-sm font-bold inline-flex items-center gap-2"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
