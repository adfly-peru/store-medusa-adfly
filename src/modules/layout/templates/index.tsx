import { AppShell, Header, Text } from "@mantine/core";
import HomeHeader from "@modules/layout/components/header";
import React from "react";
import FooterComponent from "@modules/layout/components/footer";
import AccountLayout from "@modules/layout/templates/account-layout";
import AuthLayout from "@modules/layout/templates/authentication-layout";
import { useViewportSize } from "@mantine/hooks";

const Layout: React.FC<{ children?: React.ReactNode; allow?: boolean }> = ({
  children,
  allow,
}) => {
  const { height } = useViewportSize();
  if (allow) {
    return (
      <AuthLayout>
        <AppShell
          fixed={false}
          padding={0}
          header={
            <Header fixed height={120} p="xs">
              <HomeHeader />
            </Header>
          }
          footer={<FooterComponent />}
          styles={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
            main: {
              paddingTop: 140,
              minHeight: height - 120,
            },
          })}
        >
          {children}
        </AppShell>
      </AuthLayout>
    );
  }
  return (
    <AuthLayout>
      <AccountLayout>
        <AppShell
          fixed={false}
          padding={0}
          header={
            <Header fixed height={120} p="xs">
              <HomeHeader />
            </Header>
          }
          footer={<FooterComponent />}
          styles={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
            main: {
              paddingTop: 120,
              minHeight: height - 120,
            },
          })}
        >
          {children}
        </AppShell>
      </AccountLayout>
    </AuthLayout>
  );
};

export default Layout;
