'use client';

import { useState } from 'react';
import { newsletterApi } from '@/api/newsletter.api';

export default function AdminNewsletterPage() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await newsletterApi.send({ subject, content });
      setStatus('sent');
    } catch (err) {
      setStatus('idle');
      alert('Failed to send newsletter');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Newsletter Management</h1>
      
      <div className="bg-white rounded-lg border p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Send Newsletter</h2>
        {status === 'sent' ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <p className="text-lg font-medium">Newsletter Sent!</p>
            <button onClick={() => setStatus('idle')} className="mt-4 text-blue-600 hover:underline">Send Another</button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <button type="submit" disabled={status === 'sending'} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {status === 'sending' ? 'Sending...' : 'Send to All Subscribers'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
