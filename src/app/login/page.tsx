'use client';

import { useState } from 'react';
import { useLogin } from '@/hooks/use-auth';
import { LoginForm } from '@/components/ui/signup-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function LoginPage() {
  const loginMutation = useLogin();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(true);

  const handleSubmit = async (data: any) => {
    try {
      setError('');
      await loginMutation.mutateAsync({ email: data.email, password: data.password });
      setOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[440px] p-0 gap-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <DialogHeader className="p-6 pb-2 text-center">
            <div className="flex justify-center mb-3">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  TheSiniySky
                </span>
              </Link>
            </div>
            <DialogTitle className="text-2xl font-bold">Welcome Back</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              Sign in to your account to continue
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6">
            <LoginForm onSubmit={handleSubmit} isLoading={loginMutation.isPending} error={error} />
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <Link href="/forgot-password" className="text-blue-600 hover:underline font-medium">
                  Forgot your password?
                </Link>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-blue-600 hover:underline font-medium">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Backdrop link to navigate back */}
      <div className="fixed bottom-8 text-center">
        <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}