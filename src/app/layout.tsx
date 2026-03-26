import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import FloatingElements from "@/components/common/FloatingElements";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.interiorstudioltd.com"),
  title: "Interior Studio Ltd — Luxury Interior Design in Ahmedabad, India",
  description:
    "Interior Studio Ltd offers full-service interior design for residential and commercial projects across India. From modern villas to boutique hotels — we transform spaces into extraordinary masterpieces.",
  keywords:
    "interior design ahmedabad, luxury interior design india, residential interior design, commercial interior design, office interior, hospitality design, interior studio ltd",
  openGraph: {
    title: "Interior Studio Ltd — Luxury Interior Design in Ahmedabad, India",
    description:
      "Interior Studio Ltd offers full-service interior design for residential and commercial projects across India.",
    type: "website",
    url: "https://www.interiorstudioltd.com",
    images: [
      {
        url: "/images/hero/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Interior Studio Ltd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Studio Ltd — Luxury Interior Design",
    description:
      "Full-service interior design for residential and commercial projects across India.",
    images: ["/images/hero/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-body)" }} suppressHydrationWarning>
        <div suppressHydrationWarning>
          <Navbar />
          {/* Placeholder for browser extension WhatsApp FAB */}
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="whatsapp-fab"
            style={{ display: 'none' }}
            suppressHydrationWarning
          ></a>
          <main className="grow" suppressHydrationWarning>
            {children}
          </main>
          <Footer />
          <FloatingElements />
        </div>
      </body>
    </html>
  );
}