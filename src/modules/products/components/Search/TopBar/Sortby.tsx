import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  const router = useRouter();
  const { sort } = router.query;
  const { currentRefinement, refine } = useSortBy({
    items: sortItems,
  });

  useEffect(() => {
    if (typeof sort === "string") refine(sort);
  }, [sort, refine]);

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
            const val = event.target.value;
            const newQuery = { ...router.query };
            if (val) newQuery["sort"] = val;
            router.push(
              {
                pathname: "/search",
                query: newQuery,
              },
              undefined,
              { shallow: true }
            );
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

export default CustomSortBy;
