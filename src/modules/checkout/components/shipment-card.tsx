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
  const [select, setSelect] = useState<number>(-1);
  return (
    <>
      <Grid gutter="lg" grow>
        <Grid.Col span={8}>
          <Stack spacing="xl">
            <Text fw={500}>
              Pedido {index + 1} de {total}: Entregado por{" "}
              {suborder.businessName}
            </Text>
            {suborder.items.map((product, idx) => (
              <div key={idx}>
                <Group position="apart" spacing="xl" grow>
                  <Image
                    src={product.variant.imageURL}
                    alt={product.variant.imageURL}
                    height={150}
                    fit="contain"
                    withPlaceholder
                  />
                  <Stack spacing={0}>
                    <Text c="indigo">
                      {product.variant.product.productName}
                    </Text>
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
            <Checkbox
              checked={select == 0}
              onChange={(_) => setSelect(0)}
              radius="lg"
              value={0}
              label="Entrega en Dirección Personal"
            />
            <Stack pl={20} spacing={0}>
              <Text fz="sm">
                <Text span c="dimmed">
                  Costo de Envío:
                </Text>
                {" S/. 8.00"}
              </Text>
              <Text fz="sm">
                <Text span c="dimmed">
                  Fecha de Entrega:
                </Text>
                {" 1-2 días hábiles"}
              </Text>
              <Text fz="sm">
                <Text span c="dimmed">
                  Horario de Entrega:
                </Text>
                {" Coordinar con cliente"}
              </Text>
            </Stack>
            <Checkbox
              checked={select == 1}
              onChange={(_) => setSelect(1)}
              radius="lg"
              value={1}
              label="Recojo en Tienda"
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ShipmentCard;
