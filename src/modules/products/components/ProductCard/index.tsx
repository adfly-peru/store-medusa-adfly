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
      elevation={5}
      sx={(theme) => ({
        width: product.type === "coupon" ? "220px" : "200px",
        borderRadius: "10px",
        marginTop: "3px",
        marginBottom: "10px",
      })}
    >
      <CardActionArea
        onClick={
          // Test
          () => router.push(`/product/${product.uuidOffer}`)
          // () =>
          //   router.push(
          //     `/product/${devProduct.at(product.description.length % 3)}`
          //   )
        }
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px 0",
        }}
      >
        <CardMedia
          component="img"
          height={product.type === "product" ? 120 : 190}
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
        <CardContent
          sx={{
            padding: "0 10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          {/* Title */}
          {product.type === "product" ? (
            <Stack sx={{ gap: "4px" }}>
              <Typography
                variant="h4"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "black",
                }}
              >
                {product.brand.name}
              </Typography>
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
                  height: "34px",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "normal",
                }}
              >
                {product.offerName}
              </Typography>
            </Stack>
          ) : (
            <Stack sx={{ gap: "10px" }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="h4"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "black",
                  }}
                >
                  {product.brand.name}
                </Typography>
                <Chip
                  label={`- ${
                    product.details?.discountType === "monetary"
                      ? ` S/.${product.details.discount?.toFixed(0)}`
                      : ` ${product.details?.discount}%`
                  }`}
                  color="error"
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
                  height: "34px",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "normal",
                }}
              >
                {product.offerName}
              </Typography>
            </Stack>
          )}
          {/* Prices */}
          {product.type === "product" && (
            <Stack sx={{ gap: "10px" }}>
              <Stack sx={{ gap: "4px" }} alignItems="flex-start">
                <Chip
                  sx={{ alignSelf: "flex-start" }}
                  label={`${(discount * -1).toFixed(0)}%`}
                  color="error"
                />
                <Stack
                  sx={{ gap: "5px" }}
                  direction="row"
                  alignItems="flex-end"
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: 16, lineHeight: "22px", fontWeight: 600 }}
                  >
                    S/.{" "}
                    {((product.details?.offerPrice ?? 0) > 0
                      ? product.details?.offerPrice ?? 0
                      : product.details?.adflyPrice ?? 0
                    ).toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={(theme) => ({
                      color: theme.palette.grey[400],
                      fontSize: 12,
                      lineHeight: "20px",
                      fontWeight: 400,
                    })}
                  >
                    S/. {(product.details?.refPrice ?? 0).toFixed(2)}
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
                alignItems="center"
                justifyContent="space-between"
                color="#fab005"
              >
                <Stack direction="row" alignItems="center">
                  <Typography variant="body1">Estrellas</Typography>
                  <Star
                    sx={{
                      fontSize: 18,
                    }}
                  />
                </Stack>
                <Typography variant="body1">
                  {(
                    ((product.details?.offerPrice ?? 0 > 0
                      ? product.details?.offerPrice ?? 0
                      : product.details?.adflyPrice) ?? 0) * 100
                  ).toFixed(0)}
                </Typography>
              </Stack>
            </Stack>
          )}
          {/* Button */}
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
            {product.type === "coupon" ? "Generar Cupón" : "Ver producto"}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
