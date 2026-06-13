import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../index.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ChatWidget from "@/components/ChatWidget";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sol Siren Vintage — Curated Vintage Fashion & Jewelry",
  description: "Sol Siren Vintage — hand-curated vintage fur, leather, Penny Lane, overcoats, après ski, and one-of-a-kind jewelry. Each piece sourced for its story.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Sol Siren Vintage — Curated Vintage Fashion & Jewelry",
    description: "Hand-curated vintage fur, leather, Penny Lane, overcoats, après ski, and one-of-a-kind jewelry. Each piece sourced for its story.",
    url: "https://solsirenvintage.com/",
    siteName: "Sol Siren Vintage",
    images: [
      {
        url: "https://solsirenvintage.com/og-image.png",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sol Siren Vintage — Curated Vintage Fashion & Jewelry",
    description: "Hand-curated vintage fur, leather, Penny Lane, overcoats, après ski, and one-of-a-kind jewelry. Each piece sourced for its story.",
    images: ["https://solsirenvintage.com/og-image.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <MetaPixel />
        <Providers>
          <Navbar />
          <CartDrawer />
          <ChatWidget />
          {children}
        </Providers>
      </body>
    </html>
  );
}
