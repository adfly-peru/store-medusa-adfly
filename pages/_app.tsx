import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AccountProvider } from '../context/account-context'
import { ProductProvider } from '../context/product-context'
import { CartProvider } from '../context/cart-context'

export default function App({ Component, pageProps }: AppProps) {
  return <AccountProvider>
    <ProductProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ProductProvider>
  </AccountProvider>
}
