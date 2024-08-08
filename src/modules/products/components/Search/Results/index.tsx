import { useHits, useInstantSearch } from "react-instantsearch";
import ProductCard from "../../ProductCard";
import { Box, Grid, Typography } from "@mui/material";
import { Offer } from "generated/graphql";
import Loader from "@modules/components/LoadingScreen/Loader";
import { useMemo } from "react";
import { useBenefitFilters } from "@modules/products/context/BenefitContext";
import BenefitCard from "@modules/benefit/BenefitCard";

type AlgoliaHit = {
  [key: string]: any;
};

const cleanObjectKeys = (obj: AlgoliaHit): AlgoliaHit => {
  const cleanedObj: AlgoliaHit = {};
  for (const key in obj) {
    const cleanedKey = key.replace(/[^\x20-\x7E]/g, "");
    const value = obj[key];
    if (value && typeof value === "object" && "Valid" in value && value.Valid) {
      cleanedObj[cleanedKey] =
        "Float64" in value
          ? value.Float64
          : "String" in value
          ? value.String
          : value;
    } else {
      cleanedObj[cleanedKey] = value;
    }
  }
  if (obj["product_id"] === "") {
    cleanedObj["product_id"] = cleanedObj["objectID"];
  }
  return cleanedObj;
};

const FilteredAlgoliaProducts = () => {
  const { hits: dirtyHits } = useHits();
  const { status, error, results } = useInstantSearch();

  const hits = useMemo(
    () => dirtyHits.map((hit) => cleanObjectKeys(hit)),
    [dirtyHits]
  );

  console.log({ hits });

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
      {status === "loading" || status === "stalled" ? (
        <Loader />
      ) : status === "error" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <Typography variant="h6">
            Hubo un error en la busqueda: {error?.message}
          </Typography>
        </Box>
      ) : (results.nbHits ?? 0) === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <Typography variant="h6">No se encontraron resultados</Typography>
        </Box>
      ) : (
        <Grid
          container
          justifyContent="space-around"
          sx={{
            margin: 0,
            width: "100%",
          }}
          rowGap="40px"
          columnGap="30px"
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
      )}
    </Box>
  );
};

export const FilteredBenefits = () => {
  const { result } = useBenefitFilters();

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
      {(result?.benefits.edges.length ?? 0) === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <Typography variant="h6">No se encontraron resultados</Typography>
        </Box>
      ) : (
        <Grid
          container
          justifyContent="space-around"
          sx={{
            margin: 0,
            width: "100%",
          }}
          rowGap="40px"
          columnGap="30px"
        >
          {result?.benefits.edges.map((hit) => (
            <Grid item xs="auto" key={hit.node.id}>
              <BenefitCard product={hit.node} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FilteredAlgoliaProducts;
