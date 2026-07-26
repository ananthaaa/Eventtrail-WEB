import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastContext, type ToastItem, type ToastOptions, type ToastType } from './useToast';

const typeStyles: Record<ToastType, { bg: string; icon: React.ElementType }> = {
  success: { bg: 'bg-pastel-mint', icon: CheckCircle },
  error: { bg: 'bg-[#FF5757]', icon: AlertCircle },
  info: { bg: 'bg-white', icon: Info },
  warning: { bg: 'bg-pastel-peach', icon: AlertTriangle },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, message, type = 'info', duration = 4000 }: ToastOptions) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, title, message, type };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 select-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((item) => {
            const { bg, icon: Icon } = typeStyles[item.type];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                className={clsx(
                  'pointer-events-auto neo-border neo-shadow p-4 rounded-none flex items-start gap-3 w-full text-black',
                  bg
                )}
              >
                <Icon className="w-5 h-5 shrink-0 mt-0.5 stroke-[2.5]" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-black text-xs uppercase tracking-wide">
                    {item.title}
                  </h4>
                  {item.message && (
                    <p className="text-xs font-body mt-0.5 text-gray-800 break-words">
                      {item.message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(item.id)}
                  className="p-1 hover:bg-black/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
