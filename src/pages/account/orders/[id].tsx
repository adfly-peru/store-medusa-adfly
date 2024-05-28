import OrderReport from "@modules/account/components/Orders/DetailedOrder";
import AccountLayout from "@modules/account/templates/AccountLayout";
import { useRouter } from "next/router";

const OrdersPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AccountLayout>
      <OrderReport orderId={id as string} withBack />
    </AccountLayout>
  );
};

export default OrdersPage;
