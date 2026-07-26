import { useState, useEffect } from 'react';
import { ToastProvider } from './components/ui';
import { LandingLayout, StudentLayout, AdminLayout } from './components/layout';
import { StyleGuide } from './pages/StyleGuide';
import { Button, Card, Badge, RSVPTicket, SeatMeter } from './components/ui';
import { Sparkles, Compass, Shield, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(
    window.location.pathname || '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: string) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update document title based on route
  useEffect(() => {
    if (currentRoute === '/style-guide') {
      document.title = 'EventTrail — Design System Style Guide';
    } else if (currentRoute.startsWith('/admin')) {
      document.title = 'EventTrail — Admin Control Panel';
    } else if (currentRoute === '/events' || currentRoute === '/rsvps') {
      document.title = 'EventTrail — Student Portal';
    } else {
      document.title = 'EventTrail — Serverless Campus Event Platform';
    }
  }, [currentRoute]);

  const renderContent = () => {
    if (currentRoute === '/style-guide') {
      return (
        <LandingLayout currentRoute={currentRoute} onNavigate={handleNavigate}>
          <StyleGuide />
        </LandingLayout>
      );
    }

    if (currentRoute.startsWith('/admin')) {
      return (
        <AdminLayout currentRoute={currentRoute} onNavigate={handleNavigate}>
          <div className="space-y-8 select-none">
            <div className="bg-white neo-border neo-shadow p-6 flex items-center justify-between">
              <div>
                <Badge variant="peach">ADMIN WORKSPACE</Badge>
                <h1 className="font-display font-black text-3xl uppercase tracking-wide mt-2">
                  Campus Event Dashboard
                </h1>
                <p className="font-body text-xs text-gray-600 mt-1">
                  Manage student RSVPs, approve club organizations, and monitor live venue capacities.
                </p>
              </div>
              <Button variant="primary" onClick={() => handleNavigate('/style-guide')}>
                View Style Guide
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="white" shadowSize="small">
                <span className="font-display font-black text-3xl uppercase">1,420</span>
                <p className="font-display font-bold text-xs uppercase text-gray-500 mt-1">
                  Active Student RSVPs
                </p>
              </Card>
              <Card variant="mint" shadowSize="small">
                <span className="font-display font-black text-3xl uppercase">24</span>
                <p className="font-display font-bold text-xs uppercase text-black mt-1">
                  Approved Campus Clubs
                </p>
              </Card>
              <Card variant="yellow" shadowSize="small">
                <span className="font-display font-black text-3xl uppercase">98.5%</span>
                <p className="font-display font-bold text-xs uppercase text-black mt-1">
                  AWS Gateway Uptime
                </p>
              </Card>
            </div>
          </div>
        </AdminLayout>
      );
    }

    if (currentRoute === '/events' || currentRoute === '/rsvps' || currentRoute === '/map') {
      return (
        <StudentLayout currentRoute={currentRoute} onNavigate={handleNavigate}>
          <div className="space-y-8 select-none">
            <div className="bg-white neo-border neo-shadow p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <Badge variant="mint">STUDENT PORTAL</Badge>
                <h1 className="font-display font-black text-3xl uppercase tracking-wide mt-2">
                  {currentRoute === '/rsvps' ? 'My Confirmed Tickets' : 'Discover Campus Events'}
                </h1>
                <p className="font-body text-xs text-gray-600 mt-1">
                  Browse real-time event schedules, check seat availability, and generate instant RSVP tickets.
                </p>
              </div>
              <Button variant="accent" onClick={() => handleNavigate('/style-guide')}>
                Inspect Design Tokens
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <h3 className="font-display font-black text-lg uppercase tracking-wider text-black border-b-2 border-black pb-1">
                  Featured This Week
                </h3>
                <Card variant="white" shadowSize="medium" className="space-y-4">
                  <div className="flex justify-between items-start">
                    <Badge variant="yellow">TECH &amp; CLOUD</Badge>
                    <span className="font-display font-bold text-xs uppercase text-gray-500">
                      Tomorrow • 5 PM
                    </span>
                  </div>
                  <h4 className="font-display font-black text-2xl uppercase tracking-wide">
                    AWS Serverless Architecture Summit
                  </h4>
                  <p className="font-body text-xs text-gray-700">
                    Join cloud engineering leads for a deep dive into API Gateway, Lambda functions, and DynamoDB single-table designs.
                  </p>
                  <SeatMeter total={150} available={12} className="my-2" />
                  <div className="pt-2 flex gap-3">
                    <Button variant="primary" size="sm" onClick={() => handleNavigate('/rsvps')}>
                      RSVP Now
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <h3 className="font-display font-black text-lg uppercase tracking-wider text-black border-b-2 border-black pb-1">
                  Your Next Admission Ticket
                </h3>
                <RSVPTicket
                  event={{
                    title: 'AWS Serverless Architecture Summit',
                    date: 'OCTOBER 15, 2026',
                    time: '5:00 PM EST',
                    location: 'Innovation Center • Hall A',
                  }}
                  rsvpStatus="confirmed"
                  ticketNumber="CP-88420-VIP"
                />
              </div>
            </div>
          </div>
        </StudentLayout>
      );
    }

    // Default Landing Route (/)
    return (
      <LandingLayout currentRoute={currentRoute} onNavigate={handleNavigate}>
        <div className="space-y-16 py-8 select-none">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center space-y-6 bg-white neo-border neo-shadow-lg p-10 md:p-14">
            <div className="inline-flex items-center gap-2">
              <Badge variant="accent">AWS SERVERLESS</Badge>
              <Badge variant="dark">NEO-BRUTALISM UI</Badge>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-black leading-none">
              The Campus Pulse Event Platform
            </h1>
            <p className="font-body text-gray-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of student engagement. Built from scratch with AWS CDK v2, DynamoDB, RDS MySQL, and custom Framer Motion tactile interfaces.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => handleNavigate('/style-guide')}
              >
                <Sparkles className="w-5 h-5" />
                <span>Open Style Guide (QA)</span>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => handleNavigate('/events')}
              >
                <span>Browse Student Portal</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Role Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              variant="mint"
              shadowSize="medium"
              onClick={() => handleNavigate('/style-guide')}
            >
              <div className="w-10 h-10 bg-white neo-border flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <Badge variant="white" className="mb-2">Module 1.2 QA</Badge>
              <h3 className="font-display font-black text-xl uppercase mt-1">Visual Style Guide</h3>
              <p className="font-body text-xs text-gray-800 mt-2">
                Inspect all 9 atomic UI components, Framer Motion micro-animations, and live toast alerts.
              </p>
            </Card>

            <Card
              variant="peach"
              shadowSize="medium"
              onClick={() => handleNavigate('/events')}
            >
              <div className="w-10 h-10 bg-white neo-border flex items-center justify-center mb-4">
                <Compass className="w-5 h-5 text-black" />
              </div>
              <Badge variant="white" className="mb-2">Student Experience</Badge>
              <h3 className="font-display font-black text-xl uppercase mt-1">Student Portal Demo</h3>
              <p className="font-body text-xs text-gray-800 mt-2">
                Explore event browsing, capacity seat meters, and perforated tactile RSVP tickets.
              </p>
            </Card>

            <Card
              variant="yellow"
              shadowSize="medium"
              onClick={() => handleNavigate('/admin')}
            >
              <div className="w-10 h-10 bg-white neo-border flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <Badge variant="white" className="mb-2">Management</Badge>
              <h3 className="font-display font-black text-xl uppercase mt-1">Admin Control Panel</h3>
              <p className="font-body text-xs text-gray-800 mt-2">
                View administrative layouts, sidebar navigation, and live attendance metrics.
              </p>
            </Card>
          </div>
        </div>
      </LandingLayout>
    );
  };

  return <ToastProvider>{renderContent()}</ToastProvider>;
}
