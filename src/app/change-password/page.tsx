'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '@/api/auth.api';
import { PublicHeader } from '@/components/layout/public-header';
import Link from 'next/link';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    setStatus('loading');
    try {
      await authApi.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-3xl font-bold mb-8 dark:text-white">Change Password</h1>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border dark:border-gray-700">
            {status === 'success' ? (
              <div className="text-center">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h2 className="text-xl font-semibold mb-2 dark:text-white">Password Changed!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Your password has been updated successfully.</p>
                <Link href="/profile" className="text-blue-600 hover:underline">Back to Profile</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errorMsg && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">{errorMsg}</div>}
                
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Current Password</label>
                  <input type="password" {...register('currentPassword')} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                  {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">New Password</label>
                  <input type="password" {...register('newPassword')} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                  {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Confirm New Password</label>
                  <input type="password" {...register('confirmPassword')} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                <button type="submit" disabled={status === 'loading'} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50">
                  {status === 'loading' ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
