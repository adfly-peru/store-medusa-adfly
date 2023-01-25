import { ActionIcon, Drawer, Indicator, Title } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import { useState } from "react";
import { useCart } from "@context/cart-context";
import CartDrawer from "@modules/home/components/cart-drawer";

const CartIndicator = () => {
  const { products } = useCart();
  const [opened, setOpened] = useState(false);

  console.log(products);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title order={2}>Mi carrito</Title>}
        padding="xl"
        size="xl"
        position="right"
      >
        <CartDrawer></CartDrawer>
      </Drawer>
      <Indicator
        showZero={false}
        label={products.length}
        overflowCount={10}
        inline
        size={22}
        processing
      >
        <ActionIcon onClick={() => setOpened(true)} size="lg">
          <IconShoppingCart size={30} stroke={1.5} />
        </ActionIcon>
      </Indicator>
    </>
  );
};

export default CartIndicator;
