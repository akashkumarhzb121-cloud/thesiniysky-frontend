'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testimonialsApi } from '@/api/testimonials.api';
import { mediaApi } from '@/api/media.api';
import { useState } from 'react';
import { Star, Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialsPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', company: '', content: '', rating: 5 });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => testimonialsApi.getAll().then(r => r.data.data),
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      let avatar = '';
      if (image) {
        const uploadRes = await mediaApi.upload(image);
        avatar = uploadRes.data.data.url;
      }
      return testimonialsApi.create({ ...formData, avatar });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setSubmitted(true);
      setShowForm(false);
      setFormData({ name: '', role: '', company: '', content: '', rating: 5 });
      setImage(null);
      setPreview('');
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const approved = testimonials?.filter((t: any) => t.status === 'approved') || [];

  return (
    <>
      <PublicHeader />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Testimonials</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">What our clients say about us</p>
            <button onClick={() => setShowForm(!showForm)} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
              {showForm ? 'Close Form' : 'Share Your Experience'}
            </button>
          </div>

          {/* Submission Form */}
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mb-16 bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-700 p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Share Your Review</h2>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✅</div>
                  <p className="text-lg font-medium dark:text-white">Thank you for your review!</p>
                  <p className="text-gray-500 mt-2">It will be published after approval.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); submitMutation.mutate(); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name *</label>
                      <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-gray-300">Role</label>
                      <input value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="CEO, Developer..." className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Company</label>
                    <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Your Review *</label>
                    <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={4} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Rating</label>
                    <div className="flex gap-1 text-2xl">
                      {[1,2,3,4,5].map(star => (
                        <button key={star} type="button" onClick={() => setFormData({...formData, rating: star})} className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Your Photo (optional)</label>
                    <div className="flex items-center gap-4">
                      {preview && <img src={preview} alt="Preview" className="w-16 h-16 rounded-full object-cover" />}
                      <label className="cursor-pointer bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Upload Photo
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                      {preview && <button onClick={() => { setImage(null); setPreview(''); }} className="text-red-500"><X className="w-4 h-4" /></button>}
                    </div>
                  </div>
                  <button type="submit" disabled={submitMutation.isPending} className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 font-medium">
                    {submitMutation.isPending ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </motion.div>
          )}

          {/* Testimonials Grid */}
          {isLoading ? (
            <div className="text-center py-12"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></div>
          ) : approved.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {approved.map((testimonial: any) => (
                <motion.div key={testimonial._id || testimonial.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border dark:border-gray-700 text-center">
                  {testimonial.avatar ? (
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-4 ring-blue-100 dark:ring-blue-900" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">{testimonial.name?.charAt(0)}</div>
                  )}
                  <div className="text-yellow-400 mb-3">{'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <h4 className="font-semibold dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}{testimonial.company ? ' at ' + testimonial.company : ''}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">No testimonials yet. Be the first to share your experience!</div>
          )}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}