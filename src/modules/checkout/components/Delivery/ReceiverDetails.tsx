import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ReceiverDetails = () => {
  const { deliveryInfo, setDeliveryInfo, receiver, setReceiver } =
    useCheckout();

  return (
    <Stack>
      <Typography variant="h3">Datos de Envío</Typography>
      <Divider sx={(theme) => ({ borderColor: theme.palette.grey[300] })} />
      <FormControl>
        <RadioGroup
          row
          value={receiver}
          onChange={(_, val) => setReceiver(val)}
          name="radio-buttons-group"
          sx={(theme) => ({
            justifyContent: "space-between",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          })}
        >
          <FormControlLabel
            value="current"
            control={<Radio />}
            label="Yo recogeré el producto"
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="Otra persona recogerá el pedido"
          />
        </RadioGroup>
      </FormControl>
      {receiver === "other" && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} my={1}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Nombre de la persona
              </InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={deliveryInfo.receivername}
                onChange={(event) =>
                  setDeliveryInfo((prev) => ({
                    ...prev,
                    receivername: event.target.value,
                  }))
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} my={1}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Teléfono
              </InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={deliveryInfo.receiverphone}
                onChange={(event) =>
                  setDeliveryInfo((prev) => ({
                    ...prev,
                    receiverphone: event.target.value,
                  }))
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} my={1}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Tipo Documento
              </InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={deliveryInfo.receiverdocumentkind}
                onChange={(event) =>
                  setDeliveryInfo((prev) => ({
                    ...prev,
                    receiverdocumentkind: event.target.value,
                  }))
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} my={1}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                N° Documento
              </InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={deliveryInfo.receiverdocumentnumber}
                onChange={(event) =>
                  setDeliveryInfo((prev) => ({
                    ...prev,
                    receiverdocumentnumber: event.target.value,
                  }))
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default ReceiverDetails;
