import { Stack, Space } from "@mantine/core";
import CategorySection from "@modules/home/components/category-section";
import FeaturedProducts from "../components/featured-products";
import { useAccount } from "@context/account-context";
import { Carousel, Embla } from "@mantine/carousel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomeView = () => {
  const { homeDesign, banners } = useAccount();
  const router = useRouter();
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [autoplayDelay, setAutoplayDelay] = useState(3000);
  useEffect(() => {
    if (embla) {
      const autoplay = () => {
        if (embla.canScrollNext()) {
          embla.scrollNext();
        } else {
          embla.scrollTo(0);
        }
      };

      const autoplayInterval = setInterval(autoplay, autoplayDelay);
      return () => clearInterval(autoplayInterval);
    }
  }, [embla, autoplayDelay]);

  const increaseDelay = () => {
    setAutoplayDelay((currentDelay) => currentDelay + 5000);
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
        getEmblaApi={setEmbla}
        onNextSlide={() => {
          increaseDelay();
        }}
        onPreviousSlide={() => {
          increaseDelay();
        }}
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
        // plugins={[autoplay.current]}\
      >
        <Carousel.Slide>
          <div
            style={{
              width: "100%",
              paddingTop: "30.98%",
              backgroundImage: `url(${homeDesign?.bannerurl ?? ""})`,
              backgroundPosition: "center center",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
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
              }}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Stack align="center" justify="flex-end" spacing={32} px={15}>
        <CategorySection />
        <Space h={36} />
        <FeaturedProducts />
      </Stack>
    </>
  );
};

export default HomeView;
