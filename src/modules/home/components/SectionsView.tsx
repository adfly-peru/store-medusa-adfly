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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";

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
        {isMdDown ? (
          <Stack
            sx={{ width: "100%" }}
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <IconButton
              sx={{
                fontSize: 50,
                color: "black",
                border: "2px solid #C7CACD",
                borderRadius: "8px",
                padding: "30px 60px",
              }}
              onClick={() => router.push("/search?type=product")}
            >
              <Icon icon={"bx:store"} />
            </IconButton>
            <Typography fontSize={18} fontWeight={600}>
              Tienda Online
            </Typography>
          </Stack>
        ) : (
          <Card
            sx={{
              display: "flex",
              borderRadius: "20px",
              gap: "20px",
              width: "100%",
              justifyContent: "space-between",
              paddingRight: "20px",
              alignItems: "stretch",
            }}
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
                [theme.breakpoints.down(1121)]: {
                  gap: 0,
                },
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
                <Icon fontSize="inherit" icon={"bx:store"} />
                <Typography
                  variant="h2"
                  fontSize="inherit"
                  color="black"
                  fontWeight={600}
                  sx={{ lineHeight: "1.5" }}
                >
                  Compras Online
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
                sx={{ fontWeight: 700, fontSize: "inherit" }}
              >
                Comprar ahora
              </Button>
            </CardContent>
          </Card>
        )}
        {isMdDown ? (
          <Stack
            sx={{ width: "100%" }}
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <IconButton
              sx={{
                fontSize: 50,
                color: "black",
                border: "2px solid #C7CACD",
                borderRadius: "8px",
                padding: "30px 60px",
              }}
              onClick={() => router.push("/search?type=coupon")}
            >
              <Icon icon={"ic:outline-discount"} />
            </IconButton>
            <Typography fontSize={18} fontWeight={600}>
              Cupones
            </Typography>
          </Stack>
        ) : (
          <Card
            sx={{
              display: "flex",
              borderRadius: "20px",
              gap: "20px",
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
                sx={{ fontWeight: 700, fontSize: "inherit" }}
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
        )}
      </Stack>
    </Container>
  );
};

export default SectionsView;
