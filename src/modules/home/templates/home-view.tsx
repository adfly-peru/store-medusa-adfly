import { BackgroundImage, Stack, Title, Space, Image } from "@mantine/core";
import CategorySection from "@modules/home/components/category-section";
import FeaturedProducts from "../components/featured-products";
import { useAccount } from "@context/account-context";
import { Carousel } from "@mantine/carousel";

const HomeView = () => {
  const { homeDesign } = useAccount();
  return (
    <>
      <Carousel w="90%" mx="auto" withIndicators>
        <Carousel.Slide>
          <div
            style={{
              width: "100%",
              paddingTop: "19.71%",
              backgroundImage: `url(${homeDesign?.bannerurl ?? ""})`,
              backgroundPosition: "center center",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Carousel.Slide>
      </Carousel>
      <Stack align="center" justify="flex-end" spacing="xl" px={15}>
        <Space />
        <CategorySection />
        <FeaturedProducts />
      </Stack>
    </>
  );
};

export default HomeView;
