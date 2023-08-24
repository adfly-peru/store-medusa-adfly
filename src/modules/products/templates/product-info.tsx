import { Center, Container, Loader, Stack } from "@mantine/core";
import SimilarProducts from "@modules/products/components/similar-products";
import { DetailedProduct } from "@modules/products/components/detailed-product";
import { useProduct } from "@context/product-context";

const ProductInfo = ({ productId }: { productId: string }) => {
  const { getProduct } = useProduct();
  const product = getProduct(productId);

  if (product == null) {
    return <Loader />;
  }

  return (
    <>
      <Container maw="80%" mt={20}>
        <Center>
          <DetailedProduct product={product} />
        </Center>
      </Container>
      <Stack align="center" justify="flex-end" spacing="xl">
        <SimilarProducts />
      </Stack>
    </>
  );
};

export default ProductInfo;
