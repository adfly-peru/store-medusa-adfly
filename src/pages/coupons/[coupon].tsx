import React from "react";
import { useRouter } from "next/router";
import Layout from "@modules/layout/templates";
import CouponTemplate from "@modules/coupon/templates";

const CouponPage = () => {
  const router = useRouter();
  const couponId = router.query.coupon;
  const couponValue =
    typeof couponId === "string" ? couponId : couponId?.[0] ?? "";
  return (
    <Layout>
      <CouponTemplate couponId={couponValue} />
    </Layout>
  );
};

export default CouponPage;
