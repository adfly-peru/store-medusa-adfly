import { useFilteredProducts } from "@context/filtered-products-context";
import { Text, Grid, Space, Group, Select, Divider } from "@mantine/core";
import FilteredProducts from "@modules/products/components/filtered-products";
import SearchBar from "@modules/products/components/search-bar";
import { IconChevronDown } from "@tabler/icons-react";

const SearchProducts = ({
  searchable,
  departmentName,
}: {
  searchable: string;
  departmentName: string;
}) => {
  const { setSortBy, sortBy } = useFilteredProducts();
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
              rightSection={<IconChevronDown size="1rem" />}
              label="Ordenar por:"
              value={sortBy}
              onChange={setSortBy}
              data={[
                { label: "Nombre", value: "name" },
                { label: "Marca", value: "brand" },
                { label: "Departamento", value: "department" },
                { label: "Categoria", value: "category" },
                { label: "Subcategoria", value: "subcategory" },
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
