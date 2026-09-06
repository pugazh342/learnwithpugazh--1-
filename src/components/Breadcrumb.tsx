import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs text-[#667085] flex-wrap gap-1.5">
      <Link
        to="/"
        className="inline-flex items-center gap-1 hover:text-[#111827] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-[#D1D5DB] shrink-0" />
          {item.url ? (
            <Link
              to={item.url}
              className="hover:text-[#111827] transition-colors capitalize"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#111827] font-medium truncate max-w-xs md:max-w-md">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
