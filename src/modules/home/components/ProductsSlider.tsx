import { Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import { Offer } from "generated/graphql";
import ProductCard from "@modules/products/components/ProductCard";
import { Icon } from "@iconify/react";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <IconButton
      className="slick-arrow"
      onClick={onClick}
      style={{
        fontSize: "30px",
        padding: 0,
      }}
    >
      <Icon icon="carbon:next-filled" />
    </IconButton>
  );
}
function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <IconButton
      className="slick-arrow"
      onClick={onClick}
      style={{
        fontSize: "30px",
        padding: 0,
      }}
    >
      <Icon icon="carbon:previous-filled" />
    </IconButton>
  );
}

interface ProductsSliderProps {
  products: Offer[];
}

export default function ProductsSlider({ products }: ProductsSliderProps) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    className: "slick-products-slider",
    dotsClass: "slick-dots slick-product-dots",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1121,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (products.length > 1)
    return (
      <Slider {...settings}>
        {products.length < 4 &&
          products.map((i) => (
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
        {products.map((i) => (
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
