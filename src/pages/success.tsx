import Layout from "@modules/layout/templates";
import { useRouter } from "next/router";
import { Center } from "@mantine/core";
import SuccessMessage from "@modules/layout/components/success-message";

const SuccesPage = () => {
  const router = useRouter();
  const { number, id, data } = router.query;
  const orderData = data
    ? JSON.parse(data === "undefined" ? "{}" : (data as string))
    : null;
  return (
    <Layout>
      <Center>
        <SuccessMessage number={number} id={id} niubizData={orderData} />
      </Center>
    </Layout>
  );
};

export default SuccesPage;
