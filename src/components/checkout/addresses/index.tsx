import { List, Space, ThemeIcon, Title } from "@mantine/core"
import { IconCircleCheck } from "@tabler/icons"
import { useCheckout } from "../../../lib/context/checkout-context"

const Addresses = () => {
  const {
    cart,
  } = useCheckout()
  

  return (
    <div className="bg-white">
      <Title order={4} py="md">
        Shipping Address
      </Title>
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        <List.Item>First Name: {cart?.shipping_address?.first_name ?? ''}</List.Item>
        <List.Item>Last Name: {cart?.shipping_address?.last_name ?? ''}</List.Item>
        <List.Item>Address 1: {cart?.shipping_address?.address_1 ?? ''}</List.Item>
        <List.Item>Address 2: {cart?.shipping_address?.address_2 ?? ''}</List.Item>
        <List.Item>Postal Code: {cart?.shipping_address?.postal_code ?? ''}</List.Item>
        <List.Item>City: {cart?.shipping_address?.city ?? ''}</List.Item>
        <List.Item>Country: {cart?.shipping_address?.country_code ?? ''}</List.Item>
        <List.Item>Phone: {cart?.shipping_address?.phone ?? ''}</List.Item>
      </List>
      <Space h="md" />
      <Title order={4} py="md">
        Billing Address
      </Title>
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        <List.Item>First Name: {cart?.billing_address?.first_name ?? ''}</List.Item>
        <List.Item>Last Name: {cart?.billing_address?.last_name ?? ''}</List.Item>
        <List.Item>Address 1: {cart?.billing_address?.address_1 ?? ''}</List.Item>
        <List.Item>Address 2: {cart?.billing_address?.address_2 ?? ''}</List.Item>
        <List.Item>Postal Code: {cart?.billing_address?.postal_code ?? ''}</List.Item>
        <List.Item>City: {cart?.billing_address?.city ?? ''}</List.Item>
        <List.Item>Country: {cart?.billing_address?.country_code ?? ''}</List.Item>
        <List.Item>Phone: {cart?.billing_address?.phone ?? ''}</List.Item>
      </List>
    </div>
  )
}

export default Addresses
