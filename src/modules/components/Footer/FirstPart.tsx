import { Stack, Typography } from "@mui/material";

const FirstPart = () => {
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
        Tienda online
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
        Términos y condiciones
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
        Políticas de privacidad y seguridad
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
        Políticas de Cookies
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
        Condiciones Promociones
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
        Cambios y devoluciones
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
        Mis pedidos
      </Typography>
    </Stack>
  );
};

export default FirstPart;
