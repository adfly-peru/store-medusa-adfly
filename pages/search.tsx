import {
  AppShell,
  Divider,
  Grid,
  Group,
  Header,
  Select,
  Space,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";
import CardComponent from "../components/cardComponent";
import FilteredCard from "../components/filtered-card-component";
import { FilterProvider } from "../context/filter-context";
import { useProduct } from "../context/product-context";
import AccountLayout from "../modules/account/templates/account-layout";
import AuthLayout from "../modules/account/templates/authentication-layout";
import HomeHeader from "../modules/home/components/header";
import SearchBar from "../modules/products/components/search-bar";

export default function Search() {
  const router = useRouter();
  const searchable = router.query.data;
  const { getProductsByFilter } = useProduct();
  const products = getProductsByFilter(
    typeof searchable == "string" ? searchable : ""
  );

  return (
    <FilterProvider filter={typeof searchable == "string" ? searchable : ""}>
      <AuthLayout>
        <AccountLayout>
          <AppShell
            padding={0}
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
            header={
              <Header height={120} p="xs">
                <HomeHeader />
              </Header>
            }
          >
            <Grid>
              <Grid.Col
                span={2}
                sx={{
                  borderRightStyle: "groove",
                  borderColor: "white",
                  background: "white",
                }}
              >
                <SearchBar
                  searchable={
                    typeof searchable == "string" ? searchable : "Departamento"
                  }
                />
              </Grid.Col>
              <Grid.Col span="auto" px={15}>
                <Space h="xs" />
                <Group position="apart">
                  <Text size="xl" fw={500}>
                    Resultados de búsqueda
                  </Text>
                  <Select
                    label="Ordenar por:"
                    defaultValue={"relevancia"}
                    data={[
                      { value: "relevancia", label: "Relevancia" },
                      { value: "mas vendido", label: "Mas vendido" },
                      { value: "mas nueo", label: "Mas nuevo" },
                      { value: "mejor descuento", label: "Mejor descuento" },
                      { value: "mayor precio", label: "Mayor precio" },
                      { value: "menor precio", label: "Menor precio" },
                      { value: "a-z", label: "A-Z" },
                      { value: "z-a", label: "Z-A" },
                    ]}
                  />
                </Group>
                <Space h="md" />
                <Divider size="sm" />
                <FilteredCard />
              </Grid.Col>
            </Grid>
          </AppShell>
        </AccountLayout>
      </AuthLayout>
    </FilterProvider>
  );
}
