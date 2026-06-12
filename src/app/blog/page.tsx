'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { blogsApi } from '@/api/blogs.api';

export default function BlogPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogsApi.getAll().then(r => r.data),
  });

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-gray-600">Insights, tutorials, and updates from our team.</p>
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-600">
              Failed to load blog posts.
            </div>
          )}

          {data && data.data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {data.data.map((blog: any) => (
                <article key={blog.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-xl transition-shadow">
                  {blog.thumbnail && (
                    <img src={blog.thumbnail} alt={blog.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <span className="text-sm text-blue-600 font-medium">{blog.category}</span>
                    <h2 className="text-xl font-semibold mt-2 mb-3">{blog.title}</h2>
                    <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{new Date(blog.publishedAt).toLocaleDateString()}</span>
                      <span className="text-sm text-gray-500">{blog.readTime} min read</span>
                    </div>
                    <a href={'/blog/' + blog.slug} className="text-blue-600 hover:underline text-sm font-medium mt-4 inline-block">
                      Read More →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
