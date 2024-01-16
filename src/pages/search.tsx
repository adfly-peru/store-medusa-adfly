import { useRouter } from "next/router";
import Layout from "@modules/layout/templates";
import SearchProducts from "@modules/products/templates/search-products";
import { FilteredProductsProvider } from "@context/filtered-products-context";

export default function Search() {
  const router = useRouter();
  const searchable = router.query.data || "";
  const departmentName = router.query.department || "";
  const campaignName = router.query.campaign || "";
  return (
    <Layout>
      <FilteredProductsProvider>
        <SearchProducts
          searchable={typeof searchable == "string" ? searchable : ""}
          departmentName={
            typeof departmentName == "string" ? departmentName : ""
          }
          campaign={typeof campaignName == "string" ? campaignName : ""}
        />
      </FilteredProductsProvider>
    </Layout>
  );
}
