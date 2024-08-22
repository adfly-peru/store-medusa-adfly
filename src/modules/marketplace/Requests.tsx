/* eslint-disable @next/next/no-img-element */
import GenericDataGrid from "@modules/components/DataGrid";
import { Search } from "@mui/icons-material";
import { Stack, Typography, Divider } from "@mui/material";
import {
  getGridDateOperators,
  GridRowParams,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import {
  MarketplacerequestsDocument,
  MarketplacerequestsQuery,
} from "generated/graphql";
import { useRouter } from "next/router";

const MarketplaceRequests = () => {
  const router = useRouter();
  const mapData = (data: MarketplacerequestsQuery): any[] => {
    return data.marketplacerequests.edges.map((edge) => ({
      ...edge.node,
      creationdate: new Date(edge.node.creationdate),
      id: edge.node.id,
      item: edge.node,
      name: edge.node.offer?.title ?? "-",
    }));
  };
  const getTotalCount = (data: MarketplacerequestsQuery): number => {
    return data.marketplacerequests.totalCount;
  };
  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="flex-start">
        <Typography variant="h3" fontSize={26}>
          Mis solicitudes
        </Typography>
      </Stack>
      <GenericDataGrid
        query={MarketplacerequestsDocument}
        variables={{}}
        columns={[
          {
            field: "name",
            headerName: "Oferta",
            width: 350,
            renderCell: (params) => (
              <Stack
                direction="row"
                width="100%"
                alignItems="center"
                gap={2}
                height={52}
              >
                <img
                  sizes="100vw"
                  style={{
                    height: "52px",
                    width: "52px",
                    objectFit: "contain",
                  }}
                  src={
                    params.row.offer.images.at(0)
                      ? params.row.offer.images.at(0)
                      : "/logo_adfly.svg"
                  }
                  alt={params.value}
                />
                <Typography
                  variant="h3"
                  fontSize={18}
                  textAlign="start"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {params.value}
                </Typography>
              </Stack>
            ),
          },
          {
            field: "fullname",
            headerName: "Nombre",
            width: 130,
          },
          {
            field: "creationdate",
            headerName: "Fecha Publicada",
            width: 130,
            type: "date",
            filterOperators: getGridDateOperators().filter(
              (operator) =>
                operator.value === "after" || operator.value === "before"
            ),
          },
          {
            field: "actions",
            type: "actions",
            getActions: (params: GridRowParams) => [
              <GridActionsCellItem
                showInMenu
                key={`view-${params.id}`}
                label="Ver"
                icon={<Search height={24} />}
                onClick={() =>
                  router.push(`/account/marketplace/requests/${params.id}`)
                }
              />,
            ],
          },
        ]}
        mapData={mapData}
        getTotalCount={getTotalCount}
        filterFields={["fullname", "creationdate"]}
      />
      <Divider />
    </Stack>
  );
};

export default MarketplaceRequests;
