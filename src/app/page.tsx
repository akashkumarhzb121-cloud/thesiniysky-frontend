'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/api/projects.api';
import { blogsApi } from '@/api/blogs.api';
import { resourcesApi } from '@/api/resources.api';
import { servicesApi } from '@/api/services.api';
import { testimonialsApi } from '@/api/testimonials.api';
import { MagicCard } from '@/components/ui/magic-card';
import { CardStack } from '@/components/ui/card-stack';
import { NumberTicker } from '@/components/ui/number-ticker';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { CoolMode } from '@/components/ui/cool-mode';
import { Meteors } from '@/components/ui/meteors';
import { Waves } from '@/components/ui/wave-background';
import { TestimonialsColumn } from '@/components/ui/testimonials-column';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { 
  ArrowRight, Star, Users, TrendingUp, Sparkles,
  FolderGit2, Newspaper, Wrench, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { theme } = useTheme();
  
  const { data: projectsData } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: () => projectsApi.getFeatured().then(r => r.data.data),
  });

  const { data: blogsData } = useQuery({
    queryKey: ['featured-blogs'],
    queryFn: () => blogsApi.getFeatured().then(r => r.data.data),
  });

  const { data: servicesData } = useQuery({
    queryKey: ['featured-services'],
    queryFn: () => servicesApi.getFeatured().then(r => r.data.data),
  });

  const { data: testimonialsData } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => testimonialsApi.getAll().then(r => r.data.data),
  });

  const projects = projectsData || [];
  const blogs = blogsData || [];
  const services = servicesData || [];
  const { data: resourcesData } = useQuery({ queryKey: ['resources'], queryFn: () => resourcesApi.getAll().then(r => r.data.data) });
  const resources = resourcesData || [];
  const testimonials = (testimonialsData || []).filter((t: any) => t.status === 'approved');

  return (
    <>
      <PublicHeader />
      <main className="overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center bg-transparent">
          <div className="container relative z-20 mx-auto px-4 py-32 md:py-40">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20 dark:border-gray-700">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-200">Next.js 16 + Premium SaaS Platform</span>
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                Build Faster with
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TheSiniySky</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Premium SaaS platform with modern design, powerful features, and lightning-fast performance.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <CoolMode>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg shadow-blue-600/25">
                    <span>Start Building</span><ChevronRight className="w-5 h-5" />
                  </Link>
                </CoolMode>
                <Link href="/services" className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-full text-lg font-medium transition-all">
                  <span>View Services</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-y dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[{ icon: Users, value: 1200, label: 'Happy Clients' },{ icon: FolderGit2, value: 500, label: 'Projects Delivered' },{ icon: Star, value: 4.9, label: 'Client Rating', isDecimal: true },{ icon: TrendingUp, value: 99, label: 'Uptime %' }].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <NumberTicker value={stat.value} className="text-3xl font-bold dark:text-white" decimalPlaces={stat.isDecimal ? 1 : 0} />
                  <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        {projects.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 dark:text-white">Featured Projects</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">Drag or click to explore our latest work</p>
              </div>
              <CardStack
                items={projects.slice(0, 8).map((p: any) => ({ id: p.id, title: p.title, description: p.description, imageSrc: p.thumbnail || undefined, href: '/projects/' + p.slug, tag: p.category }))}
                cardWidth={480} cardHeight={340} maxVisible={5} overlap={0.42} spreadDeg={55}
                autoAdvance={true} intervalMs={4000} pauseOnHover={true} loop={true} showDots={true}
                springStiffness={200} springDamping={25} className="max-w-4xl mx-auto"
              />
              <div className="text-center mt-8">
                <Link href="/projects" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">View All Projects <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </section>
        )}

        {/* SERVICES SECTION */}
        {services.length > 0 && (
          <section className="py-20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12"><h2 className="text-4xl font-bold mb-4 dark:text-white">Our Services</h2><p className="text-xl text-gray-600 dark:text-gray-400">Comprehensive solutions for your business</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.slice(0, 4).map((service: any) => (
                  <Link key={service.id || service._id} href={'/services/' + service.slug}>
                    <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} className="h-full">
                      <div className="p-6 text-center">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4"><Wrench className="w-7 h-7 text-blue-600 dark:text-blue-400" /></div>
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">{service.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{service.description}</p>
                        {service.price && <p className="mt-3 text-blue-600 dark:text-blue-400 font-semibold text-sm">From ${service.price}</p>}
                      </div>
                    </MagicCard>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10"><Link href="/services" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">View All Services <ArrowRight className="w-4 h-4" /></Link></div>
            </div>
          </section>
        )}

        {/* TESTIMONIALS SECTION - Animated Columns */}
        {testimonials.length > 0 && (
          <section className="py-20 overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
              <div className="text-center"><h2 className="text-4xl font-bold mb-4 dark:text-white">What Our Clients Say</h2><p className="text-xl text-gray-600 dark:text-gray-400">Trusted by businesses worldwide</p></div>
            </div>
            <div className="flex justify-center gap-6 overflow-hidden max-w-6xl mx-auto px-4">
              <TestimonialsColumn testimonials={testimonials.slice(0, Math.ceil(testimonials.length / 3)).map((t: any) => ({ text: t.content, image: t.avatar, name: t.name, role: t.role, company: t.company, rating: t.rating }))} duration={25} direction="down" className="hidden md:block" />
              <TestimonialsColumn testimonials={testimonials.slice(Math.ceil(testimonials.length / 3), Math.ceil(2 * testimonials.length / 3)).map((t: any) => ({ text: t.content, image: t.avatar, name: t.name, role: t.role, company: t.company, rating: t.rating }))} duration={30} direction="up" className="hidden md:block" />
              <TestimonialsColumn testimonials={testimonials.slice(Math.ceil(2 * testimonials.length / 3)).map((t: any) => ({ text: t.content, image: t.avatar, name: t.name, role: t.role, company: t.company, rating: t.rating }))} duration={28} direction="down" className="hidden md:block" />
              <TestimonialsColumn testimonials={testimonials.slice(0, 6).map((t: any) => ({ text: t.content, image: t.avatar, name: t.name, role: t.role, company: t.company, rating: t.rating }))} duration={20} direction="up" className="md:hidden w-full max-w-sm" />
            </div>
            <div className="text-center mt-12"><Link href="/testimonials" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">View All Testimonials <ArrowRight className="w-4 h-4" /></Link></div>
          </section>
        )}

        {/* BLOG SECTION */}
        {blogs.length > 0 && (
          <section className="py-20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12"><h2 className="text-4xl font-bold mb-4 dark:text-white">Latest from Blog</h2><p className="text-xl text-gray-600 dark:text-gray-400">Insights, tutorials, and updates from our team</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {blogs.slice(0, 4).map((blog: any) => (
                  <Link key={blog.id || blog._id} href={'/blog/' + blog.slug}>
                    <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} className="h-full">
                      <div className="p-6">
                        {blog.thumbnail && <img src={blog.thumbnail} alt={blog.title} className="w-full h-36 object-cover rounded-lg mb-4" />}
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3"><Newspaper className="w-5 h-5 text-purple-600 dark:text-purple-400" /></div>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{blog.category}</span>
                        <h3 className="text-lg font-semibold mt-1 mb-2 dark:text-white line-clamp-2">{blog.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{blog.excerpt}</p>
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-400"><span>{blog.readTime} min read</span><span>{blog.likes || 0} likes</span></div>
                      </div>
                    </MagicCard>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10"><Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">View All Posts <ArrowRight className="w-4 h-4" /></Link></div>
            </div>
          </section>
        )}

        
        {/* RESOURCES SECTION */}
        {resources.length > 0 && (
          <section className="py-20 bg-gray-50/50 dark:bg-gray-950/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 dark:text-white">Resources</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">Helpful downloads and guides</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.slice(0, 4).map((resource: any) => (
                  <a key={resource._id || resource.id} href={resource.url} target="_blank" className="bg-white dark:bg-gray-900 p-6 rounded-2xl border dark:border-gray-700 hover:shadow-lg transition-shadow text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{resource.description}</p>
                    <span className="text-xs text-blue-600 mt-3 inline-block capitalize">{resource.type}</span>
                  </a>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link href="/resources" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">View All Resources <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </section>
        )}
        {/* CTA SECTION */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8">Join thousands of satisfied clients today.</p>
            <CoolMode>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-100 transition-all">Start Free Trial<ArrowRight className="w-5 h-5" /></Link>
            </CoolMode>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}