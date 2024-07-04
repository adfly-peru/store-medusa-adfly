import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { type } from "os";

const SectionsView = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  return (
    <Container
      maxWidth={false}
      sx={(theme) => ({
        maxWidth: 1260,
        backgroundColor: "#F2F2F2",
        width: "100%",
        [theme.breakpoints.down(1261)]: {
          maxWidth: 1110,
        },
        [theme.breakpoints.down(1121)]: {
          maxWidth: 948,
        },
        [theme.breakpoints.down(949)]: {
          maxWidth: 802,
        },
        [theme.breakpoints.up("sm")]: {
          paddingLeft: "20px",
          paddingRight: "20px",
        },
      })}
    >
      {isMdDown ? (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <ToggleButtonGroup
            value={type || ""}
            exclusive
            onChange={(_, val) => {
              router.push({
                pathname: "/search",
                query: {
                  type: val,
                },
              });
            }}
            sx={(theme) => ({
              alignSelf: "center",
              marginBottom: "10px !important",
              borderRadius: "20px",
              "& .MuiToggleButton-root": {
                paddingTop: "12px",
                paddingBottom: "12px",
                width: "224px",
                [theme.breakpoints.down(600)]: {
                  width: "150px",
                },
                fontSize: 24,
                borderRight: `1px solid ${theme.palette.grey[200]}`,
                borderLeft: `1px solid ${theme.palette.grey[200]}`,
                borderBottom: "8px solid",
                backgroundColor: "white",
                color: `${theme.palette.primary.main}`,
                "&.MuiToggleButtonGroup-firstButton": {
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                },
                "&.MuiToggleButtonGroup-lastButton": {
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                },
              },
            })}
          >
            <ToggleButton key="product" value="product">
              <Stack
                alignItems="center"
                spacing={2}
                sx={(theme) => ({
                  fontSize: 40,
                  [theme.breakpoints.down("lg")]: {
                    fontSize: 36,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 30,
                  },
                })}
              >
                <Icon fontSize="inherit" icon={"bx:store"} />
                <Typography
                  sx={(theme) => ({
                    fontSize: 20,
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 16,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 14,
                    },
                  })}
                  fontWeight={600}
                  textTransform="none"
                >
                  Tienda
                </Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton key="coupon" value="coupon">
              <Stack
                alignItems="center"
                spacing={2}
                sx={(theme) => ({
                  fontSize: 40,
                  [theme.breakpoints.down("lg")]: {
                    fontSize: 36,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 30,
                  },
                })}
              >
                <Icon fontSize="inherit" icon={"ic:outline-discount"} />
                <Typography
                  sx={(theme) => ({
                    fontSize: 20,
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 16,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 14,
                    },
                  })}
                  fontWeight={600}
                  textTransform="none"
                >
                  Cupones
                </Typography>
              </Stack>
            </ToggleButton>
            {/* {storeDesign?.ispremium && (
            <ToggleButton key="marketplace" value="marketplace" disabled>
              <Stack
                alignItems="center"
                spacing={2}
                sx={(theme) => ({
                  fontSize: 40,
                  [theme.breakpoints.down("lg")]: {
                    fontSize: 36,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 30,
                  },
                })}
              >
                <Icon fontSize="inherit" icon={"mdi:hand-coin-outline"} />
                <Typography
                  sx={(theme) => ({
                    fontSize: 20,
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 16,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 14,
                    },
                  })}
                  fontWeight={600}
                  textTransform="none"
                >
                  Marketplace
                </Typography>
              </Stack>
            </ToggleButton>
          )}
          {storeDesign?.ispremium && (
            <ToggleButton key="benefits" value="benefits" disabled>
              <Stack
                alignItems="center"
                spacing={2}
                sx={(theme) => ({
                  fontSize: 40,
                  [theme.breakpoints.down("lg")]: {
                    fontSize: 36,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 30,
                  },
                })}
              >
                <Icon
                  fontSize="inherit"
                  icon="material-symbols:stars-outline"
                />
                <Typography
                  sx={(theme) => ({
                    fontSize: 20,
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 16,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 14,
                    },
                  })}
                  fontWeight={600}
                  textTransform="none"
                >
                  Beneficios
                </Typography>
              </Stack>
            </ToggleButton>
          )} */}
          </ToggleButtonGroup>
        </Stack>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          sx={(theme) => ({
            gap: "160px",
            [theme.breakpoints.down("lg")]: { gap: "120px" },
            [theme.breakpoints.down(1261)]: { gap: "70px" },
            [theme.breakpoints.down(1121)]: { gap: "20px" },
          })}
        >
          <Card
            sx={(theme) => ({
              display: "flex",
              borderRadius: "20px",
              gap: {
                xs: 0,
                1120: "20px",
              },
              width: "100%",
              justifyContent: "space-between",
              paddingRight: "20px",
              alignItems: "stretch",
            })}
          >
            <CardMedia
              component="img"
              image="/StoreCardImage.svg"
              alt="store card"
              sx={(theme) => ({
                height: 170,
                width: "auto",
                objectFit: "cover",
                [theme.breakpoints.down(1261)]: {
                  height: 160,
                },
                [theme.breakpoints.down(1121)]: {
                  height: 150,
                },
                [theme.breakpoints.down(949)]: {
                  height: 120,
                },
              })}
            />
            <CardContent
              sx={(theme) => ({
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
                alignItems: "flex-end",
                margin: "0px !important",
                padding: "0 !important",
                fontSize: 20,
                [theme.breakpoints.down(949)]: {
                  fontSize: 14,
                },
                [theme.breakpoints.down(1121)]: {
                  gap: 0,
                },
              })}
            >
              <Stack
                direction="row"
                alignItems="center"
                sx={(theme) => ({
                  gap: "10px",
                  fontSize: 20,
                  [theme.breakpoints.down(949)]: {
                    fontSize: 16,
                  },
                })}
              >
                <Icon fontSize="inherit" icon={"bx:store"} />
                <Typography
                  variant="h2"
                  fontSize="inherit"
                  color="black"
                  fontWeight={600}
                  sx={{ lineHeight: "1.5" }}
                >
                  Tienda Online
                </Typography>
              </Stack>
              <Typography
                sx={(theme) => ({
                  lineHeight: "1.5",
                  height: 60,
                  [theme.breakpoints.down(949)]: {
                    height: 42,
                  },
                })}
                textAlign="right"
                fontSize="inherit"
              >
                La tienda que te mereces
              </Typography>
              <Button
                variant="outlined"
                size="small"
                endIcon={<Icon icon="carbon:next-filled" />}
                onClick={() => router.push("/search?type=product")}
                sx={{ fontWeight: 700, fontSize: 14 }}
              >
                Comprar ahora
              </Button>
            </CardContent>
          </Card>
          <Card
            sx={{
              display: "flex",
              borderRadius: "20px",
              gap: {
                xs: 0,
                1120: "20px",
              },
              width: "100%",
              justifyContent: "space-between",
              paddingLeft: "20px",
              alignItems: "stretch",
            }}
          >
            <CardContent
              sx={(theme) => ({
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
                alignItems: "flex-start",
                margin: "0px !important",
                padding: "0 !important",
                [theme.breakpoints.down(1121)]: {
                  gap: 0,
                },
                fontSize: 20,
                [theme.breakpoints.down(949)]: {
                  fontSize: 14,
                },
              })}
            >
              <Stack
                direction="row"
                alignItems="center"
                sx={(theme) => ({
                  gap: "10px",
                  fontSize: 20,
                  [theme.breakpoints.down(949)]: {
                    fontSize: 16,
                  },
                })}
              >
                <Typography
                  variant="h2"
                  fontSize="inherit"
                  color="black"
                  fontWeight={600}
                  sx={{ lineHeight: "1.5" }}
                >
                  Cupones
                </Typography>
                <Icon fontSize="inherit" icon={"ic:outline-discount"} />
              </Stack>
              <Typography
                sx={(theme) => ({
                  lineHeight: "1.5",
                  height: 60,
                  [theme.breakpoints.down(949)]: {
                    height: 42,
                  },
                })}
                textAlign="left"
                fontSize="inherit"
              >
                Tus descuentos, tu elección
              </Typography>
              <Button
                variant="outlined"
                size="small"
                endIcon={<Icon icon="carbon:next-filled" />}
                onClick={() => router.push("/search?type=coupon")}
                sx={{ fontWeight: 700, fontSize: 14 }}
              >
                Ver cupones
              </Button>
            </CardContent>
            <CardMedia
              component="img"
              image="/CouponCardImage.svg"
              alt="coupon card"
              sx={(theme) => ({
                height: 170,
                width: "auto",
                objectFit: "cover",
                [theme.breakpoints.down(1261)]: {
                  height: 160,
                },
                [theme.breakpoints.down(1121)]: {
                  height: 150,
                },
                [theme.breakpoints.down(949)]: {
                  height: 120,
                },
              })}
            />
          </Card>
        </Stack>
      )}
    </Container>
  );
};

export default SectionsView;
