import ProductCard from "@modules/products/components/product-card";
import { useProduct } from "@context/product-context";
import { Grid } from "@mantine/core";

const SimilarProducts = () => {
  const { products } = useProduct();
  return (
    <>
      <Grid w="100%">
        {products.map((prod, i): any => (
          <Grid.Col key={i} xs={3}>
            <ProductCard product={prod} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default SimilarProducts;
