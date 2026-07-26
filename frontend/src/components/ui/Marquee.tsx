import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type MarqueeSpeed = 'normal' | 'fast';

export interface MarqueeProps {
  items: string[];
  speed?: MarqueeSpeed;
  bgClass?: string;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 'normal',
  bgClass = 'bg-black text-white',
  className,
}) => {
  // Duplicate items 4 times to ensure seamless loop
  const repeatedItems = [...items, ...items, ...items, ...items];
  const duration = speed === 'fast' ? 15 : 30;

  return (
    <div
      className={twMerge(
        clsx(
          'overflow-hidden border-y-3 border-black py-3 select-none flex whitespace-nowrap',
          bgClass,
          className
        )
      )}
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          duration,
          ease: 'linear',
        }}
        className="flex items-center shrink-0"
      >
        {repeatedItems.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="font-display font-black text-sm uppercase tracking-widest px-6">
              {item}
            </span>
            <span className="w-2.5 h-2.5 bg-accent-yellow border border-black rotate-45 shrink-0 inline-block" />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
