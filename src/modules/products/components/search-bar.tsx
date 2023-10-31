import {
  Text,
  Title,
  Center,
  Divider,
  Accordion,
  Stack,
  Chip,
  RangeSlider,
  Container,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import CheckGroup from "@modules/common/components/checkbox-group";
import {
  FilterOptions,
  useFilteredProducts,
} from "@context/filtered-products-context";

const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const SearchBar = ({
  searchable,
  departmentName,
}: {
  searchable: string;
  departmentName: string;
}) => {
  const { fetchProducts, products, sortBy } = useFilteredProducts();
  const [category, setCategory] = useState<string[]>([]);
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [seller, setSeller] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<string[]>([]);

  useEffect(() => {});

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    if (searchable) fetchOptions.offerSearch = searchable;
    if (departmentName) fetchOptions.departmentName = departmentName;
    fetchProducts(fetchOptions);
  }, [searchable, departmentName]);

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    if (searchable) fetchOptions.offerSearch = searchable;
    if (departmentName) fetchOptions.departmentName = departmentName;
    if (category.length > 0) fetchOptions.categoryName = category.at(0);
    if (brand.length > 0) fetchOptions.brandName = brand.at(0);
    fetchOptions.subcategoryName = undefined;
    setSubcategory([]);
    fetchProducts(fetchOptions);
  }, [category]);

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    if (searchable) fetchOptions.offerSearch = searchable;
    if (departmentName) fetchOptions.departmentName = departmentName;
    if (category.length > 0) fetchOptions.categoryName = category.at(0);
    if (subcategory.length > 0)
      fetchOptions.subcategoryName = subcategory.at(0);
    if (brand.length > 0) fetchOptions.brandName = brand.at(0);
    fetchProducts(fetchOptions);
  }, [subcategory]);

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    if (searchable) fetchOptions.offerSearch = searchable;
    if (departmentName) fetchOptions.departmentName = departmentName;
    if (category.length > 0) fetchOptions.categoryName = category.at(0);
    if (subcategory.length > 0)
      fetchOptions.subcategoryName = subcategory.at(0);
    if (brand.length > 0) fetchOptions.brandName = brand.at(0);
    fetchProducts(fetchOptions);
  }, [brand]);

  return (
    <Container p={0}>
      <Center p={15}>
        <Title>
          {searchable != ""
            ? capitalizeText(searchable)
            : departmentName != ""
            ? capitalizeText(departmentName)
            : "Departamento"}
        </Title>
      </Center>
      {category.length > 0 ||
      subcategory.length > 0 ||
      brand.length > 0 ||
      seller.length > 0 ||
      delivery.length > 0 ? (
        <>
          <Divider my="sm" />
          <Stack px={20}>
            <Text>Filtros aplicados</Text>
            <Chip.Group
              value={[
                ...category,
                ...subcategory,
                ...brand,
                ...seller,
                ...delivery,
              ]}
            >
              <Group position="center">
                {category.map((e, idx) => (
                  <Chip
                    value={e}
                    onClick={() =>
                      setCategory(category.filter((value) => value != e))
                    }
                    key={idx}
                  >
                    {e}
                  </Chip>
                ))}
                {subcategory.map((e, idx) => (
                  <Chip
                    value={e}
                    onClick={() =>
                      setSubcategory(subcategory.filter((value) => value != e))
                    }
                    key={idx}
                  >
                    {e}
                  </Chip>
                ))}
                {brand.map((e, idx) => (
                  <Chip
                    value={e}
                    onClick={() =>
                      setBrand(brand.filter((value) => value != e))
                    }
                    key={idx}
                  >
                    {e}
                  </Chip>
                ))}
                {seller.map((e, idx) => (
                  <Chip
                    value={e}
                    onClick={() =>
                      setSeller(seller.filter((value) => value != e))
                    }
                    key={idx}
                  >
                    {e}
                  </Chip>
                ))}
                {delivery.map((e, idx) => (
                  <Chip
                    value={e}
                    onClick={() =>
                      setDelivery(delivery.filter((value) => value != e))
                    }
                    key={idx}
                  >
                    {e}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </Stack>
        </>
      ) : (
        <></>
      )}
      <Divider my="sm" />
      <Accordion p={0} multiple>
        <Accordion.Item value="category">
          <Accordion.Control>
            <Title order={5}>Categoría</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <CheckGroup
              values={
                new Map<string, string>(
                  Array.from(
                    products?.categoryCounts?.map((c) => [
                      c.name ?? "",
                      `${c.name} (${c.count})`,
                    ]) ?? []
                  )
                )
              }
              currentValues={category}
              changeValues={setCategory}
            />
          </Accordion.Panel>
        </Accordion.Item>
        {category.length > 0 && (
          <Accordion.Item value="subcategory">
            <Accordion.Control>
              <Title order={5}>Subcategoría</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <CheckGroup
                values={
                  new Map<string, string>(
                    Array.from(
                      products?.subcategoryCounts?.map((c) => [
                        c.name ?? "",
                        `${c.name} (${c.count})`,
                      ]) ?? []
                    )
                  )
                }
                currentValues={subcategory}
                changeValues={setSubcategory}
              />
            </Accordion.Panel>
          </Accordion.Item>
        )}
        <Accordion.Item value="brand">
          <Accordion.Control>
            <Title order={5}>Marca</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <CheckGroup
              values={
                new Map<string, string>(
                  Array.from(
                    products?.brandCounts?.map((c) => [
                      c.name ?? "",
                      `${c.name} (${c.count})`,
                    ]) ?? []
                  )
                )
              }
              currentValues={brand}
              changeValues={setBrand}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default SearchBar;
