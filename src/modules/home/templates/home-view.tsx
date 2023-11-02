import { BackgroundImage, Stack, Title, Space, Image } from "@mantine/core";
import CategorySection from "@modules/home/components/category-section";
import FeaturedProducts from "../components/featured-products";
import { useAccount } from "@context/account-context";
import { Carousel } from "@mantine/carousel";

const HomeView = () => {
  const { homeDesign } = useAccount();
  return (
    <>
      <Carousel w="90%" mx="auto" withIndicators height={250}>
        <Carousel.Slide>
          <BackgroundImage
            style={{
              height: "100%",
              backgroundSize: "100% auto",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            src={homeDesign?.bannerurl ?? ""}
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
