import React from 'react';
import { clsx } from 'clsx';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export interface LandingLayoutProps {
  children?: React.ReactNode;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  className?: string;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({
  children,
  currentRoute = '/',
  onNavigate,
  className,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-neobrutalist">
      <NavBar currentRoute={currentRoute} onNavigate={onNavigate} role="public" />
      <main className={clsx('flex-1 w-full bg-grid-dots relative', className)}>
        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default LandingLayout;
