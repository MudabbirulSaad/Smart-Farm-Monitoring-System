import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Smart Farm Monitor',
  description: 'Real-time environmental monitoring for smart agriculture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <nav className="bg-green-600 text-white p-6">
          <h1 className="text-3xl font-bold">Smart Farm Monitor</h1>
        </nav>
        <main className="container mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}