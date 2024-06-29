import { useFilters } from "@modules/products/context/FiltersContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  List,
  ListItemIcon,
  Checkbox,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useRefinementList } from "react-instantsearch";

const CustomRefinementList = React.forwardRef<
  HTMLDivElement,
  {
    label: string;
    attribute: string;
  }
>((props, _) => {
  const [open, setOpen] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const { filters, setFilters } = useFilters();
  const { items, refine } = useRefinementList({
    attribute: props.attribute,
  });

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCheckboxClick = (itemLabel: string) => {
    refine(itemLabel);
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const currentItems = newFilters[props.attribute] || [];
      const index = currentItems.indexOf(itemLabel);
      if (index === -1) {
        newFilters[props.attribute] = [...currentItems, itemLabel];
      } else {
        newFilters[props.attribute] = currentItems.filter(
          (label) => label !== itemLabel
        );
      }
      return newFilters;
    });
  };

  return (
    <div>
      <ListItemButton
        onClick={handleClick}
        sx={(theme) => ({
          color: theme.palette.grey[500],
        })}
      >
        <ListItemText primary={props.label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {items.length > 6 && (
          <TextField
            sx={{
              padding: "0 15px",
            }}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        )}
        <List
          sx={{
            overflow: "auto",
            marginTop: "5px",
            marginRight: "15px",
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.4)",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(0,0,0,0.6)",
            },
            maxHeight: 200,
          }}
        >
          {filteredItems?.map((item) => {
            return (
              <ListItemButton
                key={item.label}
                sx={{
                  padding: "3px 25px",
                }}
                role={undefined}
                onClick={() => handleCheckboxClick(item.label)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={filters[props.attribute]?.includes(item.label)}
                    tabIndex={-1}
                    disableRipple
                    sx={(theme) => ({
                      color: theme.palette.grey[500],
                      "&.Mui-checked": {
                        color: theme.palette.grey[500],
                      },
                    })}
                  />
                </ListItemIcon>
                <Typography variant="caption">{item.label}</Typography>
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
});

CustomRefinementList.displayName = "CustomRefinementList";

export default CustomRefinementList;
