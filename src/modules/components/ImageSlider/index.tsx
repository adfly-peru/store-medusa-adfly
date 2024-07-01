import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import Slider from "react-slick";
import Image from "next/image";

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
              paddingBottom: matches ? undefined : "100%",
              paddingTop: matches ? "100%" : undefined,
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <img
              layout="fill"
              objectFit="contain"
              src={i === "" ? "/Logo Adfly.svg" : i}
              alt={i}
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
        paddingBottom: matches ? undefined : "100%",
        paddingTop: matches ? "100%" : undefined,
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      <img
        layout="fill"
        objectFit="contain"
        src={(images[0] ?? "") === "" ? "/Logo Adfly.svg" : images[0]}
        alt={images[0]}
      />
    </Box>
  );
}
