import { AppShell, Header } from "@mantine/core";
import HomeHeader from "@modules/layout/components/header";
import React, { useEffect } from "react";
import FooterComponent from "@modules/layout/components/footer";
import { useViewportSize } from "@mantine/hooks";
import { useAccount } from "@context/account-context";
import { useRouter } from "next/router";
import SimpleHeader from "../components/simple-header";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { height } = useViewportSize();
  const { status, collaborator, homeDesign } = useAccount();
  const router = useRouter();
  const isAllow = router.asPath.startsWith("/account");

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/login");
    }
  });

  if (status == "unauthenticated") {
    return <div></div>;
  }

  if (collaborator?.status != "ACTIVE") {
    if (isAllow) {
      return (
        <AppShell
          fixed={false}
          padding={0}
          header={
            <Header fixed height={120} p="xs">
              <SimpleHeader />
            </Header>
          }
          footer={<FooterComponent />}
          styles={(theme) => ({
            main: {
              paddingTop: 140,
              minHeight: height - 120,
            },
          })}
        >
          {children}
        </AppShell>
      );
    }
    return <div></div>;
  }

  return (
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
        main: {
          paddingTop: 140,
          minHeight: height - 120,
        },
      })}
      sx={{
        backgroundColor: homeDesign?.backcolor,
        color: homeDesign?.fontcolor,
      }}
    >
      {children}
    </AppShell>
  );
};

export default Layout;