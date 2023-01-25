import {
  Text,
  Image,
  Button,
  Container,
  Grid,
  Stack,
  Title,
  Divider,
  Group,
  ActionIcon,
} from "@mantine/core";
import { IconCircleMinus, IconCirclePlus, IconTrash } from "@tabler/icons";
import { ProductCart, useCart } from "@context/cart-context";

const CartProduct = ({
  productCart,
  id,
}: {
  productCart: ProductCart;
  id: number | undefined;
}) => {
  const { editProduct, removeProduct } = useCart();
  const product = productCart.product;

  return (
    <Container key={id}>
      <Grid
        justify="center"
        align="center"
        sx={{ paddingBottom: 20, paddingTop: 20 }}
        grow
      >
        <Grid.Col span={6}>
          <Image
            src={product.imgUrl[0]}
            alt={product.imgUrl[0]}
            height={140}
            fit="contain"
            withPlaceholder
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack spacing={5}>
            <Title order={4}>{product.name}</Title>
            <Text fw={500}>{product.brand}</Text>
            <Group position="apart">
              <Text>Cantidad: {productCart.quantity}</Text>
              <ActionIcon
                color="gray"
                size={34}
                onClick={() =>
                  productCart.quantity > 1
                    ? editProduct(product, productCart.quantity - 1)
                    : null
                }
              >
                <IconCircleMinus stroke={1.5} size={34} />
              </ActionIcon>
              <ActionIcon
                color="gray"
                size={34}
                onClick={() =>
                  productCart.quantity < 10
                    ? editProduct(product, productCart.quantity + 1)
                    : null
                }
              >
                <IconCirclePlus stroke={1.5} size={34} />
              </ActionIcon>
            </Group>
            <Button
              color="gray"
              leftIcon={<IconTrash />}
              onClick={() => removeProduct(product)}
            >
              Eliminar
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
      <Divider size="xs" />
    </Container>
  );
};

export default CartProduct;
