import { Text, Grid, Space, Group, Select, Divider } from "@mantine/core";
import FilteredProducts from "@modules/products/components/filtered-products";
import SearchBar from "@modules/products/components/search-bar";

const SearchProducts = ({
  searchable,
  departmentName,
}: {
  searchable: string;
  departmentName: string;
}) => {
  return (
    <>
      <Grid w="100%">
        <Grid.Col
          span={2}
          sx={{
            borderRightStyle: "groove",
          }}
        >
          <SearchBar searchable={searchable} departmentName={departmentName} />
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
          <FilteredProducts />
        </Grid.Col>
      </Grid>{" "}
    </>
  );
};

export default SearchProducts;
