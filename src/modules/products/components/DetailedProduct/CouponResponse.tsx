import {
  Paper,
  Link,
  List,
  ListItem,
  Modal,
  Stack,
  Typography,
  ListItemText,
  Button,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useDetailedProduct } from "@modules/products/context/DetailedProductContext";

export function CouponResponse() {
  const { couponOpen, setCouponOpen, couponResponse } = useDetailedProduct();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard?.writeText(couponResponse?.couponCode ?? "");
  };

  return (
    <div>
      <Snackbar
        message="Copied to clibboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
      <Modal open={couponOpen} onClose={() => setCouponOpen(false)}>
        <Paper
          sx={(theme) => ({
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
            backgroundColor: "white",
            padding: "40px 32px",
            border: "0px",
            [theme.breakpoints.up("md")]: {
              width: 500,
              // height: 515,
            },
            [theme.breakpoints.down("md")]: {
              width: 400,
              // height: 391,
            },
            [theme.breakpoints.down("sm")]: {
              width: 295,
              // height: 370,
            },
          })}
        >
          {couponResponse?.status === "success" ? (
            <Stack>
              <Typography variant="h3">
                ¡Felicitaciones, tu cupón de descuento se ha generado con éxito!
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  height: 59,
                  backgroundColor: "#E3E4E6",
                  border: "1px solid #737A82",
                  borderRadius: "0.5rem",
                  fontSize: 20,
                  marginTop: "20px",
                  paddingLeft: "10px",
                }}
              >
                <Typography fontWeight={700} fontSize={20}>
                  {couponResponse?.couponCode ?? "--------"}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    height: "100%",
                    width: "146px",
                    fontSize: 20,
                  }}
                  onClick={handleClick}
                >
                  {"Copiar"}
                </Button>
              </Stack>
              <List>
                <ListItem
                  sx={{
                    margin: 0,
                    padding: "2px",
                  }}
                >
                  <ListItemText>
                    <Typography lineHeight="16px" fontSize={12}>
                      1. Copia el cupón apretando el botón “Copiar”
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem
                  sx={{
                    margin: 0,
                    padding: "2px",
                  }}
                >
                  <ListItemText>
                    <Typography lineHeight="16px" fontSize={12}>
                      2. Sigue las instrucciones señaladas en el detalle del
                      cupón para utilizarlo.
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem
                  sx={{
                    margin: 0,
                    padding: "2px",
                  }}
                >
                  <ListItemText>
                    <Typography lineHeight="16px" fontSize={12}>
                      3. El código de este cupón lo podrás encontrar siempre en:{" "}
                      <Link
                        href="/account/coupons"
                        target="_blank"
                        fontWeight={700}
                        sx={{
                          textDecoration: "auto",
                        }}
                      >
                        Mis Cupones
                      </Link>
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </Stack>
          ) : (
            <Stack alignItems="center" spacing={2}>
              <Typography fontWeight={700} fontSize={18}>
                Ocurrió un error inesperado
              </Typography>
              <Icon icon="mingcute:sad-line" height={70} />
            </Stack>
          )}
        </Paper>
      </Modal>
    </div>
  );
}
