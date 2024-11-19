'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Trash2, Copy, ArrowLeft } from 'lucide-react';

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load history from API when component mounts
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/emails');
      
      if (!res.ok) {
        if (res.status === 401) {
          // Redirect to login if unauthorized
          router.push('/auth/signin');
          return;
        }
        throw new Error('Failed to fetch history');
      }
      
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
      setError('Failed to load email history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/emails?id=${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/auth/signin');
          return;
        }
        throw new Error('Failed to delete email');
      }
      
      // Update local state after successful deletion
      setHistory(history.filter(email => email._id !== id));
      showToast('Email deleted successfully');
    } catch (error) {
      console.error('Error deleting email:', error);
      showToast('Failed to delete email', 'error');
    }
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      showToast('Copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg ${
      type === 'success' ? 'bg-white/10 text-white' : 'bg-red-500/10 text-red-500'
    } backdrop-blur-sm border ${
      type === 'success' ? 'border-white/10' : 'border-red-500/10'
    }`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Email History</h1>
          </div>
          {history.length > 0 && (
            <button
              onClick={async () => {
                try {
                  const promises = history.map(email => 
                    fetch(`/api/emails?id=${email._id}`, { method: 'DELETE' })
                  );
                  await Promise.all(promises);
                  setHistory([]);
                  showToast('History cleared successfully');
                } catch (error) {
                  console.error('Error clearing history:', error);
                  showToast('Failed to clear history', 'error');
                }
              }}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Clear History
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/70">Loading your email history...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
            <button
              onClick={fetchHistory}
              className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && history.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white/70">No emails generated yet</h3>
            <p className="text-white/50 mt-2">Generated emails will appear here</p>
          </div>
        )}

        {/* Email List */}
        {!loading && !error && history.length > 0 && (
          <div className="space-y-4">
            {history.map((email) => (
              <div
                key={email._id}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2 text-sm text-white/50 mb-2">
                      <span>{email.type}</span>
                      <span>•</span>
                      <span>{email.tone}</span>
                      <span>•</span>
                      <span>{formatDate(email.timestamp)}</span>
                    </div>
                    <p className="text-white/70">{email.prompt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCopy(email.content)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                      title="Copy email"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(email._id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/70 hover:text-red-500"
                      title="Delete email"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-white/80">
                  {email.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}