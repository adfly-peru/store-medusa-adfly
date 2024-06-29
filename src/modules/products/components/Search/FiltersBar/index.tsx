import { FiltersProvider } from "@modules/products/context/FiltersContext";
import Departments from "./Departments";
import Filters from "./Filters";
import { Stack } from "@mui/material";
import QueryDetails from "./QueryDetails";

const AlgoliaSideBar = () => {
  return (
    <Stack
      spacing={3}
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
        width: 250,
      })}
    >
      <QueryDetails />
      <Departments />
      <FiltersProvider>
        <Filters />
      </FiltersProvider>
    </Stack>
  );
};

export default AlgoliaSideBar;
