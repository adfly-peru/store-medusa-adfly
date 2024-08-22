import DetailedMarketplaceItem from "@modules/marketplace/DetailedMarketplaceItem";
import { Box, CircularProgress } from "@mui/material";
import { useMarketplaceItemQuery } from "generated/graphql";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function ProductPage() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const id = router.query.item as string;
  const { data, loading } = useMarketplaceItemQuery({
    variables: {
      uuidbusiness: sessionData?.user?.uuidbusiness ?? "",
      id,
    },
  });

  const product = data?.marketplaceItem;

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <div>Item not found</div>;
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
      <DetailedMarketplaceItem item={product} action />
    </Box>
  );
}
