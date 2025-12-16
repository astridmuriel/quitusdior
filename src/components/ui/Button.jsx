import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    const variants = {
        primary: 'bg-gradient-to-r from-gold-500 to-gold-600 text-midnight-900 hover:from-gold-400 hover:to-gold-500 shadow-lg shadow-gold-500/20',
        secondary: 'bg-midnight-700 text-white border border-white/10 hover:bg-midnight-600',
        outline: 'bg-transparent border border-gold-500/50 text-gold-400 hover:bg-gold-500/10',
        ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5',
    };

    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
    };

    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export { Button };
