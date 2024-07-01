import React, { useState, useEffect, useMemo } from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useQuery, DocumentNode } from "@apollo/client";
import { PaginatedResult, SortInput, FilterInput } from "./types";

interface GenericDataGridProps<T> {
  query: DocumentNode;
  variables: Record<string, any>;
  columns: GridColDef[];
  mapData: (data: any) => T[];
  getTotalCount: (data: any) => number;
  initialPageSize?: number;
  filterFields?: string[];
}

const GenericDataGrid = <T,>({
  query,
  variables,
  columns,
  mapData,
  getTotalCount,
  initialPageSize = 10,
  filterFields = [],
}: GenericDataGridProps<T>) => {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: initialPageSize,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [totalRows, setTotalRows] = useState(0);

  const { loading, data, refetch } = useQuery<PaginatedResult<T>>(query, {
    variables: {
      ...variables,
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
      filters: filterModel.items.reduce((acc: FilterInput, item) => {
        if (filterFields.includes(item.field)) {
          acc[item.field as keyof FilterInput] = item.value;
        }
        return acc;
      }, {}),
      sort: sortModel.length
        ? {
            field: sortModel[0].field,
            direction:
              sortModel[0].sort!.toUpperCase() as SortInput["direction"],
          }
        : null,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    refetch();
  }, [paginationModel, sortModel, filterModel, refetch]);

  const rows = useMemo(() => (data ? mapData(data) : []), [data, mapData]);
  useEffect(() => {
    if (data) {
      const newTotalRows = getTotalCount(data);
      if (newTotalRows > 0) {
        setTotalRows(newTotalRows);
      }
    }
  }, [data, getTotalCount]);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pagination
        paginationMode="server"
        rowCount={totalRows}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        filterMode="server"
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
      />
    </div>
  );
};

export default GenericDataGrid;
