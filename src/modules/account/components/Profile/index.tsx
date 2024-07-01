import { useAccount } from "@context/account-context";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Modal,
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
  name: string;
  lastname: string;
  documenttype: string;
  documentnumber: string;
  email: string;
  cellPhone: string;
  termsOfService: boolean;
  acceptPublicity: boolean;
}

const ProfileForm = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const { collaborator } = useAccount();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: collaborator?.name ?? "",
      lastname: collaborator?.lastname ?? "",
      documenttype: collaborator?.documenttype ?? "",
      documentnumber: collaborator?.documentnumber ?? "",
      email: collaborator?.email ?? "",
      cellPhone: collaborator?.phonenumber ?? "",
      termsOfService: collaborator?.emailVerify ?? false,
      acceptPublicity: collaborator?.newsletters ?? false,
    },
  });

  if (!collaborator) {
    return <CircularProgress />;
  }

  return (
    <Stack spacing={1}>
      <Modal
        open={loading}
        onClose={() => setModalOpen(false)}
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
        Perfil
      </Typography>
      <Divider />
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} p={2}>
          <FormControl fullWidth required>
            <InputLabel
              htmlFor="name"
              sx={{
                color: "black",
                fontWeight: 600,
                top: "-28px",
                marginLeft: "-10px",
              }}
            >
              Nombres
            </InputLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} p={2}>
          <FormControl fullWidth required>
            <InputLabel
              htmlFor="lastname"
              sx={{
                color: "black",
                fontWeight: 600,
                top: "-28px",
                marginLeft: "-10px",
              }}
            >
              Apellidos
            </InputLabel>
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.lastname}
                  helperText={errors.lastname ? errors.lastname.message : ""}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} p={2}>
          <FormControl fullWidth required>
            <InputLabel
              htmlFor="documenttype"
              sx={{
                color: "black",
                fontWeight: 600,
                top: "-28px",
                marginLeft: "-10px",
              }}
            >
              Tipo Documento
            </InputLabel>
            <Controller
              name="documenttype"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.documenttype}
                  helperText={
                    errors.documenttype ? errors.documenttype.message : ""
                  }
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} p={2}>
          <FormControl fullWidth required>
            <InputLabel
              htmlFor="documentnumber"
              sx={{
                color: "black",
                fontWeight: 600,
                top: "-28px",
                marginLeft: "-10px",
              }}
            >
              Nro. Documento
            </InputLabel>
            <Controller
              name="documentnumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.documentnumber}
                  helperText={
                    errors.documentnumber ? errors.documentnumber.message : ""
                  }
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} p={2}>
          <FormControl fullWidth required>
            <InputLabel
              htmlFor="email"
              sx={{
                color: "black",
                fontWeight: 600,
                top: "-28px",
                marginLeft: "-10px",
              }}
            >
              Correo Electrónico
            </InputLabel>
            <Controller
              name="email"
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
                  disabled={collaborator.emailVerify}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} p={2}>
          <FormControl fullWidth>
            <InputLabel
              htmlFor="cellPhone"
              sx={{
                color: "black",
                fontWeight: 600,
                top: "-28px",
                marginLeft: "-10px",
              }}
            >
              Celular
            </InputLabel>
            <Controller
              name="cellPhone"
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
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} pl={3}>
          <FormControlLabel
            control={
              <Controller
                name="acceptPublicity"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} />
                )}
              />
            }
            label="Acepto recibir publicidad"
          />
        </Grid>
        <Grid item xs={12} p={1}>
          <Button variant="contained" fullWidth>
            Actualizar
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ProfileForm;
