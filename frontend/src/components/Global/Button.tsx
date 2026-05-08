import * as React from 'react';
import { cn } from '@/utils/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[#1a73e8] text-white hover:bg-[#1765cc] hover:shadow-md': variant === 'default',
            'border border-[#dadce0] bg-white text-[#1a73e8] hover:bg-[#f8f9fa]': variant === 'outline',
            'text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]': variant === 'ghost',
            'text-[#1a73e8] underline-offset-4 hover:underline px-0': variant === 'link',
            'h-10 px-6 py-2': size === 'default',
            'h-8 px-4': size === 'sm',
            'h-12 px-8 text-base': size === 'lg',
            'h-10 w-10 p-2': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };