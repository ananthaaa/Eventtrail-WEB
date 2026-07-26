import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type CardVariant = 'white' | 'mint' | 'peach' | 'yellow' | 'accent' | 'transparent';
export type CardShadowSize = 'none' | 'small' | 'medium' | 'large';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: CardVariant;
  shadowSize?: CardShadowSize;
  hoverEffect?: boolean;
  children?: React.ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  white: 'bg-white text-black',
  mint: 'bg-pastel-mint text-black',
  peach: 'bg-pastel-peach text-black',
  yellow: 'bg-pastel-yellow text-black',
  accent: 'bg-accent-yellow text-black',
  transparent: 'bg-transparent text-black',
};

const shadowClasses: Record<CardShadowSize, string> = {
  none: 'shadow-none',
  small: 'neo-shadow-sm',
  medium: 'neo-shadow',
  large: 'neo-shadow-lg',
};

export const Card: React.FC<CardProps> = ({
  variant = 'white',
  shadowSize = 'medium',
  hoverEffect = false,
  className,
  children,
  onClick,
  ...rest
}) => {
  const isClickable = Boolean(onClick);
  const shouldAnimateHover = isClickable || hoverEffect;

  const baseClasses = 'neo-border rounded-none p-6 transition-all duration-200 block';

  const combinedClassName = twMerge(
    clsx(
      baseClasses,
      variantClasses[variant],
      shadowClasses[shadowSize],
      isClickable && 'cursor-pointer neo-clickable select-none',
      className
    )
  );

  return (
    <motion.div
      onClick={onClick}
      whileHover={shouldAnimateHover ? { x: -2, y: -2 } : undefined}
      whileTap={isClickable ? { x: 2, y: 2 } : undefined}
      className={combinedClassName}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Card;
