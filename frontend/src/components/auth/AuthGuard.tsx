import React, { useEffect } from 'react';
import { useAuth, type UserRole } from '../../contexts/AuthContext';
import { useToast, Card, Badge } from '../ui';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  onNavigate: (route: string) => void;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  allowedRoles,
  onNavigate,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        toast({
          title: 'Authentication Required',
          message: 'Please log in with your campus account to proceed.',
          type: 'error',
        });
        onNavigate('/login');
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        toast({
          title: 'Access Restricted',
          message: `Your current role (${user.role.replace('_', ' ')}) cannot access this workspace.`,
          type: 'error',
        });
        onNavigate('/events');
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, onNavigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card variant="white" className="p-8 text-center space-y-4 max-w-sm w-full bg-white">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-black" />
          <div className="font-display font-bold text-sm uppercase tracking-wider">
            Checking Session...
          </div>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card variant="white" className="p-8 text-center space-y-4 max-w-md w-full bg-white">
          <Badge variant="peach">
            <ShieldAlert className="w-4 h-4 inline mr-1" /> ACCESS DENIED
          </Badge>
          <h2 className="font-display font-black text-xl uppercase">Unauthorized Route</h2>
          <p className="font-body text-xs text-gray-600">
            Redirecting you to the authorized portal...
          </p>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
