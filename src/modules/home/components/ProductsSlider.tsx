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
    center: true,
    variableWidth: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slick-products-slider",
    dotsClass: "slick-dots slick-product-dots",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false, // Oculta las flechas en pantallas pequeñas
        },
      },
    ],
  };

  if (products.length > 1)
    return (
      <Slider {...settings}>
        {products.map((i) => (
          <ProductCard product={i} key={i.uuidOffer} />
        ))}
        {products.map((i) => (
          <ProductCard product={i} key={i.uuidOffer} />
        ))}
      </Slider>
    );

  return <div></div>;
}
