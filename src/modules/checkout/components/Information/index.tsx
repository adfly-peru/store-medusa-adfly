import { useAccount } from "@context/account-context";
import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Information = () => {
  const { collaborator } = useAccount();
  const { billingInfo, setStep, handlerBillingInfo } = useCheckout();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{
    phone: string;
  }>({
    defaultValues: {
      phone: billingInfo.phone,
    },
  });

  const onSubmit = async (data: { phone: string }) => {
    setLoading(true);
    await handlerBillingInfo(data);
    setLoading(false);
    setStep(2);
  };
  useEffect(() => {
    if (billingInfo.phone) setValue("phone", billingInfo.phone);
  }, [billingInfo, setValue]);

  return (
    <Box position="relative">
      <Backdrop
        sx={(theme) => ({
          color: theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(1px)",
          borderRadius: 1,
        })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} my={1}>
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
                disabled
                value={collaborator?.name}
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} my={1}>
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
                disabled
                value={collaborator?.lastname}
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} my={1}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Tipo de Documento
              </InputLabel>
              <TextField
                disabled
                value={collaborator?.documenttype}
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} my={1}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                N° Doc
              </InputLabel>
              <TextField
                disabled
                value={collaborator?.documentnumber}
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} my={1}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Correo electrónico
              </InputLabel>
              <TextField
                disabled
                value={collaborator?.email}
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} my={1}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Celular
              </InputLabel>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "El número de teléfono es obligatorio" }}
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
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ""}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              sx={(theme) => ({
                width: "100%",
                gap: "15px",
                justifyContent: "space-evenly",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => router.push("/cart")}
              >
                Regresar a Carrito
              </Button>
              <Button type="submit" fullWidth variant="contained">
                Continuar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Information;
