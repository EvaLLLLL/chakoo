import '@/styles/globals.scss'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export function generateMetadata(): Metadata {
  return {
    title: 'Chakoo',
    applicationName: 'Chakoo',
    description: 'Web3 Chat Platform',
    icons: [
      { rel: 'icon', url: '/next.svg' },
      { rel: 'apple', url: '/next.svg' }
    ]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  )
}
