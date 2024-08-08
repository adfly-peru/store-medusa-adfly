import { Box, Button, Drawer, Paper, Stack } from "@mui/material";
import CustomSortBy from "./Sortby";
import CustomPagination, { BenefitsPagination } from "./Pagination";
import AlgoliaDrawer, { BenefitsDrawer } from "../Drawer";
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
        {/* <CustomSortBy /> */}
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
        {/* <CustomSortBy /> */}
      </Stack>
    </Box>
  );
};

export default AlgoliaTopBar;
