import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

interface FormValues {
  docType: string;
  doc: string;
}

const LoginModal = React.forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
    goRequest: () => void;
  }
>((props, _) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      docType: "",
      doc: "",
    },
  });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FormValues) => {
    setLoginError("");
    setLoading(true);
    // Test
    // signIn("credentials", {
    //   redirect: false,
    //   callbackUrl: "/",
    //   credential: "74608726",
    //   password: "Oldfriends4056?",
    // })
    signIn("dni", {
      redirect: false,
      callbackUrl: "/",
      ...data,
    })
      .then((result) => {
        if (!result?.ok)
          setLoginError(
            "Lo sentimos, el número de documento ingresado no es válido, verifica que los datos sean correctos o solicita acceso para continuar."
          );
        else props.closeModal();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={(theme) => ({
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "40px",
          backgroundColor: "white",
          [theme.breakpoints.up("md")]: {
            width: 482,
            // height: 515,
          },
          [theme.breakpoints.down("md")]: {
            width: 340,
            // height: 391,
          },
          [theme.breakpoints.down("sm")]: {
            width: 295,
            // height: 370,
          },
        })}
      >
        <Stack spacing={0} alignItems="center">
          <Box
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                width: 154,
                height: 44,
                marginTop: "22px",
                marginBottom: "22px",
              },
              [theme.breakpoints.down("md")]: {
                width: 127,
                height: 36,
                marginTop: "22px",
                marginBottom: "22px",
              },
              [theme.breakpoints.down("sm")]: {
                width: 80,
                height: 22,
                marginTop: "20px",
                marginBottom: "20px",
              },
            })}
          >
            <Image
              sizes="100vw"
              width={10}
              height={10}
              style={{
                width: "100%",
                height: "auto",
              }}
              src={"/alicorp.png"}
              alt={"alicorp"}
            />
          </Box>
          <Divider
            style={{
              width: "100%",
            }}
          />
          <Stack
            sx={(theme) => ({
              gap: "15px",
              paddingLeft: "30px",
              paddingRight: "30px",
              width: "100%",
              marginBottom: "20px",
              [theme.breakpoints.up("md")]: {
                marginTop: "34px",
                marginBottom: "32px",
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            })}
            alignItems="center"
            justifyContent="space-around"
          >
            <Stack alignItems="center">
              <Typography variant="h3">¡Bienvenido!</Typography>
              <Typography variant="subtitle2">
                Ingresa y descubre lo que tenemos para ti.
              </Typography>
            </Stack>
            <Stack
              width="100%"
              alignItems="center"
              marginBottom="30px"
              spacing={{
                md: 2,
                xs: 1,
              }}
            >
              {loginError && (
                <Alert severity="error">
                  <AlertTitle>Error al ingresar</AlertTitle>
                  {loginError}
                </Alert>
              )}
              <FormControl fullWidth size="small">
                <InputLabel id="doctype-label">Tipo de documento</InputLabel>
                <Select
                  labelId="doctype-label"
                  label="Tipo de documento"
                  defaultValue=""
                  {...register("docType", { required: true })}
                >
                  <MenuItem value="DNI">DNI</MenuItem>
                  <MenuItem value="CE">Carné extranjería</MenuItem>
                  <MenuItem value="passport">Pasaporte</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Número de documento"
                autoComplete="off"
                variant="outlined"
                fullWidth
                size="small"
                {...register("doc", { required: true })}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Ingresar"}
              </Button>
              <Typography variant="subtitle2">
                ¿No tienes acceso?{" "}
                <Link
                  display="inline"
                  component="button"
                  fontWeight={600}
                  onClick={props.goRequest}
                >
                  Solicítalo aquí
                </Link>
              </Typography>
            </Stack>
            <Box
              sx={(theme) => ({
                [theme.breakpoints.up("md")]: {
                  width: 154,
                  height: 44,
                },
                [theme.breakpoints.down("md")]: {
                  width: 127,
                  height: 36,
                },
                [theme.breakpoints.down("sm")]: {
                  width: 80,
                  height: 22,
                },
              })}
            >
              <Image
                sizes="100vw"
                width={10}
                height={10}
                style={{
                  width: "100%",
                  height: "auto",
                }}
                src={"/Logo Adfly.svg"}
                alt={"adfly"}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
});

LoginModal.displayName = "LoginModal";

export default LoginModal;