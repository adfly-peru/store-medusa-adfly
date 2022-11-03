import { useCart } from "medusa-react"
import CartTotals from "../cart-totals"
import PaymentButton from "../payment-button"

const CheckoutSummary = () => {
  const { cart } = useCart()

  if (!cart?.id) {
    return null
  }

  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8">
      <CartTotals cart={cart} />
      <PaymentButton paymentSession={cart?.payment_session} />
    </div>
  )
}

export default CheckoutSummary
