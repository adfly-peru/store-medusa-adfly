import { useLazyQuery } from "@apollo/client";
import { GET_COUPONS, GET_COUPON_REPORT } from "@graphql/order/queries";
import { CouponUsage, PaginatedCouponUsages } from "@interfaces/order";
import { createContext, useState, useContext, useEffect } from "react";

export interface FilterOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  searchBy?: string;
  asc?: boolean;
}

interface CouponContext {
  coupons: PaginatedCouponUsages | null;
  loading: boolean;
  refetch: () => Promise<any>;
  getCoupon: (id: string) => Promise<CouponUsage | null>;
  fetchCoupons: (options: FilterOptions, collaboratorId: string) => void;
}

const CouponContext = createContext<CouponContext | null>(null);

export const CouponProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [coupons, setCoupons] = useState<PaginatedCouponUsages | null>(null);
  const [getCoupons, { data: couponsData, error, loading, refetch }] =
    useLazyQuery<{
      getCoupons: PaginatedCouponUsages;
    }>(GET_COUPONS);

  const [getCouponReport] = useLazyQuery<{
    couponReport: CouponUsage;
  }>(GET_COUPON_REPORT);

  const getCoupon = async (id: string) => {
    const result = await getCouponReport({
      variables: { uuidcouponcollaboratorusage: id },
    });
    return result.data?.couponReport ?? null;
  };

  const fetchCoupons = (options: FilterOptions, collaboratorId: string) => {
    if (collaboratorId)
      getCoupons({
        variables: {
          ...options,
          collaboratorId,
        },
      });
  };

  useEffect(() => {
    if (couponsData && couponsData.getCoupons) {
      setCoupons(couponsData.getCoupons);
    }
  }, [couponsData]);

  useEffect(() => {
    if (error) {
      console.error("Error al obtener los pedidos:", error);
    }
  }, [error]);

  return (
    <CouponContext.Provider
      value={{ fetchCoupons, coupons, loading, refetch, getCoupon }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);

  if (context === null) {
    throw new Error("useCoupon must be used within an CouponProvider");
  }
  return context;
};
