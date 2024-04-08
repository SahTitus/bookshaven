import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { siteName } from '@lib/constants'
import { AuthForm } from '@components/forms/AuthForm'
import AuthProviders from '@components/Provider'
import { StateProvider } from '@redux/StateProvider'
import { SpinnerOverlay } from '@components/loading/SpinnerOvarlay'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: siteName,
  siteName: siteName,
  description: 'Book Haven - Your go-to destination for all kinds of books',
  icons: {
  },
  category: 'Book Shop',
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#18182a" },
    { media: "(prefers-color-scheme: dark)", color: "#18182a" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>
          <StateProvider>
            <Navbar />
            <div className='flex flex-col lg:max-w-6xl mx-auto select-none'>
              {children}
              <SpinnerOverlay />
            </div>
            <AuthForm />
            <Footer />
          </StateProvider>
        </AuthProviders>
      </body>
    </html>
  )
};