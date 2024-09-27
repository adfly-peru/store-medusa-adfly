import * as amplitude from "@amplitude/analytics-browser";
import { MarketplaceItemQuery } from "generated/graphql";
import React from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  NavigateNext,
  Home,
  Email,
  LocalShipping,
  Storefront,
} from "@mui/icons-material";
import ImageSlider from "@modules/components/ImageSlider";
import BasicTabs from "@modules/components/TabPanel";
import { Icon } from "@iconify/react";
import { useDialog } from "@context/DialogContext";
import ContactSeller from "./components/ContactSeller";
import ubigeoPeru from "ubigeo-peru";
import { PAYMENTMETHODSOPTIONS } from "./components/CreationBar";
import { useAccount } from "@context/account-context";

const Delivery = ({
  product,
}: {
  product: MarketplaceItemQuery["marketplaceItem"];
}) => {
  const theme = useTheme();
  const { openDialog, closeDialog } = useDialog();
  const matches = useMediaQuery(theme.breakpoints.down(1121));
  const shipmentsmethods = product.shippingmethod?.split(",") ?? [];
  return (
    <Stack
      spacing={1}
      alignItems="center"
      sx={(theme) => ({
        display: "flex",
      })}
    >
      <Card sx={{ width: matches ? "100%" : 280 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography variant="h5" fontWeight={700} fontSize={16}>
                Venta y despacho por:
              </Typography>
              <Typography variant="body2">{` ${
                product.collaborator ?? "-"
              }`}</Typography>
            </Stack>
          </Stack>
          {/* TODO: TERMINOS Y CONDICIONES */}
          <Divider
            sx={(theme) => ({ borderColor: theme.palette.grey[200], my: 1 })}
          />
          <div>
            <Typography variant="h5">Entrega disponible:</Typography>
            <List
              sx={{
                display: matches ? "flex" : "block",
                ".MuiListItem-root": {
                  padding: 0,
                },
                ".MuiListItemText-primary": {
                  fontWeight: "400 !important",
                },
              }}
            >
              <ListItem
                className={
                  shipmentsmethods.includes("door_delivery")
                    ? "active"
                    : "inactive"
                }
                sx={{
                  flexDirection: matches ? "column" : "row",
                }}
              >
                <ListItemAvatar
                  sx={{
                    minWidth: 0,
                    mr: 1,
                    color: shipmentsmethods.includes("door_delivery")
                      ? "primary.main"
                      : "#ABAFB4",
                  }}
                >
                  <LocalShipping />
                </ListItemAvatar>
                <ListItemText
                  primary="Entrega en la puerta"
                  secondary={
                    matches
                      ? undefined
                      : shipmentsmethods.includes("door_delivery")
                      ? "Disponible"
                      : "No Disponible"
                  }
                />
              </ListItem>
              <ListItem
                className={
                  shipmentsmethods.includes("door_pick_up")
                    ? "active"
                    : "inactive"
                }
                sx={{
                  flexDirection: matches ? "column" : "row",
                }}
              >
                <ListItemAvatar
                  sx={{
                    minWidth: 0,
                    mr: 1,
                    color: shipmentsmethods.includes("door_pick_up")
                      ? "primary.main"
                      : "#ABAFB4",
                  }}
                >
                  <Storefront />
                </ListItemAvatar>
                <ListItemText
                  primary="Recoger en la puerta"
                  secondary={
                    matches
                      ? undefined
                      : shipmentsmethods.includes("door_pick_up")
                      ? "Disponible"
                      : "No Disponible"
                  }
                />
              </ListItem>
              <ListItem
                className={
                  shipmentsmethods.includes("public_place_delivery")
                    ? "active"
                    : "inactive"
                }
                sx={{
                  flexDirection: matches ? "column" : "row",
                }}
              >
                <ListItemAvatar
                  sx={{
                    minWidth: 0,
                    mr: 1,
                    color: shipmentsmethods.includes("public_place_delivery")
                      ? "primary.main"
                      : "#ABAFB4",
                  }}
                >
                  <Email />
                </ListItemAvatar>
                <ListItemText
                  primary="Encuentro en Lugar Público"
                  secondary={
                    matches
                      ? undefined
                      : shipmentsmethods.includes("public_place_delivery")
                      ? "Disponible"
                      : "No Disponible"
                  }
                />
              </ListItem>
              <ListItem
                className={
                  shipmentsmethods.includes("workplace_delivery")
                    ? "active"
                    : "inactive"
                }
                sx={{
                  flexDirection: matches ? "column" : "row",
                }}
              >
                <ListItemAvatar
                  sx={{
                    minWidth: 0,
                    mr: 1,
                    color: shipmentsmethods.includes("workplace_delivery")
                      ? "primary.main"
                      : "#ABAFB4",
                  }}
                >
                  <Icon icon="ic:outline-home-work" fontSize={24} />
                </ListItemAvatar>
                <ListItemText
                  primary="Encuentro en Centro Trabajo"
                  secondary={
                    matches
                      ? undefined
                      : shipmentsmethods.includes("workplace_delivery")
                      ? "Disponible"
                      : "No Disponible"
                  }
                />
              </ListItem>
            </List>
            {!matches && (
              <Typography variant="h5" mb={1}>
                Métodos de pago:
              </Typography>
            )}
            {!matches && (
              <Link
                onClick={() =>
                  openDialog({
                    centeredTitle: true,
                    title: "Métodos de pago",
                    content: (
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                      >
                        <Typography variant="caption" fontSize={15}>
                          Estos son lo métodos de pago que acepta el
                          colaborador:
                        </Typography>
                        {product.paymentmethod
                          ?.split(",")
                          .filter((pm) => pm !== "other")
                          .map((pm, index) => (
                            <Box
                              key={index}
                              borderRadius="8px"
                              width="100%"
                              sx={(theme) => ({
                                border: `1px solid ${theme.palette.divider}`,
                              })}
                              p={1}
                              display="flex"
                              flexDirection="column"
                              gap="6px"
                            >
                              <Typography fontWeight={600} fontSize={16}>
                                {
                                  PAYMENTMETHODSOPTIONS.find(
                                    (p) => p.value === pm
                                  )?.label
                                }
                              </Typography>
                              <Typography
                                variant="caption"
                                fontWeight={600}
                                fontSize={14}
                              >
                                {
                                  PAYMENTMETHODSOPTIONS.find(
                                    (p) => p.value === pm
                                  )?.description
                                }
                              </Typography>
                            </Box>
                          ))}
                        {!!product.otherpaymentmethod && (
                          <Box
                            borderRadius="8px"
                            width="100%"
                            sx={(theme) => ({
                              border: `1px solid ${theme.palette.divider}`,
                            })}
                            p={1}
                            display="flex"
                            flexDirection="column"
                            gap="6px"
                          >
                            <Typography fontWeight={600} fontSize={16}>
                              Otros:
                            </Typography>
                            <Typography
                              variant="caption"
                              fontWeight={600}
                              fontSize={14}
                            >
                              {product.otherpaymentmethod}
                            </Typography>
                          </Box>
                        )}
                        <Divider
                          sx={(theme) => ({
                            width: "100%",
                            borderColor: `${theme.palette.divider}`,
                          })}
                        />
                      </Stack>
                    ),
                    actions: [
                      <Button
                        key="close-action"
                        variant="contained"
                        onClick={() => closeDialog()}
                        size="small"
                      >
                        Entendido
                      </Button>,
                    ],
                  })
                }
              >
                Ver todos
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </Stack>
  );
};

const DetailedMarketplaceItem = ({
  item,
  action,
}: {
  item: MarketplaceItemQuery["marketplaceItem"];
  action?: boolean;
}) => {
  const theme = useTheme();
  const { collaborator, handleAuthentication } = useAccount();
  const matches = useMediaQuery(theme.breakpoints.down(1121));
  const { openDialog, closeDialog } = useDialog();

  const handleContact = () => {
    if (!collaborator) {
      handleAuthentication();
      return;
    }
    amplitude.track("Marketplace button clicked", { data: item });
    openDialog({
      title: "Contactar anunciante",
      closable: true,
      content: <ContactSeller id={item.uuidmarketplaceitem} />,
    });
  };

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
      })}
    >
      <Box
        sx={{
          marginTop: "40px",
          marginLeft: "10px",
          marginRight: "10px",
          marginBottom: "40px",
        }}
      >
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="inherit" href={"/home"}>
            <Home />
          </Link>
          <Link underline="hover" color="inherit" href={`/search?type=benefit`}>
            Marketplace
          </Link>
          <Typography color="text.primary">{item.title}</Typography>
        </Breadcrumbs>
        <Stack
          sx={(theme) => ({
            flexDirection: "row",
            marginTop: "25px",
            gap: "40px",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              alignItems: "center",
            },
          })}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            sx={(theme) => ({
              display: "none",
              [theme.breakpoints.down("md")]: {
                display: "flex",
                marginTop: "10px",
                marginBottom: "-15px",
              },
            })}
          >
            <Typography variant="h3" fontSize={16}>
              {item.brand}
            </Typography>
          </Stack>
          <Typography
            variant="h1"
            color="black"
            fontSize={20}
            sx={(theme) => ({
              display: "none",
              [theme.breakpoints.down("md")]: {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "3em",
              },
            })}
          >
            {item.title}
          </Typography>
          {item.images && (
            <Box
              width={412}
              sx={{
                maxWidth: "90%",
                paddingTop: "10px",
                paddingBottom: item.images.length > 1 ? "30px" : 0,
              }}
            >
              <ImageSlider images={item.images} />
            </Box>
          )}
          <Stack spacing={2} width="100%">
            <Typography
              variant="h2"
              fontSize={16}
              sx={(theme) => ({
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              })}
            >
              {item.brand}
            </Typography>
            <Typography
              variant="h1"
              color="black"
              fontSize={20}
              sx={(theme) => ({
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "3em",
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              })}
            >
              {item.title}
            </Typography>

            <Stack gap="5px">
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" fontWeight={700}>
                  Precio
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  S/. {item.price?.toFixed(2) ?? "-"}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" fontWeight={700}>
                  Estado
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  {item.status === "new"
                    ? "Nuevo"
                    : item.status === "used"
                    ? "Usado"
                    : "-"}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" fontWeight={700}>
                  Alcance
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    textDecoration: "underline",
                  }}
                  onClick={() =>
                    openDialog({
                      centeredTitle: true,
                      title: "Alcance del producto",
                      content: (
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={2}
                        >
                          <Typography variant="caption" fontSize={16}>
                            Departamentos que cubre el colaborador
                          </Typography>
                          <Box
                            borderRadius="8px"
                            width="100%"
                            sx={(theme) => ({
                              border: `1px solid ${theme.palette.divider}`,
                            })}
                            py={2}
                            px={1}
                          >
                            <Typography fontWeight={600} fontSize={16}>
                              {item.department
                                ?.split(",")
                                .map(
                                  (d) =>
                                    ubigeoPeru.reniec.find(
                                      (u) =>
                                        u.departamento === d &&
                                        u.distrito === "00" &&
                                        u.provincia === "00"
                                    )?.nombre
                                )}
                            </Typography>
                          </Box>
                          <Divider
                            sx={(theme) => ({
                              width: "100%",
                              borderColor: `${theme.palette.divider}`,
                            })}
                          />
                        </Stack>
                      ),
                      actions: [
                        <Button
                          key="close-action"
                          variant="contained"
                          onClick={() => closeDialog()}
                          size="small"
                        >
                          Entendido
                        </Button>,
                      ],
                    })
                  }
                >
                  Ver todo
                </Typography>
              </Stack>
            </Stack>

            <Divider />
            <Button
              variant="contained"
              fullWidth
              size="small"
              onClick={() => (action ? handleContact() : null)}
            >
              Contactar anunciante
            </Button>
          </Stack>
          {!matches && <Delivery product={item} />}
        </Stack>
        {matches && (
          <Divider
            sx={(theme) => ({
              borderColor: "gray",
              margin: "40px -60px 15px -60px",
              [theme.breakpoints.down(481)]: {
                margin: "40px -10px 15px -10px",
              },
            })}
          />
        )}
        {matches && <Delivery product={item} />}
        <BasicTabs
          items={[
            {
              label: "Descripción",
              content: (
                <Stack>
                  <Typography variant="body2">{item.description}</Typography>
                </Stack>
              ),
            },
          ]}
        ></BasicTabs>
      </Box>
    </Box>
  );
};

export default React.memo(DetailedMarketplaceItem);
