import React from 'react';
import { clsx } from 'clsx';
import { ExternalLink, Heart } from 'lucide-react';

export interface FooterProps {
  className?: string;
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ className, onNavigate }) => {
  return (
    <footer
      className={clsx(
        'bg-white border-t-3 border-black px-6 py-10 mt-auto select-none',
        className
      )}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-display font-black text-sm">
              ET
            </div>
            <span className="font-display font-black text-lg tracking-wide uppercase text-black">
              EventTrail
            </span>
          </div>
          <p className="text-xs font-body text-gray-600 max-w-sm leading-relaxed">
            A full-stack serverless campus event and RSVP platform built natively on AWS. Providing Neo-brutalist student experiences with DynamoDB, RDS MySQL, and Leaflet routing.
          </p>
          <div className="flex items-center gap-2 text-xs font-display font-bold uppercase text-black pt-1">
            <span>Built for CampusPulse</span>
            <span>•</span>
            <span className="text-accent-yellow bg-black px-1.5 py-0.5">AWS Cloud</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-black text-xs uppercase tracking-wider text-black mb-3 border-b-2 border-black pb-1 inline-block">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs font-body font-semibold text-gray-700">
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.('/')}
                className="hover:underline cursor-pointer hover:text-black"
              >
                Home / Landing
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.('/events')}
                className="hover:underline cursor-pointer hover:text-black"
              >
                Browse Events
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.('/map')}
                className="hover:underline cursor-pointer hover:text-black"
              >
                Campus Map
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.('/style-guide')}
                className="hover:underline cursor-pointer hover:text-black"
              >
                Style Guide (QA)
              </button>
            </li>
          </ul>
        </div>

        {/* Resources / Tech */}
        <div>
          <h4 className="font-display font-black text-xs uppercase tracking-wider text-black mb-3 border-b-2 border-black pb-1 inline-block">
            Resources
          </h4>
          <ul className="space-y-2 text-xs font-body font-semibold text-gray-700">
            <li>
              <a
                href="https://github.com/ananthaaa/Eventtrail-WEB"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline hover:text-black"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>
            </li>
            <li>
              <span className="text-gray-500">AWS CDK v2 Infra</span>
            </li>
            <li>
              <span className="text-gray-500">React 19 + Vite</span>
            </li>
            <li>
              <span className="text-gray-500">Tailwind Neo-Brutalist</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal / Credits Bar */}
      <div className="border-t-2 border-black pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-body text-gray-500 uppercase font-bold">
        <span>© {new Date().getFullYear()} EventTrail Campus Platform. All rights reserved.</span>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#FF5757] fill-[#FF5757]" />
          <span>for Campus Events</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
