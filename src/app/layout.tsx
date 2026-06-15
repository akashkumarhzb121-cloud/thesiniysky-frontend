import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { DottedSurfaceWrapper } from '@/components/ui/dotted-surface-wrapper';

export const metadata: Metadata = {
  title: {
    default: 'TheSiniySky - Premium SaaS Platform',
    template: '%s | TheSiniySky'
  },
  description: 'Modern SaaS platform for project management and client services',
  keywords: 'saas, project management, web development, cloud solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <DottedSurfaceWrapper />
          <div className="relative z-10">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}