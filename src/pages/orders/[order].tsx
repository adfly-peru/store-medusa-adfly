import React from "react";
import { useRouter } from "next/router";
import Layout from "@modules/layout/templates";
import OrderTemplate from "@modules/order/templates";
import { ModalsProvider } from "@mantine/modals";

const OrderPage = () => {
  const router = useRouter();
  const orderId = router.query.order;
  const orderValue = typeof orderId === "string" ? orderId : orderId?.[0] ?? "";
  return (
    <Layout>
      <ModalsProvider>
        <OrderTemplate orderId={orderValue} />
      </ModalsProvider>
    </Layout>
  );
};

export default OrderPage;
