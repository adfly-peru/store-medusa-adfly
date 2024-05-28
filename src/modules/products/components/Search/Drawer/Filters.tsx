import CustomRefinementList from "@modules/products/components/Search/FiltersBar/RefinementList";
import { useFilters } from "@modules/products/context/FiltersContext";
import { Box, Button, Divider, List } from "@mui/material";
import React from "react";

const Filters = () => {
  const { handleApplyFilters } = useFilters();

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
      <Box
        sx={{
          margin: "18px",
        }}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleApplyFilters()}
        >
          Aplicar filtros
        </Button>
      </Box>
    </List>
  );
};

export default Filters;
