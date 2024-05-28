import { useCart } from "@context/cart-context";
import { Stack, Typography } from "@mui/material";
import OrderView from "./OrdersView";

const Orders = () => {
  const { cart } = useCart();
  if (!cart) return <div></div>;
  return (
    <Stack spacing={1}>
      <Typography variant="h3">Pedidos</Typography>
      <Stack
        sx={{
          overflow: "auto",
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
          maxHeight: 500,
        }}
      >
        {cart.suborders.map((suborder, index) => (
          <OrderView
            order={suborder}
            index={index + 1}
            key={index}
            total={cart.suborders.length}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Orders;
