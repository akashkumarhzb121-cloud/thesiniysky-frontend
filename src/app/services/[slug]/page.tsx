'use client';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { servicesApi } from '@/api/services.api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: service, isLoading } = useQuery({ queryKey: ['service', slug], queryFn: () => servicesApi.getBySlug(slug).then(r => r.data.data), enabled: !!slug });
  if (isLoading) return <><PublicHeader /><main className="py-20 text-center"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div></main><PublicFooter /></>;
  if (!service) return <><PublicHeader /><main className="py-20 text-center"><h1 className="text-4xl font-bold">Service Not Found</h1><Link href="/services" className="text-blue-600 hover:underline">← Back to Services</Link></main><PublicFooter /></>;
  return (<><PublicHeader /><main className="py-12"><div className="container mx-auto px-4 max-w-4xl"><Link href="/services" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"><ArrowLeft className="w-4 h-4" /> Back to Services</Link><span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">Service</span><h1 className="text-4xl font-bold mt-4 mb-4">{service.title}</h1><p className="text-xl text-gray-600 mb-6">{service.description}</p>{service.price&&<p className="text-3xl font-bold text-blue-600 mb-6">Starting at </p>}{service.features&&service.features.length>0&&(<div className="mb-8"><h2 className="text-2xl font-bold mb-4">Features</h2><ul className="grid grid-cols-1 md:grid-cols-2 gap-3">{service.features.map((f:string,i:number)=><li key={i} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500"/>{f}</li>)}</ul></div>)}<Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-blue-700">Get This Service</Link></div></main><PublicFooter /></>);
}