import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';

export default function FAQPage() {
  const faqs = [
    { q: 'What is TheSiniySky?', a: 'TheSiniySky is a premium SaaS platform for project management and client services.' },
    { q: 'How do I get started?', a: 'Simply create an account and choose a plan that fits your needs.' },
    { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time with no penalties.' },
    { q: 'Do you offer refunds?', a: 'We offer a 30-day money-back guarantee for all our plans.' },
  ];

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h1>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
