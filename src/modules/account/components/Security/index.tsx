import { useAccount } from "@context/account-context";
import {
  PasswordRequirement,
  getStrength,
  requirements,
} from "@modules/authentication/components/login/RecoveryPassword";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  Modal,
  Popover,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
}

const SecurityForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { collaborator } = useAccount();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const handleClickShowPassword3 = () => setShowPassword3(!showPassword3);
  const handlePopoverOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const password = watch("newpassword");
  const strength = getStrength(password);
  const color =
    strength === 100 ? "success" : strength > 50 ? "info" : "warning";
  const isPasswordValid =
    password.length > 7 && requirements.every((req) => req.re.test(password));

  const onSubmit = (data: FormValues) => {};

  if (!collaborator) {
    return <CircularProgress />;
  }

  return (
    <Stack spacing={1}>
      <Modal
        open={loading}
        onClose={() => null}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Modal>
      <Typography variant="h3" fontSize={26}>
        Seguridad
      </Typography>
      <Divider />
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ gap: "25px", paddingTop: "20px" }}>
          <FormControl fullWidth required>
            <InputLabel
              htmlFor="oldpassword"
              sx={{
                color: "black",
                fontWeight: 600,
                top: "-28px",
                marginLeft: "-10px",
              }}
            >
              Contraseña Actual
            </InputLabel>
            <Controller
              name="oldpassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        size="small"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel
              htmlFor="newpassword"
              sx={{
                color: "black",
                fontWeight: 600,
                top: "-28px",
                marginLeft: "-10px",
              }}
            >
              Nueva Contraseña
            </InputLabel>
            <Controller
              name="newpassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type={showPassword2 ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        size="small"
                        onClick={handleClickShowPassword2}
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  onFocus={handlePopoverOpen}
                  onBlur={handlePopoverClose}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel
              htmlFor="confirmpassword"
              sx={{
                color: "black",
                fontWeight: 600,
                top: "-28px",
                marginLeft: "-10px",
              }}
            >
              Confirmar Contraseña
            </InputLabel>
            <Controller
              name="confirmpassword"
              control={control}
              rules={{
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type={showPassword3 ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        size="small"
                        onClick={handleClickShowPassword3}
                      >
                        {showPassword3 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  error={!!errors.confirmpassword}
                  helperText={errors.confirmpassword?.message}
                />
              )}
            />
          </FormControl>
          <Button
            type="submit"
            disabled={!isPasswordValid || loading}
            variant="contained"
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Actualizar contraseña"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default SecurityForm;
