import { useFilteredProducts } from "@context/filtered-products-context";
import { Center, Grid, Loader } from "@mantine/core";
import ProductCard from "@modules/products/components/product-card";

const FilteredProducts = () => {
  const { products, loading } = useFilteredProducts();

  if (!products) {
    return <></>;
  }

  if (loading) {
    return (
      <Center h="90%">
        <Loader />
      </Center>
    );
  }
  return (
    <Grid>
      {products.products.map((prod, i): any => (
        <Grid.Col key={i} xs={3}>
          <ProductCard product={prod} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default FilteredProducts;
