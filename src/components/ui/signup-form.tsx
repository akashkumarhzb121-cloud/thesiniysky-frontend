'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const LabelInputContainer = ({ children, className }: LabelInputContainerProps) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};

interface SignupFormProps {
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
  error?: string;
}

export function SignupForm({ onSubmit, isLoading, error }: SignupFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    onSubmit?.(data);
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              id="name" name="name" placeholder="John Doe" type="text" required
              className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </LabelInputContainer>
        </div>
        
        <LabelInputContainer>
          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            id="email" name="email" placeholder="name@example.com" type="email" required
            className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </LabelInputContainer>
        
        <LabelInputContainer>
          <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            id="password" name="password" placeholder="Min. 8 characters" type="password" required
            className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-11 w-full rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 font-medium text-white shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all disabled:opacity-50 mt-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create Account →'}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

export function LoginForm({ onSubmit, isLoading, error }: SignupFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    onSubmit?.(data);
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            id="email" name="email" placeholder="name@example.com" type="email" required
            className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </LabelInputContainer>
        
        <LabelInputContainer>
          <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            id="password" name="password" placeholder="Enter your password" type="password" required
            className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-11 w-full rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 font-medium text-white shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all disabled:opacity-50 mt-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In →'}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}