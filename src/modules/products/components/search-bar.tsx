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
  const { fetchProducts, products } = useFilteredProducts();
  const [category, setCategory] = useState<string[]>([]);
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [seller, setSeller] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<string[]>([]);

  const minPrice = 0;
  const maxPrice = 1000;
  const [minPriceSelected, setMin] = useState(minPrice);
  const [maxPriceSelected, setMax] = useState(maxPrice);

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    if (searchable) fetchOptions.productSearch = searchable;
    if (departmentName) fetchOptions.departmentName = departmentName;
    if (category.length > 0) fetchOptions.categoryName = category.at(0);
    if (subcategory.length > 0)
      fetchOptions.subcategoryName = subcategory.at(0);
    if (brand.length > 0) fetchOptions.brandName = brand.at(0);

    fetchProducts(fetchOptions);
  }, [searchable, departmentName, category, subcategory, brand]);

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

        <Accordion.Item value="price">
          <Accordion.Control>
            <Title order={5}>Precio</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <RangeSlider
              m={20}
              min={minPrice}
              max={maxPrice}
              minRange={10}
              label={(value) => `S/.${value.toFixed(2)}`}
              showLabelOnHover={false}
              step={(minPrice + maxPrice) / 50}
              marks={[
                { value: minPrice, label: "S/. 0.00" },
                { value: maxPrice, label: "S/. 1000.00" },
              ]}
              onChangeEnd={(value) => {
                setMin(value[0]);
                setMax(value[1]);
              }}
            ></RangeSlider>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="seller">
          <Accordion.Control>
            <Title order={5}>Vendido por</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <CheckGroup
              values={
                new Map<string, string>([
                  ["Partner 1", "Partner 1"],
                  ["Partner 2", "Partner 2"],
                  ["Partner 3", "Partner 3"],
                ])
              }
              currentValues={seller}
              changeValues={setSeller}
            />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="discounts">
          <Accordion.Control>
            <Title order={5}>Descuentos</Title>
          </Accordion.Control>
          <Accordion.Panel>Filtro</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="comments">
          <Accordion.Control>
            <Title order={5}>Más comentados</Title>
          </Accordion.Control>
          <Accordion.Panel>Filtro</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="delivery">
          <Accordion.Control>
            <Title order={5}>Tipo de entrega</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <CheckGroup
              values={
                new Map<string, string>([
                  ["Delivery Standard", "Delivery Standard"],
                  ["Delivery Premium", "Delivery Premium"],
                ])
              }
              currentValues={delivery}
              changeValues={setDelivery}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default SearchBar;
