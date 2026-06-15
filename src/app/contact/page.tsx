'use client';

import { useState } from 'react';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { contactApi } from '@/api/contact.api';
import { newsletterApi } from '@/api/newsletter.api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, Newspaper, 
  Clock, MessageCircle, ArrowRight, CheckCircle2,
  Sparkles, Building2, Globe, Users
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await contactApi.submit(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    try {
      await newsletterApi.subscribe(newsletterEmail);
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    } catch (error) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  const contactCards = [
    { icon: Mail, title: 'Email Us', content: 'contact@thesiniysky.com', sub: 'We reply within 24 hours', color: 'from-blue-500 to-blue-600', glow: 'group-hover:shadow-blue-500/20' },
    { icon: Phone, title: 'Call Us', content: '+1 (555) 123-4567', sub: 'Mon-Fri 9am-6pm EST', color: 'from-green-500 to-emerald-600', glow: 'group-hover:shadow-green-500/20' },
    { icon: MapPin, title: 'Visit Us', content: 'New York, NY 10001', sub: 'United States', color: 'from-purple-500 to-violet-600', glow: 'group-hover:shadow-purple-500/20' },
    { icon: Clock, title: 'Support Hours', content: '24/7 Available', sub: 'Premium support for all plans', color: 'from-orange-500 to-amber-600', glow: 'group-hover:shadow-orange-500/20' },
  ];

  return (
    <>
      <PublicHeader />
      <main className="py-16 md:py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-full px-4 py-2 mb-6">
              <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Let&apos;s Start a Conversation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a question or want to work together? We&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">Send us a Message</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fill out the form and we&apos;ll get back to you shortly.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-700" 
                        placeholder="John Doe"
                        required 
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-700" 
                        placeholder="john@example.com"
                        required 
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                    <input 
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-700" 
                      placeholder="Project Inquiry"
                      required 
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message *</label>
                    <textarea 
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-700 resize-none" 
                      placeholder="Tell us about your project..."
                      required 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : status === 'success' ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Message Sent Successfully!
                        </>
                      ) : status === 'error' ? (
                        'Failed to send. Try again.'
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar - Contact Cards + Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Contact Info Cards */}
              {contactCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 cursor-pointer transition-all duration-300 hover:shadow-xl ${card.glow}`}
                >
                  {/* Animated border glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shrink-0 transition-transform duration-300 ${activeCard === index ? 'scale-110 rotate-6' : ''}`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{card.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-medium mt-0.5">{card.content}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{card.sub}</p>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-gray-400 ml-auto transition-all duration-300 ${activeCard === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                  </div>
                </motion.div>
              ))}

              {/* Newsletter Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-blue-100 dark:border-blue-800 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Newsletter</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Stay updated with our latest news</p>
                  </div>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="your@email.com" 
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      required 
                    />
                    <button 
                      type="submit" 
                      disabled={newsletterStatus === 'loading'}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:from-blue-500 hover:to-indigo-500 transition-all disabled:opacity-50 shrink-0"
                    >
                      {newsletterStatus === 'loading' ? '...' : newsletterStatus === 'success' ? '✓' : 'Subscribe'}
                    </button>
                  </div>
                </form>
                {newsletterStatus === 'success' && (
                  <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-green-600 text-xs mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Subscribed successfully!
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}