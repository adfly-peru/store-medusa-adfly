import ProductCard from "@modules/products/components/product-card";
import { Title, SimpleGrid } from "@mantine/core";
import { useFeaturedProducts } from "@context/featured-products-context";
import { useEffect } from "react";

const FeaturedProducts = () => {
  const { products, fetchProducts } = useFeaturedProducts();
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Title>Productos Destacados (*)</Title>
      <SimpleGrid w="80%" cols={4} spacing="xl">
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
