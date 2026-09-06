import { DifficultyLevel, ContentStatus } from '../types';

export function DifficultyBadge({ level, size = 'sm' }: { level: DifficultyLevel; size?: 'sm' | 'md' }) {
  const styles: Record<DifficultyLevel, string> = {
    Beginner: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    Intermediate: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    Advanced: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]'
  };

  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      id={`diff-badge-${level.toLowerCase()}`}
      className={`inline-flex items-center font-medium rounded-full border ${styles[level]} ${sizeClasses} whitespace-nowrap`}
    >
      {level}
    </span>
  );
}

export function StatusBadge({ status }: { status: ContentStatus }) {
  const styles: Record<ContentStatus, string> = {
    Available: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    'In Progress': 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]',
    'Coming Soon': 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]'
  };

  return (
    <span
      id={`status-badge-${status.toLowerCase().replace(/\s+/g, '-')}`}
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${styles[status]} whitespace-nowrap`}
    >
      {status}
    </span>
  );
}
