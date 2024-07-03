import { useDetailedProduct } from "@modules/products/context/DetailedProductContext";
import { NavigateNext, Home } from "@mui/icons-material";
import { Breadcrumbs, Typography, Link } from "@mui/material";

export function BreadcumbsSection() {
  const { product } = useDetailedProduct();
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link underline="hover" color="inherit" href={"/home"}>
        <Home />
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href={`/search?department_name=${product.department.name}`}
      >
        {product.department.name}
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href={`/search?category_name=${product.category.name}`}
      >
        {product.category.name}
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href={`/search?subcategory_name=${product.subCategory.name}`}
      >
        {product.subCategory.name}
      </Link>
      <Typography color="text.primary">
        {product.offerName.length > 40
          ? `${product.offerName.slice(0, 40)}...`
          : product.offerName}
      </Typography>
    </Breadcrumbs>
  );
}
