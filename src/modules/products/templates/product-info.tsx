import { Center, Container, Loader, Stack } from "@mantine/core";
import SimilarProducts from "@modules/products/components/similar-products";
import { DetailedProduct } from "@modules/products/components/detailed-product";
import { useSingleProduct } from "@context/single-product-context";
import { useEffect } from "react";
import { useAccount } from "@context/account-context";
import * as amplitude from "@amplitude/analytics-browser";

const ProductInfo = ({ productId }: { productId: string }) => {
  const {
    product,
    relatedProducts,
    fetchProduct,
    fetchRelatedProducts,
    loadingProduct,
    loadingRelateds,
    refetchProduct,
  } = useSingleProduct();
  const { collaborator } = useAccount();

  useEffect(() => {
    if (collaborator?.uuidcollaborator)
      fetchProduct(productId, collaborator.uuidcollaborator);
  }, [productId, collaborator]);

  useEffect(() => {
    if (product) {
      amplitude.track("Producto Visualizado", {
        productId: productId,
        productName: product.offer.offerName,
        business: product.offer.business.commercialname,
      });
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
      <Container maw="100%">
        <DetailedProduct
          product={product.offer}
          totalOrdered={product.totalLastPeriod}
          refetchFunction={() => {
            if (collaborator?.uuidcollaborator)
              refetchProduct(productId, collaborator.uuidcollaborator);
          }}
          lastcoupon={product.lastcoupon}
        />
      </Container>
      <Stack align="center" justify="flex-end" spacing="xl">
        <SimilarProducts products={relatedProducts} loading={loadingRelateds} />
      </Stack>
    </>
  );
};

export default ProductInfo;
