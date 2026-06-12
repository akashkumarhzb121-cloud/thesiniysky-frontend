'use client';

import { useState } from 'react';
import { PublicHeader } from '@/components/layout/public-header';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Email notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Push notifications</span>
                </label>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }} className="space-y-4">
                <div><label className="block text-sm font-medium mb-1">Current Password</label><input type="password" className="w-full px-4 py-2 border rounded-lg" /></div>
                <div><label className="block text-sm font-medium mb-1">New Password</label><input type="password" className="w-full px-4 py-2 border rounded-lg" /></div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">{saved ? 'Saved!' : 'Update Password'}</button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg border border-red-200">
              <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
              <button onClick={() => { logout(); router.push('/'); }} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">Sign Out</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
