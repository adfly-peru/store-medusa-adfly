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
import { useProduct } from "@context/product-context";

const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const SearchBar = ({
  searchable,
  kind,
}: {
  searchable: string;
  kind: "campaign" | "department" | "search";
}) => {
  const { setOptions, products, setoffset } = useFilteredProducts();
  const { campaigns: originalCampaigns } = useProduct();
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [department, setDepartment] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [seller, setSeller] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setBrand([]);
    setCategory([]);
    setSubcategory([]);
    switch (kind) {
      case "search":
        setDepartment([]);
        setCampaigns([]);
        setSearch(searchable);
        break;
      case "department":
        setSearch("");
        setCampaigns([]);
        setDepartment([searchable]);
        break;
      case "campaign":
        setSearch("");
        setDepartment([]);
        setCampaigns([searchable]);
        break;
      default:
        break;
    }
  }, [kind, searchable]);

  useEffect(() => {
    setCategory([]);
  }, [department]);

  useEffect(() => {
    setSubcategory([]);
  }, [category]);

  useEffect(() => {
    setoffset(0);
  }, [brand, department, category, subcategory, search, campaigns]);

  useEffect(() => {
    const fetchOptions: FilterOptions = {};
    if (search !== "") fetchOptions.offerSearch = search;
    if (campaigns.length > 0) fetchOptions.campaign = campaigns.at(0);
    if (department.length > 0) fetchOptions.departmentName = department.at(0);
    if (category.length > 0) fetchOptions.categoryName = category.at(0);
    if (subcategory.length > 0)
      fetchOptions.subcategoryName = subcategory.at(0);
    if (brand.length > 0) fetchOptions.brandName = brand.at(0);
    setOptions(fetchOptions);
  }, [brand, department, category, subcategory, search, campaigns]);

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
          {kind === "campaign"
            ? originalCampaigns.find((v) => v.uuidcampaign === searchable)
                ?.name ?? capitalizeText(searchable)
            : searchable !== ""
            ? capitalizeText(searchable)
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
            ...campaigns,
          ]}
        >
          <Group position="center">
            {kind !== "campaign" ? (
              <>
                {campaigns.map((e) => (
                  <Chip
                    value={e}
                    onClick={() =>
                      setCampaigns(campaigns.filter((value) => value != e))
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
            {kind !== "department" ? (
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
        {kind !== "campaign" && products?.campaignCounts?.length ? (
          <Accordion.Item value="campaign">
            <Accordion.Control>
              <Title order={6} fw={400} fz={20}>
                Campaña
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <CheckGroup
                values={
                  new Map<string, string>(
                    Array.from(
                      products?.campaignCounts?.map((c) => [
                        c.uuid ?? "",
                        `${c.name} (${c.count})`,
                      ]) ?? []
                    )
                  )
                }
                currentValues={campaigns}
                changeValues={setCampaigns}
              />
            </Accordion.Panel>
          </Accordion.Item>
        ) : (
          <></>
        )}
        {kind !== "department" ? (
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
        {department.length > 0 ? (
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
