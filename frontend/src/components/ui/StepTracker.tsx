import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string | number;
  title: string;
  description?: string;
}

export interface StepTrackerProps {
  steps: StepItem[];
  activeStepIndex: number;
  completedSteps?: number[];
  onStepClick?: (index: number) => void;
  className?: string;
}

export const StepTracker: React.FC<StepTrackerProps> = ({
  steps,
  activeStepIndex,
  completedSteps = [],
  onStepClick,
  className,
}) => {
  return (
    <div className={twMerge(clsx('bg-white neo-border neo-shadow p-6 select-none', className))}>
      <div className="space-y-6 relative">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = index === activeStepIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative flex items-start gap-4">
              {!isLast && (
                <div
                  className={clsx(
                    'absolute left-4 top-8 -ml-[1px] w-0.5 h-[calc(100%-8px)]',
                    isCompleted || index < activeStepIndex ? 'bg-black' : 'bg-gray-300'
                  )}
                />
              )}

              <button
                type="button"
                disabled={!onStepClick}
                onClick={() => onStepClick?.(index)}
                className={clsx(
                  'w-8 h-8 rounded-none border-2 border-black flex items-center justify-center font-display font-bold text-xs uppercase z-10 transition-transform',
                  isCompleted && 'bg-pastel-mint text-black',
                  isActive && !isCompleted && 'bg-accent-yellow text-black neo-shadow-sm scale-105',
                  !isCompleted && !isActive && 'bg-white text-gray-400 border-gray-300',
                  onStepClick && 'cursor-pointer hover:scale-110'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : index + 1}
              </button>

              <div className="flex-1 pt-0.5">
                <button
                  type="button"
                  disabled={!onStepClick}
                  onClick={() => onStepClick?.(index)}
                  className={clsx(
                    'text-left block font-display font-bold uppercase tracking-wider text-sm',
                    isActive ? 'text-black' : isCompleted ? 'text-black/80' : 'text-gray-400',
                    onStepClick && 'hover:underline cursor-pointer'
                  )}
                >
                  {step.title}
                </button>
                {step.description && (
                  <p
                    className={clsx(
                      'text-xs font-body mt-1',
                      isActive ? 'text-gray-700' : 'text-gray-400'
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepTracker;
