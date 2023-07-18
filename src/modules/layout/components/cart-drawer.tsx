import {
  ActionIcon,
  Button,
  Center,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";

import { IconShoppingCart, IconShoppingCartOff } from "@tabler/icons";
import { useRouter } from "next/router";
import { useCart } from "@context/cart-context";
import { useViewportSize } from "@mantine/hooks";
import ProductCartView from "@modules/products/components/product-cart-view";

const CartDrawer = () => {
  const router = useRouter();
  const { cart } = useCart();
  const { height, width } = useViewportSize();

  if (!cart) {
    return <div></div>;
  }

  if (cart.suborders.length == 0) {
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
        {cart.suborders.map((suborder) => (
          <div key={suborder.uuidcartsuborder}>
            <Text>{suborder.businessName}</Text>
            {suborder.items.map((item) => (
              <ProductCartView
                cartItem={item}
                uuidbusiness={suborder.uuidbusiness}
                businessName={suborder.businessName}
                key={item.uuidcartitem}
              />
            ))}
          </div>
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
