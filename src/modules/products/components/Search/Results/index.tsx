import { useHits } from "react-instantsearch";
import ProductCard from "../../ProductCard";
import { Box, Grid } from "@mui/material";
import { Offer } from "generated/graphql";

const FilteredAlgoliaProducts = () => {
  const { hits } = useHits();

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        [theme.breakpoints.down("md")]: {
          paddingLeft: "20px",
          paddingRight: "20px",
        },
      })}
    >
      <Grid
        container
        justifyContent="space-between"
        sx={{
          margin: 0,
          width: "100%",
        }}
        spacing={{
          xs: 0,
          sm: 5,
        }}
      >
        {hits.map((hit: any) => (
          <Grid item xs="auto" key={hit.objectID}>
            <ProductCard
              product={
                {
                  uuidOffer: hit.product_id,
                  offerName: hit.product_name,
                  description: hit.product_description,
                  principalSku: hit.principal_sku,
                  type: hit.product_type,
                  offerAttributes: [],
                  creationDate: hit.creation_date,
                  updateDate: hit.update_date,
                  tags: hit.product_tags,
                  details: {
                    refPrice: hit.ref_price,
                    adflyPrice: hit.adfly_price,
                    offerPrice: hit.offer_price,
                    imageURL: hit.image_url,
                    discountType: hit.coupon_type,
                    discount: hit.coupon_discount,
                  },
                  variant: [],
                  brand: {
                    name: hit.brand_name,
                  },
                  department: {
                    name: hit.department_name,
                  },
                  business: {
                    uuidbusiness: "",
                    businessname: hit.business_name,
                    commercialname: hit.commercial_name,
                    deliveryMethods: {
                      deliveryonline: false,
                      deliveryonhome: false,
                      deliveryonstore: false,
                    },
                  },
                  category: {
                    name: hit.category_name,
                  },
                  subCategory: {
                    name: hit.subcategory_name,
                  },
                  status: hit.product_status,
                } as any as Offer
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FilteredAlgoliaProducts;
