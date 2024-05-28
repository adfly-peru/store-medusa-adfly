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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ArrowBack } from "@mui/icons-material";

interface FormValues {
  name: string;
  lastname: string;
  documenttype: string;
  documentnumber: string;
  termsconditions: boolean;
  email: string;
}

const RequestModal = React.forwardRef<
  HTMLDivElement,
  {
    goBackLogin: () => void;
  }
>((props, _) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      lastname: "",
      documenttype: "",
      documentnumber: "",
      termsconditions: false,
      email: "",
    },
  });
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data: FormValues) => {
    setLoginError("");
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
            <Typography variant="subtitle1">
              Por favor, completa los siguientes campos para solicitar acceso.
            </Typography>
            <Stack
              width="100%"
              alignItems="center"
              marginBottom="30px"
              spacing={2}
            >
              {loginError && (
                <Alert severity="error">
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
                  placeholder="Alonso"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...(register("name"),
                  {
                    required: true,
                  })}
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
                  placeholder="Ferreyros Belmont"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...(register("lastname"),
                  {
                    required: true,
                  })}
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
                  {...(register("email"),
                  {
                    required: true,
                  })}
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
                <Select
                  labelId="doctype-label"
                  placeholder="DNI"
                  variant="outlined"
                  size="small"
                  defaultValue=""
                  sx={{
                    marginTop: "10px",
                  }}
                  {...register("documenttype", {
                    required: true,
                  })}
                >
                  <MenuItem value="DNI">DNI</MenuItem>
                  <MenuItem value="CE">Carné extranjería</MenuItem>
                  <MenuItem value="passport">Pasaporte</MenuItem>
                </Select>
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
                  {...(register("documentnumber"),
                  {
                    required: true,
                  })}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography variant="body1" fontSize={11}>
                    Acepto los <Link>Términos y Condiciones</Link> de ADFLY y
                    autorizo la <Link>política de privacidad</Link>.
                  </Typography>
                }
                {...register("termsconditions", {
                  validate: (value) =>
                    value || "Debes aceptar los Términos y Condiciones",
                })}
              />
              <Button fullWidth variant="contained" type="submit">
                Enviar
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
