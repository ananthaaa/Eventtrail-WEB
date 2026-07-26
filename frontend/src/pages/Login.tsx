import React, { useState } from 'react';
import { Button, Card, Badge, useToast } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, Shield, KeyRound, ArrowRight } from 'lucide-react';

interface LoginProps {
  onNavigate: (route: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Validation Error',
        message: 'Please enter your campus email address.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      toast({
        title: 'Logged In Successfully',
        message: `Welcome back, ${email.split('@')[0]}!`,
        type: 'success',
      });
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('staff')) {
        onNavigate('/admin');
      } else {
        onNavigate('/events');
      }
    } else {
      toast({
        title: 'Authentication Failed',
        message: res.error || 'Invalid credentials or unverified account.',
        type: 'error',
      });
    }
  };

  const fillDevPersona = (personaEmail: string) => {
    setEmail(personaEmail);
    setPassword('DevPassword123!');
    toast({
      title: 'Dev Persona Loaded',
      message: `Populated form for ${personaEmail}`,
      type: 'info',
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 select-none">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="yellow">
            <KeyRound className="w-3.5 h-3.5 inline mr-1" /> COGNITO AUTHENTICATION
          </Badge>
          <h1 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-black">
            Welcome Back
          </h1>
          <p className="font-body text-xs md:text-sm text-gray-600">
            Log in to manage RSVPs, view walking routes, and discover campus life.
          </p>
        </div>

        <Card variant="white" className="p-6 md:p-8 bg-white space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-display font-bold text-xs uppercase tracking-wider text-black block">
                Campus Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@campuspulse.edu"
                className="w-full px-4 py-3 bg-neobrutalist border-3 border-black text-sm font-body focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-display font-bold text-xs uppercase tracking-wider text-black block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => toast({ title: 'Password Reset', message: 'Check your campus email for recovery instructions.', type: 'info' })}
                  className="font-body text-[11px] text-gray-500 hover:text-black underline transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-neobrutalist border-3 border-black text-sm font-body focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Authenticating...' : 'Log In to EventTrail'} <ArrowRight className="w-4 h-4 inline ml-1" />
              </Button>
            </div>
          </form>

          <div className="p-3 bg-neobrutalist border-2 border-black space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-[11px] text-black uppercase tracking-wider flex items-center">
                <Shield className="w-3.5 h-3.5 mr-1 text-black" /> Default Demo Credentials
              </span>
              <Badge variant="yellow" className="text-[9px] py-0 px-1.5">DEMO ACCESSIBLE</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 bg-white border border-black rounded-none space-y-0.5">
                <div className="font-bold font-display text-[10px] text-black">ADMIN DEMO</div>
                <div className="text-gray-700 truncate">admin@campuspulse.edu</div>
                <div className="text-gray-500">Pass: DevPassword123!</div>
              </div>
              <div className="p-2 bg-white border border-black rounded-none space-y-0.5">
                <div className="font-bold font-display text-[10px] text-black">STUDENT DEMO</div>
                <div className="text-gray-700 truncate">student@campuspulse.edu</div>
                <div className="text-gray-500">Pass: DevPassword123!</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillDevPersona('admin@campuspulse.edu')}
                className="text-[11px] py-1 bg-peach/30 justify-center font-display"
              >
                Auto-fill Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillDevPersona('student@campuspulse.edu')}
                className="text-[11px] py-1 bg-mint/30 justify-center font-display"
              >
                Auto-fill Student
              </Button>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="font-body text-xs text-gray-600">
              New to CampusPulse?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/signup')}
                className="font-display font-bold text-black hover:underline inline-flex items-center"
              >
                Create an account <Sparkles className="w-3 h-3 ml-0.5 inline text-accent-yellow fill-accent-yellow" />
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
