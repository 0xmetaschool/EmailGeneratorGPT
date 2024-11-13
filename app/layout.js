import { Inter } from 'next/font/google'
import Header from '../components/Header'  // This path is correct for your structure
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Email Generator',
  description: 'AI-powered email generator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}