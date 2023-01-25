import { Text, Group, Stack, Image, Checkbox } from "@mantine/core";
import { useState } from "react";
import { ProductCart } from "@context/cart-context";

const ShipmentCard = ({ index, total }: { index: number; total: number }) => {
  const products: ProductCart[] = [
    {
      product: {
        id: "gloria1",
        discount: 50,
        imgUrl: [
          "https://www.gloria.com.pe/uploads/products/lacteos/externa.jpg",
        ],
        brand: "Gloria",
        name: "Leche",
        originalPrice: 30,
        finalPrice: 15,
        stars: 5,
        details: {
          stock: 50,
          expirationDate: "2025/05/05",
          details:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. deserunt mollit anim id est laborum.",
        },
        category: "food",
        subCategory: "Lácteos",
        tags: [],
      },
      quantity: 2,
    },
    {
      product: {
        id: "gloria2",
        discount: 60,
        imgUrl: [
          "https://plazavea.vteximg.com.br/arquivos/ids/16382255-1000-1000/20258247.jpg",
        ],
        brand: "Gloria",
        name: "Mantequilla",
        originalPrice: 35,
        finalPrice: 15,
        stars: 5,
        details: {
          stock: 50,
          expirationDate: "2025/05/05",
          details:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. deserunt mollit anim id est laborum.",
        },
        category: "food",
        subCategory: "Mantequillas y Margarinas",
        tags: [],
      },
      quantity: 3,
    },
  ];

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
                    src={product.product.imgUrl[0]}
                    alt={product.product.imgUrl[0]}
                    height={150}
                    fit="contain"
                    withPlaceholder
                  />
                </Stack>
                <Stack spacing={0}>
                  <Text c="indigo">{product.product.name}</Text>
                  <Text
                    fz="sm"
                    c="dimmed"
                  >{`Entregado por ${product.product.brand}`}</Text>
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
                    {`S/.${product.quantity * product.product.finalPrice}`}
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
