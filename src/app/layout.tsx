import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://fouadmahmoud-portfolio.vercel.app';
const TITLE = 'Fouad Mahmoud — AI & Agentic Systems Engineer';
const DESCRIPTION =
  'AI & Agentic Systems Engineer at Obelion.AI. I build autonomous multi-agent systems with LangGraph and LangChain — planning, retrieval, tool-use, and self-correction, running in production.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'AI Engineer',
    'LLM Engineer',
    'Agentic Systems',
    'Multi-Agent Systems',
    'LangChain',
    'LangGraph',
    'RAG',
    'MLOps',
    'Machine Learning',
    'Robotics',
    'Mechatronics',
    'Python',
    'Fouad Mahmoud',
  ],
  authors: [{ name: 'Fouad Mahmoud' }],
  creator: 'Fouad Mahmoud',
  publisher: 'Fouad Mahmoud',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Fouad Mahmoud',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fouad Mahmoud — AI & Agentic Systems Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
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
};

// `viewport` is its own export in the App Router — keeping it inside
// `metadata` silently drops the theme colour.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#04050a',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
