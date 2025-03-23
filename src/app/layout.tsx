import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import {
  HomeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Footer from '@/components/Footer';
import { Suspense } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Utility Belt - Your All-in-One Toolkit",
  description: "Your all-in-one toolkit for file conversions, data transformations, and utility functions. Fast, secure, and easy to use.",
};

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen flex flex-col`}>
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2">
                  <SparklesIcon className="h-8 w-8 text-blue-500" />
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Utility Belt
                  </span>
                </Link>
              </div>

              {/* Home Button */}
              <Link
                href="/"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <HomeIcon className="h-5 w-5" />
                <span>Home</span>
              </Link>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<LoadingSpinner />}>
              {children}
            </Suspense>
          </div>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
} 