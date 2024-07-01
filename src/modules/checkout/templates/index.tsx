import { useCart } from "@context/cart-context";
import EmptyCart from "../components/EmptyCart";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Resume from "../components/Resume";
import { CheckoutProvider } from "../context/CheckoutContext";
import { CheckoutStepper, StepperSection } from "../components/Stepper";

const CheckoutTemplate = () => {
  const { cart } = useCart();

  if (!cart) {
    return <EmptyCart />;
  }

  if (cart.suborders.length == 0) {
    return <EmptyCart />;
  }
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
      <Typography variant="h2">Checkout</Typography>
      <CheckoutProvider>
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
          <Card
            sx={{
              width: "100%",
              height: "fit-content",
            }}
          >
            <CardContent>
              <CheckoutStepper />
              <StepperSection />
            </CardContent>
          </Card>
          <Resume />
        </Stack>
      </CheckoutProvider>
    </Box>
  );
};

export default CheckoutTemplate;
