import { BackgroundImage, Stack, Title, Space, Box } from "@mantine/core";
import CategorySection from "@modules/home/components/category-section";
import FeaturedProducts from "../components/featured-products";
import { useAccount } from "@context/account-context";

const HomeView = () => {
  const { homeDesign } = useAccount();
  return (
    <>
      <BackgroundImage
        src={homeDesign?.bannerurl ?? ""}
        radius="xs"
        sx={{
          height: 300,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Stack align="center" justify="flex-end">
          <Title order={3}>Bienvenido(a) a:</Title>
          <Title order={3}>Tu tienda de Beneficios (*)</Title>
        </Stack> */}
      </BackgroundImage>
      <Stack align="center" justify="flex-end" spacing="xl">
        <Space />
        <CategorySection />
        <FeaturedProducts />
      </Stack>
    </>
  );
};

export default HomeView;
