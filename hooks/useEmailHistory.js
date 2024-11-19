'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useEmailHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (!res.ok) {
          router.push('/auth/signin');
          return;
        }
        const data = await res.json();
        setUserId(data.userId);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/auth/signin');
      }
    };

    checkAuth();
  }, [router]);

  // Fetch email history
  const fetchHistory = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const response = await fetch('/api/emails');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch email history');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format from server');
      }
      console.log('Fetched email history:', data.length, 'emails');
      setHistory(data);
    } catch (err) {
      console.error('Error fetching email history:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete an email from history
  const deleteFromHistory = async (emailId) => {
    if (!userId) return;
    
    try {
      const response = await fetch(`/api/emails?id=${emailId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete email');
      }
      
      // Update local state after successful deletion
      setHistory(prevHistory => prevHistory.filter(email => email._id !== emailId));
    } catch (err) {
      console.error('Error deleting email:', err);
      setError(err.message);
    }
  };

  // Clear all history
  const clearHistory = async () => {
    if (!userId) return;
    
    try {
      const response = await fetch('/api/emails/clear', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to clear history');
      }
      
      setHistory([]);
    } catch (err) {
      console.error('Error clearing history:', err);
      setError(err.message);
    }
  };

  // Fetch history when userId changes
  useEffect(() => {
    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  return {
    history,
    loading,
    error,
    deleteFromHistory,
    clearHistory,
    refreshHistory: fetchHistory,
  };
}
