import { useFilteredProducts } from "@context/filtered-products-context";
import {
  Text,
  Grid,
  Space,
  Group,
  Select,
  MediaQuery,
  Button,
  Drawer,
  Title,
} from "@mantine/core";
import Pagination from "@modules/common/components/pagination";
import FilteredProducts from "@modules/products/components/filtered-products";
import SearchBar from "@modules/products/components/search-bar";
import { IconChevronDown, IconFilter, IconList } from "@tabler/icons-react";
import { useState } from "react";
import FilterDrawer from "../components/filter-drawer";

const SearchProducts = ({
  searchable,
  departmentName,
}: {
  searchable: string;
  departmentName: string;
}) => {
  const [opened, setOpened] = useState(false);
  const { setSortBy, sortBy, offset, count, setoffset, limit } =
    useFilteredProducts();
  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Title
            order={2}
            styles={{
              fontSize: "20px",
              fontweight: 700,
              lineheight: "30px",
              letterSpacing: "0.05em",
            }}
          >
            Filtrar por:
          </Title>
        }
        padding={0}
        size="md"
        position="right"
        styles={{
          header: {
            padding: 18,
            backgroundColor: "#31658E",
            color: "white",
          },
        }}
      >
        <FilterDrawer searchable={searchable} departmentName={departmentName} />
      </Drawer>
      <Grid w="100%">
        <MediaQuery
          smallerThan="md"
          styles={{
            display: "none",
          }}
        >
          <Grid.Col span={2} bg="#F2F2F3" px={0} ml="lg" mr="xs">
            <SearchBar
              searchable={searchable}
              departmentName={departmentName}
            />
          </Grid.Col>
        </MediaQuery>
        <Grid.Col span="auto" px="md">
          <MediaQuery
            smallerThan="md"
            styles={{
              display: "none",
            }}
          >
            <div>
              <Space h="xs" />
              <Group position="apart" bg="#F2F2F3" p="xs">
                <Group>
                  <Text fw={700}>Ordenar por:</Text>
                  <Select
                    rightSection={<IconChevronDown size="1rem" />}
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
                <Pagination
                  currentPage={offset + 1}
                  totalPages={Math.ceil(count / limit)}
                  onPageChange={(page) => setoffset(page - 1)}
                />
              </Group>
            </div>
          </MediaQuery>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <div>
              <Text>{searchable + departmentName}</Text>
              <Space h="md" />
              <Group grow>
                <Button
                  onClick={() => setOpened(true)}
                  leftIcon={<IconFilter />}
                >
                  Filtrar
                </Button>
                <Button leftIcon={<IconList />}>Ordenar</Button>
              </Group>
            </div>
          </MediaQuery>
          <Space h="md" />
          <FilteredProducts />
        </Grid.Col>
      </Grid>{" "}
    </>
  );
};

export default SearchProducts;
