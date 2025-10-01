import { useState, useEffect } from 'react';
import AdminAuth from './AdminAuth';
import AdminDashboard from './AdminDashboard';
import { LogOut } from 'lucide-react';
import Button from './Button';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { getSupabase } = await import('../lib/supabase');
      const supabase = await getSupabase();

      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { getSupabase } = await import('../lib/supabase');
      const supabase = await getSupabase();

      await supabase.auth.signOut();
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

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Button onClick={handleLogout} variant="secondary">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
      <AdminDashboard />
    </div>
  );
}
