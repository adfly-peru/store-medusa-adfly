import { Product } from "@interfaces/productInterface";
import { Container, Stack } from "@mantine/core";
import SimilarProducts from "@modules/products/components/similar-products";
import { DetailedProduct } from "@modules/products/components/detailed-product";

const ProductInfo = ({ product }: { product: Product }) => {
  return (
    <>
      <Container mt={20}>
        <DetailedProduct product={product} />
      </Container>
      <Stack align="center" justify="flex-end" spacing="xl">
        <SimilarProducts />
      </Stack>
    </>
  );
};

export default ProductInfo;
