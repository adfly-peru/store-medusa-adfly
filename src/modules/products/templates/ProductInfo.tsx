import * as amplitude from "@amplitude/analytics-browser";
import { useProductQuery } from "generated/graphql";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";
import { DetailedProduct } from "../components/DetailedProduct";
import { DetailedProductProvider } from "../context/DetailedProductContext";
import Loader from "@modules/components/LoadingScreen/Loader";

const ProductInfo = () => {
  const router = useRouter();
  const uuidproduct = router.query.product as string;
  const { data, loading, refetch } = useProductQuery({
    variables: {
      uuidproduct,
    },
  });

  const product = data?.offerForCollaborator;

  useEffect(() => {
    if (data?.offerForCollaborator)
      amplitude.track("Detailed Product", { data: data.offerForCollaborator });
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: "50px",
        paddingRight: "50px",
        [theme.breakpoints.down(481)]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      })}
    >
      <DetailedProductProvider
        offerForCollaborator={product}
        refetchFunction={async () => {
          await refetch({
            uuidproduct,
          });
        }}
      >
        <DetailedProduct />
      </DetailedProductProvider>
      {/* <SimilarProducts products={relatedProducts} loading={loadingRelateds} /> */}
    </Box>
  );
};

export default React.memo(ProductInfo);
