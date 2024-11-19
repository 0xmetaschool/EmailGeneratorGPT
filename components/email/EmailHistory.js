'use client';

import { useEmailHistory } from '@/hooks/useEmailHistory';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2, Copy, ArrowLeft, RefreshCw, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useState, forwardRef, useImperativeHandle } from 'react';

const EmailHistory = forwardRef(function EmailHistory(props, ref) {
  const { history, deleteFromHistory, clearHistory, refreshHistory } = useEmailHistory();
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7');
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Expose refreshHistory method via ref
  useImperativeHandle(ref, () => ({
    refreshHistory
  }));

  const filteredHistory = history.filter(email => {
    const date = new Date(email.timestamp);
    const now = new Date();
    const daysDiff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (timeRange === '7' && daysDiff > 7) return false;
    if (timeRange === '30' && daysDiff > 30) return false;
    if (timeRange === '90' && daysDiff > 90) return false;

    return filter === 'all' || email.type === filter;
  });

  const handleCopy = async (content) => {
    await navigator.clipboard.writeText(content);
    // Show toast notification
    const toast = document.createElement('div');
    toast.textContent = 'Copied to clipboard!';
    toast.className = 'fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg z-50';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
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

  const toggleEmail = (emailId) => {
    setExpandedEmail(expandedEmail === emailId ? null : emailId);
  };

  return (
    <div className="bg-black rounded-lg border border-zinc-800 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Email History
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={refreshHistory}
            className="p-2 text-white hover:bg-zinc-900 rounded-full transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-zinc-900 p-4 rounded-lg space-y-4 mb-4">
              <div className="flex flex-wrap gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Time Range</label>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="block w-full px-3 py-2 bg-black border border-zinc-800 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-white"
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                    <option value="all">All time</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Email Type</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="block w-full px-3 py-2 bg-black border border-zinc-800 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-white"
                  >
                    <option value="all">All Types</option>
                    <option value="business">Business</option>
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="friendly">Friendly</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="thank-you">Thank You</option>
                    <option value="apology">Apology</option>
                    <option value="introduction">Introduction</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email List */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-zinc-400">No emails in history</h3>
            <p className="text-zinc-500 mt-2">Generated emails will appear here</p>
          </div>
        ) : (
          filteredHistory.map((email) => (
            <motion.div
              key={email._id}
              layout
              className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors"
            >
              {/* Email Header */}
              <div
                onClick={() => toggleEmail(email._id)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span className="text-sm font-medium text-white uppercase tracking-wide">
                        {email.type}
                      </span>
                    </div>
                    <span className="text-sm text-zinc-400">
                      {formatDate(email.timestamp)}
                    </span>
                  </div>
                  <p className="text-zinc-300 font-medium line-clamp-1">{email.prompt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(email.content);
                    }}
                    className="p-1.5 text-white hover:bg-black/50 rounded-full transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFromHistory(email._id);
                    }}
                    className="p-1.5 text-white hover:bg-black/50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedEmail === email._id ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white" />
                  )}
                </div>
              </div>

              {/* Email Content */}
              <AnimatePresence>
                {expandedEmail === email._id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-black border-t border-zinc-800">
                      <pre className="whitespace-pre-wrap text-zinc-300 font-sans text-sm">
                        {email.content}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>

      {/* Clear History Button */}
      {filteredHistory.length > 0 && (
        <div className="flex justify-end mt-6">
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-zinc-900 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        </div>
      )}
    </div>
  );
});

EmailHistory.displayName = 'EmailHistory';
export default EmailHistory;