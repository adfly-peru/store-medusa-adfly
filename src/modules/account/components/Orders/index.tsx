import { Icon } from "@iconify/react";
import GenericDataGrid from "@modules/components/DataGrid";
import { Divider, Stack, Typography } from "@mui/material";
import {
  GridActionsCellItem,
  GridRowParams,
  getGridDateOperators,
  getGridStringOperators,
} from "@mui/x-data-grid";
import {
  CollaboratorOrdersDocument,
  CollaboratorOrdersQuery,
} from "generated/graphql";
import { useRouter } from "next/router";

const OrdersView = () => {
  const router = useRouter();
  const mapData = (data: CollaboratorOrdersQuery): any[] => {
    return data.collaboratorOrders.edges.map((edge) => ({
      ...edge.node,
      id: edge.node.uuidorder,
      creationdate: new Date(edge.node.creationdate),
      updatedate: new Date(edge.node.updatedate),
    }));
  };
  const getTotalCount = (data: CollaboratorOrdersQuery): number => {
    return data.collaboratorOrders.totalCount;
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h3" fontSize={26}>
        Mis Compras
      </Typography>
      <Divider />
      <GenericDataGrid
        query={CollaboratorOrdersDocument}
        variables={{}}
        columns={[
          {
            field: "purchasenumber",
            headerName: "Numero de Orden",
            width: 250,
            filterOperators: getGridStringOperators().filter(
              (operator) => operator.value === "contains"
            ),
          },
          {
            field: "total",
            headerName: "Total",
            width: 150,
            valueFormatter: (value: any) => value.toFixed(2),
            filterable: false,
          },
          {
            field: "creationdate",
            headerName: "Fecha de Compra",
            width: 250,
            type: "date",
            filterOperators: getGridDateOperators().filter(
              (operator) =>
                operator.value === "after" || operator.value === "before"
            ),
          },
          {
            field: "updatedate",
            headerName: "Fecha de Actualización",
            width: 250,
            type: "date",
            filterOperators: getGridStringOperators().filter(
              (operator) =>
                operator.value === "after" || operator.value === "before"
            ),
          },
          {
            field: "actions",
            type: "actions",
            getActions: (params: GridRowParams) => [
              <GridActionsCellItem
                key="see-action"
                icon={<Icon icon="mdi:eye" height={25} />}
                label="Ver Orden"
                onClick={() => router.push(`/account/orders/${params.id}`)}
              />,
            ],
          },
        ]}
        mapData={mapData}
        getTotalCount={getTotalCount}
        filterFields={["purchasenumber", "creationdate", "updatedate"]}
      />
    </Stack>
  );
};

export default OrdersView;
