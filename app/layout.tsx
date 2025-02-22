import { Toaster } from '@/components/ui/sonner'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import type React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI工具库导航',
  description: '探索各种AI工具和资源',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
