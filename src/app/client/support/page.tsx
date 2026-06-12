'use client';

import { useState } from 'react';

export default function ClientSupportPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Support</h1>
      {submitted ? (
        <div className="bg-white rounded-lg border p-6 text-center">
          <div className="text-green-500 text-4xl mb-4">✓</div>
          <p className="text-lg font-medium">Ticket Submitted!</p>
          <p className="text-gray-500 mt-2">We'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-6">
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea rows={5} className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Submit Ticket</button>
          </form>
        </div>
      )}
    </div>
  );
}
