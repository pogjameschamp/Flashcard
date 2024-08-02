import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar  from '../components/component/navbar'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flashcard",
  description: "Flashcard App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <Navbar />
        <main className="flex-grow overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
