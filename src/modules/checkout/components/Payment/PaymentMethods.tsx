import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import {
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";

const PaymentMethods = () => {
  const { terms, setTerms, onlinePay, setOnlinePay } = useCheckout();

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerms(event.target.checked);
  };

  return (
    <Stack>
      <Typography variant="h3">Métodos de Pago</Typography>
      <Divider
        sx={(theme) => ({
          borderColor: theme.palette.grey[300],
          marginBottom: 1,
        })}
      />
      <Card>
        <CardActionArea onClick={() => setOnlinePay((prev) => !prev)}>
          <CardContent>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack>
                <Typography variant="h5">Pago en Línea</Typography>
                <Typography variant="body1">
                  Garantizamos un pago 100% seguro y exitoso con Niubiz
                </Typography>
              </Stack>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={onlinePay}
              />
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
      <FormControlLabel
        control={<Checkbox checked={terms} onChange={handleTermsChange} />}
        label="He leído y acepto los Términos y Condiciones de este sitio"
        sx={{
          marginTop: "10px",
          marginLeft: "3px",
        }}
      />
    </Stack>
  );
};

export default PaymentMethods;
