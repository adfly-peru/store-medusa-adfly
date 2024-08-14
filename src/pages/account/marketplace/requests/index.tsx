import AccountLayout from "@modules/account/templates/AccountLayout";
import MarketplaceRequests from "@modules/marketplace/Requests";

const Page = () => {
  return (
    <AccountLayout>
      <MarketplaceRequests />
    </AccountLayout>
  );
};

export default Page;
