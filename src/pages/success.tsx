import Layout from "@modules/layout/templates";
import { useRouter } from "next/router";
import { Center, Stack, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import SuccessMessage from "@modules/layout/components/success-message";
import { JsonView } from "react-json-view-lite";

const SuccesPage = () => {
  const router = useRouter();
  const { number, id, data } = router.query;
  const { height } = useViewportSize();
  const orderData = data ? JSON.parse(data as string) : null;
  return (
    <Layout>
      <Center>
        <Stack align="center" mt="xl">
          <SuccessMessage number={number} id={id} niubizData={orderData} />
        </Stack>
      </Center>
    </Layout>
  );
};

export default SuccesPage;
