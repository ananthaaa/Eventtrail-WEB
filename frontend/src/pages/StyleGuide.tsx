import React, { useState } from 'react';
import {
  Button,
  Badge,
  Card,
  SeatMeter,
  StepTracker,
  RSVPTicket,
  Marquee,
  ImageUploadZone,
  useToast,
} from '../components/ui';

export const StyleGuide: React.FC = () => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    if (idx > 0 && !completedSteps.includes(idx - 1)) {
      setCompletedSteps((prev) => [...prev, idx - 1]);
    }
  };

  const sampleSteps = [
    { id: 1, title: 'Enter Student Union Main Gate', description: 'Show your digital campus ID to security.' },
    { id: 2, title: 'Take Elevator to 3rd Floor', description: 'Proceed to Grand Auditorium Hall B.' },
    { id: 3, title: 'Scan RSVP QR Code at Desk', description: 'Our student volunteers will verify your ticket.' },
    { id: 4, title: 'Take Your Assigned Seat', description: 'Enjoy the Spring Tech Symposium!' },
  ];

  const sampleEvent = {
    title: 'AWS Serverless Architecture Summit 2026',
    date: 'OCTOBER 15, 2026',
    time: '5:00 PM EST',
    location: 'Innovation Center • Auditorium Hall A',
  };

  return (
    <div className="space-y-16 pb-20 select-none">
      {/* Top Banner Marquee */}
      <div className="-mx-6">
        <Marquee
          items={[
            'NEO-BRUTALISM DESIGN SYSTEM',
            '3PX BLACK BORDERS',
            'FLAT OFFSET SHADOWS',
            'CAMPUS PULSE AWS',
            'EPILOGUE & INTER FONTS',
          ]}
          speed="normal"
        />
      </div>

      {/* Page Title & Intro */}
      <div className="bg-white neo-border neo-shadow p-8">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="accent">MODULE 1.2 QA</Badge>
          <Badge variant="dark">VISUAL STYLE GUIDE</Badge>
        </div>
        <h1 className="font-display font-black text-4xl uppercase tracking-tight text-black mb-2">
          EventTrail Design System
        </h1>
        <p className="font-body text-gray-700 max-w-2xl text-sm leading-relaxed">
          This interactive catalog verifies all Neo-brutalist tokens, Framer Motion micro-animations, and reusable UI components. Try clicking buttons, hovering over cards, and triggering toasts below.
        </p>
      </div>

      {/* Section 1: Color Tokens */}
      <section className="space-y-4">
        <h2 className="font-display font-black text-2xl uppercase tracking-wide border-b-3 border-black pb-2">
          1. Color Palette Tokens
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { name: 'bg-neobrutalist', hex: '#F9F5F6', bg: 'bg-neobrutalist', text: 'text-black' },
            { name: 'accent-yellow', hex: '#FFDB58', bg: 'bg-accent-yellow', text: 'text-black' },
            { name: 'pastel-mint', hex: '#DAF5F0', bg: 'bg-pastel-mint', text: 'text-black' },
            { name: 'pastel-peach', hex: '#F8D6B3', bg: 'bg-pastel-peach', text: 'text-black' },
            { name: 'pastel-yellow', hex: '#FDFD96', bg: 'bg-pastel-yellow', text: 'text-black' },
            { name: 'border-black', hex: '#000000', bg: 'bg-black', text: 'text-white' },
          ].map((token) => (
            <div key={token.name} className="neo-border neo-shadow-sm overflow-hidden bg-white">
              <div className={`h-24 w-full ${token.bg} border-b-2 border-black flex items-center justify-center`}>
                <span className={`font-display font-black text-xs uppercase ${token.text}`}>
                  {token.hex}
                </span>
              </div>
              <div className="p-3">
                <span className="font-display font-bold text-xs uppercase tracking-wide block truncate">
                  {token.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Buttons */}
      <section className="space-y-6">
        <h2 className="font-display font-black text-2xl uppercase tracking-wide border-b-3 border-black pb-2">
          2. Buttons & Tap Micro-Animations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="white" shadowSize="medium" className="space-y-4">
            <h3 className="font-display font-black text-sm uppercase text-gray-500">Variants</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary CTA</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent Peach</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </Card>

          <Card variant="white" shadowSize="medium" className="space-y-4">
            <h3 className="font-display font-black text-sm uppercase text-gray-500">Sizes & States</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm" variant="primary">Small</Button>
              <Button size="md" variant="primary">Medium</Button>
              <Button size="lg" variant="primary">Large Button</Button>
              <Button disabled variant="primary">Disabled State</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 3: Badges */}
      <section className="space-y-4">
        <h2 className="font-display font-black text-2xl uppercase tracking-wide border-b-3 border-black pb-2">
          3. Status Badges
        </h2>
        <Card variant="white" className="flex flex-wrap gap-4 items-center">
          <Badge variant="mint">CONFIRMED</Badge>
          <Badge variant="peach">WAITLISTED</Badge>
          <Badge variant="yellow">FEATURED EVENT</Badge>
          <Badge variant="accent">NEW RELEASE</Badge>
          <Badge variant="white">GENERAL ADMISSION</Badge>
          <Badge variant="dark">STAFF ONLY</Badge>
        </Card>
      </section>

      {/* Section 4: Cards & Shadows */}
      <section className="space-y-4">
        <h2 className="font-display font-black text-2xl uppercase tracking-wide border-b-3 border-black pb-2">
          4. Cards & Interactive Hover Lifts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="mint" shadowSize="small" hoverEffect>
            <Badge variant="white" className="mb-2">Small Shadow</Badge>
            <h3 className="font-display font-black text-lg uppercase mt-2">Pastel Mint Card</h3>
            <p className="font-body text-xs mt-1 text-gray-700">Has hoverEffect enabled. Notice the passive hover lift.</p>
          </Card>

          <Card
            variant="peach"
            shadowSize="medium"
            onClick={() => toast({ title: 'Card Clicked!', message: 'You clicked an interactive card.', type: 'info' })}
          >
            <Badge variant="dark" className="mb-2">Clickable Medium</Badge>
            <h3 className="font-display font-black text-lg uppercase mt-2">Interactive Peach</h3>
            <p className="font-body text-xs mt-1 text-gray-800">Has an onClick handler. Hover to lift, press to compress shadow!</p>
          </Card>

          <Card variant="yellow" shadowSize="large">
            <Badge variant="white" className="mb-2">Large Shadow</Badge>
            <h3 className="font-display font-black text-lg uppercase mt-2">Pastel Yellow Card</h3>
            <p className="font-body text-xs mt-1 text-gray-800">Static card with neobrutalist-lg (6px 6px offset shadow).</p>
          </Card>
        </div>
      </section>

      {/* Section 5: SeatMeter */}
      <section className="space-y-4">
        <h2 className="font-display font-black text-2xl uppercase tracking-wide border-b-3 border-black pb-2">
          5. Animated Seat Meters (Capacity Tracking)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SeatMeter total={100} available={65} />
          <SeatMeter total={50} available={8} />
          <SeatMeter total={150} available={0} />
        </div>
      </section>

      {/* Section 6: StepTracker & RSVPTickets */}
      <section className="space-y-6">
        <h2 className="font-display font-black text-2xl uppercase tracking-wide border-b-3 border-black pb-2">
          6. Step Trackers & Perforated RSVP Tickets
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm uppercase text-gray-600">
              Interactive Indoor Step Tracker (Click step to advance)
            </h3>
            <StepTracker
              steps={sampleSteps}
              activeStepIndex={activeStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />
          </div>

          <div className="space-y-6">
            <h3 className="font-display font-bold text-sm uppercase text-gray-600">
              Tactile RSVP Tickets (Perforated edges)
            </h3>
            <div className="flex flex-col gap-6 items-center sm:items-start">
              <RSVPTicket
                event={sampleEvent}
                rsvpStatus="confirmed"
                ticketNumber="CP-88420-VIP"
              />
              <RSVPTicket
                event={{ ...sampleEvent, title: 'Hackathon Kickoff & Team Formation' }}
                rsvpStatus="waitlisted"
                ticketNumber="CP-99102-WL"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: ImageUploadZone */}
      <section className="space-y-4">
        <h2 className="font-display font-black text-2xl uppercase tracking-wide border-b-3 border-black pb-2">
          7. Image Upload Dropzone
        </h2>
        <Card variant="white" className="max-w-2xl">
          <ImageUploadZone
            label="Test Event Banner Upload"
            helperText="Select or drop an image file here to test live preview and removal"
            onFileSelect={(file) => {
              if (file) {
                toast({ title: 'Image Selected', message: `File: ${file.name} (${Math.round(file.size / 1024)} KB)`, type: 'success' });
              } else {
                toast({ title: 'Image Removed', type: 'info' });
              }
            }}
          />
        </Card>
      </section>

      {/* Section 8: Toast Notifications */}
      <section className="space-y-4">
        <h2 className="font-display font-black text-2xl uppercase tracking-wide border-b-3 border-black pb-2">
          8. Context Toast Alert System
        </h2>
        <Card variant="white" className="space-y-4">
          <p className="font-body text-sm text-gray-700">
            Click the buttons below to trigger live Neo-brutalist toast alerts in the bottom-right corner of the screen.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              onClick={() =>
                toast({
                  title: 'RSVP Confirmed!',
                  message: 'Your ticket for AWS Serverless Summit has been generated.',
                  type: 'success',
                })
              }
            >
              Show Success Toast
            </Button>

            <Button
              variant="accent"
              onClick={() =>
                toast({
                  title: 'Capacity Warning',
                  message: 'Only 3 seats remaining for Auditorium Hall A.',
                  type: 'warning',
                })
              }
            >
              Show Warning Toast
            </Button>

            <Button
              variant="primary"
              onClick={() =>
                toast({
                  title: 'Check-in Failed',
                  message: 'Invalid QR ticket signature or event has already ended.',
                  type: 'error',
                })
              }
            >
              Show Error Toast
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                toast({
                  title: 'Syncing Offline Map',
                  message: 'Downloading Leaflet routing tiles for Student Union...',
                  type: 'info',
                })
              }
            >
              Show Info Toast
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default StyleGuide;
