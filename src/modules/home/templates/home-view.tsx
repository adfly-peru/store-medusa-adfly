import { BackgroundImage, Stack, Title, Space, Image } from "@mantine/core";
import CategorySection from "@modules/home/components/category-section";
import FeaturedProducts from "../components/featured-products";
import { useAccount } from "@context/account-context";
import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/router";

const HomeView = () => {
  const { homeDesign, banners } = useAccount();
  const router = useRouter();
  return (
    <>
      <Carousel
        w="90%"
        mx="auto"
        withIndicators
        mt={46}
        mb={96}
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
                paddingTop: "19.71%",
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
