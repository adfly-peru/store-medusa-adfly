import React from "react";
import { useRouter } from "next/router";
import Layout from "@modules/layout/templates";
import ProductInfo from "@modules/products/templates/product-info";
import { SingleProductProvider } from "@context/single-product-context";

export default function ProductPage() {
  const router = useRouter();
  const productID = router.query.product;

  return (
    <Layout>
      <SingleProductProvider>
        <ProductInfo productId={productID as string} />
      </SingleProductProvider>
    </Layout>
  );
}
