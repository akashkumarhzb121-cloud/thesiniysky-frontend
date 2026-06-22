'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { useQuery } from '@tanstack/react-query';
import { skillsApi } from '@/api/skills.api';
import { experienceApi } from '@/api/experience.api';
import { achievementsApi } from '@/api/achievements.api';
import { motion } from 'framer-motion';
import { 
  Download, Mail, MapPin, Briefcase, Award, Code2, 
  GraduationCap, Star, TrendingUp, Heart, Coffee,
  Github, Linkedin, FileText, ExternalLink, Sparkles,
  Wrench, Trophy, Building2, Calendar, ArrowRight, Phone
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { data: skillsData } = useQuery({
    queryKey: ['skills'],
    queryFn: () => skillsApi.getAll().then(r => r.data.data),
  });

  const { data: experienceData } = useQuery({
    queryKey: ['experience'],
    queryFn: () => experienceApi.getAll().then(r => r.data.data),
  });

  const { data: achievementsData } = useQuery({
    queryKey: ['achievements'],
    queryFn: () => achievementsApi.getAll().then(r => r.data.data),
  });

  const skills = skillsData || [];
  const experiences = experienceData || [];
  const achievements = achievementsData || [];

  // Default data if API returns empty
  const defaultSkills = [
    { name: 'React.js', category: 'Frontend', proficiency: 95, icon: '⚛️' },
    { name: 'Next.js', category: 'Frontend', proficiency: 92, icon: '▲' },
    { name: 'TypeScript', category: 'Language', proficiency: 90, icon: '📘' },
    { name: 'Node.js', category: 'Backend', proficiency: 88, icon: '💚' },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 95, icon: '🎨' },
    { name: 'PostgreSQL', category: 'Database', proficiency: 85, icon: '🐘' },
    { name: 'Docker', category: 'DevOps', proficiency: 80, icon: '🐳' },
    { name: 'AWS', category: 'Cloud', proficiency: 78, icon: '☁️' },
    { name: 'GraphQL', category: 'Backend', proficiency: 82, icon: '◈' },
    { name: 'Python', category: 'Language', proficiency: 75, icon: '🐍' },
    { name: 'MongoDB', category: 'Database', proficiency: 83, icon: '🍃' },
    { name: 'Figma', category: 'Design', proficiency: 70, icon: '🎯' },
  ];

  const defaultExperiences = [
    {
      company: 'TechCorp Inc.',
      position: 'Senior Full Stack Developer',
      description: 'Led development of microservices architecture serving 1M+ users. Built real-time analytics dashboard.',
      startDate: '2023-01',
      endDate: '',
      current: true,
      location: 'New York, USA',
      type: 'full-time',
    },
    {
      company: 'StartupHub',
      position: 'Full Stack Developer',
      description: 'Built SaaS platform from scratch using Next.js and Node.js. Implemented CI/CD pipelines.',
      startDate: '2021-03',
      endDate: '2022-12',
      current: false,
      location: 'Remote',
      type: 'full-time',
    },
    {
      company: 'Freelance',
      position: 'Web Developer',
      description: 'Developed 20+ websites and web applications for diverse clients. Managed projects end-to-end.',
      startDate: '2019-06',
      endDate: '2021-02',
      current: false,
      location: 'Remote',
      type: 'freelance',
    },
  ];

  const defaultAchievements = [
    { title: 'Projects Completed', value: '150+', icon: '🚀' },
    { title: 'Happy Clients', value: '80+', icon: '😊' },
    { title: 'Years Experience', value: '6+', icon: '📅' },
    { title: 'Technologies', value: '30+', icon: '🛠️' },
  ];

  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences;
  const displayAchievements = achievements.length > 0 ? achievements : defaultAchievements;

  // Resume download handler
  const handleDownloadResume = () => {
    // Replace with your actual resume URL
    window.open('/resume.pdf', '_blank');
  };

  return (
    <>
      <PublicHeader />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl shadow-blue-500/30">
                    AS
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 rounded-3xl border-2 border-dashed border-blue-300 dark:border-blue-700 opacity-50"
                  />
                </motion.div>

                {/* Info */}
                <div className="text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-1.5 mb-4">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Available for Projects</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                      Hi, I&apos;m <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Akash Kumar</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                      Senior Full Stack Developer
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 max-w-lg mb-6 leading-relaxed">
                      Passionate about building scalable web applications with modern technologies. 
                      6+ years of experience crafting digital solutions that make a difference.
                    </p>

                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {[
                        { icon: MapPin, text: 'India' },
                        { icon: Briefcase, text: 'Full Stack Developer' },
                        { icon: GraduationCap, text: 'B.Tech CSE' },
                      ].map((item, i) => (
                        <span key={expItem._id || expItem.company + '-' + i} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                          <item.icon className="w-4 h-4" />
                          {item.text}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadResume}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25"
                      >
                        <Download className="w-5 h-5" />
                        Download Resume
                      </motion.button>
                      <Link href="/contact">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 transition-all"
                        >
                          <Mail className="w-5 h-5" />
                          Hire Me
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Achievements Stats */}
        <section className="py-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-y dark:border-gray-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {displayAchievements.map((achievement: any, i: number) => (
                <motion.div
                  key={expItem._id || expItem.company + '-' + i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4"
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{achievement.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 md:p-10 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold dark:text-white">About Me</h2>
              </div>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  I&apos;m a passionate Full Stack Developer with over 6 years of experience building modern web applications. 
                  I specialize in React, Next.js, Node.js, and TypeScript, creating scalable and performant solutions.
                </p>
                <p>
                  My journey in software development started with a curiosity about how things work on the web. 
                  Since then, I&apos;ve worked with startups and established companies, helping them build products 
                  that users love.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source 
                  projects, or sharing knowledge through technical blog posts.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { icon: Heart, label: 'Coding', color: 'text-red-500' },
                  { icon: Coffee, label: 'Coffee', color: 'text-amber-500' },
                  { icon: TrendingUp, label: 'Learning', color: 'text-green-500' },
                  { icon: Star, label: 'Open Source', color: 'text-yellow-500' },
                ].map((item, i) => (
                  <div key={expItem._id || expItem.company + '-' + i} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 bg-gray-50/50 dark:bg-gray-950/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold dark:text-white">Tech Stack & Skills</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Technologies I work with</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displaySkills.map((skill: any, i: number) => (
                  <motion.div
                    key={skill._id || skill.name + '-' + i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 text-center group hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                      {skill.icon || '🛠️'}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{skill.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{skill.category}</p>
                    
                    {/* Progress Bar */}
                    <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: (skill.proficiency || 80) + '%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{skill.proficiency || 80}%</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold dark:text-white">Work Experience</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">My professional journey</p>
                </div>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent hidden md:block" />

                <div className="space-y-8">
                  {displayExperiences.map((expItem: any, i: number) => (
                    <motion.div
                      key={expItem._id || expItem.company + '-' + i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      viewport={{ once: true }}
                      className="relative pl-14"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-3.5 top-1 w-4 h-4 rounded-full border-2 ${expItem.current ? 'bg-blue-600 border-blue-600' : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600'} z-10`} />
                      
                      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{expItem.position}</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">{expItem.company}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {expItem.current && (
                              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full font-medium">Current</span>
                            )}
                            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                              {expItem.type}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{expItem.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(expItem.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {expItem.current ? 'Present' : new Date(expItem.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {expItem.location}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                I&apos;m currently available for freelance projects and full-time opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}