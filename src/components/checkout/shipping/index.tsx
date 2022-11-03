import { RadioGroup } from "@headlessui/react"
import { Radio, Title } from "@mantine/core"
import { Cart } from "@medusajs/medusa"
import clsx from "clsx"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { useCheckout } from "../../../lib/context/checkout-context"

type ShippingOption = {
  value: string
  label: string
  price: string
}

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

type ShippingFormProps = {
  soId: string
}

const Shipping: React.FC<ShippingProps> = ({ cart }) => {
  const { addShippingMethod, setCart } = useCart()
  const {
    control,
    setError,
    formState: { errors },
  } = useForm<ShippingFormProps>({
    defaultValues: {
      soId: cart.shipping_methods?.[0]?.shipping_option_id,
    },
  })

  // Fetch shipping options
  const { shipping_options, refetch } = useCartShippingOptions(cart.id, {
    enabled: !!cart.id,
  })

  // Any time the cart changes we need to ensure that we are displaying valid shipping options
  useEffect(() => {
    const refetchShipping = async () => {
      await refetch()
    }

    refetchShipping()
  }, [cart, refetch])

  const submitShippingOption = (soId: string) => {
    addShippingMethod.mutate(
      { option_id: soId },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () =>
          setError(
            "soId",
            {
              type: "validate",
              message:
                "An error occurred while adding shipping. Please try again.",
            },
            { shouldFocus: true }
          ),
      }
    )
  }

  const handleChange = (value: string, fn: (value: string) => void) => {
    submitShippingOption(value)
    fn(value)
  }

  // Memoized shipping method options
  const shippingMethods: ShippingOption[] = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          amount: option.amount || 0,
          region: cart.region,
        }),
      }))
    }

    return []
  }, [shipping_options, cart])

  return (
    <>
    <Title order={2} py="sm">Shipping Options</Title>
    <Controller
      name="soId"
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <div>
            <Radio.Group
              value={value}
              onChange={(value: string) => handleChange(value, onChange)}
            >
              {shippingMethods && shippingMethods.length ? (
                shippingMethods.map((option) => {
                  return (
                    <Radio
                      key={option.value}
                      value={option.value}
                      description={`${option.label} - ${option.price}`}
                    />
                  )
                })
              ) : (
                <>
                </>
              )}
            </Radio.Group>
          </div>
        )
      }}
    />
    </>
  )
}

export default Shipping
