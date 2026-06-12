'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { resourcesApi } from '@/api/resources.api';

export default function ResourcesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: () => resourcesApi.getAll().then(r => r.data),
  });

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Resources</h1>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {data.data.map((resource: any) => (
                <div key={resource.id} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded capitalize">{resource.type}</span>
                  <h3 className="text-lg font-semibold mt-3 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  {resource.downloadable && (
                    <a href={resource.url} className="text-blue-600 hover:underline text-sm font-medium">Download →</a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">No resources available.</div>
          )}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
