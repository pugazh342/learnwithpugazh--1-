import {  useState, useEffect, useRef  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Wrench, FolderGit2, Map, ArrowRight } from 'lucide-react';
import { searchContent } from '../data/search';
import { SearchResultItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      return;
    }
    const res = searchContent(val);
    setResults(res);
  };

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Topic':
        return <BookOpen className="w-4 h-4 text-[#4F46E5]" />;
      case 'Lab':
        return <Wrench className="w-4 h-4 text-[#16A34A]" />;
      case 'Project':
        return <FolderGit2 className="w-4 h-4 text-[#D97706]" />;
      case 'Roadmap':
      default:
        return <Map className="w-4 h-4 text-[#2563EB]" />;
    }
  };

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#111827]/40 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E5E7EB] gap-3">
          <Search className="w-5 h-5 text-[#9CA3AF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search topics, protocols, labs, projects, roadmaps... (e.g. DNS, VLAN, OSPF, React)"
            className="w-full text-base bg-transparent text-[#111827] placeholder:text-[#9CA3AF] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              type="button"
              className="p-1 rounded-md text-[#9CA3AF] hover:text-[#111827]"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-xs font-mono text-[#9CA3AF] bg-[#F3F4F6] px-2 py-0.5 rounded-md border border-[#E5E7EB]">
            ESC
          </span>
        </div>

        {/* Quick Suggestion Pills when query empty */}
        {!query && (
          <div className="p-5 text-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-[#667085] mb-2.5">
              Popular Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {['DNS', 'VLAN', 'OSPF', 'Subnetting', 'Router-on-a-Stick', 'React', 'TypeScript', 'SSH Hardening', 'Linux Permissions'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSearch(term)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-[#F7F8FA] hover:bg-[#EEF2FF] hover:border-[#4F46E5]/40 text-[#4B5563] hover:text-[#4F46E5] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[#F3F4F6]">
            {results.length === 0 ? (
              <div className="py-12 text-center text-sm text-[#667085]">
                <p className="font-medium text-[#111827]">No results found for "{query}"</p>
                <p className="mt-1 text-xs">Try searching for keywords like "DNS", "VLAN", "Linux", "Lab", or "React".</p>
              </div>
            ) : (
              results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.url)}
                  className="w-full text-left p-3 rounded-xl hover:bg-[#F7F8FA] transition-colors flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 p-2 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-[#667085] uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.2 rounded-full border bg-[#F3F4F6] text-[#4B5563]">
                          {item.type}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono text-[#667085]">
                            • {item.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-[#111827] group-hover:text-[#4F46E5] transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#667085] line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                </button>
              ))
            )}
          </div>
        )}

        {/* Footer Bar */}
        <div className="px-4 py-2.5 bg-[#F7F8FA] border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#667085]">
          <span>Tip: Press ESC to exit</span>
          <span>Instant Content Search</span>
        </div>
      </div>
    </div>
  );
}
