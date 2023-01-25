import {
  ActionIcon,
  Button,
  Center,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";

import CartProduct from "@components/cartProductComponent";
import { IconShoppingCart, IconShoppingCartOff } from "@tabler/icons";
import { useRouter } from "next/router";
import { useCart } from "@context/cart-context";
import { useViewportSize } from "@mantine/hooks";

const CartDrawer = () => {
  const router = useRouter();
  const { products } = useCart();
  const { height, width } = useViewportSize();

  if (products.length == 0) {
    return (
      <>
        <Center h={height / 1.5}>
          <Stack align="center">
            <ActionIcon variant="transparent" disabled size={width / 8}>
              <IconShoppingCartOff size={width / 8} />
            </ActionIcon>
            <Text fw={500} fz={24}>
              Tu carrito está vacío
            </Text>
          </Stack>
        </Center>
      </>
    );
  }

  return (
    <>
      <ScrollArea style={{ height: "80%" }}>
        {products.map((prod, id): any => (
          <CartProduct productCart={prod} id={id} />
        ))}
      </ScrollArea>
      <Center sx={{ height: "15%" }}>
        <Button
          onClick={() => router.push("/checkout/mycart")}
          leftIcon={<IconShoppingCart />}
          size="md"
          fullWidth
        >
          Ir a caja
        </Button>
      </Center>
    </>
  );
};

export default CartDrawer;
