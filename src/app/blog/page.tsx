'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { blogsApi } from '@/api/blogs.api';
import { BlogCard } from '@/components/ui/blog-card';
import { LoadingState, EmptyState } from '@/components/forms/form-components';
import { useState } from 'react';
import { Search, Filter, TrendingUp, Star } from 'lucide-react';

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['blogs', { page, search, category }],
    queryFn: () => blogsApi.getAll({ page, limit: 9, search, category }).then(r => r.data),
  });

  const { data: trendingData } = useQuery({
    queryKey: ['trending-blogs'],
    queryFn: () => blogsApi.getTrending().then(r => r.data.data),
  });

  const { data: featuredData } = useQuery({
    queryKey: ['featured-blogs'],
    queryFn: () => blogsApi.getFeatured().then(r => r.data.data),
  });

  const blogs = data?.data || [];
  const trending = trendingData || [];
  const featured = featuredData || [];
  const categories = ['Development', 'Design', 'Business', 'Technology', 'Tutorial'];

  return (
    <>
      <PublicHeader />
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Insights, tutorials, and updates from our team of experts.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Loading State */}
          {isLoading && <LoadingState message="Loading articles..." />}

          {/* Blog Grid */}
          {!isLoading && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  slug={blog.slug}
                  category={blog.category}
                  thumbnail={blog.thumbnail}
                  author={blog.author}
                  readTime={blog.readTime}
                  likes={blog.likes}
                  publishedAt={blog.publishedAt || blog.createdAt}
                  featured={blog.featured}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && blogs.length === 0 && (
            <EmptyState
              icon="📝"
              title="No articles found"
              description={search ? "No articles match your search. Try different keywords." : "No blog posts available yet."}
            />
          )}

          {/* Pagination */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: data.pagination.totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={"px-4 py-2 rounded-lg text-sm font-medium transition-colors " + (
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          {/* Trending Section */}
          {trending.length > 0 && (
            <section className="mt-20">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold dark:text-white">Trending Now</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trending.slice(0, 3).map((blog: any) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    slug={blog.slug}
                    category={blog.category}
                    thumbnail={blog.thumbnail}
                    author={blog.author}
                    readTime={blog.readTime}
                    likes={blog.likes}
                    publishedAt={blog.publishedAt || blog.createdAt}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Featured Section */}
          {featured.length > 0 && (
            <section className="mt-20">
              <div className="flex items-center gap-2 mb-8">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold dark:text-white">Featured Articles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featured.slice(0, 4).map((blog: any) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    slug={blog.slug}
                    category={blog.category}
                    thumbnail={blog.thumbnail}
                    author={blog.author}
                    readTime={blog.readTime}
                    likes={blog.likes}
                    publishedAt={blog.publishedAt || blog.createdAt}
                    featured={true}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}