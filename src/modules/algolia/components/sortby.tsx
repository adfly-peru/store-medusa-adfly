import { Container, Divider, MediaQuery, Radio, Select } from "@mantine/core";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSortBy } from "react-instantsearch";

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
    <>
      <MediaQuery
        smallerThan="md"
        styles={{
          display: "none",
        }}
      >
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
      </MediaQuery>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Container p={0}>
          <Divider size="md" style={{ borderColor: "black" }} />
          <Radio.Group
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
            m={20}
          >
            {sortItems.map((i) => (
              <Radio
                key={i.value}
                value={i.value}
                label={i.label}
                icon={IconCheck}
              ></Radio>
            ))}
          </Radio.Group>
        </Container>
      </MediaQuery>
    </>
  );
};

export default CustomSortBy;
