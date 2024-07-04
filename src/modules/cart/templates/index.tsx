import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useCart } from "@context/cart-context";
import { useMemo, useState } from "react";
import Resume from "../components/Resume";
import EmptyCart from "@modules/checkout/components/EmptyCart";
import ItemResume from "../components/ItemResume";

const CartView = () => {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
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
      <Stack
        direction="row"
        sx={(theme) => ({
          marginTop: "20px",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            gap: "20px",
          },
        })}
        spacing={{
          xs: 0,
          md: 2,
        }}
      >
        {!!items.length ? (
          <Box position="relative" sx={{ width: "100%" }}>
            <Backdrop
              sx={(theme) => ({
                color: theme.palette.primary.main,
                zIndex: (theme) => theme.zIndex.drawer + 1,
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(1px)",
                borderRadius: 1,
              })}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Card
              sx={{
                width: "100%",
              }}
            >
              <CardContent>
                <Stack>
                  {items.map((item) => (
                    <ItemResume
                      key={item.uuidcartitem}
                      item={item}
                      setLoading={setLoading}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
            }}
          >
            <EmptyCart />
          </Box>
        )}
        <Resume total={cart?.total ?? 0} saving={saving} />
      </Stack>
    </Box>
  );
};

export default CartView;
