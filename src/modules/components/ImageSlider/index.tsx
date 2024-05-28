import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { IconButton } from "@mui/material";
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
  if (images.length > 1)
    return (
      <Slider
        dots
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
        dotsClass="slick-dots slick-thumb"
        customPaging={function (i) {
          return (
            <Image
              width={50}
              height={50}
              style={{}}
              src={images[i]}
              alt={images[i]}
            />
          );
        }}
      >
        {images.map((i, index) => (
          <Image key={index} width={340} height={340} src={i} alt={i} />
        ))}
      </Slider>
    );

  return (
    <Image
      width={390}
      height={390}
      src={(images[0] ?? "") === "" ? "/Logo Adfly.svg" : images[0]}
      alt={images[0]}
    />
  );
}
