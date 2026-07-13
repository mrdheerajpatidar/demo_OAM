import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Awas Mela (OAM) | Indore's Premium Real Estate Platform",
  description: "Find, Compare, and Choose Your Home. Online Awas Mela is Indore's most trusted premium real estate search and sales platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-light text-dark gradient-bg">{children}</body>
    </html>
  );
}
