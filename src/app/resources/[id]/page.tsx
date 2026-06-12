'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { resourcesApi } from '@/api/resources.api';
import { useParams } from 'next/navigation';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function ResourceDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: resource, isLoading } = useQuery({
    queryKey: ['resource', id],
    queryFn: () => resourcesApi.getById(id).then(r => r.data.data),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <>
        <PublicHeader />
        <main className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </main>
        <PublicFooter />
      </>
    );
  }

  if (!resource) {
    return (
      <>
        <PublicHeader />
        <main className="py-20 text-center text-gray-600 dark:text-gray-400">Resource not found.</main>
        <PublicFooter />
      </>
    );
  }

  return (
    <>
      <PublicHeader />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-8">
            <div className="flex items-start gap-4 mb-6">
              <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium capitalize">{resource.type}</span>
                <h1 className="text-3xl font-bold mt-1 dark:text-white">{resource.title}</h1>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{resource.description}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                Category: {resource.category}
              </span>
              {resource.fileSize && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                  Size: {Math.round(resource.fileSize / 1024)} KB
                </span>
              )}
            </div>
            <div className="flex gap-4">
              {resource.downloadable && (
                <a href={resource.url} download className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  <Download className="w-4 h-4" /> Download
                </a>
              )}
              <a href={resource.url} target="_blank" className="inline-flex items-center gap-2 border dark:border-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">
                <ExternalLink className="w-4 h-4" /> View
              </a>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}