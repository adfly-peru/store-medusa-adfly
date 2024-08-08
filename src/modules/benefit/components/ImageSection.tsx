import ImageSlider from "@modules/components/ImageSlider";
import { Box } from "@mui/material";
import { Benefit } from "generated/graphql";

export function BenefitImages({ product: { images } }: { product: Benefit }) {
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
      <ImageSlider images={images} />
    </Box>
  );
}
