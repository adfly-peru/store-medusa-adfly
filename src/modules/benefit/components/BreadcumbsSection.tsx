import { NavigateNext, Home } from "@mui/icons-material";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { Benefit } from "generated/graphql";

export function BenefitBreadcumbsSection({ product }: { product: Benefit }) {
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link underline="hover" color="inherit" href={"/home"}>
        <Home />
      </Link>
      <Link underline="hover" color="inherit" href={`/search?type=benefit`}>
        Beneficios Internos
      </Link>
      <Typography color="text.primary">{product.name}</Typography>
    </Breadcrumbs>
  );
}
