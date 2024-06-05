import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { changePasswordQuery } from "api/verify";
import { useRouter } from "next/router";

interface FormValues {
  newpassword: string;
  confirmpassword: string;
}

const requirements = [
  { re: /[0-9]/, label: "Incluye un número" },
  { re: /[a-z]/, label: "Incluye una letra en minúscula" },
  { re: /[A-Z]/, label: "Incluye una letra en mayúscula" },
  // { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Incluye un símbolo especial" },
];

const getStrength = (password: string) => {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

const PasswordRequirement = ({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) => {
  return (
    <Box
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
    >
      {meets ? (
        <Visibility fontSize="small" />
      ) : (
        <VisibilityOff fontSize="small" />
      )}
      <Box ml={1}>
        <Typography color="inherit" variant="body2">
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

const RecoveryModal = React.forwardRef<
  HTMLDivElement,
  {
    token: string;
  }
>((props, _) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      newpassword: "",
      confirmpassword: "",
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const handlePopoverOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const password = watch("newpassword");
  const strength = getStrength(password);
  const color =
    strength === 100 ? "success" : strength > 50 ? "info" : "warning";
  const isPasswordValid =
    password.length > 7 && requirements.every((req) => req.re.test(password));

  const onSubmit = (data: FormValues) => {
    setLoginError("");
    setLoading(true);
    changePasswordQuery(data.newpassword, props.token)
      .then(() => setSuccess(true))
      .catch((error) => setSuccess(true))
      .finally(() => setLoading(false));
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
          Recuperar contraseña
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
        {loginError && <Alert severity="error">{loginError}</Alert>}
        <Typography variant="caption" fontWeight={400} fontSize={12} mb={1}>
          {success
            ? "Su contraseña fue actualizada de manera exitosa"
            : "Ingresa tu nueva contraseña"}
        </Typography>
        {success ? (
          <Stack direction="row" justifyContent="center">
            <Button
              variant="contained"
              onClick={() => router.push("/home")}
              sx={{ marginTop: 2, marginBottom: 2, width: 183 }}
            >
              Ir a Inicio
            </Button>
          </Stack>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ gap: "20px" }}>
              <Typography variant="body2">Nueva contraseña</Typography>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                disableAutoFocus={true}
                disableEnforceFocus={true}
              >
                <Box sx={{ p: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={strength}
                    sx={{ mb: 1 }}
                    color={color}
                  />
                  <PasswordRequirement
                    label="Incluye al menos 8 carácteres"
                    meets={password.length > 7}
                  />
                  {requirements.map((requirement, index) => (
                    <PasswordRequirement
                      key={index}
                      label={requirement.label}
                      meets={requirement.re.test(password)}
                    />
                  ))}
                </Box>
              </Popover>
              <TextField
                placeholder="Ingresa nueva contraseña"
                autoComplete="off"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton size="small" onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginTop: "-10px" }}
                {...register("newpassword", { required: true })}
                onFocus={handlePopoverOpen}
                onBlur={handlePopoverClose}
              />
              <Typography variant="body2">Confirmar contraseña</Typography>
              <TextField
                placeholder="Repetir contraseña nueva"
                autoComplete="off"
                variant="outlined"
                fullWidth
                type={showPassword2 ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <IconButton size="small" onClick={handleClickShowPassword2}>
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginTop: "-10px" }}
                {...register("confirmpassword", {
                  required: "Este campo es obligatorio",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
                error={!!errors.confirmpassword}
                helperText={
                  errors.confirmpassword ? errors.confirmpassword.message : ""
                }
              />
            </Stack>
            <Stack direction="row" justifyContent="center">
              <Button
                variant="contained"
                type="submit"
                disabled={!isPasswordValid || loading}
                sx={{ marginTop: 2, marginBottom: 2, width: 183 }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Actualizar contraseña"
                )}
              </Button>
            </Stack>
          </form>
        )}
      </Stack>
    </Box>
  );
});

RecoveryModal.displayName = "RecoveryModal";

export default RecoveryModal;
