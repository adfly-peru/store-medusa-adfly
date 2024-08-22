/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@modules/common/functions/format-date";
import Loader from "@modules/components/LoadingScreen/Loader";
import TextFieldInput from "@modules/components/TextFieldInput";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMarketplacerequestQuery } from "generated/graphql";
import { useRouter } from "next/router";

const SimpleRequest = () => {
  const router = useRouter();

  const id = router.query.request as string;
  const { data, loading } = useMarketplacerequestQuery({
    variables: {
      id,
    },
  });

  const product = data?.marketplacerequest;

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <div>Item not found</div>;
  }

  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3" fontSize={26}>
          Mis solicitudes
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => router.push("/account/marketplace/requests")}
        >
          Volver
        </Button>
      </Stack>
      <Divider sx={{ mb: 2, borderColor: "#C7CACD" }} />
      <Card sx={{ borderRadius: "10px" }} component={Paper}>
        <CardHeader sx={{ pb: 1, pt: 1 }} title="Datos del comprador" />
        <Divider sx={{ borderColor: "#C7CACD" }} />
        <CardContent>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={6}>
              <TextFieldInput
                disabled
                label="Nombres y Apellidos"
                value={product.fullname ?? "-"}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldInput
                disabled
                label="Correo electrónico"
                value={product.email ?? "-"}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldInput
                disabled
                label="Fecha y Hora del mensaje"
                value={formatDate(product.creationdate)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldInput
                disabled
                label="Celular"
                value={product.phone ?? "-"}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ borderColor: "#C7CACD", mb: 1 }} />
              <TextFieldInput
                disabled
                label="Mensaje"
                value={product.message}
                multiline
                rows={4}
              />
              <Divider sx={{ borderColor: "#C7CACD", my: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography
                fontWeight={600}
                sx={{ textDecoration: "underline", mb: 1 }}
              >
                Oferta de interes
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="caption" fontSize={12}>
                    Nombre
                  </Typography>
                  <Stack
                    direction="row"
                    width="100%"
                    alignItems="center"
                    height={52}
                    gap={2}
                  >
                    <img
                      sizes="100vw"
                      style={{
                        height: "52px",
                        width: "52px",
                        objectFit: "contain",
                      }}
                      src={
                        product.offer?.images?.at(0)
                          ? product.offer.images.at(0)
                          : "/logo_adfly.svg"
                      }
                      alt={product.id}
                    />
                    <Typography
                      variant="h3"
                      fontSize={18}
                      textAlign="start"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.offer?.title ?? ""}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" fontSize={12}>
                    Fecha
                  </Typography>
                  <Stack
                    direction="row"
                    width="100%"
                    alignItems="center"
                    height={52}
                  >
                    <Typography>
                      {formatDate(product.offer?.creationdate).split(",").at(0)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" fontSize={12}>
                    Precio
                  </Typography>
                  <Stack
                    direction="row"
                    width="100%"
                    alignItems="center"
                    height={52}
                  >
                    <Typography>S/. {product.offer?.price}</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default SimpleRequest;
