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
} from "@mui/material";
import React from "react";
import { useSession } from "next-auth/react";
import BaseModal from "@modules/components/BaseModal";
import { useRegister } from "./Context";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
  newsletters: boolean;
  terms: boolean;
  phone: string;
}

const FormModal = React.forwardRef<HTMLDivElement>(() => {
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
  } = useForm<FormValues>({
    defaultValues: {
      email: registerForm.email,
      password: "",
      newsletters: false,
      terms: false,
      phone: "",
    },
  });

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
        phone: data.phone,
      });
    } catch {
      setLoginError("Hubo un error desconocido en el servicio");
    }
    setLoading(false);
  };

  return (
    <BaseModal title={"Termina de registrarte"} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={(theme) => ({
            gap: "20px",
          })}
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
            helperText={errors.password ? "Este campo es requerido" : ""}
            {...register("password", { required: true })}
          />
          <Typography>N° Celular</Typography>
          <TextField
            placeholder="+51 987654321"
            autoComplete="off"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              marginTop: "-10px",
            }}
            {...register("phone")}
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
