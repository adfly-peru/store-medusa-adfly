import {
  Box,
  Divider,
  FormControl,
  Button,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
  AlertTitle,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useDesign } from "@context/design-context";

interface FormValues {
  docType: { label: string; value: string } | null;
  doc: string;
}

export const documentTypes = [
  { label: "DNI", value: "DNI" },
  { label: "Carné extranjería", value: "CE" },
  { label: "Pasaporte", value: "passport" },
];

const LoginModal = React.forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
    goRequest: () => void;
  }
>((props, _) => {
  const { storeDesign } = useDesign();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      docType: null,
      doc: "",
    },
  });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FormValues) => {
    setLoginError("");
    setLoading(true);
    signIn("dni", {
      redirect: false,
      callbackUrl: "/",
      ...data,
      docType: data.docType?.value,
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
          position: "relative",
          margin: "auto",
          height: "max-content",
          maxHeight: "unset",
          transform: "none",
          top: "unset",
          left: "unset",
          borderRadius: "40px",
          backgroundColor: "white",
          width: 420,
          [theme.breakpoints.down("lg")]: {
            width: 398,
          },
          [theme.breakpoints.down(1024)]: {
            width: 340,
          },
          [theme.breakpoints.down("md")]: {
            width: 295,
          },
        })}
      >
        <Stack spacing={0} alignItems="center">
          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: 44,
              marginTop: "20px",
              marginBottom: "20px",
              [theme.breakpoints.down("lg")]: {
                height: 40,
              },
              [theme.breakpoints.down(1024)]: {
                height: 36,
              },
              [theme.breakpoints.down("md")]: {
                height: 26,
              },
            })}
          >
            <img
              sizes="100vw"
              width={10}
              height={10}
              style={{
                width: "auto",
                height: "100%",
              }}
              src={storeDesign?.logourl ?? "/alicorp.png"}
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
              paddingLeft: "81px",
              paddingRight: "81px",
              width: 420,
              marginTop: "20px",
              marginBottom: "40px",
              [theme.breakpoints.down("lg")]: {
                width: 398,
                paddingLeft: "70px",
                paddingRight: "70px",
              },
              [theme.breakpoints.down(1024)]: {
                width: 340,
                marginTop: "10px",
                marginBottom: "30px",
                paddingLeft: "68px",
                paddingRight: "68px",
              },
              [theme.breakpoints.down("md")]: {
                width: 295,
                paddingLeft: "30px",
                paddingRight: "30px",
              },
            })}
            alignItems="center"
            justifyContent="space-around"
          >
            <Stack
              alignItems="center"
              sx={{
                marginLeft: "-30px",
                marginRight: "-30px",
                gap: "5px",
              }}
            >
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
                <Alert
                  severity="error"
                  sx={{
                    width: "100%",
                    paddingLeft: 0,
                    "& .MuiAlert-icon": {
                      marginRight: "10px",
                      marginLeft: "-23px",
                    },
                  }}
                >
                  <AlertTitle>Error al ingresar</AlertTitle>
                  {loginError}
                </Alert>
              )}
              <FormControl fullWidth size="small" error={!!errors.docType}>
                <InputLabel htmlFor="docType">Tipo de documento </InputLabel>
                <Controller
                  name="docType"
                  control={control}
                  defaultValue={null}
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value?.value ?? ""}
                      onChange={(event) =>
                        field.onChange(
                          documentTypes.find(
                            (d) => d.value === event.target.value
                          ) ?? null
                        )
                      }
                      size="small"
                      label="Tipo de documento"
                    >
                      {documentTypes.map((d, i) => (
                        <MenuItem key={i} value={d.value}>
                          {d.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.docType ? "Este campo es requerido" : ""}
                </FormHelperText>
              </FormControl>
              <TextField
                label="Número de documento"
                autoComplete="off"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.doc}
                helperText={errors.doc ? "Este campo es requerido" : ""}
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
              <Typography
                variant="subtitle2"
                sx={(theme) => ({
                  [theme.breakpoints.down(1024)]: {
                    fontSize: 12,
                  },
                })}
              >
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
                display: "flex",
                justifyContent: "center",
                height: 47,
                [theme.breakpoints.down(1024)]: {
                  height: 36,
                },
                [theme.breakpoints.down("md")]: {
                  height: 29,
                },
              })}
            >
              <img
                sizes="100vw"
                width={10}
                height={10}
                style={{
                  width: "auto",
                  height: "100%",
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
