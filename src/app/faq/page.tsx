'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, Zap, Shield, CreditCard, Users } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

const faqItems: FAQItem[] = [
  {
    question: "What is TheSiniySky?",
    answer: "TheSiniySky is a premium SaaS platform for project management, client services, and business automation. Build faster with our powerful tools.",
    icon: <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    question: "How do I get started?",
    answer: "Simply create an account, choose a plan that fits your needs, and start building. Our intuitive dashboard guides you through every step.",
    icon: <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.",
    icon: <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />,
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. You can cancel your subscription at any time with no penalties or hidden fees. Your data remains accessible for 30 days after cancellation.",
    icon: <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can also use invoicing with net-30 terms.",
    icon: <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes! We provide 24/7 email support for all plans. Professional and Enterprise plans include priority chat support and dedicated account managers.",
    icon: <MessageCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
  },
  {
    question: "Is my data secure?",
    answer: "Security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with SOC 2 and GDPR standards.",
    icon: <Shield className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
  },
  {
    question: "Can I invite my team?",
    answer: "Yes! You can invite unlimited team members. Set custom roles and permissions to control what each member can access and modify.",
    icon: <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all annual plans. If you're not satisfied, we'll refund your payment in full.",
    icon: <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />,
  },
  {
    question: "What integrations are available?",
    answer: "We integrate with 100+ tools including Slack, GitHub, Stripe, Figma, AWS, and more. Custom API access is available on Enterprise plans.",
    icon: <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
  },
];

function FAQCard({ item, index }: { item: FAQItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {item.icon}
      </div>

      {/* Question */}
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
        {item.question}
      </h3>

      {/* Answer */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {item.answer}
      </p>

      {/* Hover gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <>
      <PublicHeader />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-full px-4 py-2 mb-6">
                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">FAQ</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                Quick Answers
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                No scrolling through walls of text. Find what you need, fast.
              </p>
            </motion.div>
          </div>

          {/* FAQ Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {faqItems.map((item, index) => (
              <FAQCard key={item.question} item={item} index={index} />
            ))}
          </div>

          {/* Still have questions? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8 md:p-12 border border-blue-100 dark:border-blue-800"
          >
            <h2 className="text-2xl font-bold mb-3 dark:text-white">Still have questions?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Support
            </a>
          </motion.div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}