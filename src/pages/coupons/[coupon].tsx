import React from "react";
import { useRouter } from "next/router";
import Layout from "@modules/layout/templates";
import CouponTemplate from "@modules/coupon/templates";
import { ModalsProvider } from "@mantine/modals";

const CouponPage = () => {
  const router = useRouter();
  const couponId = router.query.coupon;
  const couponValue =
    typeof couponId === "string" ? couponId : couponId?.[0] ?? "";
  return (
    <Layout>
      <ModalsProvider>
        <CouponTemplate couponId={couponValue} />
      </ModalsProvider>
    </Layout>
  );
};

export default CouponPage;
