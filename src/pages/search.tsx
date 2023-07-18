import { useRouter } from "next/router";
import { FilterProvider } from "@context/filter-context";
import Layout from "@modules/layout/templates";
import SearchProducts from "@modules/products/templates/search-products";

export default function Search() {
  const router = useRouter();
  const searchable = router.query.data;
  return (
    <Layout>
      <FilterProvider filter={typeof searchable == "string" ? searchable : ""}>
        <SearchProducts searchable={searchable} />
      </FilterProvider>
    </Layout>
  );
}
