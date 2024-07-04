import { Box, Button, Drawer, Paper, Stack } from "@mui/material";
import CustomSortBy from "./Sortby";
import CustomPagination from "./Pagination";
import AlgoliaDrawer from "../Drawer";
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
      <Drawer open={openDrawer} variant="persistent">
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

export default AlgoliaTopBar;
