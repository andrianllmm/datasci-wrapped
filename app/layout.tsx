import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DataSci Wrapped | Annual Data Science Trends & Insights",
  description:
    "Explore annual data science trends, market size, tools, and insights. Get your personalized data science wrapped report.",
  keywords:
    "data science, wrapped, trends, market size, tools, languages, data volume",
  authors: [{ name: "DataSci Wrapped" }],
  openGraph: {
    title: "DataSci Wrapped | Annual Data Science Trends & Insights",
    description:
      "Explore annual data science trends, market size, tools, and insights.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    siteName: "DataSci Wrapped",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "DataSci Wrapped",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataSci Wrapped",
    description:
      "Explore annual data science trends, market size, tools, and insights.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="has-custom-cursor">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        {children}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
