'use client';

import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function FormField({ label, name, type = 'text', placeholder, options, required, disabled, error, value, onChange }: FormFieldProps) {
  const inputClass = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ' + (error ? 'border-red-500' : 'border-gray-300') + (disabled ? ' bg-gray-50' : '');

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea id={name} name={name} placeholder={placeholder} required={required} disabled={disabled} value={value} onChange={onChange} className={inputClass} rows={4} />
      ) : type === 'select' ? (
        <select id={name} name={name} required={required} disabled={disabled} value={value} onChange={onChange} className={inputClass}>
          <option value="">Select...</option>
          {options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      ) : (
        <input id={name} name={name} type={type} placeholder={placeholder} required={required} disabled={disabled} value={value} onChange={onChange} className={inputClass} />
      )}
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface FormWrapperProps {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  submitLabel?: string;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

export function FormWrapper({ onSubmit, children, submitLabel = 'Submit', isLoading, error, className = '' }: FormWrapperProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); onSubmit(Object.fromEntries(fd)); }} className={'space-y-4 ' + className}>
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}
      {children}
      <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
        {isLoading ? 'Processing...' : submitLabel}
      </button>
    </form>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-4">{description}</p>}
      {action && (
        <button onClick={action.onClick} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          {action.label}
        </button>
      )}
    </div>
  );
}

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="text-center py-16">
      <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <p className="mt-4 text-gray-500">{message}</p>
    </div>
  );
}
