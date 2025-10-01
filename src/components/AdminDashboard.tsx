import { useState, useEffect } from 'react';
import { CircleUser as UserCircle, Mail, Phone, BookOpen, Calendar, Clock, Filter, Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
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

export default function AdminDashboard() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    loadEnrollments();
  }, []);

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
      await loadEnrollments();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
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
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Course', 'Status', 'Created At', 'Message'];
    const rows = filteredEnrollments.map((e) => [
      e.full_name,
      e.email,
      e.phone,
      e.course,
      e.status,
      new Date(e.created_at).toLocaleString(),
      e.message || '',
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enrollments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-white text-xl">Loading enrollments...</div>
      </div>
    );
  }

  if (error) {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-soft-white">Manage course enrollments and applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
        </div>

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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-electric-yellow/20">
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
                    className="border-b border-electric-yellow/10 hover:bg-navy/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedEnrollment(enrollment)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <UserCircle className="w-8 h-8 text-electric-yellow" />
                        <span className="text-white font-medium">{enrollment.full_name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-soft-white space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${enrollment.email}`} className="hover:text-electric-yellow">
                            {enrollment.email}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <a href={`https://wa.me/${enrollment.phone.replace(/[^0-9]/g, '')}`} className="hover:text-matrix-green">
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
                      <select
                        value={enrollment.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateStatus(enrollment.id, e.target.value);
                        }}
                        className="px-3 py-1 rounded bg-navy border border-electric-yellow/30 text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-yellow"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEnrollments.length === 0 && (
              <div className="text-center py-12 text-soft-white">
                No enrollments found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedEnrollment && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEnrollment(null)}
        >
          <div
            className="bg-navy-dark rounded-lg p-8 max-w-2xl w-full border-2 border-electric-yellow/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-white text-2xl font-bold">Application Details</h2>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="text-soft-white hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-soft-white text-sm font-semibold">Full Name</label>
                <div className="text-white text-lg mt-1">{selectedEnrollment.full_name}</div>
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
                  <div className="text-white mt-1 bg-navy p-4 rounded-lg">{selectedEnrollment.message}</div>
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
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={() => setSelectedEnrollment(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
