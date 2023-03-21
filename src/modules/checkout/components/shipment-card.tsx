import { Text, Group, Stack, Image, Checkbox } from "@mantine/core";
import { useState } from "react";
import { ProductCart } from "@context/cart-context";

const ShipmentCard = ({
  index,
  total,
  products,
}: {
  index: number;
  total: number;
  products: ProductCart[];
}) => {
  const [select, setSelect] = useState<number>(-1);
  return (
    <>
      <Group align="flex-start" position="apart">
        <Stack>
          <Text fw={500}>{`Pedido ${index + 1} de ${total}`}</Text>
          {products.map((product) => (
            <>
              <Group position="apart" spacing="xl">
                <Stack>
                  <Image
                    src={product.product.variant.at(0)?.imageURL}
                    alt={product.product.variant.at(0)?.imageURL}
                    height={150}
                    fit="contain"
                    withPlaceholder
                  />
                </Stack>
                <Stack spacing={0}>
                  <Text c="indigo">{product.product.productName}</Text>
                  <Text
                    fz="sm"
                    c="dimmed"
                  >{`Entregado por ${product.product.brand.name}`}</Text>
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
                      product.quantity *
                      (product.product.variant.at(0)?.adflyPrice ?? 0)
                    }`}
                  </Text>
                </Stack>
              </Group>
            </>
          ))}
        </Stack>
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
      </Group>
    </>
  );
};

export default ShipmentCard;
