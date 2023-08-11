import { useOrder } from "@context/order-context";
import { LoadingOverlay, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import SimpleOrderView from "./simple";

const OrderTemplate = ({ orderId }: { orderId: string }) => {
  const [refetchAttempts, setRefetchAttempts] = useState(0);
  const { orders, loading, refetch } = useOrder();

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
    return <LoadingOverlay visible={loading} />;
  }

  if (!orderId || !orders) {
    return <Text>No order data available</Text>;
  }

  const order = orders.find((order) => order.uuidorder === orderId);

  if (!order) {
    return <Text>Order with ID {orderId} not found.</Text>;
  }

  return <SimpleOrderView order={order} />;
};

export default OrderTemplate;
