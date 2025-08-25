import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BucksBunny - AI Financial Coach for St. Kitts & Nevis",
  description: "Your friendly AI financial education coach for teenagers in St. Kitts and Nevis. Learn about budgeting, saving, local banking, and building wealth in the Caribbean.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen font-sans text-light-text dark:text-dark-text transition-colors duration-300">
            <Header />
            <main className="flex-grow flex min-h-0">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
