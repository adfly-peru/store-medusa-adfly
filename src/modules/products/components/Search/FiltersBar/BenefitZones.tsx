import { useBenefitFilters } from "@modules/products/context/BenefitContext";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  TextField,
  List,
  ListItemIcon,
  Checkbox,
  Typography,
  Autocomplete,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { useState } from "react";
import ubigeoPeru from "ubigeo-peru";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export const BenefitZonesFilter = () => {
  const { selectedDepartments, setSelectedDepartments } = useBenefitFilters();
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
        <ListItemText
          sx={{
            " .MuiListItemText-primary": {
              fontSize: 16,
            },
          }}
          primary="Cobertura del producto"
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          sx={{
            mt: 1,
            padding: "0 15px",
          }}
        >
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={ubigeoPeru.reniec.filter(
              (v) => v.distrito === "00" && v.provincia === "00"
            )}
            disableCloseOnSelect
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.nombre || ""
            }
            isOptionEqualToValue={(option, value) =>
              option.departamento === value.departamento
            }
            value={selectedDepartments}
            onChange={(_, v) => setSelectedDepartments(v)}
            renderOption={(props, option, { selected }) => {
              const { ...optionProps } = props;
              return (
                <li {...optionProps} key={option.departamento}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.nombre}
                </li>
              );
            }}
            renderTags={() => null}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Departamentos"
                placeholder="Departamentos"
                sx={{ mb: 1 }}
              />
            )}
          />
          {selectedDepartments.map((dep) => (
            <Chip
              sx={{ margin: "3px" }}
              key={dep.departamento}
              label={dep.nombre}
              variant="outlined"
              onDelete={() =>
                setSelectedDepartments((prev) =>
                  prev.filter((p) => p.departamento !== dep.departamento)
                )
              }
            />
          ))}
        </Box>
      </Collapse>
    </div>
  );
};
