'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/api/projects.api';
import { useState } from 'react';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['projects', { page, search }],
    queryFn: () => projectsApi.getAll({ page, limit: 9, search }).then(r => r.data),
  });

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
            <p className="text-xl text-gray-600">Explore our latest work and success stories.</p>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search projects..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.data.map((project: any) => (
                  <div key={project.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-xl transition-shadow">
                    {project.thumbnail && (
                      <img src={project.thumbnail} alt={project.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-6">
                      <span className="text-sm text-blue-600 font-medium">{project.category}</span>
                      <h3 className="text-xl font-semibold mt-2 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string) => (
                            <span key={tech} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {data.pagination && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: data.pagination.totalPages }, (_, i) => {
                    const isActive = page === i + 1;
                    const buttonClass = isActive 
                      ? 'px-4 py-2 rounded bg-blue-600 text-white' 
                      : 'px-4 py-2 rounded bg-gray-100 hover:bg-gray-200';
                    return (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={buttonClass}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-600">No projects found.</div>
          )}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
