import ProductCard from "@modules/products/components/product-card";
import { Box, Center, Grid, Loader, Title } from "@mantine/core";
import { Product } from "@interfaces/productInterface";

const SimilarProducts = ({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) => {
  return (
    <Box mt="xl" w="90%">
      <Title>Productos Relacionados</Title>
      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Grid w="100%">
          {products.map((prod, i): any => (
            <Grid.Col key={i} xs={3}>
              <ProductCard product={prod} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SimilarProducts;
