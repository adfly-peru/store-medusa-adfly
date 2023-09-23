import { useCart } from "@context/cart-context";
import { CartSubOrder } from "@interfaces/cart";
import { Text, Group, Stack, Image, Checkbox, Grid } from "@mantine/core";
import { useState } from "react";

const ShipmentCard = ({
  index,
  total,
  suborder,
}: {
  index: number;
  total: number;
  suborder: CartSubOrder;
}) => {
  const { selectDeliveryMethod, cart } = useCart();
  const handleSelect = async (method: string) => {
    await selectDeliveryMethod(suborder.uuidcartsuborder, method);
  };
  return (
    <Grid gutter="lg" grow>
      <Grid.Col span={8}>
        <Stack spacing="xl">
          <Text fw={500}>
            Pedido {index + 1} de {total}: Entregado por {suborder.businessName}
          </Text>
          {suborder.items.map((product, _) => (
            <div key={product.uuidcartitem}>
              <Group position="apart" spacing="xl" grow>
                <Image
                  src={product.variant.imageURL}
                  alt={product.variant.imageURL}
                  height={150}
                  fit="contain"
                  withPlaceholder
                />
                <Stack spacing={0}>
                  <Text c="indigo">{product.variant.product.productName}</Text>
                  <Text fz="sm">
                    <Text fw={500} span>
                      {"Cantidad: "}
                    </Text>
                    {product.quantity}
                  </Text>
                  <Text fz="sm">
                    <Text fw={500} span>
                      {"Subtotal: "}
                    </Text>
                    {`S/.${
                      product.quantity * (product.variant.adflyPrice ?? 0)
                    }`}
                  </Text>
                </Stack>
              </Group>
            </div>
          ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}>
        <Stack>
          <Text fw={500}>Opciones de Envío</Text>
          {suborder.availableDeliveryMethods.deliveryOnHome && (
            <div>
              <Checkbox
                checked={suborder.deliverymethod == "onhome"}
                onChange={(_) => handleSelect("onhome")}
                radius="lg"
                value={0}
                label="Entrega en Dirección Personal"
              />
              <Stack pl={20} spacing={0}>
                <Text fz="sm">
                  <Text span c="dimmed">
                    Costo de Envío:
                  </Text>
                  {` S/. ${suborder.availableDeliveryMethods.deliveryOnHome.price}`}
                </Text>
                <Text fz="sm">
                  <Text span c="dimmed">
                    Fecha de Entrega:
                  </Text>
                  {` ${suborder.availableDeliveryMethods.deliveryOnHome.timetodelivery}`}
                </Text>
                <Text fz="sm">
                  <Text span c="dimmed">
                    Especificaciones:{" "}
                  </Text>
                  {suborder.availableDeliveryMethods.deliveryOnHome.comments ??
                    "-"}
                </Text>
              </Stack>
            </div>
          )}
          <Checkbox
            checked={suborder.deliverymethod == "pickup"}
            onChange={(_) => handleSelect("pickup")}
            radius="lg"
            value={1}
            label="Recojo en Tienda"
          />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default ShipmentCard;
