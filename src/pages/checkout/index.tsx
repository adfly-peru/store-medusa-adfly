import Layout from "@modules/layout/templates";
import CheckoutTemplate from "@modules/checkout/templates";
import { ModalsProvider } from "@mantine/modals";

const CheckoutPage = () => {
  return (
    <Layout>
      <ModalsProvider>
        <CheckoutTemplate />
      </ModalsProvider>
    </Layout>
  );
};

export default CheckoutPage;
