import React from 'react';
import { clsx } from 'clsx';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Ticket, Users, Bookmark, Bell } from 'lucide-react';

export interface StudentLayoutProps {
  children?: React.ReactNode;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  className?: string;
}

export const StudentLayout: React.FC<StudentLayoutProps> = ({
  children,
  currentRoute = '/events',
  onNavigate,
  className,
}) => {
  const studentTabs = [
    { label: 'My RSVPs', route: '/rsvps', icon: Ticket, count: 2 },
    { label: 'My Clubs', route: '/clubs', icon: Users, count: undefined },
    { label: 'Saved Events', route: '/saved', icon: Bookmark, count: undefined },
    { label: 'Notifications', route: '/notifications', icon: Bell, count: 5 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neobrutalist">
      <NavBar currentRoute={currentRoute} onNavigate={onNavigate} role="student" />

      {/* Sub-navigation Banner for Student Portal */}
      <div className="bg-pastel-mint border-b-3 border-black px-6 py-2 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 py-1">
            <span className="font-display font-black uppercase text-xs tracking-wider text-black mr-2">
              Student Workspace:
            </span>
            {studentTabs.map((tab) => {
              const isActive = currentRoute === tab.route;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.route}
                  type="button"
                  onClick={() => onNavigate?.(tab.route)}
                  className={clsx(
                    'px-3 py-1 font-display font-bold uppercase tracking-wide text-xs transition-colors flex items-center gap-1.5 cursor-pointer rounded-none border-2',
                    isActive
                      ? 'bg-black text-white border-black neo-shadow-sm'
                      : 'bg-white text-black border-black hover:bg-pastel-yellow'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={clsx(
                        'px-1.5 py-0.2 text-[10px] font-black',
                        isActive ? 'bg-accent-yellow text-black' : 'bg-black text-white'
                      )}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className={clsx('flex-1 w-full relative', className)}>
        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default StudentLayout;
