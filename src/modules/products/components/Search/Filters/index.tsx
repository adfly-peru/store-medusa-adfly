import React, { useMemo } from "react";
import { Configure } from "react-instantsearch";
import { useRouter } from "next/router";
import AlgoliaSideBar from "../FiltersBar";
import { Stack } from "@mui/material";
import * as amplitude from "@amplitude/analytics-browser";

const FilterSection = () => {
  const router = useRouter();
  const { query, type } = router.query;

  const filters = useMemo(() => {
    const filterKeys = [
      "department_name",
      "category_name",
      "subcategory_name",
      "brand_name",
      "campaign_names",
      "commercial_name",
      "product_type",
    ];

    let filtersArray: string[] = [];
    filterKeys.forEach((key) => {
      const value = router.query[key];
      if (value) {
        const values = typeof value === "string" ? value.split(",") : value;
        values.forEach((val) => {
          filtersArray.push(`${key}:'${val}'`);
        });
      }
    });

    const minPrice = router.query.minPrice;
    const maxPrice = router.query.maxPrice;

    if (minPrice && maxPrice) {
      filtersArray.push(`final_price >= ${minPrice}`);
      filtersArray.push(`final_price <= ${maxPrice}`);
    }

    filtersArray.push(`product_status:"accepted"`);
    if (type) {
      filtersArray.push(`product_type:"${type}"`);
    }

    amplitude.track("Algolia: generate filter", { filtersArray });

    return filtersArray.join(" AND ");
  }, [router.query, type]);

  return (
    <Stack>
      <AlgoliaSideBar />
      <Configure
        hitsPerPage={12}
        filters={filters}
        query={typeof query === "string" ? query : query?.toString()}
      />
    </Stack>
  );
};

export default FilterSection;
