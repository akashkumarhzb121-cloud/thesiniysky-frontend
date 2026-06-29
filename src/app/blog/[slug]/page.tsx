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
    let trimmed = line.trim();
    if (!trimmed) return React.createElement('br', { key: i });
    if (trimmed.match(/^https?:\/\//)) return React.createElement('a', { key: i, href: trimmed, target: '_blank', className: 'text-blue-600 dark:text-blue-400 hover:underline break-all block mb-1' }, trimmed);
    let html = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white"></strong>');
    html = html.replace(/\*(.*?)\*/g, '<em></em>');
    if (trimmed.match(/^[•\-*]\s/)) return React.createElement('li', { key: i, className: 'ml-6 mb-1 text-gray-700 dark:text-gray-300 list-disc', dangerouslySetInnerHTML: { __html: html.replace(/^[•\-*]\s/, '') } });
    if (trimmed.match(/^[A-Z\s]{5,}$/)) return React.createElement('h3', { key: i, className: 'font-bold text-xl mt-6 mb-3 text-gray-900 dark:text-white', dangerouslySetInnerHTML: { __html: html } });
    return React.createElement('p', { key: i, className: 'mb-2 text-gray-700 dark:text-gray-300 leading-relaxed', dangerouslySetInnerHTML: { __html: html } });
  });
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const { data: blog, isLoading } = useQuery({ queryKey: ['blog', slug], queryFn: () => blogsApi.getBySlug(slug).then(r => r.data.data), enabled: !!slug });
  if (isLoading) return React.createElement(React.Fragment, null, React.createElement(PublicHeader, null), React.createElement('main', { className: 'py-20 text-center' }, React.createElement('div', { className: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent' })), React.createElement(PublicFooter, null));
  if (!blog) return React.createElement(React.Fragment, null, React.createElement(PublicHeader, null), React.createElement('main', { className: 'py-20 text-center' }, React.createElement('h1', { className: 'text-4xl font-bold dark:text-white' }, 'Blog Not Found'), React.createElement(Link, { href: '/blog', className: 'text-blue-600 hover:underline' }, 'Back to Blog')), React.createElement(PublicFooter, null));
  return React.createElement(React.Fragment, null, React.createElement(PublicHeader, null), React.createElement('main', { className: 'py-12' }, React.createElement('article', { className: 'container mx-auto px-4 max-w-4xl' }, React.createElement(Link, { href: '/blog', className: 'inline-flex items-center gap-2 text-blue-600 hover:underline mb-6' }, React.createElement(ArrowLeft, { className: 'w-4 h-4' }), 'Back to Blog'), blog.thumbnail && React.createElement('img', { src: blog.thumbnail, alt: blog.title, className: 'w-full h-64 md:h-96 object-cover rounded-xl mb-8' }), React.createElement('div', { className: 'flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4' }, React.createElement('span', { className: 'px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full' }, blog.category), React.createElement('span', { className: 'flex items-center gap-1' }, React.createElement(Calendar, { className: 'w-4 h-4' }), new Date(blog.createdAt).toLocaleDateString())), React.createElement('h1', { className: 'text-4xl font-bold mb-6 dark:text-white' }, blog.title), React.createElement('div', { className: 'text-gray-700 dark:text-gray-300 leading-relaxed text-lg' }, formatContent(blog.content || blog.excerpt)))), React.createElement(PublicFooter, null));
}
