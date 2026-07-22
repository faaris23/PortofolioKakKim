import React, { useState, useEffect } from 'react';
import { Loader, RefreshCw, CheckCircle2, AlertCircle, Trash2, Eye } from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  description: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Load inquiries
  const loadInquiries = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/inquiries`);
      if (!response.ok) throw new Error('Failed to fetch inquiries');
      const data = await response.json();
      setInquiries(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inquiries');
    } finally {
      setIsLoading(false);
    }
  };

  // Update status
  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`${API_URL}/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update inquiry');
      loadInquiries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update inquiry');
    }
  };

  // Delete inquiry
  const deleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const response = await fetch(`${API_URL}/api/inquiries/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete inquiry');
      loadInquiries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete inquiry');
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const filteredInquiries = filterStatus === 'all' 
    ? inquiries 
    : inquiries.filter(inq => inq.status === filterStatus);

  const statusColors: Record<string, string> = {
    pending: 'bg-blue-100 text-blue-800',
    reviewed: 'bg-purple-100 text-purple-800',
    accepted: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-brand-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary">Commission Inquiries</h1>
            <p className="text-brand-dark/60 mt-1">Manage and respond to commission requests</p>
          </div>
          <button
            onClick={loadInquiries}
            disabled={isLoading}
            className="flex items-center gap-2 bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-brand-teal/90 disabled:bg-brand-teal/50"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6 flex items-start gap-3">
            <AlertCircle className="text-red-500 mt-0.5" size={18} />
            <div>
              <p className="font-semibold text-red-800">{error}</p>
              <button
                onClick={() => setError('')}
                className="text-sm text-red-700 hover:text-red-900 mt-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'reviewed', 'accepted', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filterStatus === status
                  ? 'bg-brand-teal text-white'
                  : 'bg-brand-surface-low text-brand-dark hover:bg-brand-surface-lowest'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin text-brand-teal" size={32} />
          </div>
        )}

        {/* Inquiries Table */}
        {!isLoading && filteredInquiries.length > 0 && (
          <div className="bg-white rounded-lg border border-brand-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-brand-surface-lowest border-b border-brand-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">Project</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">Budget</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-brand-border hover:bg-brand-surface-low/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-brand-primary">{inquiry.name}</p>
                        <p className="text-xs text-brand-dark/60">{inquiry.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-brand-dark">{inquiry.projectType}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-brand-teal">{inquiry.budget}</p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={inquiry.status}
                        onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                        className={`px-3 py-1 rounded text-xs font-medium border-0 cursor-pointer ${statusColors[inquiry.status]}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-brand-dark/60">
                        {new Date(inquiry.submittedAt).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          title="View details"
                          className="text-brand-teal hover:text-brand-teal-dark"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => deleteInquiry(inquiry.id)}
                          title="Delete"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredInquiries.length === 0 && (
          <div className="text-center py-12 bg-brand-surface-low rounded-lg border border-brand-border">
            <CheckCircle2 size={48} className="mx-auto text-brand-teal/50 mb-3" />
            <p className="text-brand-dark/60">No inquiries found</p>
          </div>
        )}

        {/* Details Modal */}
        {selectedInquiry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto p-6">
              <h2 className="text-xl font-bold text-brand-primary mb-4">{selectedInquiry.name}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-primary mb-1">Email</label>
                  <p className="text-sm text-brand-dark">{selectedInquiry.email}</p>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-brand-primary mb-1">Project Type</label>
                  <p className="text-sm text-brand-dark">{selectedInquiry.projectType}</p>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-brand-primary mb-1">Budget</label>
                  <p className="text-sm text-brand-teal font-medium">{selectedInquiry.budget}</p>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-brand-primary mb-1">Status</label>
                  <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${statusColors[selectedInquiry.status]}`}>
                    {selectedInquiry.status}
                  </span>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-brand-primary mb-1">Submitted</label>
                  <p className="text-sm text-brand-dark">
                    {new Date(selectedInquiry.submittedAt).toLocaleString('id-ID')}
                  </p>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-brand-primary mb-1">Description</label>
                  <p className="text-sm text-brand-dark bg-brand-surface-low p-3 rounded">
                    {selectedInquiry.description}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="flex-1 bg-brand-teal text-white py-2 rounded-lg text-sm font-medium hover:bg-brand-teal/90 text-center"
                >
                  Send Email
                </a>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="flex-1 bg-brand-surface-low text-brand-dark py-2 rounded-lg text-sm font-medium hover:bg-brand-surface-lowest"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
