import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import Slider from "react-slick";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <IconButton
      style={{
        position: "absolute",
        top: "50%",
        right: "0px",
        boxShadow: "-2px 0 5px -2px rgba(0,0,0,0.2)",
        height: "64px",
        width: "34px",
        color: "grey",
        borderRadius: 0,
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <NavigateNext />
    </IconButton>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <IconButton
      style={{
        position: "absolute",
        top: "50%",
        left: "0px",
        boxShadow: "2px 0 5px -2px rgba(0,0,0,0.2)",
        height: "64px",
        width: "34px",
        color: "grey",
        borderRadius: 0,
        padding: 0,
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <NavigateBefore />
    </IconButton>
  );
}

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(610));

  if (images.length > 1) {
    return (
      <Slider
        dots
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
        dotsClass="slick-dots slick-dots-products-slider"
        className="slick-image-products-slider"
        customPaging={(i) => (
          <img
            height={50}
            width={50}
            style={{}}
            src={images[i] === "" ? "/Logo Adfly.svg" : images[i]}
            alt={images[i]}
          />
        )}
      >
        {images.map((i, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: matches ? "90%" : 340,
              height: matches ? "auto" : 340,
              paddingBottom: "100%",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <img
              src={i === "" ? "/Logo Adfly.svg" : i}
              alt={i}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                position: "absolute",
              }}
            />
          </Box>
        ))}
      </Slider>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: matches ? "90%" : 390,
        height: matches ? "auto" : 390,
        paddingBottom: "100%",
        paddingTop: undefined,
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      <img
        src={(images[0] ?? "") === "" ? "/Logo Adfly.svg" : images[0]}
        alt={images[0]}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          position: "absolute",
        }}
      />
    </Box>
  );
}
