import React from 'react';
import { clsx } from 'clsx';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Compass, Calendar, Shield, Palette } from 'lucide-react';

export interface NavBarProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  role?: 'public' | 'student' | 'admin';
  className?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
  currentRoute = '/',
  onNavigate,
  role = 'public',
  className,
}) => {
  const navItems = [
    { label: 'Home', route: '/', icon: undefined },
    { label: 'Events', route: '/events', icon: Calendar },
    { label: 'Campus Map', route: '/map', icon: Compass },
    { label: 'Style Guide', route: '/style-guide', icon: Palette },
  ];

  if (role === 'admin') {
    navItems.push({ label: 'Admin Portal', route: '/admin', icon: Shield });
  }

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 bg-white border-b-3 border-black px-6 py-4 flex items-center justify-between select-none',
        className
      )}
    >
      {/* Brand Logo */}
      <div
        onClick={() => onNavigate?.('/')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-accent-yellow border-2 border-black neo-shadow-sm flex items-center justify-center font-display font-black text-lg group-hover:scale-105 transition-transform">
          ET
        </div>
        <div className="flex flex-col">
          <span className="font-display font-black text-xl tracking-wider uppercase leading-none text-black">
            EventTrail
          </span>
          <span className="text-[10px] font-body uppercase tracking-widest text-gray-500 font-bold mt-0.5">
            Campus Pulse AWS
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = currentRoute === item.route;
          const Icon = item.icon;
          return (
            <button
              key={item.route}
              type="button"
              onClick={() => onNavigate?.(item.route)}
              className={clsx(
                'px-4 py-2 font-display font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-1.5 cursor-pointer rounded-none border-2 border-transparent',
                isActive
                  ? 'bg-pastel-yellow border-black neo-shadow-sm text-black'
                  : 'hover:bg-[#F9F5F6] text-gray-700 hover:text-black'
              )}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Action CTA / Role status */}
      <div className="flex items-center gap-3">
        {role !== 'public' && (
          <Badge variant={role === 'admin' ? 'peach' : 'mint'}>
            {role.toUpperCase()} ROLE
          </Badge>
        )}
        <Button
          size="sm"
          variant="primary"
          onClick={() => onNavigate?.(role === 'public' ? '/login' : '/profile')}
        >
          {role === 'public' ? 'Student Login' : 'My Profile'}
        </Button>
      </div>
    </header>
  );
};

export default NavBar;
