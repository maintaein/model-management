import type { Metadata } from 'next'
import { ReactQueryProvider } from '@/lib/providers/ReactQueryProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Model Management',
  description: 'Foreign model management agency',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
