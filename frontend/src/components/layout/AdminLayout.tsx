import React from 'react';
import { clsx } from 'clsx';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { LayoutDashboard, CalendarPlus, ShieldCheck, QrCode, BarChart3, Settings } from 'lucide-react';

export interface AdminLayoutProps {
  children?: React.ReactNode;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  className?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentRoute = '/admin',
  onNavigate,
  className,
}) => {
  const adminLinks = [
    { label: 'Dashboard', route: '/admin', icon: LayoutDashboard },
    { label: 'Manage Events', route: '/admin/events', icon: CalendarPlus },
    { label: 'Club Approvals', route: '/admin/clubs', icon: ShieldCheck },
    { label: 'QR Scanner', route: '/admin/scan', icon: QrCode },
    { label: 'Analytics', route: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', route: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neobrutalist">
      <NavBar currentRoute={currentRoute} onNavigate={onNavigate} role="admin" />

      <div className="flex-1 flex flex-col md:flex-row w-full">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 bg-pastel-peach border-b-3 md:border-b-0 md:border-r-3 border-black p-4 select-none shrink-0">
          <div className="bg-black text-white p-3 mb-6 neo-border font-display uppercase tracking-widest text-xs font-black flex items-center justify-between">
            <span>Control Panel</span>
            <span className="w-2 h-2 rounded-full bg-pastel-mint animate-pulse" />
          </div>

          <nav className="space-y-1.5">
            {adminLinks.map((link) => {
              const isActive = currentRoute === link.route;
              const Icon = link.icon;
              return (
                <button
                  key={link.route}
                  type="button"
                  onClick={() => onNavigate?.(link.route)}
                  className={clsx(
                    'w-full px-4 py-3 font-display font-bold uppercase tracking-wider text-xs transition-all flex items-center gap-2.5 cursor-pointer text-left rounded-none border-2 border-black',
                    isActive
                      ? 'bg-accent-yellow text-black neo-shadow-sm translate-x-1'
                      : 'bg-white text-gray-800 hover:bg-pastel-yellow'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0 stroke-[2.5]" />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Admin Workspace Content */}
        <main className={clsx('flex-1 p-6 md:p-8 overflow-x-hidden', className)}>
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AdminLayout;
