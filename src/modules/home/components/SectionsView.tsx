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
        padding: "0px 110px",
        backgroundColor: "#F2F2F2",
        width: "100%",
        [theme.breakpoints.down("lg")]: {
          padding: "0px 90px",
        },
        [theme.breakpoints.down("md")]: {
          padding: "0px 10px",
        },
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      })}
    >
      <Stack sx={{ gap: "10px" }}>
        <Typography
          variant="h2"
          fontSize={24}
          color="black"
          fontWeight={500}
          sx={{
            lineHeight: "normal",
          }}
        >
          ¡Descubre lo que tenemos para ti!
        </Typography>
        <Divider
          sx={(theme) => ({
            border: "1px solid black",
            width: "246px",
            [theme.breakpoints.down("md")]: {
              width: "88px",
            },
          })}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ gap: "40px" }}
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
            sx={(theme) => ({
              display: "flex",
              borderRadius: "20px",
              gap: "20px",
              width: "100%",
              justifyContent: "space-between",
              paddingRight: "20px",
            })}
          >
            <CardMedia
              component="img"
              image="/StoreCardImage.svg"
              alt="store card"
              sx={{
                width: 280,
                height: 170,
              }}
            />
            <CardContent
              sx={{ margin: "10px 0px !important", padding: "0 !important" }}
            >
              <Stack
                justifyContent="space-between"
                alignItems="flex-end"
                sx={{ gap: "10px" }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={(theme) => ({
                    gap: "10px",
                    fontSize: 20,
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
                    fontSize: 20,
                    lineHeight: "1.5",
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
                  sx={{ fontWeight: 700 }}
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
              gap: "20px",
              width: "100%",
              justifyContent: "space-between",
              paddingLeft: "20px",
            }}
          >
            <CardContent
              sx={{ margin: "10px 0px !important", padding: "0 !important" }}
            >
              {" "}
              <Stack justifyContent="space-between" sx={{ gap: "10px" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={(theme) => ({
                    gap: "10px",
                    fontSize: 20,
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
                    fontSize: 20,
                    lineHeight: "1.5",
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
                  sx={{ fontWeight: 700 }}
                >
                  Ver cupones
                </Button>
              </Stack>
            </CardContent>
            <CardMedia
              component="img"
              sx={{
                width: 280,
                height: 170,
              }}
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
