import {
  Text,
  Grid,
  Space,
  Group,
  MediaQuery,
  Button,
  Drawer,
} from "@mantine/core";
import { IconFilter, IconList } from "@tabler/icons-react";
import { useState } from "react";
import { InstantSearch } from "react-instantsearch";
import FilterSection from "../components/algolia-filter";
import FilteredAlgoliaProducts from "../components/algolia-results";
import { searchClient } from "@lib/algolia-client";
import CustomPagination from "@modules/algolia/components/pagination";
import CustomSortBy from "@modules/algolia/components/sortby";
import { useRouter } from "next/router";

const SearchProducts = () => {
  const [opened, setOpened] = useState(false);
  const [openedSort, setOpenedSort] = useState(false);
  const router = useRouter();
  const { query, department_name, campaign_name, sort, page } = router.query;

  return (
    <InstantSearch
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
      searchClient={searchClient}
    >
      <Drawer
        opened={openedSort}
        onClose={() => setOpenedSort(false)}
        title={"Ordenar por:"}
        padding={0}
        size="md"
        position="right"
        styles={{
          title: {
            fontSize: "20px",
            fontweight: 700,
            lineheight: "30px",
            letterSpacing: "0.05em",
          },
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
        <CustomSortBy />
      </Drawer>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={"Filtrar por:"}
        padding={0}
        size="md"
        position="right"
        styles={{
          title: {
            fontSize: "20px",
            fontweight: 700,
            lineheight: "30px",
            letterSpacing: "0.05em",
          },
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
        <FilterSection />
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
          </Grid.Col>
        </MediaQuery>
        <Grid.Col span="auto" px="md" py={0}>
          <MediaQuery
            smallerThan="md"
            styles={{
              display: "none",
            }}
          >
            <Group position="apart" bg="#F2F2F3" p="xs">
              <Group>
                <Text fw={700}>Ordenar por:</Text>
                <CustomSortBy />
              </Group>
              <CustomPagination />
            </Group>
          </MediaQuery>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <div>
              <Text>{query ?? department_name ?? campaign_name ?? "---"}</Text>
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
      </Grid>
    </InstantSearch>
  );
};

export default SearchProducts;
