import React, { useState } from 'react';
import { Button, Card, Badge, useToast } from '../components/ui';
import { useAuth, type UserRole } from '../contexts/AuthContext';
import { Sparkles, Shield, User, Award, ArrowRight, Check } from 'lucide-react';

interface SignupProps {
  onNavigate: (route: string) => void;
}

const FACULTY_OPTIONS = [
  'Engineering & Technology',
  'Computer & Information Sciences',
  'Business & Economics',
  'Arts & Humanities',
  'Natural & Mathematical Sciences',
  'University Administration',
];

export const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  const { signup } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [faculty, setFaculty] = useState(FACULTY_OPTIONS[0]);
  const [role, setRole] = useState<UserRole>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({
        title: 'Missing Fields',
        message: 'Please complete all required fields.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    const res = await signup({ name, email, password, role, faculty });
    setIsSubmitting(false);

    if (res.success) {
      toast({
        title: 'Account Created',
        message: `Welcome to EventTrail, ${name}! Your role is set to ${role}.`,
        type: 'success',
      });
      if (role === 'club_admin' || role === 'campus_staff') {
        onNavigate('/admin');
      } else {
        onNavigate('/events');
      }
    } else {
      toast({
        title: 'Registration Failed',
        message: res.error || 'Could not complete Cognito registration.',
        type: 'error',
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 select-none">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="mint">
            <Sparkles className="w-3.5 h-3.5 inline mr-1" /> USER ONBOARDING
          </Badge>
          <h1 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-black">
            Join CampusPulse
          </h1>
          <p className="font-body text-xs md:text-sm text-gray-600">
            Create your account to RSVP for events, get waitlist alerts, and access indoor directions.
          </p>
        </div>

        <Card variant="white" className="p-6 md:p-8 bg-white space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="font-display font-bold text-xs uppercase tracking-wider text-black block">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-3 border-3 border-black text-left transition-all ${
                    role === 'student'
                      ? 'bg-accent-yellow neo-shadow-sm translate-x-0.5 -translate-y-0.5 font-bold'
                      : 'bg-neobrutalist hover:bg-gray-100 font-medium'
                  }`}
                >
                  <User className="w-4 h-4 mb-1 text-black" />
                  <div className="font-display text-xs uppercase">Student</div>
                  <div className="font-body text-[10px] text-gray-600 leading-tight">General Campus</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('club_admin')}
                  className={`p-3 border-3 border-black text-left transition-all ${
                    role === 'club_admin'
                      ? 'bg-peach neo-shadow-sm translate-x-0.5 -translate-y-0.5 font-bold'
                      : 'bg-neobrutalist hover:bg-gray-100 font-medium'
                  }`}
                >
                  <Award className="w-4 h-4 mb-1 text-black" />
                  <div className="font-display text-xs uppercase">Club Admin</div>
                  <div className="font-body text-[10px] text-gray-600 leading-tight">Organizer</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('campus_staff')}
                  className={`p-3 border-3 border-black text-left transition-all ${
                    role === 'campus_staff'
                      ? 'bg-mint neo-shadow-sm translate-x-0.5 -translate-y-0.5 font-bold'
                      : 'bg-neobrutalist hover:bg-gray-100 font-medium'
                  }`}
                >
                  <Shield className="w-4 h-4 mb-1 text-black" />
                  <div className="font-display text-xs uppercase">Staff</div>
                  <div className="font-body text-[10px] text-gray-600 leading-tight">University</div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-display font-bold text-xs uppercase tracking-wider text-black block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-3 py-2.5 bg-neobrutalist border-3 border-black text-sm font-body focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-display font-bold text-xs uppercase tracking-wider text-black block">
                  Campus Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arivera@campuspulse.edu"
                  className="w-full px-3 py-2.5 bg-neobrutalist border-3 border-black text-sm font-body focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-display font-bold text-xs uppercase tracking-wider text-black block">
                Faculty / Department
              </label>
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full px-3 py-2.5 bg-neobrutalist border-3 border-black text-sm font-body font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all cursor-pointer"
              >
                {FACULTY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-display font-bold text-xs uppercase tracking-wider text-black block">
                Password (min 8 chars, alphanumeric)
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 bg-neobrutalist border-3 border-black text-sm font-body focus:outline-none focus:ring-2 focus:ring-black transition-all"
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
                {isSubmitting ? 'Registering Account...' : 'Create CampusPulse Account'} <Check className="w-4 h-4 inline ml-1" />
              </Button>
            </div>
          </form>

          <div className="text-center pt-2 border-t-2 border-dashed border-gray-200">
            <p className="font-body text-xs text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="font-display font-bold text-black hover:underline inline-flex items-center"
              >
                Log In <ArrowRight className="w-3 h-3 ml-0.5 inline" />
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
