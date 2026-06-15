'use client';

import { useState } from 'react';
import { useRegister } from '@/hooks/use-auth';
import { SignupForm } from '@/components/ui/signup-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Link from 'next/link';

export default function RegisterPage() {
  const registerMutation = useRegister();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(true);

  const handleSubmit = async (data: any) => {
    try {
      setError('');
      // name field will be auto-split into firstName/lastName in the hook
      await registerMutation.mutateAsync({ 
        name: data.name, 
        email: data.email, 
        password: data.password 
      });
      setOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[460px] p-0 gap-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
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
            <DialogTitle className="text-2xl font-bold">Create Account</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              Get started with your free account
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6">
            <SignupForm onSubmit={handleSubmit} isLoading={registerMutation.isPending} error={error} />
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-8 text-center">
        <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}