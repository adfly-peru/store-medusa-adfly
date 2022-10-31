
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import { MantineProvider } from '@mantine/core';

import { Checkout } from './components/checkout';
import { OrderSummary } from './components/order_summary';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
  
      <Router>
        <Routes>
          <Route path='/' element={<Checkout></Checkout>} />
          <Route path='/order_summary' element={<OrderSummary></OrderSummary>} />

        </Routes>
      </Router>

    </MantineProvider>
  );
}
