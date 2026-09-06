import {  useState  } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
}

export function CodeBlock({ code, language = 'bash', caption }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div id={`codeblock-${Math.abs(code.length)}`} className="my-4 rounded-xl border border-[#E5E7EB] bg-[#111827] text-[#F3F4F6] overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#374151] bg-[#1F2937]">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-mono text-[#9CA3AF]">
            {language}
          </span>
          {caption && (
            <span className="text-xs text-[#D1D5DB] border-l border-[#4B5563] pl-2 font-mono truncate max-w-xs md:max-w-md">
              {caption}
            </span>
          )}
        </div>
        <button
          id={`copy-btn-${language}`}
          onClick={handleCopy}
          type="button"
          aria-label={copied ? "Copied code" : "Copy code to clipboard"}
          className="inline-flex items-center gap-1.5 text-xs text-[#D1D5DB] hover:text-[#FFFFFF] bg-[#374151] hover:bg-[#4B5563] px-2.5 py-1 rounded-md transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#4F46E5]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
              <span className="text-[#4ADE80]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-[#F9FAFB] selection:bg-[#374151]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

interface CalloutProps {
  type: 'info' | 'tip' | 'warning' | 'note';
  title: string;
  message: string;
}

export function Callout({ type, title, message }: CalloutProps) {
  const configs = {
    info: {
      border: 'border-[#BFDBFE]',
      bg: 'bg-[#EFF6FF]',
      titleColor: 'text-[#1E40AF]',
      textColor: 'text-[#1E3A8A]'
    },
    tip: {
      border: 'border-[#BBF7D0]',
      bg: 'bg-[#F0FDF4]',
      titleColor: 'text-[#166534]',
      textColor: 'text-[#14532D]'
    },
    warning: {
      border: 'border-[#FDE68A]',
      bg: 'bg-[#FFFBEB]',
      titleColor: 'text-[#92400E]',
      textColor: 'text-[#78350F]'
    },
    note: {
      border: 'border-[#E5E7EB]',
      bg: 'bg-[#F7F8FA]',
      titleColor: 'text-[#374151]',
      textColor: 'text-[#4B5563]'
    }
  };

  const c = configs[type];

  return (
    <div
      id={`callout-${type}`}
      className={`my-4 p-4 rounded-xl border ${c.border} ${c.bg} transition-all`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold ${c.titleColor} mb-1 tracking-tight`}>
            {title}
          </h4>
          <p className={`text-sm leading-relaxed ${c.textColor}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
