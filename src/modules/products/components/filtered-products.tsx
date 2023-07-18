import { Grid } from "@mantine/core";
import { useFilter } from "@context/filter-context";
import ProductCard from "@modules/products/components/product-card";

const FilteredProducts = () => {
  const { filteredProducts, category, brand } = useFilter();

  return (
    <Grid>
      {category.length == 0 && brand.length == 0
        ? filteredProducts.map((prod, i): any => (
            <Grid.Col key={i} xs={3}>
              <ProductCard product={prod} />
            </Grid.Col>
          ))
        : filteredProducts.map((prod, i): any =>
            category.includes(prod.subCategory.name) ||
            brand.includes(prod.brand.name) ? (
              <Grid.Col key={i} xs={3}>
                <ProductCard product={prod} />
              </Grid.Col>
            ) : null
          )}
    </Grid>
  );
};

export default FilteredProducts;
