import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AccountProvider } from '../context/account-context'

export default function App({ Component, pageProps }: AppProps) {
  return <AccountProvider>
    <Component {...pageProps} />
  </AccountProvider>
}
