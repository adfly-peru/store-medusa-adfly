import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
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
    <Box
      sx={(theme) => ({
        padding: "60px 110px",
        backgroundColor: "#F2F2F2",
        width: "100%",
        [theme.breakpoints.down("lg")]: {
          padding: "30px 30px",
        },
        [theme.breakpoints.down("md")]: {
          padding: "10px 10px",
        },
      })}
    >
      <Typography variant="h2" fontSize={32} color="black" fontWeight={500}>
        ¡Descubre lo que tenemos para ti!
      </Typography>
      <Divider
        sx={(theme) => ({
          border: "1px solid black",
          width: "246px",
          marginTop: "10px",
          marginBottom: "24px",
          [theme.breakpoints.down("md")]: {
            width: "88px",
          },
        })}
      />
      <Stack direction="row" justifyContent="space-between" spacing={3}>
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
            sx={(theme) => ({
              display: "flex",
              borderRadius: "20px",
              height: "191px",
              width: "100%",
              justifyContent: "space-between",
            })}
          >
            <CardMedia
              component="img"
              sx={{ width: "45%" }}
              image="/StoreCardImage.svg"
              alt="store card"
            />
            <CardContent sx={{ padding: "20px 30px !important" }}>
              <Stack
                justifyContent="space-between"
                alignItems="flex-end"
                sx={{
                  height: "100%",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={(theme) => ({
                    fontSize: 24,
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 20,
                    },
                  })}
                >
                  <Icon fontSize="inherit" icon={"bx:store"} />
                  <Typography
                    variant="h2"
                    fontSize="inherit"
                    color="black"
                    fontWeight={700}
                  >
                    Tienda Online
                  </Typography>
                </Stack>
                <Typography
                  sx={(theme) => ({
                    fontSize: 20,
                    lineHeight: "150%",
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 18,
                    },
                  })}
                  textAlign="right"
                >
                  La tienda que te mereces
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<Icon icon="carbon:next-filled" />}
                  onClick={() => router.push("/search?type=product")}
                >
                  Comprar ahora
                </Button>
              </Stack>
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
              height: "191px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ padding: "20px 30px !important" }}>
              <Stack
                justifyContent="space-between"
                sx={{
                  height: "100%",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={(theme) => ({
                    fontSize: 24,
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 20,
                    },
                  })}
                >
                  <Typography
                    variant="h2"
                    fontSize="inherit"
                    color="black"
                    fontWeight={700}
                  >
                    Tienda Online
                  </Typography>
                  <Icon fontSize="inherit" icon={"ic:outline-discount"} />
                </Stack>
                <Typography
                  sx={(theme) => ({
                    fontSize: 20,
                    lineHeight: "150%",
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 18,
                    },
                  })}
                  textAlign="left"
                >
                  Tus descuentos, tu elección
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<Icon icon="carbon:next-filled" />}
                  onClick={() => router.push("/search?type=coupon")}
                >
                  Ver cupones
                </Button>
              </Stack>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: "30%" }}
              image="/CouponCardImage.svg"
              alt="coupon card"
            />
          </Card>
        )}
      </Stack>
    </Box>
  );
};

export default SectionsView;
