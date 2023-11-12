import Layout from "@modules/layout/templates";
import { useRouter } from "next/router";
import { Center, Stack } from "@mantine/core";
import SuccessMessage from "@modules/layout/components/success-message";
import { ModalsProvider } from "@mantine/modals";

const SuccesPage = () => {
  const router = useRouter();
  const { number, id, data } = router.query;
  const orderData = data ? JSON.parse(data as string) : null;
  return (
    <Layout>
      <ModalsProvider>
        <Center>
          <SuccessMessage number={number} id={id} niubizData={orderData} />
        </Center>
      </ModalsProvider>
    </Layout>
  );
};

export default SuccesPage;
