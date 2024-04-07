/* eslint-disable @next/next/no-img-element */
import {
  Text,
  Group,
  Image,
  Grid,
  Menu,
  SelectItemProps,
  Indicator,
  UnstyledButton,
  useMantineColorScheme,
  Center,
  MediaQuery,
  Divider,
  Drawer,
  Title,
  NavLink,
} from "@mantine/core";
import {
  IconBasket,
  IconChevronDown,
  IconChevronRight,
  IconSettings,
  IconShoppingCart,
  IconTransferOut,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { useProduct } from "@context/product-context";
import { forwardRef, useEffect, useState } from "react";
import { useAccount } from "@context/account-context";
import { useRouter } from "next/router";
import { useCart } from "@context/cart-context";
import * as amplitude from "@amplitude/analytics-browser";
import HeaderTabs from "./header-tabs";
import { useDisclosure } from "@mantine/hooks";
import SearchComponent from "./algolia-search";

const HomeHeader = () => {
  const router = useRouter();
  const { departments, campaigns } = useProduct();
  const [opened, { open, close }] = useDisclosure(false);
  const { collaborator, logout, homeDesign } = useAccount();
  const [searchable, setSearchable] = useState("");
  const [cartLength, setCartLength] = useState(0);
  const { cart } = useCart();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const searchProductByCategorie = (categorieToSearch: string) => {
    amplitude.track("Search Product", {
      department: categorieToSearch,
      origin: "Menu Header",
    });
    close();
    router.push({
      pathname: "/search",
      query: { department_name: categorieToSearch },
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
        onClose={close}
        size="xs"
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <Title pl="xl" fz={26} fw={700} mb="xs">
          Departamentos
        </Title>
        {departments.map((category, id) => (
          <NavLink
            key={id}
            rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
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
            label={
              <Text py={10} fz={18}>
                {category.name}
              </Text>
            }
            styles={{
              root: {
                paddingLeft: 30,
              },
            }}
          />
        ))}
        <Divider my="md" />
        <Title pl="xl" fz={26} fw={700} mb="xs">
          Campañas
        </Title>
        {campaigns.map((category, id) => (
          <NavLink
            key={id}
            rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
            onClick={() => {
              amplitude.track("Search Product", {
                campaign: category.name,
                origin: "Campaign Menu",
              });
              router.push(`/search?campaign_names=${category.name}`);
            }}
            label={
              <Text py={10} fz={18}>
                {category.name}
              </Text>
            }
            styles={{
              root: {
                paddingLeft: 30,
              },
            }}
          />
        ))}
      </Drawer>
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
              <img
                src="/logo_adfly.svg"
                alt="Adfly"
                style={{ height: "50px", width: "auto", padding: "0px" }}
              />
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={6} md={3}>
          <Center>
            <UnstyledButton
              onClick={open}
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
        </Grid.Col>
        <Grid.Col span="auto" py={16}>
          <SearchComponent />
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
                  <Menu.Item
                    icon={<IconSettings size={14} />}
                    onClick={() => router.push("/account/profile")}
                  >
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
                  onClick={() => {
                    amplitude.track("Go to Cart");
                    router.push("/orders");
                  }}
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
        <Grid.Col span={24} bg="white" p={0}>
          <HeaderTabs />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default HomeHeader;
