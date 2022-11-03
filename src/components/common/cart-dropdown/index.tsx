import { Button, Group, Popover, Stack, Text, Anchor, Grid, Title, ActionIcon } from "@mantine/core"
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useCart } from "medusa-react"
import { useCartDropdown } from "../../../lib/context/cart-dropdown-context"
import { useStore } from "../../../lib/context/store-context"
import useEnrichedLineItems from "../../../lib/hooks/use-enrich-line-items"
import Thumbnail from "../../products/thumbnail";
import { IconTrash } from '@tabler/icons';

const CartDropdown = () => {
  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()
  const { state, open, close } = useCartDropdown()

  return (
    <div onMouseEnter={open} onMouseLeave={close}>
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md" opened={state}>
      <Popover.Target>
        <Button>
          Go to Checkout
        </Button>
      </Popover.Target>
      <Popover.Dropdown sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
        <Title order={3}>Shopping Bag</Title>
        {cart && items?.length ? (
          <>
            <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
              {items
                .sort((a, b) => {
                  return a.created_at > b.created_at ? -1 : 1
                })
                .map((item) => (
                  <Grid>
                    <Grid.Col span={6}>
                      <Thumbnail thumbnail={item.thumbnail} size="full" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Stack>
                        <Anchor component={Link} to={`/products/${item.variant.product.handle}`}>
                          {item.title}
                        </Anchor>
                        <Text>Quantity: {item.quantity}</Text>
                        <Button leftIcon={<IconTrash />} onClick={() => deleteItem(item.id)}>
                          Remove
                        </Button>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                ))}
            </div>
            <Button component={Link} to={"/checkout"}>
              Go to checkout
            </Button>
          </>
        ) : (
          <Text>Your shopping bag is empty</Text>
        )}
      </Popover.Dropdown>
    </Popover>
    </div>
  )
}

export default CartDropdown
