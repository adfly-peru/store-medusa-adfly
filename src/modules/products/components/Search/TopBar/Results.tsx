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
        {totalHits ? `(Resultados: ${totalHits})` : "Cargando..."}
      </Typography>
    </Stack>
  );
};

export default TotalResults;
