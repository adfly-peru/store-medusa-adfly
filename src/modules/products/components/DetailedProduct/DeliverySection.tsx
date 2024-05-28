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
} from "@mui/material";
import Image from "next/image";

export function Delivery() {
  const { product, selectedVariant } = useDetailedProduct();
  return (
    <Stack
      spacing={1}
      alignItems="center"
      sx={(theme) => ({
        display: "none",

        [theme.breakpoints.up("lg")]: {
          display: "flex",
        },
      })}
    >
      <Typography variant="body2">
        <Typography fontWeight={700} display="inline" component="span">
          {"SKU: "}
        </Typography>
        {product.principalSku ?? selectedVariant?.variantSku ?? "-"}
      </Typography>
      <Card sx={{ width: 275 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700}>
            Venta y despacho por:
          </Typography>
          <Typography variant="body2">{` ${product.business.commercialname}`}</Typography>
          {/* TODO: TERMINOS Y CONDICIONES */}
          {product.type === "coupon" ? null : (
            <>
              <Divider
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <Typography variant="h5">Entrega disponible:</Typography>
              <List>
                <ListItem
                  className={
                    product.business?.deliveryMethods?.deliveryonhome &&
                    product.type === "product"
                      ? "active"
                      : "inactive"
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <LocalShipping />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Entrega a domicilio"
                    secondary={
                      product.business?.deliveryMethods?.deliveryonhome &&
                      product.type === "product"
                        ? "Disponible"
                        : "No Disponible"
                    }
                  />
                </ListItem>
                <ListItem
                  className={product.type === "product" ? "active" : "inactive"}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Store />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Recojo en tienda"
                    secondary={
                      product.type === "product"
                        ? "Disponible"
                        : "No Disponible"
                    }
                  />
                </ListItem>
                <ListItem
                  className={product.type === "service" ? "active" : "inactive"}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Email />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Entrega virtual"
                    secondary={
                      product.type === "service"
                        ? "Disponible"
                        : "No Disponible"
                    }
                  />
                </ListItem>
              </List>
              <Divider
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <Typography variant="h5" mb={1}>
                Métodos de pago:
              </Typography>
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
            </>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
