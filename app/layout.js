import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}