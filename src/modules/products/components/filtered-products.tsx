import { useFilteredProducts } from "@context/filtered-products-context";
import { Center, Loader, SimpleGrid } from "@mantine/core";
import ProductCard from "@modules/products/components/product-card";

const FilteredProducts = () => {
  const { products, loading } = useFilteredProducts();

  if (loading || !products) {
    return (
      <Center h="90%">
        <Loader />
      </Center>
    );
  }
  return (
    <SimpleGrid
      w="100%"
      cols={4}
      spacing="xl"
      breakpoints={[
        { maxWidth: "80rem", cols: 3, spacing: "md" },
        { maxWidth: "66rem", cols: 2, spacing: "sm" },
        { maxWidth: "40rem", cols: 1, spacing: "sm" },
      ]}
    >
      {products.offers.map((prod): any => (
        <Center key={prod.uuidOffer}>
          <ProductCard product={prod} key={prod.uuidOffer} />
        </Center>
      ))}
    </SimpleGrid>
  );
};

export default FilteredProducts;
