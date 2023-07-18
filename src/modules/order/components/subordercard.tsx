import { Group, Stack, Text, Image, Divider, Title } from "@mantine/core";
import { Suborder } from "@interfaces/order";

const SuborderCard = ({ suborder }: { suborder: Suborder }) => {
  return (
    <div>
      <Title fw={400} order={4}>
        Pedido entregado por {suborder.businessName} ({suborder.status})
      </Title>
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
