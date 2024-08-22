import { useMarketplaceFilters } from "@modules/products/context/MarketplaceContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Stack,
  Box,
  Button,
  Divider,
  InputAdornment,
  styled,
  TextField,
} from "@mui/material";
import { useState } from "react";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    paddingRight: 0,
  },
});

export const MarketplacePricesFilter = () => {
  const { setRangePrices: setFilter } = useMarketplaceFilters();
  const [rangePrices, setRangePrices] = useState({
    from: 0,
    to: 999999,
  });
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItemButton
        onClick={handleClick}
        sx={(theme) => ({
          color: theme.palette.grey[500],
        })}
      >
        <ListItemText primary="Precio" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack
          direction="row"
          sx={{
            padding: "0 15px",
          }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography variant="caption" fontSize={14}>
              Mínimo
            </Typography>
            <CustomTextField
              sx={{
                width: "75px",
              }}
              variant="outlined"
              size="small"
              type="number"
              value={rangePrices.from}
              onChange={(event) =>
                setRangePrices((prev) => ({
                  from: parseFloat(event.target.value) ?? prev?.from ?? 0,
                  to: prev?.to ?? 0,
                }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      marginRight: "3px",
                    }}
                  >
                    S/.
                  </InputAdornment>
                ),
                style: {
                  padding: "0 8px",
                },
              }}
            />
          </Stack>
          <Divider
            orientation="horizontal"
            sx={(theme) => ({
              marginTop: "20px",
              borderColor: `${theme.palette.grey[200]}`,
              width: "60px",
            })}
          />
          <Stack>
            <Typography variant="caption" fontSize={14}>
              Máximo
            </Typography>
            <CustomTextField
              sx={{
                width: "85px",
              }}
              variant="outlined"
              size="small"
              type="number"
              value={rangePrices.to}
              onChange={(event) =>
                setRangePrices((prev) => ({
                  to: parseFloat(event.target.value) ?? prev?.to ?? 0,
                  from: prev?.from ?? 0,
                }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      marginRight: "3px",
                    }}
                  >
                    S/.
                  </InputAdornment>
                ),
                style: {
                  padding: "0 8px",
                },
              }}
            />
          </Stack>
        </Stack>
        <Box
          sx={{
            margin: "18px",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={() => setFilter(rangePrices)}
            size="small"
          >
            Aplicar
          </Button>
        </Box>
      </Collapse>
    </div>
  );
};
