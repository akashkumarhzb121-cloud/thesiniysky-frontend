'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { motion } from 'framer-motion';
import { Download, Mail, MapPin, Briefcase, Calendar, Sparkles, Heart, Coffee, TrendingUp, Star, FileText, Wrench, Building2, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const defaultSkills = [
  { name: 'React.js', category: 'Frontend', proficiency: 95, icon: '⚛️' },
  { name: 'Next.js', category: 'Frontend', proficiency: 92, icon: '▲' },
  { name: 'TypeScript', category: 'Language', proficiency: 90, icon: '📘' },
  { name: 'Node.js', category: 'Backend', proficiency: 88, icon: '💚' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 95, icon: '🎨' },
  { name: 'PostgreSQL', category: 'Database', proficiency: 85, icon: '🐘' },
  { name: 'Docker', category: 'DevOps', proficiency: 80, icon: '🐳' },
  { name: 'AWS', category: 'Cloud', proficiency: 78, icon: '☁️' },
];

const defaultExperiences = [
  { company: 'TechCorp Inc.', position: 'Senior Full Stack Developer', description: 'Led development of microservices architecture. Built real-time analytics dashboard.', startDate: '2023-01', endDate: '', current: true, location: 'New York, USA', type: 'full-time' },
  { company: 'StartupHub', position: 'Full Stack Developer', description: 'Built SaaS platform using Next.js and Node.js. Implemented CI/CD pipelines.', startDate: '2021-03', endDate: '2022-12', current: false, location: 'Remote', type: 'full-time' },
  { company: 'Freelance', position: 'Web Developer', description: 'Developed 20+ websites for diverse clients. Managed projects end-to-end.', startDate: '2019-06', endDate: '2021-02', current: false, location: 'Remote', type: 'freelance' },
];

const achievements = [
  { title: 'Projects Completed', value: '150+', icon: '🚀' },
  { title: 'Happy Clients', value: '80+', icon: '😊' },
  { title: 'Years Experience', value: '6+', icon: '📅' },
  { title: 'Technologies', value: '30+', icon: '🛠️' },
];

// TheSiniySky About Page
export default function AboutPage() {
  return (
    <>
      <PublicHeader />
      <main>
        {/* Hero */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-1.5 mb-4">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Available for Projects</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Hi, I am <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Akash Kumar</span></h1>
              <p className="text-lg text-gray-600 dark:text-gray-200">Senior Full Stack Developer</p>
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300 bg-gray-100 px-3 py-1.5 rounded-full"><MapPin className="w-4 h-4" />India</span>
                <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300 bg-gray-100 px-3 py-1.5 rounded-full"><Briefcase className="w-4 h-4" />Full Stack Developer</span>
                <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300 bg-gray-100 px-3 py-1.5 rounded-full"><GraduationCap className="w-4 h-4" />B.Tech CSE</span>
              </div>
              <div className="flex gap-3 justify-center mt-6">
                <button onClick={() => window.open('/resume.pdf', '_blank')} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700"><Download className="w-5 h-5" />Download Resume</button>
                <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-gray-300 px-6 py-3 rounded-xl font-medium hover:border-blue-500"><Mail className="w-5 h-5" />Hire Me</Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white dark:bg-gray-900 border-y">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {achievements.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <div className="text-3xl mb-2">{a.icon}</div>
                  <p className="text-3xl font-bold">{a.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{a.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Me */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white dark:bg-gray-900 rounded-3xl border p-8 md:p-10 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center"><FileText className="w-5 h-5 text-white" /></div>
                <h2 className="text-2xl font-bold">About Me</h2>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-200 leading-relaxed">
                <p>I am a passionate Full Stack Developer with over 6 years of experience building modern web applications. I specialize in React, Next.js, Node.js, and TypeScript.</p>
                <p>My journey started with curiosity about how things work on the web. Since then, I have worked with startups and established companies.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[{ icon: Heart, label: 'Coding', color: 'text-red-500' },{ icon: Coffee, label: 'Coffee', color: 'text-amber-500' },{ icon: TrendingUp, label: 'Learning', color: 'text-green-500' },{ icon: Star, label: 'Open Source', color: 'text-yellow-500' }].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <item.icon className={'w-6 h-6 ' + item.color + ' mx-auto mb-2'} />
                    <p className="text-sm text-gray-600 dark:text-gray-200">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center"><Wrench className="w-5 h-5 text-white" /></div>
              <h2 className="text-2xl font-bold">Tech Stack</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {defaultSkills.map((skill, i) => (
                <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} whileHover={{ y: -3 }} className="bg-white dark:bg-gray-900 rounded-2xl border p-5 text-center hover:shadow-lg transition-all">
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <h3 className="font-semibold text-sm">{skill.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-300">{skill.category}</p>
                  <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: skill.proficiency + '%' }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{skill.proficiency}%</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center"><Building2 className="w-5 h-5 text-white" /></div>
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-blue-200 hidden md:block" />
              <div className="space-y-8">
                {defaultExperiences.map((exp, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="relative pl-14">
                    <div className={'absolute left-3.5 top-1 w-4 h-4 rounded-full border-2 ' + (exp.current ? 'bg-blue-600 border-blue-600' : 'bg-white dark:bg-gray-900 border-gray-300')} />
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border p-6 hover:shadow-lg transition-all">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-bold">{exp.position}</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {exp.current && <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">Current</span>}
                          <span className="text-xs text-gray-500 dark:text-gray-300 capitalize px-2 py-0.5 bg-gray-100 rounded-full">{exp.type}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-200 mb-3">{exp.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-300">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Lets Work Together</h2>
            <p className="text-blue-100 mb-8">I am currently available for freelance projects and full-time opportunities.</p>
            <div className="flex justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-xl font-medium hover:bg-gray-100"><Mail className="w-5 h-5" />Get In Touch</Link>
              <button onClick={() => window.open('/resume.pdf', '_blank')} className="inline-flex items-center gap-2 border-2 border-white px-8 py-3 rounded-xl font-medium hover:bg-white dark:bg-gray-900/10"><Download className="w-5 h-5" />Download CV</button>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}