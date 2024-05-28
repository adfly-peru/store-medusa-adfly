import { useAccount } from "@context/account-context";
import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";

const StarsDetails = () => {
  const { collaborator } = useAccount();
  const { finalPrice, useStars, setUseStars } = useCheckout();

  const handleUseStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseStars(event.target.checked);
  };

  return (
    <Stack>
      <Typography variant="h3">Usar Estrellas</Typography>
      <Divider
        sx={(theme) => ({
          borderColor: theme.palette.grey[300],
          marginBottom: 1,
        })}
      />
      <Typography
        variant="body2"
        sx={{
          marginLeft: 1,
        }}
      >
        Valor del pedido: {finalPrice * 100} estrellas
      </Typography>
      <Typography
        variant="body2"
        sx={{
          marginLeft: 1,
        }}
      >
        Cuentas con: {collaborator?.stars ?? 0} estrellas
      </Typography>
      <FormControlLabel
        control={
          <Checkbox checked={useStars} onChange={handleUseStarsChange} />
        }
        disabled={!collaborator?.stars}
        label={`Deseo usar ${Math.min(
          collaborator?.stars ?? 0,
          finalPrice * 100
        )} estrellas para pagar este pedido.`}
        sx={{
          marginTop: "2px",
          marginLeft: "5px",
        }}
      />
    </Stack>
  );
};

export default StarsDetails;
