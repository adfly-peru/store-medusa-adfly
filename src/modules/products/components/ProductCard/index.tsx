import { Star } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Offer } from "generated/graphql";
import { useRouter } from "next/router";
import { useMemo } from "react";

// Test
const devProduct = [
  "6620cd29-ca5e-4adf-9278-42faf4b919e2",
  "ec890603-f0d0-4b8f-913f-4e2d1bacc9a3",
  "a6f0f39b-6712-4270-a04e-c3acc1dbd593",
  "747af52d-0e54-41ae-8588-ca01f1173b88",
];

const ProductCard = ({ product }: { product: Offer }) => {
  const router = useRouter();

  const discount = useMemo(() => {
    if (!product.details) return 0;
    return (
      ((product.details.refPrice -
        ((product.details.offerPrice ?? 0) > 0
          ? product.details.offerPrice ?? 0
          : product.details.adflyPrice)) /
        product.details.refPrice) *
      100
    );
  }, [product]);

  return (
    <Card
      sx={(theme) => ({
        width: "240px",
        borderRadius: "10px",
        marginTop: "15px",
        marginBottom: "15px",
        [theme.breakpoints.down("md")]: {
          width: "207px",
        },
        [theme.breakpoints.down("sm")]: {
          width: "150px",
        },
      })}
    >
      <CardActionArea
        onClick={
          // () => router.push(`/product/${product.uuidOffer}`)
          () =>
            router.push(
              `/product/${devProduct.at(product.description.length % 3)}`
            )
        }
      >
        <CardMedia
          component="img"
          height={171}
          image={
            (product.details?.imageURL ?? "") === ""
              ? "/Logo Adfly.svg"
              : product.details?.imageURL
          }
          alt={product.offerName}
          sx={{
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant="h5"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.brand.name}
              </Typography>
              <Chip
                label={`-${
                  product.type === "coupon"
                    ? `${
                        product.details?.discountType === "monetary"
                          ? ` S/.${product.details.discount?.toFixed(2)}`
                          : ` ${product.details?.discount}%`
                      }`
                    : ` ${discount.toFixed(0)}%`
                }`}
                color="error"
                sx={{
                  marginRight: "10px",
                }}
              />
            </Stack>
            <Typography
              variant="h3"
              fontSize={13}
              fontWeight={500}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                lineHeight: "1.5em",
                height: "3em",
              }}
            >
              {product.offerName}
            </Typography>
            <div></div>
            <Stack height={60}>
              {product.details?.offerPrice ? (
                <Stack
                  color="red"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">Oferta</Typography>
                  <Typography variant="body2">
                    S/. {product.details.offerPrice.toFixed(2)}
                  </Typography>
                </Stack>
              ) : (
                <></>
              )}
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Precio ADFLY</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: product.details?.offerPrice
                      ? "line-through"
                      : "none",
                  }}
                >
                  S/. {product.details?.adflyPrice.toFixed(2)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Precio Mercado</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                  }}
                >
                  S/. {product.details?.refPrice.toFixed(2)}
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={{
                fontWeight: 600,
                fontSize: 16,
                color: "gray",
                marginTop: "-10px",
                marginBottom: "-10px",
              }}
            >
              o
            </Divider>
            <Stack
              direction="row"
              justifyContent="space-between"
              color="#fab005"
            >
              <Stack direction="row" alignItems="center">
                <Typography variant="body2">Estrellas</Typography>
                <Star
                  sx={{
                    fontSize: 18,
                  }}
                />
              </Stack>
              <Typography variant="body2">
                {(
                  ((product.details?.offerPrice ?? 0 > 0
                    ? product.details?.offerPrice ?? 0
                    : product.details?.adflyPrice) ?? 0) * 100
                ).toFixed(0)}
              </Typography>
            </Stack>
            <div></div>
            <Box
              sx={(theme) => ({
                fontFamily: "Open Sans, sans-serif",
                width: "144px",
                height: "26px",
                alignSelf: "center",
                fontWeight: 400,
                fontSize: 14,
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.main}`,
                textAlign: "center",
                borderRadius: "8px",
                paddingTop: "2px",
              })}
            >
              Ver producto
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
