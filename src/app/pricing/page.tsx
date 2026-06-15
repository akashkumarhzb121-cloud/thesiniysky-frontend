'use client';

import * as React from "react";
import Link from "next/link";
import { CircleCheck, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  description?: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
  icon?: React.ReactNode;
  color?: string;
}

const pricingData: PricingCardProps[] = [
  {
    title: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses and individuals getting started.",
    features: [
      "5 Projects",
      "10GB Storage",
      "Basic Analytics",
      "Email Support",
      "Responsive Design",
      "1 Team Member"
    ],
    cta: "Get Started",
    href: "/register",
    icon: <Zap className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Professional",
    price: "$79",
    period: "/month",
    description: "Best for growing businesses with advanced needs.",
    features: [
      "Unlimited Projects",
      "50GB Storage",
      "Advanced Analytics",
      "Priority Chat Support",
      "Custom Domain",
      "5 Team Members",
      "API Access",
      "Integrations"
    ],
    cta: "Start Free Trial",
    href: "/register",
    featured: true,
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Enterprise",
    price: "Custom",
    period: "",
    description: "Ideal for larger businesses that need scalability and dedicated support.",
    features: [
      "Everything in Pro",
      "Unlimited Storage",
      "24/7 Phone Support",
      "Dedicated Manager",
      "SLA Guarantee",
      "Custom Integrations",
      "SSO Authentication",
      "Audit Logs"
    ],
    cta: "Contact Sales",
    href: "/contact",
    icon: <Crown className="w-6 h-6" />,
    color: "from-amber-500 to-orange-600",
  },
];

function PricingCard({ plan }: { plan: PricingCardProps }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-8 text-left bg-white dark:bg-gray-900 transition-all duration-300",
        plan.featured
          ? "border-blue-200 dark:border-blue-800 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20 scale-105"
          : "border-gray-200 dark:border-gray-700 hover:shadow-lg"
      )}
    >
      {/* Featured Badge */}
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            <Sparkles className="w-3 h-3" /> Most Popular
          </span>
        </div>
      )}

      {/* Icon */}
      <div className={cn(
        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 text-white",
        plan.color || "from-blue-500 to-blue-600"
      )}>
        {plan.icon}
      </div>

      {/* Title & Badge */}
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-xl font-bold dark:text-white">{plan.title}</h3>
        <Badge variant={plan.featured ? "default" : "secondary"} className="text-xs">
          {plan.title}
        </Badge>
      </div>

      {/* Price */}
      <div className="mb-2">
        <span className="text-4xl font-bold dark:text-white">{plan.price}</span>
        {plan.period && <span className="text-gray-500 dark:text-gray-400 text-lg">{plan.period}</span>}
      </div>

      {/* Description */}
      {plan.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{plan.description}</p>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
            <CircleCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="mt-8">
        <Link href={plan.href}>
          <button
            className={cn(
              "w-full py-3 px-6 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2",
              plan.featured
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {plan.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <>
      <PublicHeader />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Pricing Plans</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                Choose Your Plan
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Select the perfect plan for your business. Upgrade or downgrade at any time.
              </p>
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {pricingData.map((plan) => (
              <PricingCard key={plan.title} plan={plan} />
            ))}
          </div>

          {/* Bottom Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              All plans include 14-day free trial. No credit card required.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Need a custom plan? <Link href="/contact" className="text-blue-600 hover:underline font-medium">Contact our sales team</Link>
            </p>
          </motion.div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}