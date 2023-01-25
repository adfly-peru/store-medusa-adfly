import { Divider, Grid, Group, Select, Space, Text } from "@mantine/core";
import { useRouter } from "next/router";
import FilteredCard from "@components/filtered-card-component";
import { FilterProvider } from "@context/filter-context";
import SearchBar from "@modules/products/components/search-bar";
import Layout from "@modules/layout/templates";

export default function Search() {
  const router = useRouter();
  const searchable = router.query.data;
  return (
    <Layout>
      <FilterProvider filter={typeof searchable == "string" ? searchable : ""}>
        <Grid w="100%">
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
        </Grid>{" "}
      </FilterProvider>
    </Layout>
  );
}
