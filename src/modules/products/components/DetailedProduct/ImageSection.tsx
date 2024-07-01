import ImageSlider from "@modules/components/ImageSlider";
import { useDetailedProduct } from "@modules/products/context/DetailedProductContext";
import { Box, Stack, Chip } from "@mui/material";

export function ProductImages() {
  const { product, selectedVariant } = useDetailedProduct();

  const discount = selectedVariant
    ? ((selectedVariant.refPrice -
        ((selectedVariant.offerPrice ?? 0) > 0
          ? selectedVariant.offerPrice ?? 0
          : selectedVariant.adflyPrice)) /
        selectedVariant.refPrice) *
      100
    : 0;
  const images = selectedVariant
    ? [selectedVariant.imageURL, ...selectedVariant.additionalimages]
    : [];

  return (
    <Box
      width={412}
      sx={{
        maxWidth: "90%",
        boxShadow: "0px 0 5px -1px rgba(0,0,0,0.2)",
        paddingTop: "10px",
        paddingBottom: images.length > 1 ? "30px" : 0,
      }}
    >
      <Stack>
        <Chip
          label={`-${
            product.type === "coupon"
              ? `${
                  selectedVariant?.coupon?.discountType === "monetary"
                    ? ` S/.${selectedVariant.coupon.discount.toFixed(2)}`
                    : ` ${selectedVariant?.coupon?.discount}%`
                }`
              : ` ${discount.toFixed(0)}%`
          }`}
          color="error"
          sx={{
            marginRight: "10px",
          }}
        />
      </Stack>
      <imgSlider images={images} />
    </Box>
  );
}
