'use client';

import { useState } from 'react';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { contactApi } from '@/api/contact.api';
import { newsletterApi } from '@/api/newsletter.api';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await contactApi.submit(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    try {
      await newsletterApi.subscribe(newsletterEmail);
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterStatus('error');
    }
  };

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subject *</label>
                  <input 
                    type="text" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message *</label>
                  <textarea 
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'success' && <p className="text-green-600">Message sent successfully!</p>}
                {status === 'error' && <p className="text-red-600">Failed to send message. Please try again.</p>}
              </form>
            </div>

            {/* Contact Info & Newsletter */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4 text-gray-600">
                  <p>📍 New York, NY 10001</p>
                  <p>📧 contact@thesiniysky.com</p>
                  <p>📞 +1 (555) 123-4567</p>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Newsletter Subscription</h3>
                <p className="text-gray-600 mb-4">Subscribe to get updates on new services and features.</p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input 
                    type="email" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="your@email.com" 
                    className="flex-1 px-3 py-2 border rounded-md" 
                    required 
                  />
                  <button 
                    type="submit" 
                    disabled={newsletterStatus === 'loading'}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {newsletterStatus === 'loading' ? '...' : 'Subscribe'}
                  </button>
                </form>
                {newsletterStatus === 'success' && <p className="text-green-600 mt-2">Subscribed successfully!</p>}
                {newsletterStatus === 'error' && <p className="text-red-600 mt-2">Failed to subscribe.</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
