import React from "react";
import { useRouter } from "next/router";
import { Loader } from "@mantine/core";
import { useProduct } from "@context/product-context";
import Layout from "@modules/layout/templates";
import ProductInfo from "@modules/products/templates/product-info";

export default function ProductPage() {
  const router = useRouter();
  const productID = router.query.product;
  const { getProduct } = useProduct();
  const showProduct = getProduct(productID as string);

  if (showProduct == null) {
    return <Loader />;
  }

  return (
    <Layout>
      <ProductInfo product={showProduct} />
    </Layout>
  );
}
