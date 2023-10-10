import { Group, Stack, Text, Image, Divider, Title } from "@mantine/core";
import { Suborder } from "@interfaces/order";
import { deliveryMethodInfo, suborderStatuses } from "@modules/common/types";

const SuborderCard = ({
  suborder,
  index,
  total,
}: {
  suborder: Suborder;
  index: number;
  total: number;
}) => {
  return (
    <div>
      <Group position="apart" mb="lg">
        <Stack>
          <Title order={4}>
            Envío {index + 1} de {total}
          </Title>
          <div>
            <Text fw="bold">Comentarios: {suborder.comments}</Text>
          </div>
        </Stack>
        <Stack>
          <Text>
            Estado:{" "}
            <Text span>{`${suborderStatuses[suborder.status ?? ""]}`}</Text>
          </Text>
        </Stack>
      </Group>
      <Text>
        Método de entrega:{" "}
        <Text span fw="bold">
          {deliveryMethodInfo[suborder.deliveryMethod ?? "null"]}
          {suborder.deliveryMethod === "pickup"
            ? ` (${suborder.deliveryAddress?.alias})`
            : ""}
        </Text>
      </Text>
      <Text>
        Entregado por:{" "}
        <Text span fw="bold">
          {suborder.sellerName}
        </Text>
      </Text>
      <Text>
        Entrega estimada:{" "}
        <Text span fw="bold">
          {suborder.deliveryTime || "-"}
        </Text>
      </Text>
      {suborder.items.map((product, idx) => (
        <div key={idx}>
          <Divider my="sm" />
          <Group position="apart" spacing="xl" grow>
            <Image
              src={product.variant.imageURL}
              alt={product.variant.imageURL}
              height={150}
              fit="contain"
              withPlaceholder
            />
            <Stack spacing={0}>
              <Title order={5} fw="bold" c="indigo">
                {product.variant.product.productName}
              </Title>
              <Text fz="sm">
                <Text fw={500} span>
                  {"SKU: "}
                </Text>
                {`-`}
              </Text>
              <Text fz="sm">
                <Text fw={500} span>
                  {"Variantes: "}
                </Text>
                {product.variant.attributes.map(
                  (attr) => `${attr.attributeName} ${attr.value}, `
                )}
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
                {`S/.${product.quantity * (product.variant.adflyPrice ?? 0)}`}
              </Text>
              <Text fz="sm">
                <Text fw={500} span>
                  {"Vendido por: "}
                </Text>
                {suborder.businessName}
              </Text>
            </Stack>
            <Stack spacing={0}>
              <Text>
                {`S/.${product.quantity * (product.variant.adflyPrice ?? 0)}`}
              </Text>
            </Stack>
          </Group>
        </div>
      ))}
    </div>
  );
};

export default SuborderCard;
