import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import Departments, { BenefitCategoriesDrawer } from "./Departments";
import Filters from "./Filters";
import { FiltersProvider } from "@modules/products/context/FiltersContext";

const AlgoliaDrawer = ({ onClose }: { onClose: () => void }) => {
  return (
    <Box
      sx={(theme) => ({
        width: 360,
        overflow: "auto",
        [theme.breakpoints.down("sm")]: {
          width: "auto",
        },
      })}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.main,
          height: 70,
          paddingLeft: "25px",
        })}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            fontSize: "22px",
          })}
        >
          <Typography
            variant="h2"
            sx={(theme) => ({
              color: theme.palette.secondary.main,
              fontSize: "20px",
            })}
          >
            Filtros
          </Typography>
          <Icon icon="mi:filter" />
        </Stack>
        <IconButton
          onClick={onClose}
          sx={(theme) => ({
            color: theme.palette.secondary.main,
          })}
        >
          <Close />
        </IconButton>
      </Stack>
      <Stack
        spacing={3}
        sx={{
          backgroundColor: "#F2F2F2",
        }}
      >
        <Departments />
        <Divider
          sx={(theme) => ({
            fontWeight: 600,
            fontSize: 16,
            border: `1px solid ${theme.palette.grey[200]}`,
          })}
        />
        <FiltersProvider>
          <Filters />
        </FiltersProvider>
      </Stack>
    </Box>
  );
};

export const BenefitsDrawer = ({ onClose }: { onClose: () => void }) => {
  return (
    <Box
      sx={(theme) => ({
        width: 360,
        overflow: "auto",
        [theme.breakpoints.down("sm")]: {
          width: "auto",
        },
      })}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.main,
          height: 70,
          paddingLeft: "25px",
        })}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            fontSize: "22px",
          })}
        >
          <Typography
            variant="h2"
            sx={(theme) => ({
              color: theme.palette.secondary.main,
              fontSize: "20px",
            })}
          >
            Filtros
          </Typography>
          <Icon icon="mi:filter" />
        </Stack>
        <IconButton
          onClick={onClose}
          sx={(theme) => ({
            color: theme.palette.secondary.main,
          })}
        >
          <Close />
        </IconButton>
      </Stack>
      <Stack
        spacing={3}
        sx={{
          backgroundColor: "#F2F2F2",
        }}
      >
        <BenefitCategoriesDrawer />
        <Divider
          sx={(theme) => ({
            fontWeight: 600,
            fontSize: 16,
            border: `1px solid ${theme.palette.grey[200]}`,
          })}
        />
      </Stack>
    </Box>
  );
};

export default AlgoliaDrawer;
