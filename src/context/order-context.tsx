import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "@graphql/order/queries";
import { Cart } from "@interfaces/cart";
import { Order } from "@interfaces/order";
import { createContext, useState, useContext, useEffect } from "react";

interface OrderContext {
  orders: Order[] | null;
  loading: boolean;
  refetch: () => Promise<any>;
}

const OrderContext = createContext<OrderContext | null>(null);

export const OrderProvider = ({ children }: { children?: React.ReactNode }) => {
  const [collaboratorId, setCollaboratorId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const { error, loading, refetch } = useQuery<{ getOrders: Order[] }>(
    GET_ORDERS,
    {
      variables: { collaboratorId },
      skip: !collaboratorId,
      onCompleted: (data) => setOrders(data?.getOrders),
    }
  );

  useEffect(() => {
    if (error) {
      console.error("Error al obtener los pedidos:", error);
    }
  }, [error]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCollaboratorId("a34091f1-ad3a-4409-93f2-cbd25d7ec373");
    }
  }, []);

  return (
    <OrderContext.Provider value={{ orders, loading, refetch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (context === null) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
