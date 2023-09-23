import './globals.css'

// Next
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Third-Party Libraries
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Queue App',
  description: 'Queue app for Potato Head',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <div>{children}</div>
      </body>
    </html>
  )
}
