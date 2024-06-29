import { Icon } from "@iconify/react";
import CustomRefinementList from "@modules/products/components/Search/FiltersBar/RefinementList";
import { useFilters } from "@modules/products/context/FiltersContext";
import {
  Box,
  Button,
  Divider,
  List,
  ListSubheader,
  Paper,
} from "@mui/material";
import React from "react";
import PricesRange from "./PricesRange";
import { useRouter } from "next/router";

const Filters = () => {
  const { query } = useRouter();
  const { handleApplyFilters } = useFilters();

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

export default Filters;
