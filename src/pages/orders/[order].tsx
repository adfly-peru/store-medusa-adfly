import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Text, LoadingOverlay } from "@mantine/core";
import Layout from "@modules/layout/templates";
import { useOrder } from "@context/order-context";
import SimpleOrderView from "@modules/order/templates/simple";

export default function OrderPage() {
  const [refetchAttempts, setRefetchAttempts] = useState(0);
  const { orders, loading, refetch } = useOrder();
  const router = useRouter();
  const orderId = router.query.order;

  useEffect(() => {
    if (!orderId || refetchAttempts >= 3) {
      return;
    }
    const order = orders?.find((order) => order.uuidorder === orderId);
    if (!order) {
      setRefetchAttempts(refetchAttempts + 1);
      refetch();
    }
  }, [orderId, orders, refetch, refetchAttempts]);

  if (loading) {
    return (
      <Layout>
        <LoadingOverlay visible={loading} />
      </Layout>
    );
  }

  if (!orderId || !orders) {
    return (
      <Layout>
        <Text>No order data available</Text>
      </Layout>
    );
  }

  const order = orders.find((order) => order.uuidorder === orderId);

  if (!order) {
    return (
      <Layout>
        <Text>Order with ID {orderId} not found.</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <SimpleOrderView order={order} />
    </Layout>
  );
}
