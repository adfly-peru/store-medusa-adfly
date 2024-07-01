import CustomRefinementList from "@modules/products/components/Search/FiltersBar/RefinementList";
import { Divider, List } from "@mui/material";
import React from "react";

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

export default Filters;
