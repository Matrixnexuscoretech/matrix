import { useState, useEffect } from 'react';
import { CircleUser as UserCircle, Mail, Phone, BookOpen, Calendar, Clock, Filter, Download, CheckCircle, XCircle, AlertCircle, LogOut } from 'lucide-react';
import Button from './Button';

interface Enrollment {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
  consent: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    loadEnrollments();
  }, [refreshTrigger]);

  const loadEnrollments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { getEnrollments } = await import('../lib/supabase');
      const data = await getEnrollments();
      setEnrollments(data);
    } catch (err) {
      console.error('Error loading enrollments:', err);
      setError('Failed to load enrollments. Please check your authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { updateEnrollmentStatus } = await import('../lib/supabase');
      await updateEnrollmentStatus(id, newStatus);
      // Refresh the data
      loadEnrollments();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  const deleteEnrollment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enrollment?')) return;
    
    try {
      const { getSupabase } = await import('../lib/supabase');
      const supabase = await getSupabase();
      
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Refresh the data
      loadEnrollments();
      if (selectedEnrollment?.id === id) {
        setSelectedEnrollment(null);
      }
    } catch (err) {
      console.error('Error deleting enrollment:', err);
      alert('Failed to delete enrollment');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-electric-yellow bg-electric-yellow/10';
      case 'contacted':
        return 'text-cyan-electric bg-cyan-electric/10';
      case 'enrolled':
        return 'text-matrix-green bg-matrix-green/10';
      case 'cancelled':
        return 'text-electric-red bg-electric-red/10';
      default:
        return 'text-charcoal bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'contacted':
        return <Clock className="w-4 h-4" />;
      case 'enrolled':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesStatus = filterStatus === 'all' || enrollment.status === filterStatus;
    const matchesSearch =
      enrollment.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: enrollments.length,
    pending: enrollments.filter((e) => e.status === 'pending').length,
    contacted: enrollments.filter((e) => e.status === 'contacted').length,
    enrolled: enrollments.filter((e) => e.status === 'enrolled').length,
    cancelled: enrollments.filter((e) => e.status === 'cancelled').length,
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Course', 'Status', 'Message', 'Consent', 'Created At', 'Updated At'];
    const rows = filteredEnrollments.map((e) => [
      e.id,
      e.full_name,
      e.email,
      e.phone,
      e.course,
      e.status,
      e.message || '',
      e.consent ? 'Yes' : 'No',
      new Date(e.created_at).toLocaleString(),
      new Date(e.updated_at).toLocaleString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enrollments-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (isLoading && enrollments.length === 0) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-white text-xl">Loading enrollments...</div>
      </div>
    );
  }

  if (error && enrollments.length === 0) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="text-electric-red text-xl mb-4">{error}</div>
          <Button onClick={loadEnrollments}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-dark to-navy">
      {/* Header with Logout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-soft-white">Manage course enrollments and applications</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={handleRefresh} variant="secondary">
              Refresh
            </Button>
            <Button onClick={onLogout} variant="secondary">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-navy-dark border-2 border-electric-yellow/30 rounded-lg p-6">
            <div className="text-soft-white text-sm mb-1">Total Applications</div>
            <div className="text-white text-3xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-navy-dark border-2 border-electric-yellow/30 rounded-lg p-6">
            <div className="text-soft-white text-sm mb-1">Pending</div>
            <div className="text-electric-yellow text-3xl font-bold">{stats.pending}</div>
          </div>
          <div className="bg-navy-dark border-2 border-cyan-electric/30 rounded-lg p-6">
            <div className="text-soft-white text-sm mb-1">Contacted</div>
            <div className="text-cyan-electric text-3xl font-bold">{stats.contacted}</div>
          </div>
          <div className="bg-navy-dark border-2 border-matrix-green/30 rounded-lg p-6">
            <div className="text-soft-white text-sm mb-1">Enrolled</div>
            <div className="text-matrix-green text-3xl font-bold">{stats.enrolled}</div>
          </div>
          <div className="bg-navy-dark border-2 border-electric-red/30 rounded-lg p-6">
            <div className="text-soft-white text-sm mb-1">Cancelled</div>
            <div className="text-electric-red text-3xl font-bold">{stats.cancelled}</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-navy-dark rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-navy border border-electric-yellow/30 text-white placeholder-soft-white/50 focus:outline-none focus:ring-2 focus:ring-electric-yellow"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-lg bg-navy border border-electric-yellow/30 text-white focus:outline-none focus:ring-2 focus:ring-electric-yellow"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="enrolled">Enrolled</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Button onClick={exportToCSV} variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Enrollments Table */}
          <div className="overflow-x-auto rounded-lg border border-electric-yellow/20">
            <table className="w-full">
              <thead>
                <tr className="bg-navy/50">
                  <th className="text-left py-3 px-4 text-soft-white font-semibold">Name</th>
                  <th className="text-left py-3 px-4 text-soft-white font-semibold">Contact</th>
                  <th className="text-left py-3 px-4 text-soft-white font-semibold">Course</th>
                  <th className="text-left py-3 px-4 text-soft-white font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-soft-white font-semibold">Applied</th>
                  <th className="text-left py-3 px-4 text-soft-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((enrollment) => (
                  <tr
                    key={enrollment.id}
                    className="border-b border-electric-yellow/10 hover:bg-navy/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedEnrollment(enrollment)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <UserCircle className="w-8 h-8 text-electric-yellow" />
                        <div>
                          <span className="text-white font-medium block">{enrollment.full_name}</span>
                          <span className="text-soft-white text-sm">ID: {enrollment.id.substring(0, 8)}...</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-soft-white space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${enrollment.email}`} className="hover:text-electric-yellow truncate">
                            {enrollment.email}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <a 
                            href={`https://wa.me/${enrollment.phone.replace(/[^0-9]/g, '')}`} 
                            className="hover:text-matrix-green truncate"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {enrollment.phone}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-electric-pink" />
                        <span className="text-white">{enrollment.course}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(enrollment.status)}`}>
                        {getStatusIcon(enrollment.status)}
                        <span className="capitalize">{enrollment.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-soft-white">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(enrollment.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={enrollment.status}
                          onChange={(e) => updateStatus(enrollment.id, e.target.value)}
                          className="px-3 py-1 rounded bg-navy border border-electric-yellow/30 text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-yellow"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => deleteEnrollment(enrollment.id)}
                          className="px-3 py-1 rounded bg-electric-red/20 border border-electric-red/30 text-electric-red text-sm hover:bg-electric-red/30 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEnrollments.length === 0 && (
              <div className="text-center py-12 text-soft-white">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-electric-yellow/50" />
                <p>No enrollments found matching your criteria.</p>
                <Button onClick={() => { setSearchTerm(''); setFilterStatus('all'); }} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enrollment Details Modal */}
      {selectedEnrollment && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEnrollment(null)}
        >
          <div
            className="bg-navy-dark rounded-lg p-8 max-w-2xl w-full border-2 border-electric-yellow/30 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-white text-2xl font-bold">Application Details</h2>
                <p className="text-soft-white text-sm mt-1">ID: {selectedEnrollment.id}</p>
              </div>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="text-soft-white hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-soft-white text-sm font-semibold">Full Name</label>
                  <div className="text-white text-lg mt-1">{selectedEnrollment.full_name}</div>
                </div>
                <div>
                  <label className="text-soft-white text-sm font-semibold">Consent Given</label>
                  <div className="text-white text-lg mt-1">
                    {selectedEnrollment.consent ? (
                      <span className="text-matrix-green">✓ Yes</span>
                    ) : (
                      <span className="text-electric-red">✗ No</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-soft-white text-sm font-semibold">Email</label>
                  <a
                    href={`mailto:${selectedEnrollment.email}`}
                    className="text-electric-yellow hover:underline block mt-1"
                  >
                    {selectedEnrollment.email}
                  </a>
                </div>
                <div>
                  <label className="text-soft-white text-sm font-semibold">Phone / WhatsApp</label>
                  <a
                    href={`https://wa.me/${selectedEnrollment.phone.replace(/[^0-9]/g, '')}`}
                    className="text-matrix-green hover:underline block mt-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedEnrollment.phone}
                  </a>
                </div>
              </div>

              <div>
                <label className="text-soft-white text-sm font-semibold">Course</label>
                <div className="text-white text-lg mt-1">{selectedEnrollment.course}</div>
              </div>

              {selectedEnrollment.message && (
                <div>
                  <label className="text-soft-white text-sm font-semibold">Message</label>
                  <div className="text-white mt-1 bg-navy p-4 rounded-lg whitespace-pre-wrap">
                    {selectedEnrollment.message}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-soft-white text-sm font-semibold">Status</label>
                  <select
                    value={selectedEnrollment.status}
                    onChange={(e) => updateStatus(selectedEnrollment.id, e.target.value)}
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-navy border border-electric-yellow/30 text-white focus:outline-none focus:ring-2 focus:ring-electric-yellow"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="text-soft-white text-sm font-semibold">Applied Date</label>
                  <div className="text-white mt-1">
                    {new Date(selectedEnrollment.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-soft-white text-sm font-semibold">Last Updated</label>
                  <div className="text-white mt-1">
                    {new Date(selectedEnrollment.updated_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button onClick={() => deleteEnrollment(selectedEnrollment.id)} variant="secondary" className="bg-electric-red/20 border-electric-red/30 text-electric-red hover:bg-electric-red/30">
                Delete Application
              </Button>
              <div className="flex gap-4">
                <Button onClick={() => setSelectedEnrollment(null)} variant="secondary">
                  Close
                </Button>
                <Button onClick={() => {
                  updateStatus(selectedEnrollment.id, 'contacted');
                  setSelectedEnrollment(null);
                }}>
                  Mark as Contacted
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}