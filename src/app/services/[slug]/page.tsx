'use client';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { servicesApi } from '@/api/services.api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

function formatContent(text) {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    let trimmed = line.trim();
    if (!trimmed) return <br key={i} />;
    if (trimmed.match(/^https?:\/\//)) return <a key={i} href={trimmed} target="_blank" className="text-blue-600 hover:underline break-all block mb-1">{trimmed}</a>;
    if (trimmed.match(/link:\s*(https?:\/\/\S+)/)) { const m = trimmed.match(/link:\s*(https?:\/\/\S+)/); return <p key={i} className="mb-1">🔗 <a href={m[1]} target="_blank" className="text-blue-600 hover:underline break-all">{m[1]}</a></p>; }
    const boldText = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>');
    if (trimmed.match(/^[A-Z][^a-z]{2,}:?$/) || trimmed.match(/^[A-Z\s]{5,}$/)) return <h3 key={i} className="font-bold text-xl mt-6 mb-3 text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: boldText }} />;
    if (trimmed.match(/^[•\-*]\s/)) return <li key={i} className="ml-6 mb-1 text-gray-700 dark:text-gray-300 list-disc" dangerouslySetInnerHTML={{ __html: boldText.replace(/^[•\-*]\s/, '') }} />;
    return <p key={i} className="mb-2 text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldText }} />;
  });
}

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const { data: service, isLoading } = useQuery({ queryKey: ['service', slug], queryFn: () => servicesApi.getBySlug(slug).then(r => r.data.data), enabled: !!slug });
  if (isLoading) return <><PublicHeader /><main className="py-20 text-center"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></main><PublicFooter /></>;
  if (!service) return <><PublicHeader /><main className="py-20 text-center"><h1 className="text-4xl font-bold">Service Not Found</h1><Link href="/services" className="text-blue-600 hover:underline">← Back to Services</Link></main><PublicFooter /></>;
  return (<><PublicHeader /><main className="py-12"><div className="container mx-auto px-4 max-w-4xl"><Link href="/services" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"><ArrowLeft className="w-4 h-4" />Back to Services</Link><span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">Service</span><h1 className="text-4xl font-bold mt-4 mb-4">{service.title}</h1><div className="text-gray-700 leading-relaxed text-lg space-y-1">{formatContent(service.content || service.description)}</div>{service.features && <ul className="mt-6 space-y-2">{service.features.map((f,i) => <li key={i} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />{f}</li>)}</ul>}{service.price && <p className="text-3xl font-bold text-blue-600 mt-6">Starting at </p>}<Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 mt-8">Get This Service</Link></div></main><PublicFooter /></>);
}