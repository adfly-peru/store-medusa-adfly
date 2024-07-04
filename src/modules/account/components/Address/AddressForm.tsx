import { MapForm } from "@modules/common/components/map";
import { Close } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CollaboratorAddress } from "generated/graphql";
import { Controller, useForm } from "react-hook-form";
import ubigeoPeru from "ubigeo-peru";

interface AddressFormProps {
  onSubmit: (data: Partial<CollaboratorAddress>) => void;
  defaultValues?: CollaboratorAddress;
  onClose: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  onSubmit,
  defaultValues,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      additional: defaultValues?.additional ?? "",
      address: defaultValues?.address ?? "",
      alias: defaultValues?.alias ?? "",
      country: defaultValues?.country ?? "pe",
      department: defaultValues?.department ?? "",
      district: defaultValues?.district ?? "",
      province: defaultValues?.province ?? "",
      lat: defaultValues?.lat,
      lng: defaultValues?.lng,
    },
  });

  return (
    <Card
      sx={(theme) => ({
        padding: 2,
        [theme.breakpoints.up("md")]: {
          width: 660,
        },
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
      })}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" gutterBottom>
            Dirección
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Nombre de la Dirección
              </InputLabel>
              <Controller
                name="alias"
                control={control}
                rules={{ required: "Este campo no puede ser nulo" }}
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
                    error={!!errors.alias}
                    helperText={errors.alias?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Departamento
              </InputLabel>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    sx={{
                      marginTop: "10px",
                    }}
                    value={
                      ubigeoPeru.reniec.find(
                        (v) =>
                          v.departamento === field.value &&
                          v.provincia === "00" &&
                          v.distrito === "00"
                      )?.nombre ?? ""
                    }
                    fullWidth
                    disabled
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Provincia
              </InputLabel>
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    sx={{
                      marginTop: "10px",
                    }}
                    value={
                      ubigeoPeru.reniec.find(
                        (v) =>
                          v.departamento === getValues("department") &&
                          v.provincia === field.value &&
                          v.distrito === "00"
                      )?.nombre ?? ""
                    }
                    fullWidth
                    disabled
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Distrito
              </InputLabel>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    sx={{
                      marginTop: "10px",
                    }}
                    value={
                      ubigeoPeru.reniec.find(
                        (v) =>
                          v.departamento === getValues("department") &&
                          v.provincia === getValues("province") &&
                          v.distrito === field.value
                      )?.nombre ?? ""
                    }
                    fullWidth
                    disabled
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <MapForm
              defaultPlace={
                defaultValues
                  ? {
                      id: defaultValues.uuidcollaboratoraddress ?? "",
                      name: defaultValues.address ?? "",
                      location: {
                        lat: defaultValues.lat ?? 0,
                        lng: defaultValues.lng ?? 0,
                      },
                      district: {
                        departamento: "",
                        provincia: "",
                        distrito: "",
                        nombre: "",
                      },
                    }
                  : undefined
              }
              onSelectPlace={(place) => {
                if (place) {
                  setValue("address", place.name);
                  setValue("lat", place.location.lat);
                  setValue("lng", place.location.lng);
                  setValue("district", place.district.distrito);
                  setValue("province", place.district.provincia);
                  setValue("department", place.district.departamento);
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Información Adicional
              </InputLabel>
              <Controller
                name="additional"
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
          <Grid item xs={12} sx={{ position: "relative" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit(onSubmit)}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
