import { Grid } from "@mantine/core";
import { useFilter } from "@context/filter-context";
import CardComponent from "@components/cardComponent";

const FilteredCard = () => {
  const { filteredProducts, category, brand } = useFilter();

  return (
    <Grid>
      {category.length == 0 && brand.length == 0
        ? filteredProducts.map((prod, i): any => (
            <Grid.Col key={i} xs={3}>
              <CardComponent product={prod} />
            </Grid.Col>
          ))
        : filteredProducts.map((prod, i): any =>
            category.includes(prod.subCategory) ||
            brand.includes(prod.brand) ? (
              <Grid.Col key={i} xs={3}>
                <CardComponent product={prod} />
              </Grid.Col>
            ) : null
          )}
    </Grid>
  );
};

export default FilteredCard;
