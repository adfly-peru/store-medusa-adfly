import { Stack, Space, Image, MediaQuery } from "@mantine/core";
import CategorySection from "@modules/home/components/category-section";
import FeaturedProducts from "../components/featured-products";
import { useAccount } from "@context/account-context";
import { Carousel, Embla } from "@mantine/carousel";
import { useRouter } from "next/router";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";

const HomeView = () => {
  const { homeDesign, banners } = useAccount();
  const router = useRouter();
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const handleTailoyCoupom = async () => {
    try {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("collaboratortoken");
        if (storedToken) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/store/order/tailoy`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: storedToken,
              },
            }
          );
        }
      }
      const downloadLink = document.createElement("a");
      downloadLink.href = "/tailoy/CUPONERA_2024[75].pdf";
      downloadLink.setAttribute("download", "CUPONERA_2024[75].pdf");
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.log("Error on generate coupon", error);
    }
  };

  return (
    <>
      <Carousel
        w="90%"
        mx="auto"
        withIndicators
        mt={46}
        mb={96}
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        styles={{
          indicators: {
            bottom: -32,
          },
          indicator: {
            height: 16,
            width: 16,
            borderRadius: "50%",
            backgroundColor: "#C7CACD",
            "&[data-active]": {
              backgroundColor: "black",
            },
          },
        }}
      >
        <Carousel.Slide>
          <div
            onClick={() => router.push(homeDesign?.href ?? "")}
            style={{
              width: "100%",
              paddingTop: "30.98%",
              backgroundImage: `url(${homeDesign?.bannerurl ?? ""})`,
              backgroundPosition: "center center",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              cursor: "pointer",
            }}
          />
        </Carousel.Slide>
        {banners.map((b) => (
          <Carousel.Slide key={b.uuidbanner}>
            <div
              onClick={() => router.push(b.bannerlink)}
              style={{
                width: "100%",
                paddingTop: "30.98%",
                backgroundImage: `url(${b.bannerimageurl ?? ""})`,
                backgroundPosition: "center center",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                cursor: "pointer",
              }}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Stack align="center" justify="flex-end" spacing={32} px={15}>
        <CategorySection />
        <MediaQuery
          smallerThan="md"
          styles={{
            display: "none",
          }}
        >
          <Image
            src="/tailoy/desktop.jpg"
            alt="tailoy"
            style={{
              cursor: "pointer",
            }}
            onClick={handleTailoyCoupom}
          />
        </MediaQuery>
        <MediaQuery
          largerThan="md"
          styles={{
            display: "none",
          }}
        >
          <Image
            src="/tailoy/mobile.jpg"
            alt="tailoy"
            style={{
              cursor: "pointer",
            }}
            onClick={handleTailoyCoupom}
          />
        </MediaQuery>
        <Space h={16} />
        <FeaturedProducts />
      </Stack>
    </>
  );
};

export default HomeView;
