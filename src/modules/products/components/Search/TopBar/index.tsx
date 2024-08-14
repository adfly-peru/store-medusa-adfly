import { Box, Button, Drawer, Paper, Stack } from "@mui/material";
import CustomSortBy, { BenefitsSortBy, MarketplaceSortBy } from "./Sortby";
import CustomPagination, {
  BenefitsPagination,
  MarketplacePagination,
} from "./Pagination";
import AlgoliaDrawer, { BenefitsDrawer, MarketplaceDrawer } from "../Drawer";
import { useState } from "react";

const AlgoliaTopBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box
      sx={{
        padding: "1px 10px",
        backgroundColor: "#F2F2F2",
      }}
    >
      <Drawer
        open={openDrawer}
        variant="persistent"
        sx={(theme) => ({
          ".MuiPaper-root": {
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          },
        })}
      >
        <AlgoliaDrawer onClose={toggleDrawer(false)} />
      </Drawer>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        })}
      >
        <CustomSortBy />
        <CustomPagination />
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        })}
      >
        <Button onClick={toggleDrawer(true)}>Filtros</Button>
        <CustomSortBy />
      </Stack>
    </Box>
  );
};

export const BenefitsTopBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box
      sx={{
        padding: "1px 10px",
        backgroundColor: "#F2F2F2",
      }}
    >
      <Drawer
        open={openDrawer}
        variant="persistent"
        sx={(theme) => ({
          ".MuiPaper-root": {
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          },
        })}
      >
        <BenefitsDrawer onClose={toggleDrawer(false)} />
      </Drawer>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        })}
      >
        <BenefitsSortBy />
        <BenefitsPagination />
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        })}
      >
        <Button onClick={toggleDrawer(true)}>Filtros</Button>
        <BenefitsSortBy />
      </Stack>
    </Box>
  );
};

export const MarketplaceTopBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box
      sx={{
        padding: "1px 10px",
        backgroundColor: "#F2F2F2",
      }}
    >
      <Drawer
        open={openDrawer}
        variant="persistent"
        sx={(theme) => ({
          ".MuiPaper-root": {
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          },
        })}
      >
        <MarketplaceDrawer onClose={toggleDrawer(false)} />
      </Drawer>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        })}
      >
        <MarketplaceSortBy />
        <MarketplacePagination />
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        })}
      >
        <Button onClick={toggleDrawer(true)}>Filtros</Button>
        <MarketplaceSortBy />
      </Stack>
    </Box>
  );
};

export default AlgoliaTopBar;
