import React, { useEffect, useMemo, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  Container,
  Center,
  Title,
  Divider,
  Accordion,
  Checkbox,
} from "@mantine/core";
import {
  Configure,
  InstantSearch,
  useRefinementList,
} from "react-instantsearch";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? ""
);

const CustomRefinementList = ({
  label,
  attribute,
}: {
  label: string;
  attribute: string;
}) => {
  const { items, refine } = useRefinementList({
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
            checked={item.isRefined}
            onChange={(_) => refine(item.value)}
          />
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const FilterSection = ({
  searchable,
  kind,
  departmentname,
}: {
  searchable: string;
  kind: "campaign" | "department" | "search";
  departmentname: string;
}) => {
  let filter = "";
  switch (kind) {
    case "search":
      filter = `searchable:${searchable}`;
      break;
    case "department":
      filter = `department:${departmentname}`;
      break;
    case "campaign":
      filter = `campaign:${searchable}`;
      break;
    default:
      break;
  }

  return (
    <InstantSearch
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
      searchClient={searchClient}
    >
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
            {kind === "campaign" ? searchable : departmentname}
          </Title>
        </Center>
        <Divider my="sm" style={{ borderColor: "black" }} />

        {/* Configure search parameters */}
        {/* {filter && <Configure filters={filter} />} */}

        <Accordion p={0} multiple styles={{ item: { borderColor: "black" } }}>
          <CustomRefinementList label={"Campaña"} attribute={"campaign_name"} />
          <CustomRefinementList
            label={"Departamento"}
            attribute={"department_name"}
          />
          <CustomRefinementList
            label={"Categoría"}
            attribute={"category_name"}
          />
          <CustomRefinementList
            label={"Subcategoría"}
            attribute={"subcategory_name"}
          />
          <CustomRefinementList label={"Marca"} attribute={"brand_name"} />
        </Accordion>
      </Container>
    </InstantSearch>
  );
};

export default FilterSection;
