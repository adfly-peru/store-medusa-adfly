import { Button, Checkbox, clsx, Group, Stack, Text } from "@mantine/core"
import { PaymentSession } from "@medusajs/medusa"
import React from "react"

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selected: boolean
  setSelected: () => void
  disabled?: boolean
}

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
  stripe: {
    title: "Credit card",
    description: "Secure payment with credit card",
  },
  paypal: {
    title: "PayPal",
    description: "Secure payment with PayPal",
  },
  niubiz: {
    title: "Niubiz",
    description: "Payment with Niubiz",
  },
  manual: {
    title: "Test payment",
    description: "Test payment using medusa-payment-manual",
  },
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
}) => {
  return (
    <div
    >
      <Button
        onClick={setSelected}
        disabled={disabled}
        variant="outline"
        fullWidth
        color="dark"
      >
        <Group position="apart">
          <Checkbox checked={selected} />
          <Text>{PaymentInfoMap[paymentSession.provider_id].title}</Text>
        </Group>
        {/* <div className="flex flex-col text-left">
          <h3 className="text-base-semi leading-none text-gray-900">
            {PaymentInfoMap[paymentSession.provider_id].title}
          </h3>
          <span className="text-gray-700 text-small-regular mt-2">
            {PaymentInfoMap[paymentSession.provider_id].description}
          </span>
        </div> */}
      </Button>
    </div>
  )
}


export default PaymentContainer
