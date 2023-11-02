import ProductCard from "@modules/products/components/product-card";
import {
  Box,
  Center,
  Grid,
  Loader,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { Offer } from "@interfaces/productInterface";

const SimilarProducts = ({
  products,
  loading,
}: {
  products: Offer[];
  loading: boolean;
}) => {
  return (
    <Center mt="xl" w="100%">
      <Stack>
        <Title>Productos Relacionados</Title>
        {loading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <SimpleGrid
            cols={4}
            spacing="xl"
            breakpoints={[
              { maxWidth: "72rem", cols: 3, spacing: "md" },
              { maxWidth: "56rem", cols: 2, spacing: "sm" },
              { maxWidth: "40rem", cols: 1, spacing: "sm" },
            ]}
          >
            {products.map((prod, i): any => (
              <Center key={prod.uuidOffer}>
                <ProductCard key={prod.uuidOffer} product={prod} />
              </Center>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Center>
  );
};

export default SimilarProducts;
