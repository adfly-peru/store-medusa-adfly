import ProductCard from "@modules/products/components/product-card";
import { useProduct } from "@context/product-context";
import { Title, Grid } from "@mantine/core";

const FeaturedProducts = () => {
  const { products } = useProduct();
  return (
    <>
      <Title>Productos Destacados (*)</Title>
      <Grid w="100%" mt={20}>
        {products.map((prod, i): any => (
          <Grid.Col key={i} xs={3}>
            <ProductCard product={prod} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default FeaturedProducts;
