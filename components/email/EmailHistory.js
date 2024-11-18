'use client';

import { useEmailHistory } from '@/hooks/useEmailHistory';
import { motion } from 'framer-motion';
import { Clock, Trash2, Copy, ArrowLeft, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const EmailHistory = () => {
  const { history, deleteFromHistory, clearHistory } = useEmailHistory();
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7');

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
    toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg';
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Email History</h2>
        <div className="flex items-center space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
          >
            <option value="all">All Types</option>
            {EMAIL_TYPES.map(type => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="all">All time</option>
          </select>
          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all history?')) {
                  clearHistory();
                }
              }}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Clear History
            </button>
          )}
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400">No emails in history</h3>
          <p className="text-gray-500 mt-2">Generated emails will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((email, index) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>{email.type}</span>
                    <span>•</span>
                    <span>{email.tone}</span>
                    <span>•</span>
                    <span>{formatDate(email.timestamp)}</span>
                  </div>
                  <p className="text-gray-300">{email.prompt}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopy(email.content)}
                    title="Copy to clipboard"
                    className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this email from history?')) {
                        deleteFromHistory(email.id);
                      }
                    }}
                    title="Delete from history"
                    className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 bg-gray-900 rounded-lg p-4">
                <pre className="whitespace-pre-wrap font-sans text-gray-300">
                  {email.content}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailHistory;