import {
  Text,
  Group,
  Image,
  Tabs,
  createStyles,
  Autocomplete,
  Grid,
  Title,
  Menu,
  Button,
  Drawer,
  ActionIcon,
  Space,
  SelectItemProps,
  Indicator,
  UnstyledButton,
} from "@mantine/core";
import {
  IconBasket,
  IconSearch,
  IconSettings,
  IconShoppingCart,
  IconTransferOut,
  IconUser,
  IconUserCircle,
} from "@tabler/icons";
import { useProduct } from "@context/product-context";
import { forwardRef, useState } from "react";
import { useAccount } from "@context/account-context";
import CartDrawer from "@modules/layout/components/cart-drawer";
import { useSession } from "next-auth/react";
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

const HomeHeader = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const { data: session } = useSession();
  const { departments } = useProduct();
  const [opened, setOpened] = useState(false);
  const { currentCustomer, handleLogout } = useAccount();
  const [searchable, setSearchable] = useState("");
  const form = useForm();
  const { length } = useCart();

  let tabs = [
    "Menú",
    "Ofertas del día",
    "Envío Gratis",
    "Entrega en Centro de Trabajo",
  ];

  const searchProduct = () => {
    router.push({
      pathname: "/search",
      query: { data: searchable },
    });
    setSearchable("");
  };
  const searchProductByCategorie = (categorieToSearch: string) => {
    router.push({
      pathname: "/search",
      query: { data: categorieToSearch },
    });
    setSearchable("");
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title order={2}>Mi carrito</Title>}
        padding="xl"
        size="xl"
        position="right"
      >
        <CartDrawer></CartDrawer>
      </Drawer>
      <Grid justify="center" align="center">
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
          <Menu
            trigger="hover"
            openDelay={100}
            closeDelay={400}
            shadow="md"
            width={200}
          >
            <Menu.Target>
              <Button variant="subtle" sx={{ width: "100%" }}>
                Menú
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Categorías</Menu.Label>
              {departments.map((category, id) => (
                <Menu.Item
                  key={id}
                  icon={<Image src={category.image} width={30} />}
                  onClick={() => searchProductByCategorie(category.name)}
                >
                  {category.name}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
        <Grid.Col span={9}>
          <form onSubmit={form.onSubmit((_) => searchProduct())}>
            <Autocomplete
              placeholder="Buscar"
              icon={<IconSearch size={16} stroke={1.5} />}
              value={searchable}
              onChange={setSearchable}
              data={(searchable.length ?? 0) > 0 ? [searchable] : []}
              onItemSubmit={(_) => searchProduct()}
              itemComponent={forwardRef<HTMLDivElement, SelectItemProps>(
                ({ value, ...others }: SelectItemProps, ref) => (
                  <div ref={ref} {...others}>
                    <Text>Buscar '{value}' en la tienda.</Text>
                  </div>
                )
              )}
            />
          </form>
        </Grid.Col>
        <Grid.Col span={1}>
          <Button.Group>
            <Menu position="bottom-end" shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon size="lg">
                  <IconUser size={30} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label sx={{ fontSize: 16 }}>
                  Hola, {currentCustomer.name}
                </Menu.Label>
                <Menu.Label sx={{ fontSize: 12 }}>
                  {session?.user?.email}
                </Menu.Label>
                <Menu.Item icon={<IconUserCircle size={14} />}>
                  Mi cuenta
                </Menu.Item>
                <Menu.Item icon={<IconBasket size={14} />}>
                  Mis compras
                </Menu.Item>
                <Menu.Item icon={<IconSettings size={14} />}>
                  Configuracion
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleLogout()}
                  icon={<IconTransferOut size={14} />}
                >
                  Cerrar sesión
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Space w="md" />
            <Indicator
              showZero={false}
              dot={false}
              label={length}
              overflowCount={10}
              inline
              size={22}
            >
              <ActionIcon onClick={() => setOpened(true)} size="lg">
                <IconShoppingCart size={30} stroke={1.5} />
              </ActionIcon>
            </Indicator>
          </Button.Group>
        </Grid.Col>
      </Grid>
      <Group position="apart" grow>
        <Tabs
          defaultValue="Home"
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List grow>
            {tabs.map((tab) => (
              <Tabs.Tab value={tab} key={tab}>
                {tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </Group>
    </>
  );
};

export default HomeHeader;
