import React from "react";
import { useRouter } from "next/router";
import { CardProductDetails } from "@components/cardProductDetailsComponent";
import { Container, Grid, Loader, Stack } from "@mantine/core";
import CardComponent from "@components/cardComponent";
import { useProduct } from "@context/product-context";
import Layout from "@modules/layout/templates";

export default function ProductInfo() {
  const router = useRouter();
  const productID = router.query.product;
  const { getProduct, products } = useProduct();
  const showProduct = getProduct(productID as string);

  if (showProduct == null) {
    return <Loader />;
  }

  return (
    <Layout>
      <Container mt={20}>
        <CardProductDetails product={showProduct} />
      </Container>

      <Stack align="center" justify="flex-end" spacing="xl">
        <Grid w="100%">
          {products.map((prod, i): any => (
            <Grid.Col key={i} xs={3}>
              <CardComponent product={prod} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Layout>
  );
}
