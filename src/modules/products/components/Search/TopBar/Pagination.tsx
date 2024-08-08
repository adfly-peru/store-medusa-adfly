import { useBenefitFilters } from "@modules/products/context/BenefitContext";
import { Pagination } from "@mui/material";
import React from "react";
import { usePagination } from "react-instantsearch";

const CustomPagination = () => {
  const { currentRefinement, nbPages, refine } = usePagination({
    padding: 1,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    refine(value - 1);
  };

  return (
    <Pagination
      count={nbPages}
      page={currentRefinement + 1}
      boundaryCount={1}
      siblingCount={1}
      onChange={handlePageChange}
    />
  );
};

export const BenefitsPagination = () => {
  const { result, setPage } = useBenefitFilters();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Pagination
      count={result?.benefits.pageInfo.totalPages}
      page={result?.benefits.pageInfo.currentPage ?? 0}
      boundaryCount={1}
      siblingCount={1}
      onChange={handlePageChange}
    />
  );
};

export default CustomPagination;
