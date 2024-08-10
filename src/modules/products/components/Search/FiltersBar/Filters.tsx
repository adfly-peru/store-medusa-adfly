import { Icon } from "@iconify/react";
import CustomRefinementList from "@modules/products/components/Search/FiltersBar/RefinementList";
import { Divider, List, ListSubheader, Paper } from "@mui/material";
import React from "react";
import PricesRange from "./PricesRange";
import { useRouter } from "next/router";
import { BenefitZonesFilter } from "./BenefitZones";
import { MarketplacePricesFilter } from "./MarketplacePrices";
import { MarketplaceStatusFilter } from "./MarketplaceStatus";
import { MarketplaceZonesFilter } from "./MarketplaceZones";

const Filters = () => {
  const { query } = useRouter();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "13px 0",
        backgroundColor: "#F2F2F2",
      }}
    >
      <List
        sx={{ width: "100%" }}
        subheader={
          <ListSubheader
            sx={{
              backgroundColor: "inherit",
              fontSize: 20,
              fontWeight: 700,
              textDecoration: "underline",
              color: "black",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Filtros <Icon icon="mi:filter" />
          </ListSubheader>
        }
      >
        {query.type === "product" && (
          <Divider
            sx={(theme) => ({
              fontWeight: 600,
              fontSize: 16,
              border: `1px solid ${theme.palette.grey[200]}`,
              margin: "10px 15px",
            })}
          />
        )}
        {query.type === "product" && <PricesRange />}
        <Divider
          sx={(theme) => ({
            fontWeight: 600,
            fontSize: 16,
            border: `1px solid ${theme.palette.grey[200]}`,
            margin: "5px 15px",
          })}
        />
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
    </Paper>
  );
};

export const BenefitsFilters = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "13px 0",
        width: 250,
        backgroundColor: "#F2F2F2",
      }}
    >
      <List
        sx={{ width: "100%" }}
        subheader={
          <ListSubheader
            sx={{
              backgroundColor: "inherit",
              fontSize: 20,
              fontWeight: 700,
              textDecoration: "underline",
              color: "black",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Filtros <Icon icon="mi:filter" />
          </ListSubheader>
        }
      >
        <Divider
          sx={(theme) => ({
            border: `1px solid ${theme.palette.grey[200]}`,
            margin: "10px 15px",
          })}
        />
        <BenefitZonesFilter />
        <Divider
          sx={(theme) => ({
            fontWeight: 600,
            fontSize: 16,
            border: `1px solid ${theme.palette.grey[200]}`,
            margin: "10px 15px",
          })}
        />
      </List>
    </Paper>
  );
};

export const MarketplaceFilters = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "13px 0",
        width: 250,
        backgroundColor: "#F2F2F2",
      }}
    >
      <List
        sx={{ width: "100%" }}
        subheader={
          <ListSubheader
            sx={{
              backgroundColor: "inherit",
              fontSize: 20,
              fontWeight: 700,
              textDecoration: "underline",
              color: "black",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Filtros <Icon icon="mi:filter" />
          </ListSubheader>
        }
      >
        <Divider
          sx={(theme) => ({
            border: `1px solid ${theme.palette.grey[200]}`,
            margin: "10px 15px",
          })}
        />
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
    </Paper>
  );
};

export default Filters;
