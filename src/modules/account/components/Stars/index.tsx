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
  CollaboratorStarsDocument,
  CollaboratorStarsQuery,
} from "generated/graphql";
import { useRouter } from "next/router";

const StarsView = () => {
  const router = useRouter();
  const mapData = (data: CollaboratorStarsQuery): any[] => {
    return data.collaboratorStars.edges.map((edge) => ({
      ...edge.node,
      creationdate: new Date(edge.node.creationdate),
      id: edge.node.uuidstars,
    }));
  };
  const getTotalCount = (data: CollaboratorStarsQuery): number => {
    return data.collaboratorStars.totalCount;
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h3" fontSize={26}>
        Mis Estrellas
      </Typography>
      <Divider />
      <GenericDataGrid
        query={CollaboratorStarsDocument}
        variables={{}}
        columns={[
          {
            field: "creationdate",
            headerName: "Fecha",
            width: 250,
            type: "date",
            filterOperators: getGridDateOperators().filter(
              (operator) =>
                operator.value === "after" || operator.value === "before"
            ),
          },
          {
            field: "amount",
            headerName: "Monto",
            width: 150,
            valueFormatter: (value: any) => value.toFixed(2),
            filterable: false,
          },
          {
            field: "operation",
            headerName: "Operacion",
            width: 250,
            valueFormatter: (value: string) =>
              value === "input" ? "Ingreso" : "Salida",
          },
          {
            field: "reason",
            headerName: "Motivo",
            width: 250,
            filterOperators: getGridStringOperators().filter(
              (operator) => operator.value === "contains"
            ),
          },
          {
            field: "actions",
            type: "actions",
            getActions: (params: GridRowParams) => [
              <GridActionsCellItem
                disabled={!params.row.uuidorder}
                key="see-action"
                icon={<Icon icon="mdi:eye" height={25} />}
                label="Ver Orden"
                onClick={() =>
                  router.push(`/account/orders/${params.row.uuidorder}`)
                }
              />,
            ],
          },
        ]}
        mapData={mapData}
        getTotalCount={getTotalCount}
        filterFields={["creationdate", "reason"]}
      />
    </Stack>
  );
};

export default StarsView;
