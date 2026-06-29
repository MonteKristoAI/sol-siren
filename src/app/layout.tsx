import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../index.css";
import { Providers } from "./providers";
import StorefrontChrome from "@/components/StorefrontChrome";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.solsirenvintage.com"),
  alternates: { canonical: "/" },
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
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "Sol Siren Vintage",
    url: "https://www.solsirenvintage.com",
    logo: "https://www.solsirenvintage.com/apple-touch-icon.png",
    description:
      "Hand-curated vintage fur, leather, Penny Lane, overcoats, après ski, and one-of-a-kind jewelry.",
    email: "hello@solsirenvintage.com",
    sameAs: ["https://www.instagram.com/solsirenvintage"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Providers>
          <StorefrontChrome>{children}</StorefrontChrome>
        </Providers>
      </body>
    </html>
  );
}
