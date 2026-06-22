import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';

export default function PrivacyPage() {
  return (
    <>
      <PublicHeader />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: June 22, 2026</p>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly: name, email, phone number, and any content you submit through our contact forms or account registration. We also automatically collect usage data including IP address, browser type, and pages visited.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p>We use your information to provide and improve our services, communicate with you about your account, send newsletters (with your consent), respond to inquiries, and ensure the security of our platform.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Data Protection</h2>
              <p>We implement industry-standard security measures including encryption, secure servers, and regular security audits. Your data is stored securely and never sold to third parties.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Cookies</h2>
              <p>We use essential cookies for authentication and site functionality. Analytics cookies help us understand usage patterns. You can disable cookies in your browser settings.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. You can unsubscribe from marketing emails anytime. Contact us at privacy@thesiniysky.com for data requests.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Contact</h2>
              <p>For privacy concerns, contact: <a href="mailto:privacy@thesiniysky.com" className="text-blue-600">privacy@thesiniysky.com</a></p>
            </section>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
