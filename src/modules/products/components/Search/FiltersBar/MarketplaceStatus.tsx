import { useMarketplaceFilters } from "@modules/products/context/MarketplaceContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  Checkbox,
  List,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const MarketplaceStatusFilter = () => {
  const { condition, setCondition } = useMarketplaceFilters();
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
          primary="Estado del producto"
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
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
          {[
            { label: "Nuevo", value: "new" },
            { label: "Usado", value: "old" },
          ].map((item) => {
            return (
              <ListItemButton
                key={item.label}
                sx={{
                  padding: "3px 25px",
                }}
                role={undefined}
                onClick={() => setCondition(item.value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={condition === item.value}
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
};
