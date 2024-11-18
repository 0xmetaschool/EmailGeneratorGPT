'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Trash2, Copy, ArrowLeft } from 'lucide-react';

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);

  // Load history from localStorage when component mounts
  useEffect(() => {
    const savedHistory = localStorage.getItem('emailHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading history:', error);
        setHistory([]);
      }
    }
  }, []);

  const handleDelete = (id) => {
    const newHistory = history.filter(email => email.id !== id);
    setHistory(newHistory);
    localStorage.setItem('emailHistory', JSON.stringify(newHistory));
  };

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
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Email History</h1>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => {
                localStorage.removeItem('emailHistory');
                setHistory([]);
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear History
            </button>
          )}
        </div>

        {/* Email List */}
        {history.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400">No emails generated yet</h3>
            <p className="text-gray-500 mt-2">Generated emails will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((email) => (
              <div
                key={email.id}
                className="bg-gray-800 rounded-xl p-6 space-y-4"
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
                      className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(email.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete from history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap font-sans text-gray-300">
                    {email.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}