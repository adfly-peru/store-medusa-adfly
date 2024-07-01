import OrdersView from "@modules/account/components/Orders";
import AccountLayout from "@modules/account/templates/AccountLayout";

const OrdersPage = () => {
  return (
    <AccountLayout>
      <OrdersView />
    </AccountLayout>
  );
};

export default OrdersPage;
