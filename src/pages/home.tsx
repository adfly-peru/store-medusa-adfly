import {
  BackgroundImage,
  Stack,
  Title,
  ActionIcon,
  Group,
  Space,
  Grid,
  Tooltip,
} from "@mantine/core";
import { useProduct } from "@context/product-context";
import CardComponent from "@components/cardComponent";
import router from "next/router";
import Layout from "@modules/layout/templates";

const Home = () => {
  const { categories, products } = useProduct();
  const searchProductByCategorie = (categorieToSearch: string) => {
    router.push({
      pathname: "/search",
      query: { data: categorieToSearch },
    });
  };

  return (
    <Layout>
      <BackgroundImage
        src="https://rdb.rw/wp-content/uploads/2018/01/default-placeholder.png"
        radius="xs"
        sx={{
          height: 300,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack align="center" justify="flex-end">
          <Title order={3}>Bienvenido(a) a:</Title>
          <Title order={3}>Tu tienda de Beneficios (*)</Title>
        </Stack>
      </BackgroundImage>
      <Stack align="center" justify="flex-end" spacing="xl">
        <Space />
        <Title>¡Descubre nuestras categorías! (*)</Title>
        <Group spacing={50}>
          {categories.map((category, i) => (
            <Tooltip
              withArrow
              transition="fade"
              transitionDuration={200}
              key={`${i}tip`}
              label={category.name}
            >
              <ActionIcon
                key={`${i}action`}
                size={60}
                radius="xl"
                variant="filled"
                onClick={() => searchProductByCategorie(category.name)}
              >
                {category.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Group>
        <Title>Productos Destacados (*)</Title>
        <Grid w="100%" mt={20}>
          {products.map((prod, i): any => (
            <Grid.Col key={i} xs={3}>
              <CardComponent product={prod} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default Home;
