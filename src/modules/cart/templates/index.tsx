import { Box, Stack, Typography } from "@mui/material";
import ProductCartTable from "../components/ProductCartTable";
import { useCart } from "@context/cart-context";
import { useMemo } from "react";
import Resume from "../components/Resume";
import EmptyCart from "@modules/checkout/components/EmptyCart";

const CartView = () => {
  const { cart } = useCart();
  const items = useMemo(
    () => cart?.suborders?.flatMap((suborder) => suborder?.items) ?? [],
    [cart]
  );
  const saving = useMemo(() => {
    if (!cart) return 0;
    const totalRef = cart.suborders.reduce((suborderTotal, suborder) => {
      return (
        suborderTotal +
        suborder.items.reduce((itemTotal, item) => {
          return itemTotal + item.quantity * item.variant.refPrice;
        }, 0)
      );
    }, 0);
    return totalRef - cart.total;
  }, [cart]);

  return (
    <Box
      sx={(theme) => ({
        marginTop: "30px",
        paddingLeft: "20px",
        paddingRight: "20px",
        [theme.breakpoints.up("md")]: {
          paddingLeft: "27px",
          paddingRight: "27px",
        },
        [theme.breakpoints.up("lg")]: {
          paddingLeft: "117px",
          paddingRight: "117px",
        },
      })}
    >
      <Typography variant="h2">{`Mi Carrito (${items.length} Productos)`}</Typography>
      <ProductCartTable
        items={items}
        total={cart?.total ?? 0}
        saving={saving}
      />
    </Box>
  );
};

export default CartView;
