import { useLazyQuery } from "@apollo/client";
import { GET_ORDERS, GET_ORDER_REPORT } from "@graphql/order/queries";
import { OrderReport, PaginatedOrders } from "@interfaces/order";
import { createContext, useState, useContext, useEffect } from "react";

export interface FilterOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  searchBy?: string;
  asc?: boolean;
}

interface OrderContext {
  orders: PaginatedOrders | null;
  loading: boolean;
  refetch: () => Promise<any>;
  getOrder: (id: string) => Promise<OrderReport | null>;
  fetchOrders: (options: FilterOptions, collaboratorId: string) => void;
}

const OrderContext = createContext<OrderContext | null>(null);

export const OrderProvider = ({ children }: { children?: React.ReactNode }) => {
  const [orders, setOrders] = useState<PaginatedOrders | null>(null);
  const [getOrders, { data: ordersData, error, loading, refetch }] =
    useLazyQuery<{
      getOrders: PaginatedOrders;
    }>(GET_ORDERS);

  const [getOrderReport] = useLazyQuery<{
    getOrderReport: OrderReport;
  }>(GET_ORDER_REPORT);

  const getOrder = async (id: string) => {
    const result = await getOrderReport({ variables: { uuidorder: id } });
    return result.data?.getOrderReport ?? null;
  };

  const fetchOrders = (options: FilterOptions, collaboratorId: string) => {
    if (collaboratorId)
      getOrders({
        variables: {
          ...options,
          collaboratorId,
        },
      });
  };

  useEffect(() => {
    if (ordersData && ordersData.getOrders) {
      setOrders(ordersData.getOrders);
    }
  }, [ordersData]);

  useEffect(() => {
    if (error) {
      console.error("Error al obtener los pedidos:", error);
    }
  }, [error]);

  return (
    <OrderContext.Provider
      value={{ fetchOrders, orders, loading, refetch, getOrder }}
    >
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
