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
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBasket,
  IconMoon,
  IconSearch,
  IconSettings,
  IconShoppingCart,
  IconSun,
  IconTransferOut,
  IconUser,
  IconUserCircle,
} from "@tabler/icons";
import { useProduct } from "@context/product-context";
import { forwardRef, useEffect, useState } from "react";
import { useAccount } from "@context/account-context";
import CartDrawer from "@modules/layout/components/cart-drawer";
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
  const { departments } = useProduct();
  const [opened, setOpened] = useState(false);
  const { collaborator, logout, homeDesign } = useAccount();
  const [searchable, setSearchable] = useState("");
  const form = useForm();
  const [cartLength, setCartLength] = useState(0);
  const { cart } = useCart();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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

  useEffect(() => {
    if (cart) {
      let tempsize = 0;
      cart.suborders.forEach((suborder) => (tempsize += suborder.items.length));
      setCartLength(tempsize);
    }
  }, [cart]);

  const AutoCompleteItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ value, ...others }: SelectItemProps, ref) => (
      <div ref={ref} {...others}>
        <Text>{`Buscar '${value}' en la tienda.`}</Text>
      </div>
    )
  );
  AutoCompleteItem.displayName = "AutoCompleteItem";

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
              src={homeDesign?.logourl}
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
                  icon={
                    <Image
                      alt={category.name}
                      src={category.image}
                      width={30}
                      style={{
                        filter: colorScheme === "dark" ? "invert(1)" : "none",
                      }}
                    />
                  }
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
              itemComponent={AutoCompleteItem}
            />
          </form>
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
            <Indicator
              showZero={false}
              dot={false}
              label={cartLength}
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