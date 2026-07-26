import React from 'react';
import { clsx } from 'clsx';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { Compass, Calendar, Shield, Palette, UserCheck } from 'lucide-react';

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
  const { user, isAuthenticated, logout, toggleMockRole, isMockMode } = useAuth();

  const effectiveRole = isAuthenticated && user ? user.role : role;

  const navItems = [
    { label: 'Home', route: '/', icon: undefined },
    { label: 'Events', route: '/events', icon: Calendar },
    { label: 'Campus Map', route: '/map', icon: Compass },
    { label: 'Style Guide', route: '/style-guide', icon: Palette },
  ];

  if (effectiveRole === 'admin' || effectiveRole === 'club_admin' || effectiveRole === 'campus_staff') {
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

      {/* Action CTA / Live Auth Status */}
      <div className="flex items-center gap-2 md:gap-3">
        {isAuthenticated && user ? (
          <>
            <div
              onClick={isMockMode ? toggleMockRole : undefined}
              title={isMockMode ? "Click to toggle Mock Dev Role" : undefined}
              className={isMockMode ? "cursor-pointer transition-transform hover:scale-105" : ""}
            >
              <Badge
                variant={
                  user.role === 'club_admin'
                    ? 'peach'
                    : user.role === 'campus_staff'
                    ? 'mint'
                    : 'yellow'
                }
              >
                {isMockMode && <UserCheck className="w-3 h-3 inline mr-1" />}
                {user.role.toUpperCase().replace('_', ' ')} {isMockMode && '⚡'}
              </Badge>
            </div>
            <span className="font-display font-bold text-xs hidden lg:inline text-black">
              {user.name.split(' ')[0]}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                logout();
                onNavigate?.('/');
              }}
              className="text-xs px-2.5 py-1"
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigate?.('/login')}
              className="text-xs px-3 py-1 bg-white"
            >
              Log In
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => onNavigate?.('/signup')}
              className="text-xs px-3 py-1"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
