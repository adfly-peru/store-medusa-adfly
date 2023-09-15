import Layout from "@modules/layout/templates";
import { useRouter } from "next/router";
import { ActionIcon, Center, Stack, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconMoodSad } from "@tabler/icons-react";
import { JsonView } from "react-json-view-lite";

const ErrorPage = () => {
  const router = useRouter();
  const { message, data } = router.query;
  const { width, height } = useViewportSize();
  const orderData = data ? JSON.parse(data as string) : null;
  console.log("DATA", orderData);
  return (
    <Layout>
      <Center>
        <Stack align="center">
          <ActionIcon variant="transparent" disabled size={width / 8}>
            <IconMoodSad size={width / 8} />
          </ActionIcon>
          <Text fw={500} fz={24}>
            Ups! Ocurrió un error
          </Text>
          <Text>
            <JsonView data={orderData.data} />
          </Text>
        </Stack>
      </Center>
    </Layout>
  );
};

export default ErrorPage;
