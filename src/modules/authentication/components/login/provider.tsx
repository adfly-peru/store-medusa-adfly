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

interface FormValues {
  credential: string;
  password: string;
}

const ProviderModal = React.forwardRef<
  HTMLDivElement,
  {
    onClose: () => void;
    forgot: () => void;
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
      password: "",
    },
  });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setLoginError("");
      setLoading(true);
      signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        credential: session?.user?.dni ?? "",
        mode: "google",
        token: tokenResponse.access_token,
      })
        .then((result) => {
          if (!result?.ok)
            setLoginError(
              "Contraseña incorrecta, por favor verifique que sea correcto"
            );
          else props.onClose();
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const onSubmit = (data: FormValues) => {
    setLoginError("");
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      ...data,
      mode: "password",
    })
      .then((result) => {
        if (!result?.ok)
          setLoginError(
            "Contraseña incorrecta, por favor verifique que sea correcto"
          );
        else props.onClose();
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
        [theme.breakpoints.up("md")]: {
          width: 360,
        },
        [theme.breakpoints.down("md")]: {
          width: 340,
        },
        [theme.breakpoints.down("sm")]: {
          width: 320,
        },
      })}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={(theme) => ({
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          [theme.breakpoints.up("md")]: {
            paddingLeft: "40px",
            paddingRight: "40px",
          },
          [theme.breakpoints.down("md")]: {
            paddingLeft: "30px",
            paddingRight: "30px",
          },
          [theme.breakpoints.down("sm")]: {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
          height: 80,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
        })}
      >
        <Typography variant="h3" fontWeight={600}>
          Inicia Sesión
        </Typography>
        <IconButton
          sx={(theme) => ({
            color: theme.palette.secondary.main,
          })}
          onClick={props.onClose}
        >
          <Close />
        </IconButton>
      </Stack>
      <Stack
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            paddingLeft: "40px",
            paddingRight: "40px",
          },
          [theme.breakpoints.down("md")]: {
            paddingLeft: "30px",
            paddingRight: "30px",
          },
          [theme.breakpoints.down("sm")]: {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
          paddingTop: "20px",
          paddingBottom: "20px",
          gap: "20px",
        })}
      >
        <div>
          <Typography fontWeight={600} fontSize={15} mb={1}>
            {`Hola ${session?.user?.name ?? ""},`}
          </Typography>
          <Typography variant="subtitle2" fontSize={13}>
            Inicia sesión para disfrutar de todos los beneficios que tenemos
            para ti.
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{
              gap: "15px",
            }}
          >
            <Typography variant="body2">Email</Typography>
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
            {loginError && <Alert severity="error">{loginError}</Alert>}
            <Typography variant="body2">Contraseña</Typography>
            <TextField
              placeholder="Ingresar contraseña"
              autoComplete="off"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <IconButton size="small" onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                  </IconButton>
                ),
              }}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                marginTop: "-10px",
              }}
              {...register("password", { required: true })}
            />
            <Link
              sx={{
                alignSelf: "flex-end",
              }}
              component="button"
              onClick={props.forgot}
            >
              ¿Has olvidado la contraseña?
            </Link>
          </Stack>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              marginTop: 2,
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Ingresar"}
          </Button>
        </form>
        <Divider
          sx={{
            fontWeight: 600,
            fontSize: 16,
            color: "gray",
            marginTop: "-10px",
            marginBottom: "-10px",
          }}
        >
          o
        </Divider>
        <Button
          sx={(_) => ({
            color: "gray",
            borderColor: "gray",
            textTransform: "unset",
            fontWeight: 400,
            fontSize: 12,
            justifyContent: "flex-start",
            gap: "10px",
          })}
          variant="outlined"
          startIcon={<Icon icon="devicon:google" />}
          onClick={() => googleLogin()}
        >
          Continua con G-mail
        </Button>
        {/* <Button
          sx={(_) => ({
            color: "gray",
            borderColor: "gray",
            textTransform: "unset",
            fontWeight: 400,
            fontSize: 12,
            justifyContent: "flex-start",
            gap: "10px",
          })}
          variant="outlined"
          startIcon={<Icon icon="logos:microsoft-icon" />}
          onClick={() => googleLogin()}
        >
          Continua con Microsoft
        </Button> */}
        <Typography textAlign="center" fontSize={10} fontWeight="lighter">
          Si necesitas ayuda, escríbenos a hola@adfly.pe o llámanos al +51 970
          802 065
        </Typography>
      </Stack>
    </Box>
  );
});

ProviderModal.displayName = "ProviderModal";

export default ProviderModal;
