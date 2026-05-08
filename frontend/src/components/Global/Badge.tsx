import * as React from 'react';
import { cn } from '@/utils/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2',
        {
          'border-transparent bg-[#e8f0fe] text-[#1a73e8] hover:bg-[#d2e3fc]': variant === 'default',
          'border-transparent bg-[#f1f3f4] text-[#3c4043] hover:bg-[#e8eaed]': variant === 'secondary',
          'border-[#dadce0] text-[#5f6368] bg-white hover:bg-[#f8f9fa]': variant === 'outline',
          'border-transparent bg-[#fce8e6] text-[#d93025] hover:bg-[#fbd7d4]': variant === 'destructive',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };