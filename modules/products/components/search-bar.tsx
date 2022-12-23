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
} from "@mantine/core";
import { useState } from "react";
import CheckGroup from "../../../components/checkbox-group";
import { useFilter } from "../../../context/filter-context";

const SearchBar = ({ searchable }: { searchable: string }) => {
  const minPrice = 0;
  const maxPrice = 1000;
  const [minPriceSelected, setMin] = useState(minPrice);
  const [maxPriceSelected, setMax] = useState(maxPrice);
  const {
    category,
    setCategory,
    brand,
    setBrand,
    seller,
    setSeller,
    delivery,
    setDelivery,
    categories,
    brands,
  } = useFilter();

  return (
    <Container p={0}>
      <Center p={15}>
        <Title>
          {searchable.charAt(0).toUpperCase() +
            searchable.slice(1).toLowerCase()}
        </Title>
      </Center>
      {category.length > 0 ||
      brand.length > 0 ||
      seller.length > 0 ||
      delivery.length > 0 ? (
        <>
          <Divider my="sm" />
          <Stack px={20}>
            <Text>Filtros aplicados</Text>
            <Chip.Group
              position="center"
              value={[...category, ...brand, ...seller, ...delivery]}
            >
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
              {/* </Chip.Group>
            <Chip.Group position="center" value={brand}> */}
              {brand.map((e, idx) => (
                <Chip
                  value={e}
                  onClick={() => setBrand(brand.filter((value) => value != e))}
                  key={idx}
                >
                  {e}
                </Chip>
              ))}
              {/* </Chip.Group>
            <Chip.Group position="center" value={seller}> */}
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
              {/* </Chip.Group>
            <Chip.Group position="center" value={delivery}> */}
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
                  Array.from(categories.entries()).map((entry) => [
                    entry[0],
                    `${entry[0]} (${entry[1]})`,
                  ])
                  // categories.map((category) => [category.name, category.name])
                )
              }
              currentValues={category}
              changeValues={setCategory}
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
                  Array.from(brands.entries()).map((entry) => [
                    entry[0],
                    `${entry[0]} (${entry[1]})`,
                  ])
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
