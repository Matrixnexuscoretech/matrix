import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import Button from './Button';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { getSupabase } = await import('../lib/supabase');
      const supabase = await getSupabase();

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.session) {
        onAuthenticated();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-dark to-navy flex items-center justify-center px-4">
      <div className="absolute top-10 right-10 w-96 h-96 bg-vivid-purple/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-electric-pink/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-md w-full">
        <div className="bg-navy-dark border-2 border-electric-yellow/30 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-electric-pink via-vivid-purple to-vivid-indigo rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white text-3xl font-bold mb-2">Admin Login</h1>
            <p className="text-soft-white">Access the enrollment dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-electric-red/10 border border-electric-red/30 rounded-lg p-4">
                <p className="text-electric-red text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-soft-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-soft-white/50" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-navy border border-electric-yellow/30 rounded-lg text-white placeholder-soft-white/50 focus:outline-none focus:ring-2 focus:ring-electric-yellow"
                  placeholder="admin@matrixnexus.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-soft-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-soft-white/50" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-navy border border-electric-yellow/30 rounded-lg text-white placeholder-soft-white/50 focus:outline-none focus:ring-2 focus:ring-electric-yellow"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-electric-pink via-vivid-purple to-vivid-indigo hover:opacity-90"
            >
              {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-soft-white text-sm">
              For security reasons, only authorized personnel can access this area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
