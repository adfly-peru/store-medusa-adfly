import { useHits, useInstantSearch } from "react-instantsearch";
import ProductCard from "../../ProductCard";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Offer } from "generated/graphql";
import Loader from "@modules/components/LoadingScreen/Loader";
import { useEffect, useMemo } from "react";
import { useBenefitFilters } from "@modules/products/context/BenefitContext";
import BenefitCard from "@modules/benefit/BenefitCard";
import { useMarketplaceFilters } from "@modules/products/context/MarketplaceContext";
import MarketplaceItemCard from "@modules/marketplace/MarketplaceItemCard";
import * as amplitude from "@amplitude/analytics-browser";

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

  useEffect(() => {
    amplitude.track("Algolia: hits getted", { dirtyHits });
  }, [dirtyHits]);

  useEffect(() => {
    amplitude.track("Algolia: status", { status });
  }, [status]);

  useEffect(() => {
    amplitude.track("Algolia: results", { results });
  }, [results]);

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
                      refPrice:
                        typeof hit.ref_price === "string"
                          ? Number(hit.ref_price)
                          : hit.ref_price,
                      adflyPrice:
                        typeof hit.adfly_price === "string"
                          ? Number(hit.adfly_price)
                          : hit.adfly_price,
                      offerPrice:
                        typeof hit.offer_price === "string"
                          ? Number(hit.offer_price)
                          : hit.offer_price,
                      imageURL: hit.image_url,
                      discountType: hit.coupon_type,
                      discount:
                        typeof hit.coupon_discount === "string"
                          ? Number(hit.coupon_discount)
                          : hit.coupon_discount,
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
  const { result, loading } = useBenefitFilters();

  useEffect(() => {
    amplitude.track("DB Benefits: result", { result });
  }, [result]);

  if (loading)
    return (
      <Box
        sx={(theme) => ({
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          [theme.breakpoints.down("md")]: {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
        })}
      >
        <CircularProgress />
      </Box>
    );

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

export const FilteredMarketplace = () => {
  const { result, loading } = useMarketplaceFilters();

  useEffect(() => {
    amplitude.track("DB marketplace: result", { result });
  }, [result]);

  if (loading)
    return (
      <Box
        sx={(theme) => ({
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          [theme.breakpoints.down("md")]: {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
        })}
      >
        <CircularProgress />
      </Box>
    );

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
      {(result?.marketplaceItems.edges.length ?? 0) === 0 ? (
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
          {result?.marketplaceItems.edges.map((hit) => (
            <Grid item xs="auto" key={hit.node.uuidmarketplaceitem}>
              <MarketplaceItemCard product={hit.node} action />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FilteredAlgoliaProducts;
