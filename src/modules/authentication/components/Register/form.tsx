import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSession } from "next-auth/react";
import BaseModal from "@modules/components/BaseModal";
import { useRegister } from "./Context";
import { VisibilityOff, Visibility, Check } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import CustomPhoneInput from "@modules/components/PhoneInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js/min";
import { requirements } from "../login/RecoveryPassword";
import * as amplitude from "@amplitude/analytics-browser";
import { AxiosError } from "axios";

interface AdflyResponse {
  message: string;
}

interface FormValues {
  email: string;
  password: string;
  newsletters: boolean;
  terms: boolean;
  phone: {
    number: string;
    code: CountryCode;
  };
}

const FormModal = React.forwardRef<HTMLDivElement>(() => {
  const theme = useTheme();
  const { onClose, registerForm, handleRegister } = useRegister();
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      email: registerForm.email,
      password: "",
      newsletters: false,
      terms: false,
      phone: {
        number: "",
        code: "PE",
      },
    },
  });

  const verifyPassword = watch("password");

  const onSubmit = async (data: FormValues) => {
    setLoginError("");
    setLoading(true);
    try {
      await handleRegister({
        ...registerForm,
        email: data.email,
        new_password: data.password,
        newsletters: data.newsletters,
        terms: data.terms,
        phone: !!data.phone.number
          ? parsePhoneNumberFromString(data.phone.number, data.phone.code)
              ?.number ?? ""
          : "",
      });
      amplitude.track("Register form sended with data", {
        ...registerForm,
        email: data.email,
        new_password: data.password,
        newsletters: data.newsletters,
        terms: data.terms,
        phone: !!data.phone.number
          ? parsePhoneNumberFromString(data.phone.number, data.phone.code)
              ?.number ?? ""
          : "",
      });
    } catch (error) {
      let errorMessage = (error as AxiosError<AdflyResponse>).message;
      amplitude.track("Error on register form", {
        error: errorMessage ?? error,
      });
      if (errorMessage === "email already exists")
        errorMessage = "Ya existe una cuenta con este correo";
      setLoginError(errorMessage ?? "Hubo un error desconocido en el servicio");
    }
    setLoading(false);
  };

  return (
    <BaseModal title={"Termina de registrarte"} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ gap: "20px" }}>
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
              <AlertTitle>Error al registrarse</AlertTitle>
              {loginError}
            </Alert>
          )}
          <Typography variant="subtitle2" fontSize={13}>
            Completa los datos pendientes para completar tu registro.
          </Typography>
          <Typography>Nombre</Typography>
          <TextField
            disabled
            autoComplete="off"
            variant="outlined"
            fullWidth
            size="small"
            value={session?.user?.name}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              marginTop: "-10px",
            }}
          />
          <Typography>Apellidos</Typography>
          <TextField
            disabled
            autoComplete="off"
            variant="outlined"
            fullWidth
            size="small"
            value={session?.user?.lastname}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              marginTop: "-10px",
            }}
          />
          <Typography>Correo electrónico</Typography>
          <TextField
            disabled={registerForm.mode !== "password"}
            autoComplete="off"
            variant="outlined"
            fullWidth
            size="small"
            inputProps={{
              style: {
                textTransform: "lowercase",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              marginTop: "-10px",
            }}
            error={!!errors.email}
            helperText={errors.email ? "Este campo es requerido" : ""}
            {...register("email", { required: true })}
          />
          <Typography variant="body2">Contraseña</Typography>
          <TextField
            placeholder="Ingresar contraseña"
            autoComplete="off"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={() => setShowPassword((show) => !show)}
                >
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
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            {...register("password", {
              required: "Este campo es obligatorio",
              validate: (value) => {
                return (
                  (value.length > 7 &&
                    requirements.every((req) => req.re.test(value))) ||
                  "Ingrese una contraseña válida"
                );
              },
            })}
          />
          <Typography variant="caption" fontSize={11}>
            <ul
              style={{
                marginBottom: 0,
                marginTop: "-15px",
                marginLeft: "-10px",
              }}
            >
              {requirements.map((requirement, index) => (
                <li
                  key={index}
                  style={{
                    color: requirement.re.test(verifyPassword)
                      ? theme.palette.primary.main
                      : "inherit",
                  }}
                >
                  {requirement.registerLabel}{" "}
                  {requirement.re.test(verifyPassword) && (
                    <Check fontSize="inherit" />
                  )}
                </li>
              ))}
              <li
                style={{
                  color:
                    verifyPassword.length > 7
                      ? theme.palette.primary.main
                      : "inherit",
                }}
              >
                Mínimo 8 letras{" "}
                {verifyPassword.length > 7 && <Check fontSize="inherit" />}
              </li>
            </ul>
          </Typography>
          <Typography>N° Celular</Typography>
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: (value) => {
                if (!value.number) return "Este campo es obligatorio";
                const phoneNumber = parsePhoneNumberFromString(
                  value.number,
                  value.code
                );
                return (
                  (phoneNumber &&
                    isValidPhoneNumber(
                      phoneNumber.number,
                      phoneNumber.country
                    )) ||
                  "El número no es válido"
                );
              },
            }}
            render={({ field }) => (
              <CustomPhoneInput
                value={field.value.number}
                onChange={(val) =>
                  setValue("phone", {
                    number: val,
                    code: field.value.code,
                  })
                }
                country={field.value.code}
                setCountry={(val) =>
                  setValue("phone", {
                    number: field.value.number,
                    code: val,
                  })
                }
                error={errors.phone?.message}
              />
            )}
          />
          <FormControl error={!!errors.terms}>
            <FormControlLabel
              control={
                <Controller
                  name="terms"
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
                  Acepto los <Link>Términos y Condiciones</Link> de ADFLY y
                  autorizo la <Link>política de privacidad</Link>.
                </Typography>
              }
            />
            {errors.terms && (
              <FormHelperText>{errors.terms.message}</FormHelperText>
            )}
          </FormControl>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={
              <Typography variant="body1" fontSize={11}>
                Acepto recibir material publicitario relacionado a la tienda{" "}
              </Typography>
            }
            {...register("newsletters")}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Completar registro"}
          </Button>
          <Typography textAlign="center" fontSize={10} fontWeight="lighter">
            Si necesitas ayuda, escríbenos a hola@adfly.pe o llámanos al +51 970
            802 065
          </Typography>
        </Stack>
      </form>
    </BaseModal>
  );
});

FormModal.displayName = "FormModal";

export default FormModal;
