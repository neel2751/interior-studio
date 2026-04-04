import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import NavbarClient from "@/components/common/NavbarClient";
import Footer from "@/components/common/Footer";
import FloatingElements from "@/components/common/FloatingElements";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
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
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-serif)" }}>
        <div>
          <NavbarClient />
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="whatsapp-fab"
            style={{ display: "none" }}
          ></a>
          <main className="grow">
            {children}
          </main>
          <Footer />
          <FloatingElements />
        </div>
      </body>
    </html>
  );
}