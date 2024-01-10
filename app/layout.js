import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NoSQL CRUD',
  description: 'NoSQL Crud web applicatie met Next.js en MongoDB',
}

export const viewport = {
  themeColor: '#2fd8a8',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='p-0 m-0'>
    
      <body className={`${inter.className} bg-white text-black`}>
      <Navbar />
        <>
        {children}
        </>
        <Footer />
      </body>
    </html>
  )
}
