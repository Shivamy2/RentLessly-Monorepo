/**
 * Root Layout
 * Wraps all pages with global providers
 */

import './globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { AuthProvider } from '@/providers/AuthProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: {
    template: '%s | Rent Lessly',
    default: 'Rent Lessly - Rent it Effortlessly',
  },
  description: 'Find your perfect rental apartment in Gurugram',
  applicationName: 'Rent Lessly',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Rent Lessly',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen bg-white">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
