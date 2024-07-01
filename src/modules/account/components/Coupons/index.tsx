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
  CollaboratorCouponsDocument,
  CollaboratorCouponsQuery,
} from "generated/graphql";
import { useRouter } from "next/router";

const CouponsView = () => {
  const router = useRouter();
  const mapData = (data: CollaboratorCouponsQuery): any[] => {
    return data.collaboratorCoupons.edges.map((edge) => ({
      ...edge.node,
      dateused: new Date(edge.node.dateused),
      id: edge.node.uuidcouponcollaboratorusage,
    }));
  };
  const getTotalCount = (data: CollaboratorCouponsQuery): number => {
    return data.collaboratorCoupons.totalCount;
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h3" fontSize={26}>
        Mis Cupones
      </Typography>
      <Divider />
      <GenericDataGrid
        query={CollaboratorCouponsDocument}
        variables={{}}
        columns={[
          {
            field: "dateused",
            headerName: "Fecha",
            width: 250,
            type: "date",
            filterOperators: getGridDateOperators().filter(
              (operator) =>
                operator.value === "after" || operator.value === "before"
            ),
          },
          {
            field: "businessname",
            headerName: "Partner",
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
                key="see-action"
                icon={<Icon icon="mdi:eye" height={25} />}
                label="Ver Cupon"
                onClick={() => router.push(`/account/coupons/${params.id}`)}
              />,
            ],
          },
        ]}
        mapData={mapData}
        getTotalCount={getTotalCount}
        filterFields={["businessname", "dateused"]}
      />
    </Stack>
  );
};

export default CouponsView;
