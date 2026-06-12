'use client';

import { useState } from 'react';
import { newsletterApi } from '@/api/newsletter.api';

export default function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await newsletterApi.unsubscribe(email);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        {status === 'success' ? (
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-semibold dark:text-white">Unsubscribed</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">You've been removed from our mailing list.</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Unsubscribe</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Enter your email to unsubscribe from our newsletter.</p>
            <form onSubmit={handleUnsubscribe} className="space-y-4">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" required />
              <button type="submit" disabled={status === 'loading'} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50">
                {status === 'loading' ? 'Unsubscribing...' : 'Unsubscribe'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
