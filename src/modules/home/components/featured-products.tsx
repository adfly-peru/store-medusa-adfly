import ProductCard from "@modules/products/components/product-card";
import { Title, SimpleGrid, Center, Loader, Stack } from "@mantine/core";
import { useFeaturedProducts } from "@context/featured-products-context";
import { useEffect } from "react";

const FeaturedProducts = () => {
  const { products, fetchProducts } = useFeaturedProducts();
  useEffect(() => {
    fetchProducts();
  }, []);
  if (products.length == 0) {
    return (
      <>
        <Title
          order={5}
          align="center"
          style={{
            fontSize: "61px",
            fontWeight: 400,
            lineHeight: "37.2px",
          }}
        >
          Novedades Para Ti
        </Title>
        <Center>
          <Loader />
        </Center>
      </>
    );
  }
  return (
    <Center w="100%">
      <Stack>
        <Title
          align="center"
          mb="lg"
          style={{
            fontSize: "31px",
            fontWeight: 400,
            lineHeight: "37.2px",
          }}
        >
          Novedades Para Ti
        </Title>
        <SimpleGrid
          cols={4}
          spacing="xl"
          breakpoints={[
            { maxWidth: "74rem", cols: 3, spacing: "md" },
            { maxWidth: "56rem", cols: 2, spacing: "sm" },
            { maxWidth: "40rem", cols: 1, spacing: "sm" },
          ]}
        >
          {products.map((prod): any => (
            <ProductCard key={prod.uuidOffer} product={prod} />
          ))}
        </SimpleGrid>
      </Stack>
    </Center>
  );
};

export default FeaturedProducts;
