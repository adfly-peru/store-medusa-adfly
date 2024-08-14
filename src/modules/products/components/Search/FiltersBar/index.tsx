import { FiltersProvider } from "@modules/products/context/FiltersContext";
import Departments, { BenefitCategories } from "./Departments";
import Filters, { BenefitsFilters, MarketplaceFilters } from "./Filters";
import { Button, Stack } from "@mui/material";
import QueryDetails from "./QueryDetails";
import { ArrowCircleRightOutlined } from "@mui/icons-material";

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

export const BenefitsSideBar = () => {
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
      <BenefitCategories />
      <BenefitsFilters />
    </Stack>
  );
};

export const MarketplaceSideBar = () => {
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
      <Button variant="outlined" endIcon={<ArrowCircleRightOutlined />}>
        Vender aquí
      </Button>
      <MarketplaceFilters />
    </Stack>
  );
};

export default AlgoliaSideBar;
