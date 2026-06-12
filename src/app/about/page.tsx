import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';

export default function AboutPage() {
  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">About TheSiniySky</h1>
          <p className="text-xl text-muted-foreground">
            We are a team of passionate developers dedicated to building innovative digital solutions.
          </p>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
