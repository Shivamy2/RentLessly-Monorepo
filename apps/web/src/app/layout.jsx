/**
 * Root Layout
 * Wraps all pages with global providers
 */

import './globals.css';
import { Header, Footer } from '@/components/layout';
import { Providers } from '@/providers';

export const metadata = {
  title: {
    template: '%s | Rent Lessly',
    default: 'Rent Lessly - Rent it Effortlessly',
  },
  description: 'Find your perfect rental apartment in Gurugram with zero brokerage. Verified properties, genuine owners.',
  applicationName: 'Rent Lessly',
  keywords: ['rent', 'rental', 'apartment', 'no broker', 'gurugram', 'housing'],
  icons: {
    icon: '/logo-icon.png',
    shortcut: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Rent Lessly',
  },
  openGraph: {
    title: 'Rent Lessly - Rent it Effortlessly',
    description: 'Find your perfect rental apartment with zero brokerage',
    type: 'website',
    locale: 'en_IN',
    images: ['/logo-full.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1A5276" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-neutral-900 antialiased bg-white">
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
