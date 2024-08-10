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

const Delivery = ({
  product,
}: {
  product: MarketplaceItemQuery["marketplaceItem"];
}) => {
  const theme = useTheme();
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
            {!matches && <Link>Ver todos</Link>}
          </div>
        </CardContent>
      </Card>
    </Stack>
  );
};

const DetailedMarketplaceItem = ({
  item,
}: {
  item: MarketplaceItemQuery["marketplaceItem"];
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(1121));
  //   const router = useRouter();
  //   const { data: sessionData } = useSession();
  //   const id = router.query.benefit as string;
  //   const { data, loading } = useMarketplaceItemQuery({
  //     variables: {
  //       uuidbusiness: sessionData?.user?.uuidbusiness ?? "",
  //       id,
  //     },
  //   });

  //   const product = item.marketplaceItem

  //   if (loading) {
  //     return <Loader />;
  //   }

  //   if (!product) {
  //     return <div>Benefit not found</div>;
  //   }

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
                >
                  Ver todo
                </Typography>
              </Stack>
            </Stack>

            <Divider />
            <Button variant="contained" fullWidth size="small">
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
