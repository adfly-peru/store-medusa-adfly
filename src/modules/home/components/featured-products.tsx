import ProductCard from "@modules/products/components/product-card";
import { useProduct } from "@context/product-context";
import { Title, Grid, SimpleGrid } from "@mantine/core";

const FeaturedProducts = () => {
  const { products } = useProduct();
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
