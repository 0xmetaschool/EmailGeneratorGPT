'use client';

import { useState, useEffect } from 'react';

export function useEmailHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('emailHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (err) {
      console.error('Error loading history:', err);
      setError('Failed to load email history');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new email to history
  const addToHistory = (email) => {
    try {
      const newHistory = [{
        id: Date.now(),
        ...email,
        timestamp: new Date().toISOString()
      }, ...history].slice(0, 50); // Keep only last 50 emails

      setHistory(newHistory);
      localStorage.setItem('emailHistory', JSON.stringify(newHistory));
    } catch (err) {
      console.error('Error adding to history:', err);
      setError('Failed to save email to history');
    }
  };

  // Delete an email from history
  const deleteFromHistory = (emailId) => {
    try {
      const newHistory = history.filter(email => email.id !== emailId);
      setHistory(newHistory);
      localStorage.setItem('emailHistory', JSON.stringify(newHistory));
    } catch (err) {
      console.error('Error deleting email:', err);
      setError('Failed to delete email');
    }
  };

  // Clear all history
  const clearHistory = () => {
    try {
      setHistory([]);
      localStorage.removeItem('emailHistory');
    } catch (err) {
      console.error('Error clearing history:', err);
      setError('Failed to clear history');
    }
  };

  // Refresh history (re-load from localStorage)
  const refreshHistory = () => {
    try {
      const savedHistory = localStorage.getItem('emailHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (err) {
      console.error('Error refreshing history:', err);
      setError('Failed to refresh history');
    }
  };

  return {
    history,
    loading,
    error,
    addToHistory,
    deleteFromHistory,
    clearHistory,
    refreshHistory,
  };
}