import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { recoverPasswordQuery } from "api/auth";

interface FormValues {
  credential: string;
}

const ForgotPasswordModal = React.forwardRef<
  HTMLDivElement,
  {
    nextStep: () => void;
    onBack: () => void;
  }
>((props, _) => {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      credential: session?.user?.dni ?? "",
    },
  });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FormValues) => {
    setLoginError("");
    setLoading(true);
    const { hostname } = window.location;
    const partes = hostname.split(".");
    recoverPasswordQuery(session?.user?.dni ?? "", partes[0])
      .then((result) => {
        if (result) setLoginError(result);
        else props.nextStep();
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
          Te enviaremos los detalles para poder restablecer la contraseña de tu
          cuenta. Por favor, revisa el correo electrónico con el que te has
          registrado.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{
              gap: "15px",
            }}
          >
            <Typography variant="body2">Correo electrónico</Typography>
            <TextField
              value={session?.user?.email ?? "example@gmail.com"}
              autoComplete="off"
              disabled
              variant="outlined"
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                marginTop: "-10px",
              }}
            />
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              sx={{
                marginTop: 2,
                width: 130,
              }}
              onClick={() => props.onBack()}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                marginTop: 2,
                width: 130,
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Enviar"}
            </Button>
          </Stack>
        </form>
        <Typography
          textAlign="center"
          fontSize={10}
          fontWeight="lighter"
          sx={{
            marginLeft: "-15px",
            marginRight: "-15px",
            marginTop: "10px",
            marginBottom: "15px",
          }}
        >
          Si necesitas ayuda, escríbenos a hola@adfly.pe o llámanos al +51 970
          802 065
        </Typography>
      </Stack>
    </Box>
  );
});

ForgotPasswordModal.displayName = "ForgotPasswordModal";

export default ForgotPasswordModal;
