import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haven Estates",
  description: "Find your next home with a modern real estate experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-b from-brand-50 to-white dark:from-slate-900 dark:to-slate-950`}>
        {children}
      </body>
    </html>
  );
}
