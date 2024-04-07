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
  ActionIcon,
  UnstyledButton,
} from "@mantine/core";
// import Pagination from "@modules/common/components/pagination";
import {
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconFilter,
  IconList,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import FilterDrawer from "../components/filter-drawer";
import { useProduct } from "@context/product-context";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Pagination,
  usePagination,
  useSortBy,
} from "react-instantsearch";
import FilterSection from "../components/algolia-filter";
import FilteredAlgoliaProducts from "../components/algolia-results";
import { searchClient } from "@lib/algolia-client";
import { useRouter } from "next/router";

const sortItems = [
  { value: "adfly_store", label: "A - Z" },
  {
    value: "products_price_asc",
    label: "Precio ascendente",
  },
  {
    value: "products_price_desc",
    label: "Precio descendente",
  },
];

const CustomSortBy = () => {
  const router = useRouter();
  const { sort } = router.query;
  const { currentRefinement, refine } = useSortBy({
    items: sortItems,
  });

  useEffect(() => {
    if (typeof sort === "string") refine(sort);
  }, [sort, refine]);

  return (
    <Select
      rightSection={<IconChevronDown size="1rem" />}
      value={currentRefinement}
      onChange={(val) => {
        const newQuery = { ...router.query };
        if (val) newQuery["sort"] = val;
        router.push(
          {
            pathname: "/search",
            query: newQuery,
          },
          undefined,
          { shallow: true }
        );
      }}
      data={sortItems}
    />
  );
};

const CustomPagination = () => {
  const { pages, refine, isFirstPage, isLastPage, currentRefinement, nbPages } =
    usePagination({
      padding: 1,
    });

  return (
    <Group>
      <ActionIcon disabled={isFirstPage} onClick={() => refine(0)}>
        <IconChevronsLeft />
      </ActionIcon>
      <ActionIcon
        disabled={isFirstPage}
        onClick={() => refine(currentRefinement - 1)}
      >
        <IconChevronLeft />
      </ActionIcon>
      {pages.map((p) => (
        <UnstyledButton
          c={currentRefinement === p ? "dark" : "#3D7FB2"}
          key={p}
          onClick={() => refine(p)}
          disabled={currentRefinement === p}
          fw={currentRefinement === p ? 700 : 500}
        >
          {p + 1}
        </UnstyledButton>
      ))}
      <ActionIcon
        disabled={isLastPage}
        onClick={() => refine(currentRefinement + 1)}
      >
        <IconChevronRight />
      </ActionIcon>
      <ActionIcon disabled={isLastPage} onClick={() => refine(nbPages - 1)}>
        <IconChevronsRight />
      </ActionIcon>
    </Group>
  );
};

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

  return (
    <InstantSearch
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
      searchClient={searchClient}
    >
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
            <FilterSection />
            {/* <SearchBar
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
            /> */}
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
                  <CustomSortBy />
                </Group>
                <CustomPagination />
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
          <FilteredAlgoliaProducts />
          <Group bg="#F2F2F3" mt="md" position="center">
            <CustomPagination />
          </Group>
        </Grid.Col>
      </Grid>{" "}
    </InstantSearch>
  );
};

export default SearchProducts;
