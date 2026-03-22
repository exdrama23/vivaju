import * as React from 'react';
import { cn } from '@/utils/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border border-[#dadce0] bg-white px-4 py-2 text-sm text-[#202124] transition-shadow placeholder:text-[#5f6368] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:border-transparent disabled:cursor-not-allowed disabled:bg-[#f8f9fa] disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };