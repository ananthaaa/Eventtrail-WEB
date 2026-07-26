import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface SeatMeterProps {
  total: number;
  available: number;
  className?: string;
}

export const SeatMeter: React.FC<SeatMeterProps> = ({ total, available, className }) => {
  const safeTotal = Math.max(1, total);
  const safeAvailable = Math.max(0, available);
  const filled = Math.max(0, safeTotal - safeAvailable);
  const percentage = Math.min(100, Math.round((filled / safeTotal) * 100));
  const isWaitlist = safeAvailable <= 0;

  return (
    <div
      className={twMerge(
        clsx('bg-white neo-border neo-shadow-sm p-4 rounded-none select-none', className)
      )}
    >
      <div className="flex items-center justify-between mb-2 font-display uppercase tracking-wider text-xs font-bold">
        <span className="flex items-center gap-1.5">
          {isWaitlist ? (
            <>
              <AlertCircle className="w-4 h-4 text-[#FF5757]" />
              <span className="text-[#FF5757]">Waitlist Mode</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>Capacity</span>
            </>
          )}
        </span>
        <span>
          {isWaitlist
            ? '0 Seats Remaining'
            : `${safeAvailable} / ${safeTotal} Seats Available`}
        </span>
      </div>

      <div className="h-6 bg-[#F9F5F6] border-2 border-black w-full overflow-hidden relative rounded-none">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={clsx(
            'h-full border-r-2 border-black',
            isWaitlist ? 'bg-[#FF5757]' : 'bg-accent-yellow'
          )}
        />
      </div>

      <div className="flex justify-between items-center mt-1 text-[10px] font-body uppercase text-gray-600 font-semibold">
        <span>0%</span>
        <span>{percentage}% Filled</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default SeatMeter;
