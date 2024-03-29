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
  Radio,
  Divider,
  Container,
  createStyles,
} from "@mantine/core";
import Pagination from "@modules/common/components/pagination";
import FilteredProducts from "@modules/products/components/filtered-products";
import SearchBar from "@modules/products/components/search-bar";
import {
  IconCheck,
  IconChevronDown,
  IconFilter,
  IconList,
} from "@tabler/icons-react";
import { useState } from "react";
import FilterDrawer from "../components/filter-drawer";
import { useProduct } from "@context/product-context";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, RefinementList } from "react-instantsearch";
import FilterSection from "../components/algolia-filter";

const useStyles = createStyles((theme) => ({
  list: {
    listStyle: "none",
    border: "3px solid blue",
    padding: 0,
  },
}));

const SearchProducts = ({
  searchable,
  departmentName,
  campaign,
}: {
  searchable: string;
  departmentName: string;
  campaign: string;
}) => {
  const [opened, setOpened] = useState(false);
  const [openedSort, setOpenedSort] = useState(false);
  const { setSortBy, sortBy, offset, count, setoffset, limit } =
    useFilteredProducts();
  const { departments } = useProduct();
  const { campaigns: originalCampaigns } = useProduct();
  const { classes } = useStyles();

  return (
    <>
      <div>aaas</div>
      <FilterSection
        searchable={
          searchable !== ""
            ? searchable
            : departmentName !== ""
            ? departments.find((d) => d.name === departmentName)?.id ?? ""
            : campaign
        }
        kind={
          searchable !== ""
            ? "search"
            : departmentName !== ""
            ? "department"
            : "campaign"
        }
        departmentname={departmentName}
      />
      <Drawer
        opened={openedSort}
        onClose={() => setOpenedSort(false)}
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
            Ordenar por:
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
          close: {
            color: "white",
          },
        }}
      >
        <Container p={0}>
          <Divider size="md" style={{ borderColor: "black" }} />
          <Radio.Group value={sortBy} onChange={setSortBy} m={20}>
            <Radio value="name" label="Nombre" icon={IconCheck} />
            <Radio value="adflyprice" label="Precio Adfly" icon={IconCheck} />
            <Radio value="refprice" label="Precio Original" icon={IconCheck} />
            <Radio value="stock" label="Stock" icon={IconCheck} />
          </Radio.Group>
        </Container>
      </Drawer>
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
          close: {
            color: "white",
          },
        }}
      >
        <FilterDrawer
          searchable={
            searchable !== ""
              ? searchable
              : departmentName !== ""
              ? departments.find((d) => d.name === departmentName)?.id ?? ""
              : campaign
          }
          kind={
            searchable !== ""
              ? "search"
              : departmentName !== ""
              ? "department"
              : "campaign"
          }
        />
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
              searchable={
                searchable !== ""
                  ? searchable
                  : departmentName !== ""
                  ? departments.find((d) => d.name === departmentName)?.id ?? ""
                  : campaign
              }
              kind={
                searchable !== ""
                  ? "search"
                  : departmentName !== ""
                  ? "department"
                  : "campaign"
              }
              departmentname={departmentName}
            />
          </Grid.Col>
        </MediaQuery>
        <Grid.Col span="auto" px="md" py={0}>
          <MediaQuery
            smallerThan="md"
            styles={{
              display: "none",
            }}
          >
            <div>
              <Group position="apart" bg="#F2F2F3" p="xs">
                <Group>
                  <Text fw={700}>Ordenar por:</Text>
                  <Select
                    rightSection={<IconChevronDown size="1rem" />}
                    value={sortBy}
                    onChange={setSortBy}
                    data={[
                      { label: "Nombre", value: "name" },
                      { label: "Precio Adfly", value: "adflyprice" },
                      { label: "Precio Original", value: "refprice" },
                      { label: "Stock", value: "stock" },
                    ]}
                  />
                </Group>
                <Pagination
                  currentPage={Math.ceil(offset / limit) + 1}
                  totalPages={Math.ceil(count / limit)}
                  onPageChange={(page) => setoffset((page - 1) * limit)}
                />
              </Group>
            </div>
          </MediaQuery>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <div>
              <Text>
                {searchable +
                  departmentName +
                  (originalCampaigns.find((v) => v.uuidcampaign === campaign)
                    ?.name ?? "")}
              </Text>
              <Space h="md" />
              <Group grow>
                <Button
                  onClick={() => setOpened(true)}
                  leftIcon={<IconFilter />}
                >
                  Filtrar
                </Button>
                <Button
                  onClick={() => setOpenedSort(true)}
                  leftIcon={<IconList />}
                >
                  Ordenar
                </Button>
              </Group>
            </div>
          </MediaQuery>
          <Space h="md" />
          <FilteredProducts />
          <Group bg="#F2F2F3" mt="md" position="center">
            <Pagination
              currentPage={Math.ceil(offset / limit) + 1}
              totalPages={Math.ceil(count / limit)}
              onPageChange={(page) => setoffset((page - 1) * limit)}
            />
          </Group>
        </Grid.Col>
      </Grid>{" "}
    </>
  );
};

export default SearchProducts;
