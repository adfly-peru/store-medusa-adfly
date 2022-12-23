import { AppShell, Header, Text, Center } from "@mantine/core";
import AuthLayout from "../../modules/account/templates/authentication-layout";
import HomeHeader from "../../modules/home/components/header";

const CheckoutPage = () => {
  return (
    <AuthLayout>
      <AppShell
        header={
          <Header height={120} p="xs">
            <HomeHeader />
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Center>
          <Text>Checkout</Text>
        </Center>
      </AppShell>
    </AuthLayout>
  );
};

export default CheckoutPage;
