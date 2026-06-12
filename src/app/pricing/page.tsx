import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';

export default function PricingPage() {
  const plans = [
    { name: 'Starter', price: '', period: '/month', features: ['5 Projects', '10GB Storage', 'Basic Support', 'Email Notifications'] },
    { name: 'Professional', price: '', period: '/month', features: ['Unlimited Projects', '50GB Storage', 'Priority Support', 'API Access', 'Custom Domain'] },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Everything in Pro', 'Unlimited Storage', '24/7 Support', 'SLA', 'Custom Integration'] },
  ];

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h1>
            <p className="text-xl text-gray-600">Choose the perfect plan for your business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className="bg-white p-8 rounded-lg border hover:shadow-xl transition-shadow text-center">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/register" className="block w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium">
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
