import { ProductCart } from "@context/cart-context";
import { Stack, Divider, ScrollArea, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import DetailedProductCartView from "@modules/my-cart/components/product-cart-view";

const CartView = ({ products }: { products: ProductCart[] }) => {
  const { height } = useViewportSize();
  return (
    <Stack align="flex-start">
      <Title px="sm">Mi Carrito (x Productos)</Title>
      <Divider size="sm" w="100%" color="dark" />
      <ScrollArea h={height / 1.5} w="100%" type="auto" offsetScrollbars>
        {products.map((prod, id): any => (
          <div key={id}>
            <DetailedProductCartView productCart={prod} />
            <Divider />
          </div>
        ))}
      </ScrollArea>
    </Stack>
  );
};

export default CartView;
