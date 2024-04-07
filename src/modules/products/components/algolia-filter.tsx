import React, { useMemo } from "react";
import { Container, Center, Title, Divider, Accordion } from "@mantine/core";
import { Configure } from "react-instantsearch";
import { useRouter } from "next/router";
import CustomRangeInput from "@modules/algolia/components/range-input";
import CustomRefinementList from "@modules/algolia/components/refinement-list";

const FilterSection = () => {
  const router = useRouter();
  const { query, department_name, campaign_names } = router.query;

  const facetFilters = useMemo(() => {
    const filterKeys = [
      "department_name",
      "category_name",
      "subcategory_name",
      "brand_name",
      "campaign_names",
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
          {query ?? department_name ?? campaign_names ?? "---"}
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
          label={"Campaña"}
          attribute={"campaign_names"}
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
