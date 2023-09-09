import { Stack, Title, Group, Button, Text } from "@mantine/core";
import { IconArrowLeft, IconLocation } from "@tabler/icons-react";
import { useAccount } from "@context/account-context";

const SuccessMessage = ({
  number,
  id,
}: {
  number: string[] | string | undefined;
  id: string[] | string | undefined;
}) => {
  const { collaborator } = useAccount();

  return (
    <Stack align="center" spacing={45}>
      <Title>¡Gracias por tu pedido!</Title>
      <Stack align="center" spacing="xs">
        <Text fz={18}>
          Hola{" "}
          <Text span c="blue">
            {collaborator?.name ?? ""}
          </Text>
          , hemos recibido tu pedido{" "}
          <Text span c="blue">
            {number}
          </Text>
        </Text>
        <Text fz={18}>
          El detalle de tu compra ha sido enviado a{" "}
          <Text span c="blue">
            {collaborator?.email}
          </Text>
        </Text>
        <Text fz={18}>
          Estamos procesando tu pedido. Recibirás un correo de confirmación una
          vez confirmado el pedido.
        </Text>
      </Stack>
      <Group position="center">
        <Button
          component="a"
          href="/home"
          leftIcon={<IconArrowLeft />}
          variant="light"
        >
          Regresar a la tienda de Beneficios
        </Button>
        <Button
          component="a"
          href={`/orders/${id}`}
          leftIcon={<IconLocation />}
          variant="outline"
        >
          Seguir mi Pedido
        </Button>
      </Group>
    </Stack>
  );
};

export default SuccessMessage;
