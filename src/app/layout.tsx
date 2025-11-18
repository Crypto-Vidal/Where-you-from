import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartModal from '@/components/cart/CartModal';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Where You From - Minnesota Pride Clothing | Locally Inspired Apparel',
  description: 'Celebrate Minnesota with Where You From - your source for locally-inspired, high-quality clothing. From the North Shore to the Twin Cities, wear your Minnesota pride.',
  keywords: ['Minnesota clothing', 'Minnesota apparel', 'local pride', 'Minnesota shirts', 'Where You From'],
  authors: [{ name: 'Where You From' }],
  creator: 'Where You From',
  publisher: 'Where You From',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://whereyoufrom.com'),
  openGraph: {
    title: 'Where You From - Minnesota Pride Clothing',
    description: 'Celebrate Minnesota with locally-inspired, high-quality clothing',
    url: 'https://whereyoufrom.com',
    siteName: 'Where You From',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Where You From - Minnesota Pride Clothing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where You From - Minnesota Pride Clothing',
    description: 'Celebrate Minnesota with locally-inspired, high-quality clothing',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <CartModal />
        </CartProvider>
      </body>
    </html>
  );
}
