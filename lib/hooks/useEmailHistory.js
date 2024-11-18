'use client';
import { useState, useEffect } from 'react';

export function useEmailHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('emailHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (email) => {
    const newHistory = [{
      id: Date.now(),
      ...email,
      timestamp: new Date().toISOString()
    }, ...history].slice(0, 50); // Keep only last 50 emails

    setHistory(newHistory);
    localStorage.setItem('emailHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('emailHistory');
  };

  const deleteFromHistory = (id) => {
    const newHistory = history.filter(email => email.id !== id);
    setHistory(newHistory);
    localStorage.setItem('emailHistory', JSON.stringify(newHistory));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    deleteFromHistory
  };
}