import React, { useEffect, useMemo } from "react";
import {
  Container,
  Center,
  Title,
  Divider,
  Accordion,
  Checkbox,
  RangeSlider,
  Stack,
  Group,
  NumberInput,
  Avatar,
} from "@mantine/core";
import {
  Configure,
  Hits,
  InstantSearch,
  useHits,
  useRange,
  useRefinementList,
} from "react-instantsearch";
import { searchClient } from "@lib/algolia-client";
import { NextRouter, useRouter } from "next/router";
import ProductCard from "./product-card";
import { Offer } from "@interfaces/productInterface";

const CustomHits = () => {
  const { hits } = useHits();
  return (
    <>
      {hits.map((h) => (
        <div key={h.objectID}>
          <Avatar src={(h as any).image_url} />
        </div>
      ))}
    </>
  );
};

const CustomRangeInput = () => {
  const { start, range, refine } = useRange({
    attribute: "final_price",
  });

  const marks = useMemo(() => {
    const step = ((range.max ?? 999999) - (range.min ?? 0)) / 3;
    return Array.from({ length: 4 }, (_, index) => {
      const value = (range.min ?? 0) + step * index;
      return { value, label: `S/.${value.toFixed(0)}` };
    });
  }, [range]);

  return (
    <Stack my="md" spacing="xl" px="xl">
      <RangeSlider
        value={[
          start[0] === -Infinity ? range.min ?? 0 : start[0] ?? 0,
          start[1] === Infinity ? range.max ?? 999999 : start[1] ?? 999999,
        ]}
        min={range.min ?? 0}
        max={range.max ?? 999999}
        precision={2}
        step={0.01}
        marks={marks}
        onChange={refine}
      />
      <Group position="apart" mt="md">
        <NumberInput
          maw={100}
          value={start[0] === -Infinity ? range.min : start[0] ?? 0}
          min={range.min ?? 0}
          max={start[1] ?? 999999}
          onChange={(val) => {
            refine([
              val !== "" ? val : undefined,
              start[1] === Infinity ? range.max : start[1],
            ]);
          }}
        />
        <NumberInput
          maw={100}
          value={start[1] === Infinity ? range.max : start[1] ?? 999999}
          min={start[0] ?? 0}
          max={range.max ?? 999999}
          onChange={(val) => {
            refine([
              start[0] === -Infinity ? range.min : start[0],
              val !== "" ? val : undefined,
            ]);
          }}
        />
      </Group>
    </Stack>
  );
};

const CustomRefinementList = ({
  label,
  attribute,
  router,
}: {
  label: string;
  attribute: string;
  router: NextRouter;
}) => {
  const { items } = useRefinementList({
    attribute,
  });

  if (items.length === 0) return null;

  return (
    <Accordion.Item value={attribute}>
      <Accordion.Control>{label}</Accordion.Control>
      <Accordion.Panel>
        {items.map((item) => (
          <Checkbox
            key={item.label}
            label={`${item.label} (${item.count})`}
            checked={item.isRefined || router.query[attribute] === item.label}
            onChange={(val) => {
              const isChecked = val.currentTarget.checked;
              const newQuery = { ...router.query };
              if (isChecked) {
                newQuery[attribute] = item.label;
              } else {
                delete newQuery[attribute];
              }
              router.push(
                {
                  pathname: "/search",
                  query: newQuery,
                },
                undefined,
                { shallow: true }
              );
            }}
          />
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const FilterSection = () => {
  const router = useRouter();
  const { query, department_name, campaign_name, sort, page } = router.query;

  const facetFilters = useMemo(() => {
    const filterKeys = [
      "department_name",
      "category_name",
      "subcategory_name",
      "brand_name",
      "campaign_name",
    ];
    const filters: string[] = filterKeys.reduce((acc, key) => {
      const value = router.query[key];
      if (value) {
        acc.push(
          `${key}:${typeof value === "string" ? value : value.toString()}`
        );
      }
      return acc;
    }, [] as string[]);

    return filters;
  }, [router.query]);

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
          {query ?? department_name ?? campaign_name ?? "---"}
        </Title>
      </Center>
      <Divider my="sm" style={{ borderColor: "black" }} />
      <Configure
        hitsPerPage={12}
        facetFilters={facetFilters}
        query={typeof query === "string" ? query : query?.toString()}
      />
      <Accordion p={0} multiple styles={{ item: { borderColor: "black" } }}>
        <CustomRefinementList
          label={"Campaña"}
          attribute={"campaign_name"}
          router={router}
        />
        <CustomRefinementList
          label={"Departamento"}
          attribute={"department_name"}
          router={router}
        />
        <CustomRefinementList
          label={"Categoría"}
          attribute={"category_name"}
          router={router}
        />
        <CustomRefinementList
          label={"Subcategoría"}
          attribute={"subcategory_name"}
          router={router}
        />
        <CustomRefinementList
          label={"Marca"}
          attribute={"brand_name"}
          router={router}
        />
        <CustomRangeInput />
      </Accordion>
    </Container>
  );
};

export default FilterSection;
