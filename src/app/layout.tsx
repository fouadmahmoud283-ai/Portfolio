import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Fouad Mahmoud - AI & Agentic Systems Engineer",
  description: "AI & Agentic Systems Engineer at Obelion.Ai. Specializing in autonomous AI systems, LangChain, LangGraph, and multi-agent architectures. Mechatronics & Robotics Engineering Student.",
  keywords: [
    "AI Engineer",
    "Agentic Systems",
    "LangChain",
    "LangGraph",
    "Machine Learning",
    "Robotics",
    "Mechatronics",
    "Python",
    "Portfolio",
    "Fouad Mahmoud"
  ],
  authors: [{ name: "Fouad Mahmoud" }],
  creator: "Fouad Mahmoud",
  publisher: "Fouad Mahmoud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fouadmahmoud-portfolio.vercel.app",
    title: "Fouad Mahmoud - AI & Agentic Systems Engineer",
    description: "AI & Agentic Systems Engineer specializing in autonomous AI systems and multi-agent architectures",
    siteName: "Fouad Mahmoud Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fouad Mahmoud - AI Engineer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fouad Mahmoud - AI & Agentic Systems Engineer",
    description: "AI & Agentic Systems Engineer specializing in autonomous AI systems and multi-agent architectures",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
