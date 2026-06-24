'use client';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogsApi } from '@/api/blogs.api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Heart, Bookmark, MessageCircle, Send, User } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';

function formatContent(text) {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    let trimmed = line.trim();
    if (!trimmed) return <br key={i} />;
    if (trimmed.match(/^https?:\/\//)) return <a key={i} href={trimmed} target="_blank" className="text-blue-600 hover:underline break-all block mb-1">{trimmed}</a>;
    if (trimmed.match(/link:\s*(https?:\/\/\S+)/)) { const m = trimmed.match(/link:\s*(https?:\/\/\S+)/); return <p key={i} className="mb-1">🔗 <a href={m[1]} target="_blank" className="text-blue-600 hover:underline break-all">{m[1]}</a></p>; }
    const boldText = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>');
    if (trimmed.match(/^[A-Z][^a-z]{2,}:?$/) || trimmed.match(/^[A-Z\s]{5,}$/)) return <h3 key={i} className="font-bold text-xl mt-6 mb-3 text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: boldText }} />;
    if (trimmed.match(/^[•\-*]\s/)) return <li key={i} className="ml-6 mb-1 text-gray-700 dark:text-gray-300 list-disc" dangerouslySetInnerHTML={{ __html: boldText.replace(/^[•\-*]\s/, '') }} />;
    return <p key={i} className="mb-2 text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldText }} />;
  });
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuthStore();
  const [comment, setComment] = useState('');

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogsApi.getBySlug(slug).then(r => r.data.data),
    enabled: !!slug,
  });

  const likeMutation = useMutation({
    mutationFn: () => blogsApi.like(blog?._id || blog?.id || ''),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blog', slug] }),
  });

  const bookmarkMutation = useMutation({
    mutationFn: () => blogsApi.bookmark(blog?._id || blog?.id || ''),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blog', slug] }),
  });

  const commentMutation = useMutation({
    mutationFn: () => blogsApi.addComment(blog?._id || blog?.id || '', comment),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['blog', slug] }); setComment(''); },
  });

  if (isLoading) return <><PublicHeader /><main className="py-20 text-center"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></main><PublicFooter /></>;
  if (!blog) return <><PublicHeader /><main className="py-20 text-center"><h1 className="text-4xl font-bold">Blog Not Found</h1><Link href="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link></main><PublicFooter /></>;

  return (
    <>
      <PublicHeader />
      <main className="py-12">
        <article className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"><ArrowLeft className="w-4 h-4" />Back to Blog</Link>
          
          {blog.thumbnail && <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />}
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{blog.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{blog.readTime || 5} min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 dark:text-white">{blog.title}</h1>

          {/* Action Buttons */}
          <div className="flex items-center gap-6 mb-8 pb-6 border-b dark:border-gray-700">
            <button onClick={() => likeMutation.mutate()} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group">
              <Heart className={`w-5 h-5 ${(blog.likes || 0) > 0 ? 'fill-red-500 text-red-500' : 'group-hover:fill-red-200'}`} />
              <span className="font-medium">{blog.likes || 0} Likes</span>
            </button>
            <button onClick={() => bookmarkMutation.mutate()} className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors group">
              <Bookmark className={`w-5 h-5 ${(blog.bookmarks || 0) > 0 ? 'fill-blue-500 text-blue-500' : 'group-hover:fill-blue-200'}`} />
              <span className="font-medium">{blog.bookmarks || 0} Bookmarks</span>
            </button>
            <div className="flex items-center gap-2 text-gray-500">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{blog.comments?.length || 0} Comments</span>
            </div>
          </div>

          {/* Content */}
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg space-y-1 mb-12">
            {formatContent(blog.content || blog.excerpt)}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm">#{tag}</span>)}
            </div>
          )}

          {/* Comments Section */}
          <div className="border-t dark:border-gray-700 pt-8">
            <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
              <MessageCircle className="w-6 h-6" /> Comments ({blog.comments?.length || 0})
            </h2>

            {/* Add Comment */}
            {isAuthenticated ? (
              <div className="flex gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium shrink-0">
                  {user?.firstName?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your thoughts..." rows={3} className="w-full px-4 py-3 border dark:border-gray-600 rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                  <button onClick={() => comment && commentMutation.mutate()} disabled={!comment || commentMutation.isPending} className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2">
                    <Send className="w-4 h-4" /> {commentMutation.isPending ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center mb-8">
                <p className="text-gray-500 dark:text-gray-400 mb-2">Want to join the discussion?</p>
                <Link href="/login" className="text-blue-600 hover:underline font-medium">Sign in to comment</Link>
              </div>
            )}

            {/* Comments List */}
            {blog.comments && blog.comments.length > 0 ? (
              <div className="space-y-4">
                {blog.comments.map((c, idx) => (
                  <div key={c._id || idx} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium">
                        {c.user?.firstName?.charAt(0) || c.user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-sm dark:text-white">{c.user?.firstName || c.user?.name || 'Anonymous'}</p>
                        <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 ml-11">{c.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </article>
      </main>
      <PublicFooter />
    </>
  );
}