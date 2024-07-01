import { Stack, Typography } from "@mui/material";

const SecondPart = () => {
  return (
    <Stack spacing={1}>
      <Typography
        variant="h5"
        fontSize={20}
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            fontSize: 24,
          },
        })}
      >
        Preguntas frecuentes
      </Typography>
      <div></div>
      <Typography
        variant="body2"
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            fontSize: 16,
          },
          [theme.breakpoints.down("md")]: {
            fontSize: 11,
          },
        })}
      >
        ¿Cómo comprar?
      </Typography>
      <Typography
        variant="body2"
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            fontSize: 16,
          },
          [theme.breakpoints.down("md")]: {
            fontSize: 11,
          },
        })}
      >
        Boletas y factura
      </Typography>
      <Typography
        variant="body2"
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            fontSize: 16,
          },
          [theme.breakpoints.down("md")]: {
            fontSize: 11,
          },
        })}
      >
        Tipos de entrega
      </Typography>
      <Typography
        variant="body2"
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            fontSize: 16,
          },
          [theme.breakpoints.down("md")]: {
            fontSize: 11,
          },
        })}
      >
        Medios de pago
      </Typography>
    </Stack>
  );
};

export default SecondPart;
