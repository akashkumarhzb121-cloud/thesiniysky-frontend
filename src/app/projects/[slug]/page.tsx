'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/api/projects.api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => projectsApi.getBySlug(slug).then(r => r.data.data),
    enabled: !!slug,
  });

  if (isLoading) return <><PublicHeader /><main className="py-20 text-center"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></main><PublicFooter /></>;
  if (!project) return <><PublicHeader /><main className="py-20 text-center"><h1 className="text-4xl font-bold mb-4 dark:text-white">Project Not Found</h1><Link href="/projects" className="text-blue-600 hover:underline">← Back to Projects</Link></main><PublicFooter /></>;

  return (
    <>
      <PublicHeader />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/projects" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"><ArrowLeft className="w-4 h-4" /> Back to Projects</Link>
          {project.thumbnail && <img src={project.thumbnail} alt={project.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm">{project.category}</span>
            {project.status && <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm capitalize">{project.status}</span>}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">{project.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">{project.technologies.map((tech: string) => <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm">{tech}</span>)}</div>
          )}
          <div className="flex gap-4 mb-8">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"><ExternalLink className="w-4 h-4" /> Live Demo</a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" className="inline-flex items-center gap-2 border dark:border-gray-600 px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800"><Github className="w-4 h-4" /> Source Code</a>}
          </div>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">{project.content || project.description}</div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}