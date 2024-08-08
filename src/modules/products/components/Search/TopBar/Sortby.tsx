import {
  benefitSortItems,
  useBenefitFilters,
} from "@modules/products/context/BenefitContext";
import { Box, MenuItem, Select, Typography } from "@mui/material";
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
  const { currentRefinement, refine } = useSortBy({
    items: sortItems,
  });

  return (
    <>
      <Box
        sx={(theme) => ({
          display: "flex",
          direction: "row",
          alignItems: "center",
          gap: "20px",
          [theme.breakpoints.down("xs")]: {
            display: "none",
          },
        })}
      >
        <Typography variant="body1">Ordenar por</Typography>
        <Select
          variant="standard"
          label=""
          defaultValue={currentRefinement}
          autoFocus={false}
          onChange={(event) => {
            refine(event.target.value);
          }}
        >
          {sortItems.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
};

export const BenefitsSortBy = () => {
  const { sort, setSort } = useBenefitFilters();
  return (
    <>
      <Box
        sx={(theme) => ({
          display: "flex",
          direction: "row",
          alignItems: "center",
          gap: "20px",
          [theme.breakpoints.down("xs")]: {
            display: "none",
          },
        })}
      >
        <Typography variant="body1">Ordenar por</Typography>
        <Select
          variant="standard"
          label=""
          value={sort}
          autoFocus={false}
          onChange={(event) => {
            setSort(event.target.value);
          }}
        >
          {benefitSortItems.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
};

export default CustomSortBy;
