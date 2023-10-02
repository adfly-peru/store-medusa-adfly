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
        { maxWidth: "96rem", cols: 3, spacing: "md" },
        { maxWidth: "72rem", cols: 2, spacing: "sm" },
        { maxWidth: "48rem", cols: 1, spacing: "sm" },
      ]}
    >
      {products.products.map((prod, i): any => (
        <div key={i}>
          <ProductCard product={prod} />
        </div>
      ))}
    </SimpleGrid>
  );
};

export default FilteredProducts;
