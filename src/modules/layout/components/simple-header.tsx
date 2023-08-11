import {
  Text,
  Image,
  createStyles,
  Grid,
  Menu,
  Button,
  ActionIcon,
  Space,
  SelectItemProps,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBasket,
  IconMoon,
  IconSettings,
  IconSun,
  IconTransferOut,
  IconUser,
  IconUserCircle,
} from "@tabler/icons";
import { forwardRef, useEffect, useState } from "react";
import { useAccount } from "@context/account-context";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { useCart } from "@context/cart-context";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: 50,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none.",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

const SimpleHeader = () => {
  const router = useRouter();
  const { collaborator, logout } = useAccount();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <Grid px={30} justify="space-between" align="center">
        <Grid.Col span={1}>
          <UnstyledButton onClick={() => router.push("/")}>
            <Image
              radius="md"
              height={50}
              width="inherit"
              fit="contain"
              src="https://www.cbvj.org.br/index/wp-content/uploads/2017/10/default-logo.png"
              alt="Random unsplash image"
              sx={{ padding: 10 }}
            />
          </UnstyledButton>
        </Grid.Col>
        <Grid.Col span={1}>
          <Button.Group>
            <Menu
              closeOnItemClick={false}
              position="bottom-end"
              shadow="md"
              width={200}
            >
              <Menu.Target>
                <ActionIcon size="lg">
                  <IconUser size={30} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label sx={{ fontSize: 16 }}>
                  Hola, {collaborator?.name}
                </Menu.Label>
                <Menu.Label sx={{ fontSize: 12 }}>
                  {collaborator?.email}
                </Menu.Label>
                <Menu.Item
                  icon={<IconUserCircle size={14} />}
                  onClick={() => router.push("/account/profile")}
                >
                  Mi cuenta
                </Menu.Item>
                <Menu.Item icon={<IconBasket size={14} />}>
                  Mis compras
                </Menu.Item>
                <Menu.Item
                  onClick={() => toggleColorScheme()}
                  icon={
                    colorScheme === "dark" ? (
                      <IconSun size={14} />
                    ) : (
                      <IconMoon size={14} />
                    )
                  }
                >
                  Modo {colorScheme === "dark" ? "Claro" : "Oscuro"}
                </Menu.Item>
                <Menu.Item icon={<IconSettings size={14} />}>
                  Configuracion
                </Menu.Item>
                <Menu.Item
                  onClick={logout}
                  icon={<IconTransferOut size={14} />}
                >
                  Cerrar sesión
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Space w="md" />
          </Button.Group>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default SimpleHeader;
