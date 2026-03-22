import * as React from 'react';
import { cn } from '@/utils/utils';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex h-11 w-full items-center justify-between rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-sm text-[#202124] transition-shadow hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent disabled:cursor-not-allowed disabled:bg-[#f8f9fa] disabled:opacity-50 appearance-none',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Select.displayName = 'Select';

export { Select };