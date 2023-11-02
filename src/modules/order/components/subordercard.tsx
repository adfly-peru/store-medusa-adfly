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
      <Group align="start" position="apart" mb="sm">
        <Title order={4}>
          Envío {index + 1} de {total} Vendido y entregado por{" "}
          {suborder.sellerName}
        </Title>
        <Text>
          Estado de Entrega:{" "}
          <Text span>{`${suborderStatuses[suborder.status ?? ""]}`}</Text>
        </Text>
      </Group>
      <Text fw="bold">Comentarios: {suborder.comments}</Text>
      <Text>
        Método de Entrega:{" "}
        <Text span fw="bold">
          {deliveryMethodInfo[suborder.deliveryMethod ?? "null"]}
          {suborder.deliveryMethod === "pickup"
            ? ` (${suborder.deliveryAddress?.alias})`
            : ""}
        </Text>
      </Text>
      <Text>
        Dirección Entrega:{" "}
        <Text span fw="bold">
          {suborder.deliveryAddress?.address || "-"}
        </Text>
      </Text>
      <Text>
        Tiempo Entrega:{" "}
        <Text span fw="bold">
          {suborder.deliveryTime || "-"}
        </Text>
      </Text>
      <Text>
        Especificaciones:{" "}
        <Text span fw="bold">
          {suborder.deliveryAddress?.additional || "-"}
        </Text>
      </Text>
      {suborder.items.map((product, idx) => (
        <div key={idx}>
          <Divider my="sm" />
          <Group position="apart" spacing="xl" grow>
            <Image
              src={product.variant.imageURL}
              alt={product.variant.imageURL}
              height={100}
              fit="contain"
              withPlaceholder
            />
            <Stack spacing={0}>
              <Title order={5} fw="bold" c="indigo">
                {product.variant.offer.offerName}
              </Title>
              ...
              <Text fz="sm">
                <Text fw={500} span>
                  {"SKU: "}
                </Text>
                {product.variant.variantSku}
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
