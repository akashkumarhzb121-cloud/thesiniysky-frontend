'use client';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { blogsApi } from '@/api/blogs.api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

function formatContent(text) {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <br key={i} />;
    if (trimmed.match(/^https?:\/\//)) return <a key={i} href={trimmed} target="_blank" className="text-blue-600 hover:underline break-all block mb-1">{trimmed}</a>;
    if (trimmed.match(/^[A-Z][^a-z]{2,}:?$/)) return <h3 key={i} className="font-semibold mt-4 mb-2 text-lg">{trimmed}</h3>;
    if (trimmed.match(/^[•\-*]\s/)) return <li key={i} className="ml-4 mb-1">{trimmed.replace(/^[•\-*]\s/, '')}</li>;
    return <p key={i} className="mb-1">{trimmed}</p>;
  });
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const { data: blog, isLoading } = useQuery({ queryKey: ['blog', slug], queryFn: () => blogsApi.getBySlug(slug).then(r => r.data.data), enabled: !!slug });
  if (isLoading) return <><PublicHeader /><main className="py-20 text-center"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></main><PublicFooter /></>;
  if (!blog) return <><PublicHeader /><main className="py-20 text-center"><h1 className="text-4xl font-bold">Blog Not Found</h1><Link href="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link></main><PublicFooter /></>;
  return (<><PublicHeader /><main className="py-12"><article className="container mx-auto px-4 max-w-4xl"><Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"><ArrowLeft className="w-4 h-4" />Back to Blog</Link>{blog.thumbnail && <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />}<div className="flex items-center gap-4 text-sm text-gray-500 mb-4"><span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{blog.category}</span><span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(blog.createdAt).toLocaleDateString()}</span></div><h1 className="text-4xl font-bold mb-6">{blog.title}</h1><div className="text-gray-700 leading-relaxed text-lg space-y-1">{formatContent(blog.content || blog.excerpt)}</div></article></main><PublicFooter /></>);
}