import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';

  const variants = {
    primary: 'bg-gradient-to-r from-cyan-electric via-matrix-green to-cyan-electric text-navy hover:scale-105 hover:shadow-2xl hover:shadow-cyan-electric/50 shadow-lg bg-[length:200%_auto] hover:bg-right-bottom',
    secondary: 'bg-gradient-to-r from-matrix-green via-cyan-electric to-matrix-green text-white hover:scale-105 hover:shadow-2xl hover:shadow-matrix-green/50 shadow-lg bg-[length:200%_auto] hover:bg-right-bottom',
    ghost: 'bg-transparent border-2 border-cyan-electric text-cyan-electric hover:bg-gradient-to-r hover:from-cyan-electric hover:to-matrix-green hover:text-navy hover:border-transparent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
