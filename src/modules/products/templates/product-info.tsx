import { Center, Container, Loader, Stack } from "@mantine/core";
import SimilarProducts from "@modules/products/components/similar-products";
import { DetailedProduct } from "@modules/products/components/detailed-product";
import { useSingleProduct } from "@context/single-product-context";
import { useEffect } from "react";

const ProductInfo = ({ productId }: { productId: string }) => {
  const {
    product,
    relatedProducts,
    fetchProduct,
    fetchRelatedProducts,
    loadingProduct,
    loadingRelateds,
  } = useSingleProduct();

  useEffect(() => {
    fetchProduct(productId);
  }, []);

  useEffect(() => {
    if (product) {
      fetchRelatedProducts(productId);
    }
  }, [product]);

  if (product == null || loadingProduct) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Container maw="80%" mt={20}>
        <Center>
          <DetailedProduct product={product} />
        </Center>
      </Container>
      <Stack align="center" justify="flex-end" spacing="xl">
        <SimilarProducts products={relatedProducts} loading={loadingRelateds} />
      </Stack>
    </>
  );
};

export default ProductInfo;
