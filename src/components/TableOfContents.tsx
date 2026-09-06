import { useState, useEffect, MouseEvent } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface TOCItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');
  const [mobileExpanded, setMobileExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (e: MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
      setMobileExpanded(false);
    }
  };

  return (
    <>
      {/* Mobile Collapsible TOC */}
      <div className="lg:hidden mb-6 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] overflow-hidden">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-sm text-[#111827]"
          aria-expanded={mobileExpanded}
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-[#4F46E5]" />
            <span>Table of Contents ({items.length} sections)</span>
          </div>
          {mobileExpanded ? (
            <ChevronUp className="w-4 h-4 text-[#667085]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#667085]" />
          )}
        </button>

        {mobileExpanded && (
          <nav className="px-4 pb-3 pt-1 border-t border-[#E5E7EB] flex flex-col space-y-1.5 text-sm">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`py-1 px-2 rounded-md transition-colors ${
                  activeId === item.id
                    ? 'bg-[#EEF2FF] text-[#4F46E5] font-medium'
                    : 'text-[#667085] hover:text-[#111827]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <aside className="hidden lg:block sticky top-24 w-64 shrink-0 text-sm">
        <div className="p-4 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-2xs">
          <div className="flex items-center gap-2 font-semibold text-xs tracking-wider uppercase text-[#111827] mb-3 pb-2 border-b border-[#F3F4F6]">
            <List className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>On This Page</span>
          </div>
          <nav className="flex flex-col space-y-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`block py-1.5 px-2.5 rounded-lg text-xs leading-snug transition-colors truncate ${
                  activeId === item.id
                    ? 'bg-[#EEF2FF] text-[#4F46E5] font-semibold border-l-2 border-[#4F46E5]'
                    : 'text-[#667085] hover:text-[#111827] hover:bg-[#F7F8FA]'
                }`}
                title={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
