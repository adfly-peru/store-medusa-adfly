import { searchClient } from "@lib/algolia-client";
import { Box, Stack } from "@mui/material";
import { InstantSearch } from "react-instantsearch";
import FilterSection from "../components/Search/Filters";
import FilteredAlgoliaProducts, {
  FilteredBenefits,
} from "../components/Search/Results";
import AlgoliaTopBar, { BenefitsTopBar } from "../components/Search/TopBar";
import TotalResults, {
  BenfitTotalResults,
} from "../components/Search/TopBar/Results";
import CustomPagination, {
  BenefitsPagination,
} from "../components/Search/TopBar/Pagination";
import SectionDetails from "../components/Search/SectionDetails";
import { useRouter } from "next/router";
import { BenefitFiltersProvider } from "../context/BenefitContext";
import { BenefitsSideBar } from "../components/Search/FiltersBar";

const SearchProducts = () => {
  const router = useRouter();
  const { type } = router.query;
  if (type === "benefits")
    return (
      <Box
        sx={(theme) => ({
          paddingLeft: "0",
          paddingRight: "0",
          [theme.breakpoints.up("md")]: {
            paddingLeft: "27px",
            paddingRight: "27px",
          },
          [theme.breakpoints.up("lg")]: {
            paddingLeft: "117px",
            paddingRight: "117px",
          },
          marginBottom: 15,
        })}
      >
        <BenefitFiltersProvider>
          <SectionDetails />
          <BenfitTotalResults />
          <Stack
            sx={{
              width: "100%",
            }}
            justifyContent="space-between"
            spacing={{ xs: 0, md: 3 }}
            direction="row"
          >
            <BenefitsSideBar />
            <Stack
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <BenefitsTopBar />
              <FilteredBenefits />
              <div
                style={{
                  alignSelf: "center",
                }}
              >
                <BenefitsPagination />
              </div>
            </Stack>
          </Stack>
        </BenefitFiltersProvider>
      </Box>
    );
  return (
    <Box
      sx={(theme) => ({
        paddingLeft: "0",
        paddingRight: "0",
        [theme.breakpoints.up("md")]: {
          paddingLeft: "27px",
          paddingRight: "27px",
        },
        [theme.breakpoints.up("lg")]: {
          paddingLeft: "117px",
          paddingRight: "117px",
        },
        marginBottom: 15,
      })}
    >
      <InstantSearch
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
      >
        <SectionDetails />
        <TotalResults />
        <Stack
          sx={{
            width: "100%",
          }}
          justifyContent="space-between"
          spacing={{ xs: 0, md: 3 }}
          direction="row"
        >
          <FilterSection />
          <Stack
            spacing={1}
            sx={{
              width: "100%",
            }}
          >
            <AlgoliaTopBar />
            <FilteredAlgoliaProducts />
            <div
              style={{
                alignSelf: "center",
              }}
            >
              <CustomPagination />
            </div>
          </Stack>
        </Stack>
      </InstantSearch>
    </Box>
  );
};

export default SearchProducts;
