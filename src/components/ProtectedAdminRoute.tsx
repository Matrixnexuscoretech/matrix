// components/ProtectedAdminRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminAuth from './AdminAuth';
import AdminDashboard from './AdminDashboard';

export default function ProtectedAdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { checkAdminAuth } = await import('../lib/supabase');
      const authStatus = await checkAdminAuth();
      setIsAuthenticated(authStatus);
    } catch (err) {
      console.error('Auth check error:', err);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { adminLogout } = await import('../lib/supabase');
      await adminLogout();
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}