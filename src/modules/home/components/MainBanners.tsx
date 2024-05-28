import { useDesign } from "@context/design-context";
import Loader from "@modules/components/LoadingScreen/Loader";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useBannersQuery } from "generated/graphql";
import Image from "next/image";
import { useMemo } from "react";
import Slider from "react-slick";

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton
      style={{
        position: "absolute",
        top: "50%",
        right: "5px",
        backgroundColor: "#0000006e",
        color: "white",
        borderRadius: 25,
        zIndex: 2,
      }}
      onClick={onClick}
      className="slick-banners-arrow"
    >
      <ChevronRight fontSize="inherit" />
    </IconButton>
  );
}
function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton
      style={{
        position: "absolute",
        top: "50%",
        left: "5px",
        backgroundColor: "#0000006e",
        color: "white",
        borderRadius: 25,
        padding: 0,
        zIndex: 2,
      }}
      onClick={onClick}
      className="slick-banners-arrow"
    >
      <ChevronLeft fontSize="inherit" />
    </IconButton>
  );
}

const MainBanners = ({
  bannersList,
}: {
  bannersList: {
    img: string;
    link: string | null | undefined;
  }[];
}) => {
  if (!bannersList.length) return <div></div>;

  if (bannersList.length > 1)
    return (
      <Box
        sx={(theme) => ({
          padding: "20px 110px",
          backgroundColor: "#F2F2F2",
          width: "100%",
          [theme.breakpoints.down("lg")]: {
            padding: "20px 30px",
          },
          [theme.breakpoints.down("md")]: {
            padding: "0px 0px",
            marginTop: "-8px",
          },
        })}
      >
        <Slider
          dots
          infinite
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {bannersList.map((i, index) => (
            <Box
              key={index}
              sx={{
                display: "flex !important",
                justifyContent: "center !important",
                alignItems: "center !important",
                height: "100% !important",
              }}
            >
              <Image
                sizes="100vw"
                width={10}
                height={10}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
                src={i.img === "" ? "/Logo Adfly.svg" : i.img}
                alt={i.img}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    );
};

export default MainBanners;
