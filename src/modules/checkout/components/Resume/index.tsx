import { useAccount } from "@context/account-context";
import { useCart } from "@context/cart-context";
import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import { Star } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import PaymentButton from "../Payment/PaymentButton";

const Resume = () => {
  const { collaborator } = useAccount();
  const { cart } = useCart();
  const {
    step,
    setStep,
    promotions,
    partnersPromotionsDiscount,
    totalDelivery,
    finalPrice,
    useStars,
    terms,
    onlinePay,
  } = useCheckout();

  const starsValue = useMemo(
    () => Math.min((collaborator?.stars ?? 0) / 100, finalPrice),
    [collaborator?.stars, finalPrice]
  );

  return (
    <Stack spacing={2}>
      <Card
        sx={{
          minWidth: "280px",
        }}
      >
        <CardContent>
          <Typography variant="h3">Resumen</Typography>
          <Stack
            sx={{
              marginTop: "10px",
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">Subtotal:</Typography>
              <Typography variant="body2">
                {`S/.  `}
                {cart?.total.toFixed(2) ?? 0}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">Envío:</Typography>
              <Typography variant="body2">
                {`S/.  `}
                {totalDelivery.toFixed(2)}
              </Typography>
            </Stack>
            {promotions.CartPromotion && (
              <Stack direction="row" justifyContent="space-between" color="red">
                <Typography variant="body2">Dscnt. Carrito:</Typography>
                <Typography variant="body2">
                  {`- S/.  `}
                  {promotions.CartPromotion.Discount?.toFixed(2)}
                </Typography>
              </Stack>
            )}
            {!!partnersPromotionsDiscount && (
              <Stack direction="row" justifyContent="space-between" color="red">
                <Typography variant="body2">Dscnt. Partners:</Typography>
                <Typography variant="body2">
                  {`- S/.  `}
                  {partnersPromotionsDiscount.toFixed(2)}
                </Typography>
              </Stack>
            )}
            {useStars && (
              <Stack direction="row" justifyContent="space-between" color="red">
                <Typography variant="body2">Dscnt. Estrellas:</Typography>
                <Typography variant="body2">
                  {`- S/.  `}
                  {starsValue.toFixed(2)}
                </Typography>
              </Stack>
            )}
            <Divider
              sx={{
                borderColor: "black",
              }}
            />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">Total:</Typography>
              <Typography variant="body2">{`S/.  ${(
                finalPrice - (useStars ? starsValue : 0)
              ).toFixed(2)}`}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card
        sx={{
          minWidth: "280px",
        }}
      >
        <CardContent>
          <Typography variant="h3">Resumen en estrellas</Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              color: "#fab005",
              marginTop: "10px",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight={700}>
                Estrellas
              </Typography>
              <Star />
            </Stack>
            <Typography variant="body2" fontWeight={700}>{`${(
              finalPrice * 100
            ).toFixed(0)}`}</Typography>
          </Stack>
        </CardContent>
      </Card>
      {step === 3 && (
        <Stack>
          <PaymentButton />
          <Button
            fullWidth
            sx={{
              fontSize: 16,
            }}
            onClick={() => setStep(2)}
          >
            Regresar datos de envío
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Resume;
