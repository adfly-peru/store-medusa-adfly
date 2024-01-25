import { AppShell, Header } from "@mantine/core";
import HomeHeader from "@modules/layout/components/header";
import React, { useEffect } from "react";
import FooterComponent from "@modules/layout/components/footer";
import { useViewportSize } from "@mantine/hooks";
import { useAccount } from "@context/account-context";
import { useRouter } from "next/router";
import { ModalsProvider } from "@mantine/modals";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { height } = useViewportSize();
  const { status, collaborator, homeDesign, refetch } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      if (typeof window !== "undefined") {
        localStorage.setItem("lastpage", router.asPath);
      }
      router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    refetch();
  }, []);

  if (status == "unauthenticated") {
    return <div></div>;
  }
  if (!collaborator) {
    return <div></div>;
  }

  if (!collaborator.emailVerify || !collaborator.changePassword) {
    return (
      <AppShell
        fixed={false}
        padding={0}
        styles={(theme) => ({
          main: {
            paddingTop: 140,
            minHeight: height - 120,
          },
        })}
      >
        <div></div>
      </AppShell>
    );
  }

  return (
    <AppShell
      fixed={false}
      padding={0}
      header={
        <Header fixed height="auto" p={0}>
          <HomeHeader />
        </Header>
      }
      footer={<FooterComponent />}
      styles={(theme) => ({
        main: {
          paddingTop: 188,
          minHeight: height - 188,
        },
      })}
      sx={{
        header: {
          backgroundColor: homeDesign?.backcolor,
          color: homeDesign?.fontcolor,
        },
      }}
    >
      <ModalsProvider>{children}</ModalsProvider>
    </AppShell>
  );
};

export default Layout;
