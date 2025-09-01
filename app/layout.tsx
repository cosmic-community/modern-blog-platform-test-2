import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Blog Platform',
  description: 'A beautifully designed blog platform showcasing quality content with elegant typography and modern design.',
  keywords: 'blog, articles, technology, travel, lifestyle, writing',
  authors: [{ name: 'Modern Blog Platform' }],
  openGraph: {
    title: 'Modern Blog Platform',
    description: 'A beautifully designed blog platform showcasing quality content with elegant typography and modern design.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Blog Platform',
    description: 'A beautifully designed blog platform showcasing quality content with elegant typography and modern design.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}