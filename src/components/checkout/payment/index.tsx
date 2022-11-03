import { Title } from "@mantine/core"
import { useEffect } from "react"
import { useCheckout } from "../../../lib/context/checkout-context"
import PaymentContainer from "../payment-container"

const Payment = () => {
  const {
    cart,
    setPaymentSession,
    initPayment,
    sameAsBilling: { state: isSame },
  } = useCheckout()

  /**
   * Fallback if the payment session are not loaded properly we
   * retry to load them after a 5 second delay.
   */
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    if (cart?.shipping_address && cart?.payment_sessions) {
      timeout = setTimeout(() => {
        initPayment()
      }, 5000)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  return (
    <>
      <Title order={2}>Payment Options</Title>
      {cart?.payment_sessions?.length ? (
        cart.payment_sessions
          .sort((a, b) => {
            return a.provider_id > b.provider_id ? 1 : -1
          })
          .map((paymentSession) => {
            return (
              <PaymentContainer
                paymentSession={paymentSession}
                key={paymentSession.id}
                selected={
                  cart?.payment_session?.provider_id ===
                  paymentSession.provider_id
                }
                setSelected={() =>
                  setPaymentSession(paymentSession.provider_id)
                }
              />
            )
          })
      ) : (
        <>
        </>
        )}
    </>
  )
}

export default Payment
