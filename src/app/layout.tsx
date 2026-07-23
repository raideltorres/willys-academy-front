import type { Metadata } from 'next';

import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Willy's Academy",
  description: 'Learn, play, and grow through Chess and Go',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
