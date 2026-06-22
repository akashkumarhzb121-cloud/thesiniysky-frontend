import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';

export default function TermsPage() {
  return (
    <>
      <PublicHeader />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: June 22, 2026</p>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>By accessing TheSiniySky, you agree to these terms. If you do not agree, please do not use our services.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Services Description</h2>
              <p>TheSiniySky provides SaaS project management and client service solutions. We reserve the right to modify or discontinue services with reasonable notice.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">3. User Responsibilities</h2>
              <p>You are responsible for maintaining account confidentiality, providing accurate information, and using our services lawfully. Unauthorized use or abuse may result in account termination.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Payment Terms</h2>
              <p>Paid plans are billed monthly or annually. Refunds are available within 30 days of purchase. Failure to pay may result in service suspension.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property</h2>
              <p>All content, code, and materials on TheSiniySky are protected by copyright. You retain ownership of your content; we retain ownership of our platform.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p>TheSiniySky is provided "as is" without warranties. We are not liable for indirect damages arising from service use. Our total liability is limited to fees paid in the last 12 months.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Termination</h2>
              <p>Either party may terminate service with 30 days notice. We may suspend accounts for terms violations. Data will be retained for 30 days after termination.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Contact</h2>
              <p>For legal inquiries: <a href="mailto:legal@thesiniysky.com" className="text-blue-600">legal@thesiniysky.com</a></p>
            </section>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
