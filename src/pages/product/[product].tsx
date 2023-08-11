import React from "react";
import { useRouter } from "next/router";
import Layout from "@modules/layout/templates";
import ProductInfo from "@modules/products/templates/product-info";

export default function ProductPage() {
  const router = useRouter();
  const productID = router.query.product;

  return (
    <Layout>
      <ProductInfo productId={productID as string} />
    </Layout>
  );
}
