import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type BadgeVariant = 'mint' | 'peach' | 'yellow' | 'accent' | 'white' | 'dark';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  mint: 'bg-pastel-mint text-black',
  peach: 'bg-pastel-peach text-black',
  yellow: 'bg-pastel-yellow text-black',
  accent: 'bg-accent-yellow text-black',
  white: 'bg-white text-black',
  dark: 'bg-black text-white border-black',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'yellow',
  className,
  children,
  ...rest
}) => {
  const baseClasses =
    'px-3 py-1 text-xs font-bold font-display border-2 border-black tracking-wider rounded-none inline-flex items-center justify-center uppercase select-none';

  const combinedClassName = twMerge(clsx(baseClasses, variantClasses[variant], className));

  return (
    <span className={combinedClassName} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
