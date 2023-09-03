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
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { useCart } from "@context/cart-context";
import { CartItem } from "@interfaces/cart";
import { useState } from "react";

const ProductCartView = ({
  cartItem,
  uuidbusiness,
  businessName,
}: {
  cartItem: CartItem;
  uuidbusiness: string;
  businessName: string;
}) => {
  const { editProduct, removeProduct } = useCart();
  const [updating, setUpdating] = useState(false);

  const handleEditProduct = async (delta: number) => {
    setUpdating(true);
    await editProduct(cartItem, uuidbusiness, cartItem.quantity + delta);
    setUpdating(false);
  };

  const handleRemoveProduct = async () => {
    setUpdating(true);
    await removeProduct(cartItem.uuidcartitem, uuidbusiness);
    setUpdating(false);
  };

  return (
    <Container>
      <Grid
        justify="center"
        align="center"
        sx={{ paddingBottom: 20, paddingTop: 20 }}
        grow
      >
        <Grid.Col span={6}>
          <Image
            src={cartItem.variant.imageURL}
            alt={cartItem.variant.imageURL}
            height={140}
            fit="contain"
            withPlaceholder
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack spacing={5}>
            <Title order={4}>{cartItem.variant.product.productName}</Title>
            <Text fw={500}>{businessName}</Text>
            <Group position="apart">
              <Text>Cantidad: {cartItem.quantity}</Text>
              <ActionIcon
                color="gray"
                radius="xl"
                variant="outline"
                disabled={updating || cartItem.quantity <= 1}
                onClick={() => handleEditProduct(-1)}
              >
                <IconMinus stroke={1.5} size="1.125rem" />
              </ActionIcon>
              <ActionIcon
                color="gray"
                radius="xl"
                variant="outline"
                disabled={updating || cartItem.quantity >= 10}
                onClick={() => handleEditProduct(1)}
              >
                <IconPlus stroke={1.5} size="1.125rem" />
              </ActionIcon>
            </Group>
            <Button
              color="gray"
              leftIcon={<IconTrash />}
              disabled={updating}
              onClick={handleRemoveProduct}
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

export default ProductCartView;
