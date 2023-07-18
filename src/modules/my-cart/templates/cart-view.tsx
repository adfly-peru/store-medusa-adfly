import { Cart } from "@interfaces/cart";
import { Stack, Divider, ScrollArea, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import DetailedProductCartView from "@modules/my-cart/components/product-cart-view";

const CartView = ({ cart }: { cart: Cart }) => {
  const { height } = useViewportSize();
  const items = cart.suborders.flatMap((subOrder) => subOrder.items);
  return (
    <Stack align="flex-start">
      <Title px="sm">Mi Carrito ({items.length} Productos)</Title>
      <Divider size="sm" w="100%" color="dark" />
      <ScrollArea h={height / 1.5} w="100%" type="auto" offsetScrollbars>
        {cart.suborders.map((suborder, id): any => (
          <div key={id}>
            {suborder.items.map((item, iditem): any => (
              <div key={iditem}>
                <DetailedProductCartView
                  item={item}
                  businessid={suborder.uuidbusiness}
                  businessName={suborder.businessName}
                />
                <Divider />
              </div>
            ))}
          </div>
        ))}
      </ScrollArea>
    </Stack>
  );
};

export default CartView;
