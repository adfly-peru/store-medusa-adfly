import CustomRefinementList from "@modules/products/components/Search/FiltersBar/RefinementList";
import { Divider, List } from "@mui/material";
import React from "react";
import { MarketplacePricesFilter } from "../FiltersBar/MarketplacePrices";
import { MarketplaceStatusFilter } from "../FiltersBar/MarketplaceStatus";
import { MarketplaceZonesFilter } from "../FiltersBar/MarketplaceZones";

const Filters = () => {
  return (
    <List sx={{ width: "100%" }}>
      <CustomRefinementList label={"Marca"} attribute={"brand_name"} />
      <Divider
        sx={(theme) => ({
          fontWeight: 600,
          fontSize: 16,
          border: `1px solid ${theme.palette.grey[200]}`,
          margin: "10px 15px",
        })}
      />
      <CustomRefinementList label={"Campaña"} attribute={"campaign_names"} />
      <Divider
        sx={(theme) => ({
          fontWeight: 600,
          fontSize: 16,
          border: `1px solid ${theme.palette.grey[200]}`,
          margin: "10px 15px",
        })}
      />
      <CustomRefinementList label={"Partner"} attribute={"commercial_name"} />
      <Divider
        sx={(theme) => ({
          fontWeight: 600,
          fontSize: 16,
          border: `1px solid ${theme.palette.grey[200]}`,
          margin: "10px 15px",
        })}
      />
    </List>
  );
};

export const MarketplaceDrawerFilters = () => {
  return (
    <List sx={{ width: "100%" }}>
      <MarketplacePricesFilter />
      <Divider
        sx={(theme) => ({
          border: `1px solid ${theme.palette.grey[200]}`,
          margin: "10px 15px",
        })}
      />
      <MarketplaceStatusFilter />
      <Divider
        sx={(theme) => ({
          border: `1px solid ${theme.palette.grey[200]}`,
          margin: "10px 15px",
        })}
      />
      <MarketplaceZonesFilter />
      <Divider
        sx={(theme) => ({
          border: `1px solid ${theme.palette.grey[200]}`,
          margin: "10px 15px",
        })}
      />
    </List>
  );
};

export default Filters;
