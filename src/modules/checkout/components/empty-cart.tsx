import { Center, Stack, ActionIcon, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconShoppingCartOff } from "@tabler/icons";

const EmptyCart = () => {
  const { width, height } = useViewportSize();
  return (
    <Center h={height / 1.5}>
      <Stack align="center">
        <ActionIcon variant="transparent" disabled size={width / 8}>
          <IconShoppingCartOff size={width / 8} />
        </ActionIcon>
        <Text fw={500} fz={24}>
          Tu carrito está vacío
        </Text>
      </Stack>
    </Center>
  );
};

export default EmptyCart;
