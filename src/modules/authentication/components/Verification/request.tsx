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
  IconButton,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { ArrowBack } from "@mui/icons-material";
import { documentTypes } from "./login";
import { requestAccessQuery } from "api/auth";
import { AxiosError } from "axios";

interface FormValues {
  name: string;
  lastname: string;
  documenttype: { label: string; value: string } | null;
  documentnumber: string;
  termsconditions: boolean;
  email: string;
}

const RequestModal = React.forwardRef<
  HTMLDivElement,
  {
    goBackLogin: () => void;
    goNext: (
      _: "login" | "request" | "success" | "access" | "pending",
      __: FormValues
    ) => void;
  }
>((props, _) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      lastname: "",
      documenttype: null,
      documentnumber: "",
      termsconditions: false,
      email: "",
    },
  });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    const { hostname } = window.location;
    const domain = hostname.split(".");
    setLoginError("");
    setLoading(true);
    try {
      await requestAccessQuery({
        name: data.name,
        lastname: data.lastname,
        documenttype: data.documenttype?.value!,
        documentnumber: data.documentnumber,
        termsconditions: data.termsconditions,
        sub_domain: domain[0],
        email: data.email,
      });
      props.goNext("success", data);
    } catch (error) {
      const message = (error as AxiosError<any>).response?.data?.error;
      if (message === "collaborator already requested")
        props.goNext("pending", data);
      else if (
        message ===
        "collaborator already exists, please login with your credentials"
      )
        props.goNext("access", data);
      else setLoginError("Hubo un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "40px",
          backgroundColor: "white",
          [theme.breakpoints.up("md")]: {
            width: 500,
          },
          [theme.breakpoints.down("md")]: {
            width: 340,
          },
          [theme.breakpoints.down("sm")]: {
            width: 295,
          },
        })}
      >
        <Stack alignItems="center">
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
              marginTop: "24px",
              [theme.breakpoints.up("md")]: {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            })}
            alignItems="flex-start"
            justifyContent="space-around"
          >
            <Box
              position="relative"
              width="100%"
              sx={(theme) => ({
                [theme.breakpoints.down("md")]: {
                  marginLeft: "23px",
                },
              })}
            >
              <IconButton
                color="primary"
                sx={{
                  position: "absolute",
                  left: -40,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={props.goBackLogin}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h2">Solicitud de acceso</Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={(theme) => ({ color: theme.palette.grey[400] })}
            >
              Por favor, completa los siguientes campos para solicitar acceso.
            </Typography>
            <Stack
              width="100%"
              alignItems="center"
              marginBottom="30px"
              spacing={2}
            >
              {loginError && (
                <Alert
                  severity="error"
                  sx={{
                    width: "100%",
                    paddingLeft: 0,
                    "& .MuiAlert-icon": {
                      marginRight: "12px",
                      marginLeft: "-24px",
                    },
                  }}
                >
                  <AlertTitle>Error al ingresar</AlertTitle>
                  {loginError}
                </Alert>
              )}
              <FormControl fullWidth size="small" required>
                <InputLabel
                  sx={{
                    color: "black",
                    fontWeight: 600,
                    top: "-20px",
                    marginLeft: "-10px",
                  }}
                >
                  Nombres
                </InputLabel>
                <TextField
                  placeholder="Nombres"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("name", { required: true })}
                  error={!!errors.name}
                  helperText={errors.name ? "Este campo es requerido" : ""}
                />
              </FormControl>
              <FormControl fullWidth size="small" required>
                <InputLabel
                  sx={{
                    color: "black",
                    fontWeight: 600,
                    top: "-20px",
                    marginLeft: "-10px",
                  }}
                >
                  Apellidos
                </InputLabel>
                <TextField
                  placeholder="Apellidos"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("lastname", {
                    required: true,
                  })}
                  error={!!errors.lastname}
                  helperText={errors.lastname ? "Este campo es requerido" : ""}
                />
              </FormControl>
              <FormControl fullWidth size="small" required>
                <InputLabel
                  sx={{
                    color: "black",
                    fontWeight: 600,
                    top: "-20px",
                    marginLeft: "-10px",
                  }}
                >
                  Correo
                </InputLabel>
                <TextField
                  placeholder="Correo electrónico"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("email", {
                    required: true,
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? "Este campo es requerido" : ""}
                />
              </FormControl>
              <FormControl fullWidth size="small" required>
                <InputLabel
                  shrink={false}
                  id="doctype-label"
                  sx={{
                    color: "black",
                    fontWeight: 600,
                    top: "-20px",
                    marginLeft: "-10px",
                  }}
                >
                  Tipo Documento
                </InputLabel>
                <Controller
                  name="documenttype"
                  control={control}
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={documentTypes}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value?.value
                      }
                      onChange={(event, value) => field.onChange(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="DNI"
                          variant="outlined"
                          size="small"
                          error={!!errors.documenttype}
                          helperText={
                            errors.documenttype ? "Este campo es requerido" : ""
                          }
                          sx={{
                            marginTop: "10px",
                          }}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
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
                  placeholder="12345678"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("documentnumber", {
                    required: true,
                  })}
                  error={!!errors.documentnumber}
                  helperText={
                    errors.documentnumber ? "Este campo es requerido" : ""
                  }
                />
              </FormControl>
              <FormControl error={!!errors.termsconditions}>
                <FormControlLabel
                  control={
                    <Controller
                      name="termsconditions"
                      control={control}
                      rules={{
                        validate: (value) =>
                          value || "Debes aceptar los Términos y Condiciones",
                      }}
                      render={({ field }) => <Checkbox {...field} />}
                    />
                  }
                  label={
                    <Typography variant="body1" fontSize={11}>
                      Acepto los <Link href="#">Términos y Condiciones</Link> de
                      ADFLY y autorizo la{" "}
                      <Link href="#">política de privacidad</Link>.
                    </Typography>
                  }
                />
                {errors.termsconditions && (
                  <FormHelperText>
                    {errors.termsconditions.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Enviar"}
              </Button>
              <Typography variant="subtitle2" textAlign="center">
                Si necesitas ayuda, escríbenos a hola@adfly.pe o llámanos al +51
                970 802 065
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
});

RequestModal.displayName = "RequestModal";

export default RequestModal;
