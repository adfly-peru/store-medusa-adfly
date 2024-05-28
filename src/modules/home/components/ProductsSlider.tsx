import { Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import { Offer } from "generated/graphql";
import ProductCard from "@modules/products/components/ProductCard";
import { Icon } from "@iconify/react";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <IconButton className="slick-arrow" onClick={onClick}>
      <Icon icon="carbon:next-filled" />
    </IconButton>
  );
}
function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <IconButton className="slick-arrow" onClick={onClick} style={{}}>
      <Icon icon="carbon:previous-filled" />
    </IconButton>
  );
}

interface ProductsSliderProps {
  products: Offer[];
}

export default function ProductsSlider({ products }: ProductsSliderProps) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(4, products.length),
    slidesToScroll: Math.min(4, products.length),
    className: "slick-products-slider",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: Math.min(3, products.length),
          slidesToScroll: Math.min(3, products.length),
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 834,
        settings: {
          slidesToShow: Math.min(2, products.length),
          slidesToScroll: Math.min(2, products.length),
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: Math.min(1, products.length),
          slidesToScroll: Math.min(1, products.length),
        },
      },
    ],
  };

  if (products.length > 1)
    return (
      <Slider {...settings}>
        {products.map((i, index) => (
          <Box
            key={i.uuidOffer}
            sx={{
              display: "flex !important",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProductCard product={i} />
          </Box>
        ))}
      </Slider>
    );

  return <div></div>;
}
