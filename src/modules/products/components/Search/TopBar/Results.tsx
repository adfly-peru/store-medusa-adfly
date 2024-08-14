import { useBenefitFilters } from "@modules/products/context/BenefitContext";
import { useMarketplaceFilters } from "@modules/products/context/MarketplaceContext";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useInstantSearch } from "react-instantsearch";

const TotalResults = () => {
  const router = useRouter();
  const { results } = useInstantSearch();
  const { type } = router.query;
  const totalHits = results?.nbHits;

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          justifyContent: "space-between",
          padding: "0 20px",
        },
      })}
    >
      <Typography
        variant="subtitle1"
        fontSize={13}
        fontWeight={700}
        sx={(theme) => ({
          textDecoration: "underline",
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        })}
      >
        {type === "coupon" ? "Cupones" : "Tienda"}
      </Typography>
      <Typography variant="subtitle2">
        {totalHits !== undefined ? `(Resultados: ${totalHits})` : "Cargando..."}
      </Typography>
    </Stack>
  );
};

export const BenfitTotalResults = () => {
  const { result } = useBenefitFilters();
  const totalHits = result?.benefits.totalCount;

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          justifyContent: "space-between",
          padding: "0 20px",
        },
      })}
    >
      <Typography
        variant="subtitle1"
        fontSize={13}
        fontWeight={700}
        sx={(theme) => ({
          textDecoration: "underline",
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        })}
      >
        Beneficios
      </Typography>
      <Typography variant="subtitle2">
        {totalHits !== undefined ? `(Resultados: ${totalHits})` : "Cargando..."}
      </Typography>
    </Stack>
  );
};

export const MarketplaceTotalResults = () => {
  const { result } = useMarketplaceFilters();
  const totalHits = result?.marketplaceItems.totalCount;

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          justifyContent: "space-between",
          padding: "0 20px",
        },
      })}
    >
      <Typography
        variant="subtitle1"
        fontSize={13}
        fontWeight={700}
        sx={(theme) => ({
          textDecoration: "underline",
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        })}
      >
        Marketplace
      </Typography>
      <Typography variant="subtitle2">
        {totalHits !== undefined ? `(Resultados: ${totalHits})` : "Cargando..."}
      </Typography>
    </Stack>
  );
};

export default TotalResults;
