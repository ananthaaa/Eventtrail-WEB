import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent-yellow text-black neo-shadow hover:bg-[#FCE06C]',
  secondary: 'bg-white text-black neo-shadow hover:bg-gray-50',
  accent: 'bg-pastel-peach text-black neo-shadow hover:bg-[#FCE1C6]',
  outline: 'bg-transparent text-black neo-border neo-shadow-sm hover:bg-black/5',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-1.5 px-3 text-xs',
  md: 'py-2.5 px-6 text-sm',
  lg: 'py-3.5 px-8 text-base',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  onClick,
  type = 'button',
  ...rest
}) => {
  const baseClasses =
    'font-display font-bold tracking-wide uppercase neo-border rounded-none neo-clickable transition-colors flex items-center justify-center gap-2 select-none';

  const combinedClassName = twMerge(
    clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none neo-shadow-none',
      className
    )
  );

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? undefined : { scale: 0.98, x: 2, y: 2 }}
      className={combinedClassName}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
