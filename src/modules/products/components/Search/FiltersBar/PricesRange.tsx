import { useFilters } from "@modules/products/context/FiltersContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Divider,
  InputAdornment,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useRange } from "react-instantsearch";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    paddingRight: 0,
  },
});

const PricesRange = React.forwardRef<HTMLDivElement>((_props, _) => {
  const [open, setOpen] = React.useState(true);
  const { range, refine, start } = useRange({
    attribute: "final_price",
  });
  const { pricesRange, setPricesRange } = useFilters();

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setPricesRange((prev) => ({
      min: isFinite(start[0] ?? 0)
        ? start[0] ?? 0
        : range.min ?? prev?.min ?? 0,
      max: isFinite(start[1] ?? 0)
        ? start[1] ?? 0
        : range.max ?? prev?.max ?? 0,
    }));
  }, [range.max, range.min, setPricesRange, start]);

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
              value={
                isNaN(pricesRange?.min ?? NaN) ? "" : pricesRange?.min ?? 0
              }
              onChange={(event) =>
                setPricesRange((prev) => ({
                  min: parseFloat(event.target.value) ?? prev?.min ?? 0,
                  max: prev?.max ?? 0,
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
              value={
                isNaN(pricesRange?.max ?? NaN) ? "" : pricesRange?.max ?? 0
              }
              onChange={(event) =>
                setPricesRange((prev) => ({
                  max: parseFloat(event.target.value) ?? prev?.max ?? 0,
                  min: prev?.min ?? 0,
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
            onClick={() =>
              pricesRange ? refine([pricesRange.min, pricesRange.max]) : null
            }
          >
            Aplicar
          </Button>
        </Box>
      </Collapse>
    </div>
  );
});

PricesRange.displayName = "PricesRange";

export default PricesRange;
