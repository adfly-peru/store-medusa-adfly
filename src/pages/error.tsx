import Layout from "@modules/layout/templates";
import { useRouter } from "next/router";
import { ActionIcon, Center, Stack, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconMoodSad } from "@tabler/icons";

const ErrorPage = () => {
  const router = useRouter();
  const { message } = router.query;
  const { width, height } = useViewportSize();

  return (
    <Layout>
      <Center h={height / 1.5}>
        <Stack align="center">
          <ActionIcon variant="transparent" disabled size={width / 8}>
            <IconMoodSad size={width / 8} />
          </ActionIcon>
          <Text fw={500} fz={24}>
            Ups! Ocurrió un error
          </Text>
          <Text fw={500} fz={24}>
            {message}
          </Text>
        </Stack>
      </Center>
    </Layout>
  );
};

export default ErrorPage;
