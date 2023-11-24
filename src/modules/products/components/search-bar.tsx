import {
  Text,
  Title,
  Center,
  Divider,
  Accordion,
  Stack,
  Chip,
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
  const { setOptions, products, setoffset } = useFilteredProducts();
  const [department, setDepartment] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [seller, setSeller] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<string[]>([]);

  useEffect(() => {
    if (departmentName.length > 0) setDepartment([departmentName]);
  }, [departmentName]);

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    if (searchable) fetchOptions.offerSearch = searchable;
    if (department.length > 0) fetchOptions.departmentName = department.at(0);
    setCategory([]);
    setOptions(fetchOptions);
    setoffset(0);
  }, [department]);

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    setOptions(fetchOptions);
    setDepartment([]);
    setoffset(0);
  }, [searchable]);

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    if (searchable) fetchOptions.offerSearch = searchable;
    if (departmentName) fetchOptions.departmentName = departmentName;
    if (category.length > 0) fetchOptions.categoryName = category.at(0);
    if (brand.length > 0) fetchOptions.brandName = brand.at(0);
    fetchOptions.subcategoryName = undefined;
    setSubcategory([]);
    setOptions(fetchOptions);
    setoffset(0);
  }, [category]);

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    if (searchable) fetchOptions.offerSearch = searchable;
    if (departmentName) fetchOptions.departmentName = departmentName;
    if (category.length > 0) fetchOptions.categoryName = category.at(0);
    if (subcategory.length > 0)
      fetchOptions.subcategoryName = subcategory.at(0);
    if (brand.length > 0) fetchOptions.brandName = brand.at(0);
    setOptions(fetchOptions);
    setoffset(0);
  }, [subcategory]);

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    if (searchable) fetchOptions.offerSearch = searchable;
    if (departmentName) fetchOptions.departmentName = departmentName;
    if (category.length > 0) fetchOptions.categoryName = category.at(0);
    if (subcategory.length > 0)
      fetchOptions.subcategoryName = subcategory.at(0);
    if (brand.length > 0) fetchOptions.brandName = brand.at(0);
    setOptions(fetchOptions);
    setoffset(0);
  }, [brand]);

  return (
    <Container p={0}>
      <Center p={15}>
        <Title
          order={5}
          style={{
            fontSize: "31px",
            fontWeight: "700",
            lineHeight: "37px",
            letterSpacing: "0em",
          }}
        >
          {searchable != ""
            ? capitalizeText(searchable)
            : departmentName != ""
            ? capitalizeText(departmentName)
            : "Departamento"}
        </Title>
      </Center>
      <Divider my="sm" style={{ borderColor: "black" }} />
      <Stack px={20}>
        <Text
          style={{
            fontWeight: 700,
          }}
        >
          Filtros seleccionados
        </Text>

        <Chip.Group
          value={[
            ...department,
            ...category,
            ...subcategory,
            ...brand,
            ...seller,
            ...delivery,
          ]}
        >
          <Group position="center">
            {searchable.length > 0 ? (
              <>
                {department.map((e) => (
                  <Chip
                    value={e}
                    onClick={() =>
                      setDepartment(department.filter((value) => value != e))
                    }
                    key={e}
                    radius="sm"
                    color="dark"
                  >
                    {e}
                  </Chip>
                ))}
              </>
            ) : (
              <></>
            )}
            {category.map((e) => (
              <Chip
                value={e}
                onClick={() =>
                  setCategory(category.filter((value) => value != e))
                }
                key={e}
                radius="sm"
                color="dark"
              >
                {e}
              </Chip>
            ))}
            {subcategory.map((e) => (
              <Chip
                value={e}
                onClick={() =>
                  setSubcategory(subcategory.filter((value) => value != e))
                }
                key={e}
                radius="sm"
                color="dark"
              >
                {e}
              </Chip>
            ))}
            {brand.map((e) => (
              <Chip
                value={e}
                onClick={() => setBrand(brand.filter((value) => value != e))}
                key={e}
                radius="sm"
                color="dark"
              >
                {e}
              </Chip>
            ))}
            {seller.map((e) => (
              <Chip
                value={e}
                onClick={() => setSeller(seller.filter((value) => value != e))}
                key={e}
                radius="sm"
                color="dark"
              >
                {e}
              </Chip>
            ))}
            {delivery.map((e) => (
              <Chip
                value={e}
                onClick={() =>
                  setDelivery(delivery.filter((value) => value != e))
                }
                key={e}
                radius="sm"
                color="dark"
              >
                {e}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      </Stack>
      <Divider mt="sm" style={{ borderColor: "black" }} />
      <Accordion
        p={0}
        multiple
        styles={{
          item: {
            borderColor: "black",
          },
        }}
      >
        {searchable.length > 0 ? (
          <Accordion.Item value="department">
            <Accordion.Control>
              <Title order={6} fw={400} fz={20}>
                Departamento
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <CheckGroup
                values={
                  new Map<string, string>(
                    Array.from(
                      products?.departmentCounts?.map((c) => [
                        c.name ?? "",
                        `${c.name} (${c.count})`,
                      ]) ?? []
                    )
                  )
                }
                currentValues={department}
                changeValues={setDepartment}
              />
            </Accordion.Panel>
          </Accordion.Item>
        ) : (
          <></>
        )}
        {searchable.length === 0 || department.length > 0 ? (
          <Accordion.Item value="category">
            <Accordion.Control>
              <Title order={6} fw={400} fz={20}>
                Categoría
              </Title>
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
        ) : (
          <></>
        )}
        {category.length > 0 && (
          <Accordion.Item value="subcategory">
            <Accordion.Control>
              <Title order={6} fw={400} fz={20}>
                Subcategoría
              </Title>
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
            <Title order={6} fw={400} fz={20}>
              Marca
            </Title>
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
