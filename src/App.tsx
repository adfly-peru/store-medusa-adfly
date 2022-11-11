
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import { CartProvider, MedusaProvider } from "medusa-react"
import { MEDUSA_BACKEND_URL, queryClient } from './lib/config';
import { HomePage } from './pages/HomePage';
import { StoreProvider } from './lib/context/store-context';
import { CartDropdownProvider } from './lib/context/cart-dropdown-context';
import { ProductsPage } from './pages/ProductsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmPage } from './pages/order/OrderConfirmed';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  return (
    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <CartDropdownProvider>
          <CartProvider>
            <StoreProvider>
              <Router>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/checkout' element={<CheckoutPage />} />
                  <Route path='/products/:handle' element={<ProductsPage />} />
                  <Route path='/order/confirm/:order' element={<OrderConfirmPage />} />
                  <Route path='/login' element={<LoginPage />} />
                </Routes>
              </Router>
            </StoreProvider>
          </CartProvider>
        </CartDropdownProvider>
      </MantineProvider>
    </MedusaProvider>
  );
}
