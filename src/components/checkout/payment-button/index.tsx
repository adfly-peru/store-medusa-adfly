import { Button } from "@mantine/core"
import { PaymentSession } from "@medusajs/medusa"
import { useCart } from "medusa-react"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { MEDUSA_BACKEND_URL } from "../../../lib/config"
import { useCheckout } from "../../../lib/context/checkout-context"

type PaymentButtonProps = {
  paymentSession?: PaymentSession | null
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ paymentSession }) => {
  const [notReady, setNotReady] = useState(true)
  const { cart } = useCart()

  useEffect(() => {
    setNotReady(true)

    if (!cart) {
      return
    }

    if (!cart.shipping_address) {
      return
    }

    if (!cart.billing_address) {
      return
    }

    if (!cart.email) {
      return
    }

    if (cart.shipping_methods.length < 1) {
      return
    }

    setNotReady(false)
  }, [cart])

  switch (paymentSession?.provider_id) {
    case "manual":
      return <ManualTestPaymentButton notReady={notReady} />
    case "niubiz":
      return (
        <NiubizPaymentButton session={paymentSession} notReady={notReady} />
      )
    default:
      return <Button disabled>Select a payment methoood</Button>
  }
}

const NiubizPaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {

  const { cart } = useCart()
  const {state} = useLocation();

  useEffect(() => {
    console.log("State ", state)
    let form = document.getElementById("boton_pago");
    let scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true");
    scriptEl.setAttribute('data-sessiontoken', `${session.data.sessionKey}`);
    scriptEl.setAttribute('data-merchantid',  "456879852");
    scriptEl.setAttribute('data-purchasenumber', "22");
    scriptEl.setAttribute('data-channel', 'web');
    scriptEl.setAttribute('data-amount', `${cart?.total ?? 10.5}`);
    scriptEl.setAttribute('data-timeouturl', "about:blank");
    form?.appendChild(scriptEl);

  }, [])

  return (
    <>
    <div id='linkid'>
      <form action={`${MEDUSA_BACKEND_URL}/store/hello/${cart?.id}`} method="post" id="boton_pago"></form>
    </div>
    </>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)

  const { onPaymentCompleted } = useCheckout()

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()

    setSubmitting(false)
  }

  return (
    <Button disabled={submitting || notReady} onClick={handlePayment}>
      {submitting ? "Loading..." : "Checkout"}
    </Button>
  )
}

export default PaymentButton
