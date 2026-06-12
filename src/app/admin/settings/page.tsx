'use client';

import { useState } from 'react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Settings</h1>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-sm">
          Note: Backend settings API is not yet available. Changes made here are UI-only.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Site Name</label>
              <input defaultValue="TheSiniySky" className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Site Description</label>
              <textarea defaultValue="Premium SaaS Platform" rows={3} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
              <input defaultValue="contact@thesiniysky.com" className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Phone</label>
              <input defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
            </div>
          </div>
        </div>

        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          {saved ? 'Saved!' : 'Save Settings (UI Only)'}
        </button>
      </div>
    </div>
  );
}
