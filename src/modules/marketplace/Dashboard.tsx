/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import GenericDataGrid from "@modules/components/DataGrid";
import { Add, Search } from "@mui/icons-material";
import { Button, Stack, Typography, Divider, Chip } from "@mui/material";
import {
  getGridDateOperators,
  GridRowParams,
  GridActionsCellItem,
  getGridNumericOperators,
} from "@mui/x-data-grid";
import {
  CollaboratorMarketplaceItemsDocument,
  CollaboratorMarketplaceItemsQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import MarketplaceItemResume from "./components/MarketplaceItemResume";
import { useDialog } from "@context/DialogContext";

const options = [
  { value: "active", label: "Activo" },
  { value: "expired", label: "Expirado" },
  { value: "pending", label: "Pendiente" },
  { value: "rejected", label: "Rechazado" },
];

const MarketplaceDashboard = () => {
  const router = useRouter();
  const { openDialog } = useDialog();
  const mapData = (data: CollaboratorMarketplaceItemsQuery): any[] => {
    return data.collaboratorMarketplaceItems.edges.map((edge) => ({
      ...edge.node,
      creationdate: new Date(edge.node.creationdate),
      id: edge.node.uuidmarketplaceitem,
      item: edge.node,
    }));
  };
  const getTotalCount = (data: CollaboratorMarketplaceItemsQuery): number => {
    return data.collaboratorMarketplaceItems.totalCount;
  };
  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3" fontSize={26}>
          Administrar mis ofertas
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="small"
          onClick={() => router.push("/account/marketplace/new")}
        >
          Crear Oferta
        </Button>
      </Stack>
      <GenericDataGrid
        query={CollaboratorMarketplaceItemsDocument}
        variables={{}}
        columns={[
          {
            field: "title",
            headerName: "Nombre",
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
                    params.row.images.at(0)
                      ? params.row.images.at(0)
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
            field: "price",
            headerName: "Precio",
            width: 100,
            headerAlign: "left",
            type: "number",
            filterOperators: getGridNumericOperators().filter(
              (operator) => operator.value === ">=" || operator.value === "<="
            ),
            renderCell: (params) => `S/. ${params.value.toFixed(2)}`,
          },
          {
            headerName: "Estado",
            field: "itemstatus",
            type: "singleSelect",
            width: 150,
            sortable: false,
            valueOptions: options.map((opt) => opt.value),
            getOptionLabel: (value) => {
              const option = options.find((opt) => opt.value === value);
              return option ? option.label : "";
            },
            renderCell: (params) => {
              const option = options.find((opt) => opt.value === params.value);
              return option ? <Chip label={option.label} /> : null;
            },
          },
          {
            field: "actions",
            type: "actions",
            getActions: (params: GridRowParams) => [
              <GridActionsCellItem
                key={`view-${params.id}`}
                label="Ver"
                sx={{ color: "primary.main" }}
                icon={<Search height={24} />}
                onClick={() =>
                  openDialog({
                    width: 580,
                    title: "Información de la oferta",
                    closable: true,
                    content: <MarketplaceItemResume item={params.row.item} />,
                  })
                }
              />,
            ],
          },
        ]}
        mapData={mapData}
        getTotalCount={getTotalCount}
        filterFields={["itemstatus", "creationdate", "title", "price"]}
      />
      <Divider />
    </Stack>
  );
};

export default MarketplaceDashboard;
