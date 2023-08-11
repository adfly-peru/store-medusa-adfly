import React from "react";
import { useRouter } from "next/router";
import Layout from "@modules/layout/templates";
import OrderTemplate from "@modules/order/templates";

const OrderPage = () => {
  const router = useRouter();
  const orderId = router.query.order;
  const orderValue = typeof orderId === "string" ? orderId : orderId?.[0] ?? "";
  return (
    <Layout>
      <OrderTemplate orderId={orderValue} />
    </Layout>
  );
};

export default OrderPage;
