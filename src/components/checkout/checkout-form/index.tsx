import Addresses from "../addresses"
import Payment from "../payment"
import Shipping from "../shipping"
import { useCart } from "medusa-react"
import { Stack } from "@mantine/core"

const CheckoutForm = () => {
  const { cart } = useCart()

  if (!cart?.id) {
    return null
  }

  return (
    <div>
      <Stack justify="space-around">
        <Addresses />
        <Shipping cart={cart} />
        <Payment />
      </Stack>
    </div>
  )
}

export default CheckoutForm
