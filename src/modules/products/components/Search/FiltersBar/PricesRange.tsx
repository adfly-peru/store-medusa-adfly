import { useFilters } from "@modules/products/context/FiltersContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
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
  const { range } = useRange({
    attribute: "final_price",
  });
  const { pricesRange, setPricesRange } = useFilters();

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setPricesRange((prev) => ({
      min: range.min ?? prev?.min ?? 0,
      max: range.max ?? prev?.max ?? 0,
    }));
  }, [range]);

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
              value={pricesRange?.min ?? 0}
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
              value={pricesRange?.max ?? 0}
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
      </Collapse>
    </div>
  );
});

PricesRange.displayName = "PricesRange";

export default PricesRange;
