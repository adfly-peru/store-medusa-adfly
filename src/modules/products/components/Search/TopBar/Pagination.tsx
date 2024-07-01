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
      siblingCount={0}
      onChange={handlePageChange}
    />
  );
};

export default CustomPagination;
