import React from "react";
import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import { RemoveShoppingCart } from "@mui/icons-material";

const EmptyCart = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const iconSize = matches ? 100 : 200;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Stack alignItems="center" spacing={2}>
        <RemoveShoppingCart
          style={{ fontSize: iconSize, color: theme.palette.primary.main }}
        />
        <Typography variant="h5" fontWeight={500}>
          Tu carrito está vacío
        </Typography>
      </Stack>
    </Box>
  );
};

export default EmptyCart;
