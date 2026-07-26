import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CheckCircle, Clock, XCircle, Calendar, MapPin } from 'lucide-react';
import { Badge, type BadgeVariant } from './Badge';

export interface RSVPTicketEvent {
  title: string;
  date: string;
  time?: string;
  location: string;
}

export type RSVPStatus = 'confirmed' | 'waitlisted' | 'cancelled' | string;

export interface RSVPTicketProps {
  event: RSVPTicketEvent;
  rsvpStatus: RSVPStatus;
  ticketNumber: string;
  className?: string;
}

export const RSVPTicket: React.FC<RSVPTicketProps> = ({
  event,
  rsvpStatus,
  ticketNumber,
  className,
}) => {
  const normalizedStatus = rsvpStatus.toLowerCase();

  let badgeVariant: BadgeVariant = 'yellow';
  let StatusIcon = Clock;
  let iconBg = 'bg-pastel-yellow';

  if (normalizedStatus === 'confirmed') {
    badgeVariant = 'mint';
    StatusIcon = CheckCircle;
    iconBg = 'bg-pastel-mint';
  } else if (normalizedStatus === 'waitlisted') {
    badgeVariant = 'peach';
    StatusIcon = Clock;
    iconBg = 'bg-pastel-peach';
  } else if (normalizedStatus === 'cancelled') {
    badgeVariant = 'white';
    StatusIcon = XCircle;
    iconBg = 'bg-gray-100';
  }

  return (
    <div
      className={twMerge(
        clsx(
          'bg-white neo-border neo-shadow-sm p-6 relative rounded-none select-none max-w-md w-full',
          className
        )
      )}
    >
      {/* Left Perforation Cutout */}
      <div className="absolute -left-3 top-[68%] -translate-y-1/2 w-6 h-6 bg-neobrutalist border-r-3 border-black rounded-full z-10" />
      {/* Right Perforation Cutout */}
      <div className="absolute -right-3 top-[68%] -translate-y-1/2 w-6 h-6 bg-neobrutalist border-l-3 border-black rounded-full z-10" />

      {/* Top Header Section */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div
          className={clsx(
            'w-12 h-12 border-2 border-black flex items-center justify-center shrink-0',
            iconBg
          )}
        >
          <StatusIcon className="w-6 h-6 stroke-[2.5] text-black" />
        </div>
        <div className="flex-1 min-w-0">
          <Badge variant={badgeVariant}>{rsvpStatus.toUpperCase()}</Badge>
          <h3 className="font-display font-black text-lg uppercase tracking-wide mt-2 truncate text-black">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-2 text-xs font-body mb-6 text-gray-700">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-black shrink-0" />
          <span>
            {event.date} {event.time && `• ${event.time}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-black shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      {/* Perforation Dashed Line */}
      <div className="border-t-2 border-dashed border-black my-4 relative" />

      {/* Bottom Ticket Number Footer */}
      <div className="flex items-center justify-between pt-2">
        <span className="font-display font-bold text-[11px] uppercase tracking-wider text-gray-500">
          Admission Ticket
        </span>
        <div className="bg-pastel-yellow px-2.5 py-1 border-2 border-black font-display font-black text-xs uppercase tracking-widest text-black">
          #{ticketNumber}
        </div>
      </div>
    </div>
  );
};

export default RSVPTicket;
