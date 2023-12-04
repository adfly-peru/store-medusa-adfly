import {
  Text,
  Group,
  Image,
  createStyles,
  Autocomplete,
  Grid,
  Menu,
  SelectItemProps,
  Indicator,
  UnstyledButton,
  useMantineColorScheme,
  Center,
  MediaQuery,
  Divider,
  ScrollArea,
} from "@mantine/core";
import {
  IconBasket,
  IconChevronDown,
  IconSearch,
  IconSettings,
  IconShoppingCart,
  IconTransferOut,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
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
  const { departments } = useProduct();
  const [opened, setOpened] = useState(false);
  const { collaborator, logout, homeDesign } = useAccount();
  const [searchable, setSearchable] = useState("");
  const form = useForm();
  const [cartLength, setCartLength] = useState(0);
  const { cart } = useCart();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // let tabs = [
  //   "Menú",
  //   "Ofertas del día",
  //   "Envío Gratis",
  //   "Entrega en Centro de Trabajo",
  // ];

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
      query: { department: categorieToSearch },
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
      <Grid justify="center" align="center" columns={24} m={0}>
        <Grid.Col span={24} bg="white" p={0}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 15px",
              height: "60px",
            }}
          >
            <div
              onClick={() => router.push("/")}
              style={{
                flex: "1",
                maxWidth: "50%",
                height: "60px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={homeDesign?.logourl}
                alt="Enterprise Logo"
                style={{
                  maxHeight: "60px",
                  maxWidth: "100%",
                  height: "auto",
                  width: "auto",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: "0 1 auto",
              }}
            >
              <span style={{ color: "#808080" }}>Por:</span>
              <img
                src="/logo_adfly.svg"
                alt="Adfly"
                style={{ height: "50px", width: "auto", padding: "0px" }}
              />
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={6} md={3}>
          <Menu
            trigger="click"
            openDelay={100}
            closeDelay={400}
            shadow="md"
            width={200}
            position="bottom"
          >
            <Menu.Target>
              <Center>
                <UnstyledButton
                  p="0.4rem"
                  style={{
                    border: "2px solid #ffffff",
                    borderRadius: "6px",
                  }}
                >
                  <Group spacing="xs" align="center" position="apart">
                    <Text fz={20} color={homeDesign?.fontcolor}>
                      Menú
                    </Text>
                    <MediaQuery
                      smallerThan="lg"
                      styles={{
                        display: "none",
                      }}
                    >
                      <IconChevronDown color={homeDesign?.fontcolor} />
                    </MediaQuery>
                  </Group>
                </UnstyledButton>
              </Center>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Departamentos</Menu.Label>
              <ScrollArea.Autosize mah={300}>
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
              </ScrollArea.Autosize>
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
        <Grid.Col span="auto" py={16}>
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
        <Grid.Col span={8} sm={10} lg={7} xl={6}>
          <Group position="center" spacing="md">
            <Center>
              <Menu
                closeOnItemClick={false}
                position="bottom-end"
                shadow="md"
                width={200}
              >
                <Menu.Target>
                  <UnstyledButton c={homeDesign?.fontcolor}>
                    <Center>
                      <IconUser size={24} stroke={1.5} />
                    </Center>
                    <MediaQuery
                      smallerThan="sm"
                      styles={{
                        display: "none",
                      }}
                    >
                      <Text fw={400} fz={16}>
                        Mi perfil
                      </Text>
                    </MediaQuery>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label sx={{ fontSize: 16 }}>
                    Hola, {collaborator?.name}
                  </Menu.Label>
                  <Menu.Item
                    icon={<IconUserCircle size={14} />}
                    onClick={() => router.push("/account/profile")}
                  >
                    Mi cuenta
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
            </Center>
            <MediaQuery
              smallerThan="sm"
              styles={{
                display: "none",
              }}
            >
              <Divider size="sm" orientation="vertical" />
            </MediaQuery>
            <MediaQuery
              smallerThan="sm"
              styles={{
                display: "none",
              }}
            >
              <Center>
                <UnstyledButton
                  c={homeDesign?.fontcolor}
                  onClick={() => router.push("/orders")}
                >
                  <Center>
                    <IconBasket size={24} stroke={1.5} />
                  </Center>
                  <Text fw={400} fz={16}>
                    Mis compras
                  </Text>
                </UnstyledButton>
              </Center>
            </MediaQuery>
            <Divider size="sm" orientation="vertical" />
            <Center>
              <Indicator
                disabled={cartLength <= 0}
                label={cartLength}
                inline
                size={20}
                withBorder
                color={homeDesign?.backcolor}
                styles={{
                  indicator: {
                    borderColor: homeDesign?.fontcolor,
                    color: homeDesign?.fontcolor,
                  },
                }}
              >
                <UnstyledButton
                  c={homeDesign?.fontcolor}
                  onClick={() => router.push("/checkout/mycart")}
                >
                  <Center>
                    <IconShoppingCart size={24} stroke={1.5} />
                  </Center>
                  <MediaQuery
                    smallerThan="sm"
                    styles={{
                      display: "none",
                    }}
                  >
                    <Text fw={400} fz={16}>
                      Carrito
                    </Text>
                  </MediaQuery>
                </UnstyledButton>
              </Indicator>
            </Center>
          </Group>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default HomeHeader;
