'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { DraggableCardsWrapper } from '@/components/premium/draggable-cards-wrapper';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/api/projects.api';
import { LoadingState } from '@/components/forms/form-components';

export default function ProjectsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: () => projectsApi.getFeatured().then(r => r.data.data),
  });

  const items = data?.map((project: any) => ({
    id: project.id,
    title: project.title,
    image: project.thumbnail || 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600',
    subtitle: project.category,
    link: '/projects/' + project.slug,
  })) || [];

  if (isLoading) return <LoadingState message="Loading projects..." />;

  return (
    <>
      <PublicHeader />
      <main>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Our Projects</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Drag the cards to explore our work</p>
          </div>
          
          <DraggableCardsWrapper 
            items={items}
            title="Featured Projects"
            subtitle="Click on any card to view details"
          />
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
