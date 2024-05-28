import CouponReport from "@modules/account/components/Coupons/DetailedCoupon";
import AccountLayout from "@modules/account/templates/AccountLayout";
import { useRouter } from "next/router";

const CouponPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AccountLayout>
      <CouponReport id={id as string} />
    </AccountLayout>
  );
};

export default CouponPage;
