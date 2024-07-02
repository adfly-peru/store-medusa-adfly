/* eslint-disable @next/next/no-img-element */
import { useDesign } from "@context/design-context";
import Loader from "@modules/components/LoadingScreen/Loader";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Container, IconButton } from "@mui/material";
import { useBannersQuery } from "generated/graphql";
import Image from "next/image";
import { useMemo } from "react";
import Slider from "react-slick";
import { defaultImage } from "./BannersListCard";
import { useRouter } from "next/router";

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
  const { push } = useRouter();
  if (!bannersList.length) return <div></div>;

  if (bannersList.length > 1)
    return (
      <Container sx={{ padding: "0 !important" }}>
        <Box
          sx={(theme) => ({
            marginTop: "10px",
            [theme.breakpoints.down("md")]: {
              marginTop: 0,
            },
          })}
        >
          <Slider
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
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  onClick={() =>
                    (i.link ?? "").length > 1 ? push(i.link ?? "") : null
                  }
                  sizes="100vw"
                  width={1100}
                  height={340}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "center",
                    cursor: "pointer",
                  }}
                  src={
                    i.img === "" || i.img === defaultImage
                      ? "/default/MainBanner.svg"
                      : i.img
                  }
                  alt={i.img}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    );
  return (
    <Container sx={{ padding: "0 !important" }}>
      <Box
        sx={(theme) => ({
          marginTop: "10px",
          [theme.breakpoints.down("md")]: {
            marginTop: 0,
          },
        })}
      >
        <Box
          sx={{
            display: "flex !important",
            justifyContent: "center !important",
            alignItems: "center !important",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            onClick={() =>
              (bannersList[0].link ?? "").length > 1
                ? push(bannersList[0].link ?? "")
                : null
            }
            sizes="100vw"
            width={1100}
            height={340}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center",
              cursor: "pointer",
            }}
            src={
              bannersList[0].img === "" || bannersList[0].img === defaultImage
                ? "/default/MainBanner.svg"
                : bannersList[0].img
            }
            alt={bannersList[0].img}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default MainBanners;
