'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { blogsApi } from '@/api/blogs.api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogsApi.getBySlug(slug).then(r => r.data.data),
    enabled: !!slug,
  });

  if (isLoading) return <><PublicHeader /><main className="py-20 text-center"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></main><PublicFooter /></>;
  if (!blog) return <><PublicHeader /><main className="py-20 text-center"><h1 className="text-4xl font-bold mb-4 dark:text-white">Blog Not Found</h1><Link href="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link></main><PublicFooter /></>;

  return (
    <>
      <PublicHeader />
      <main className="py-12">
        <article className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
          {blog.thumbnail && <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">{blog.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {blog.readTime || 5} min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">{blog.title}</h1>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{blog.content || blog.excerpt}</div>
        </article>
      </main>
      <PublicFooter />
    </>
  );
}