import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const ForgotPasswordSendedModal = React.forwardRef<
  HTMLDivElement,
  {
    onBack: () => void;
  }
>((props, _) => {
  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        margin: "auto",
        height: "max-content",
        maxHeight: "unset",
        transform: "none",
        top: "unset",
        left: "unset",
        borderRadius: "20px",
        backgroundColor: "white",
        width: 411,
        [theme.breakpoints.up(1024)]: {
          width: 390,
        },
        [theme.breakpoints.down("md")]: {
          width: 320,
        },
      })}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={(theme) => ({
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          height: 65,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
        })}
      >
        <Typography variant="h3" fontWeight={600} textAlign="center">
          ¿Has olvidado tu contraseña?
        </Typography>
      </Stack>
      <Stack
        sx={(theme) => ({
          marginTop: "15px",
          paddingLeft: "30px",
          paddingRight: "30px",
          [theme.breakpoints.down(1024)]: {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
          gap: "5px",
        })}
      >
        <Typography
          variant="caption"
          fontWeight={400}
          fontSize={12}
          mb={1}
          sx={{
            marginLeft: "-7px",
            marginRight: "-7px",
          }}
          textAlign="justify"
        >
          Hemos enviado un correo electrónico con instrucciones para restablecer
          tu contraseña. Por favor, revisa tu bandeja para continuar.
        </Typography>
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            sx={{
              marginBottom: 2,
              width: 130,
            }}
            onClick={() => props.onBack()}
          >
            Volver al inicio
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
});

ForgotPasswordSendedModal.displayName = "ForgotPasswordSendedModal";

export default ForgotPasswordSendedModal;
