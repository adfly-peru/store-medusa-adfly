import ProductCard from "@modules/products/components/product-card";
import { Title, SimpleGrid, Center, Loader } from "@mantine/core";
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
        <Title align="center">Productos Destacados (*)</Title>
        <Center>
          <Loader />
        </Center>
      </>
    );
  }
  return (
    <>
      <Title align="center">Productos Destacados (*)</Title>
      <SimpleGrid
        w="80%"
        cols={4}
        spacing="xl"
        breakpoints={[
          { maxWidth: "72rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {products.map((prod, i): any => (
          <div key={i}>
            <ProductCard product={prod} />
          </div>
        ))}
      </SimpleGrid>
    </>
  );
};

export default FeaturedProducts;
