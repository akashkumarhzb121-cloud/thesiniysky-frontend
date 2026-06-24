'use client';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/api/projects.api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Code2 } from 'lucide-react';

function formatContent(text) {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <br key={i} />;
    if (trimmed.match(/^https?:\/\//)) return <a key={i} href={trimmed} target="_blank" className="text-blue-600 hover:underline break-all block mb-1">{trimmed}</a>;
    if (trimmed.match(/link:\s*(https?:\/\/\S+)/)) { const m = trimmed.match(/link:\s*(https?:\/\/\S+)/); return <p key={i} className="mb-1">🔗 <a href={m[1]} target="_blank" className="text-blue-600 hover:underline break-all">{m[1]}</a></p>; }
    if (trimmed.match(/^[A-Z][^a-z]{2,}:?$/)) return <h3 key={i} className="font-semibold mt-4 mb-2 text-lg">{trimmed}</h3>;
    if (trimmed.match(/^[•\-*]\s/)) return <li key={i} className="ml-4 mb-1">{trimmed.replace(/^[•\-*]\s/, '')}</li>;
    return <p key={i} className="mb-1">{trimmed}</p>;
  });
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const { data: project, isLoading } = useQuery({ queryKey: ['project', slug], queryFn: () => projectsApi.getBySlug(slug).then(r => r.data.data), enabled: !!slug });
  if (isLoading) return <><PublicHeader /><main className="py-20 text-center"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></main><PublicFooter /></>;
  if (!project) return <><PublicHeader /><main className="py-20 text-center"><h1 className="text-4xl font-bold">Project Not Found</h1><Link href="/projects" className="text-blue-600 hover:underline">← Back to Projects</Link></main><PublicFooter /></>;
  return (<><PublicHeader /><main className="py-12"><div className="container mx-auto px-4 max-w-5xl"><Link href="/projects" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"><ArrowLeft className="w-4 h-4" /> Back to Projects</Link>{project.thumbnail && <img src={project.thumbnail} alt={project.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />}<div className="flex items-center gap-3 mb-4"><span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">{project.category}</span></div><h1 className="text-4xl font-bold mb-4">{project.title}</h1><div className="text-gray-700 leading-relaxed text-lg space-y-1">{formatContent(project.content || project.description)}</div>{project.technologies && <div className="flex flex-wrap gap-2 mt-6">{project.technologies.map(t => <span key={t} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{t}</span>)}</div>}<div className="flex gap-4 mt-8">{project.liveUrl && <a href={project.liveUrl} target="_blank" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"><ExternalLink className="w-4 h-4" />Live Demo</a>}{project.githubUrl && <a href={project.githubUrl} target="_blank" className="inline-flex items-center gap-2 border px-6 py-3 rounded-xl"><Code2 className="w-4 h-4" />Source Code</a>}</div></div></main><PublicFooter /></>);
}