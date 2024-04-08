import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import Footer from '@components/BottomNavigation/Footer'
import { BackgroundGradient } from '@components/BackgroundGradient'
import { siteName } from '@lib/constants'
import { clientRoutes } from '@lib/routes'
import { AuthForm } from '@components/forms/AuthForm'
import AuthProviders from '@components/Provider'
import { StateProvider } from '@redux/StateProvider'
import { SpinnerOverlay } from '@components/loading/SpinnerOvarlay'
import { GoogleAnalytics } from '@components/GoogleAnalytics'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: siteName,
  siteName: siteName,
  description: 'Book Haven - Your go-to destination for all kinds of books',
  icons: {
    },
    category: 'Book S',
  },
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
        <Script
          defer
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GO_AD_KEY}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      <body className={inter.className}>
        <GoogleAnalytics />
        <AuthProviders>
          <StateProvider>
            <Navbar />
            <div className='flex flex-col lg:max-w-6xl mx-auto select-none'>
              {children}
              <SpinnerOverlay />
              <BackgroundGradient isRight={false} />
            </div>
            <AuthForm />
            <Footer />
          </StateProvider>
        </AuthProviders>
      </body>
    </html>
  )
};