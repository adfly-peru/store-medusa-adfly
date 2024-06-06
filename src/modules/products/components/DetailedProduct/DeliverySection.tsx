import { useDetailedProduct } from "@modules/products/context/DetailedProductContext";
import { LocalShipping, Store, Email } from "@mui/icons-material";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

export function Delivery() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(1121));
  const { product, selectedVariant } = useDetailedProduct();
  return (
    <Stack
      spacing={1}
      alignItems="center"
      sx={(theme) => ({
        display: "flex",
      })}
    >
      {!matches && (
        <Typography variant="body2">
          <Typography fontWeight={700} display="inline" component="span">
            {"SKU: "}
          </Typography>
          {product.principalSku ?? selectedVariant?.variantSku ?? "-"}
        </Typography>
      )}
      <Card sx={{ width: matches ? "100%" : 275 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography variant="h5" fontWeight={700} fontSize={16}>
                Venta y despacho por:
              </Typography>
              <Typography variant="body2">{` ${product.business.commercialname}`}</Typography>
            </Stack>
            {matches && (
              <Typography variant="body2">
                <Typography fontWeight={700} display="inline" component="span">
                  {"SKU: "}
                </Typography>
                {product.principalSku ?? selectedVariant?.variantSku ?? "-"}
              </Typography>
            )}
          </Stack>
          {/* TODO: TERMINOS Y CONDICIONES */}
          {product.type === "coupon" ? null : (
            <>
              <Card
                variant="outlined"
                sx={{ margin: "15px 0", padding: "15px 15px 0 15px" }}
              >
                <Typography variant="h5">Entrega disponible:</Typography>
                <List
                  sx={{
                    display: matches ? "flex" : "block",
                  }}
                >
                  <ListItem
                    className={
                      product.business?.deliveryMethods?.deliveryonhome &&
                      product.type === "product"
                        ? "active"
                        : "inactive"
                    }
                    sx={{
                      flexDirection: matches ? "column" : "row",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <LocalShipping />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Entrega a domicilio"
                      secondary={
                        matches
                          ? undefined
                          : product.business?.deliveryMethods?.deliveryonhome &&
                            product.type === "product"
                          ? "Disponible"
                          : "No Disponible"
                      }
                    />
                  </ListItem>
                  <ListItem
                    className={
                      product.type === "product" ? "active" : "inactive"
                    }
                    sx={{
                      flexDirection: matches ? "column" : "row",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <Store />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Recojo en tienda"
                      secondary={
                        matches
                          ? undefined
                          : product.type === "product"
                          ? "Disponible"
                          : "No Disponible"
                      }
                    />
                  </ListItem>
                  <ListItem
                    className={
                      product.type === "service" ? "active" : "inactive"
                    }
                    sx={{
                      flexDirection: matches ? "column" : "row",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Entrega virtual"
                      secondary={
                        matches
                          ? undefined
                          : product.type === "service"
                          ? "Disponible"
                          : "No Disponible"
                      }
                    />
                  </ListItem>
                </List>
              </Card>
              {!matches && (
                <Typography variant="h5" mb={1}>
                  Métodos de pago:
                </Typography>
              )}
              {!matches && (
                <Image
                  sizes="100vw"
                  width={10}
                  height={10}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  src="/payment-methods.svg"
                  alt={"payment-methods"}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
