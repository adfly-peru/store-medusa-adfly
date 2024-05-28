import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import Image from "next/image";
import { Stack, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { CartItem } from "generated/graphql";
import { useCart } from "@context/cart-context";

interface RowItem {
  id: number;
  image: string;
  name: string;
  prices: {
    offerPrice?: number;
    adflyPrice: number;
    refPrice: number;
    finalPrice: number;
  };
  quantity: number;
  subtotal: number;
}

const ProductCartTable = ({ items }: { items: CartItem[] }) => {
  const { editProduct, removeProduct } = useCart();
  const rows: RowItem[] = items.map((item, index) => ({
    id: index,
    name: item.variant.offer.offerName,
    quantity: item.quantity,
    subtotal: item.subtotal,
    image: item.variant.imageURL,
    prices: {
      offerPrice:
        (item.variant.offerPrice ?? 0) > 0
          ? item.variant.offerPrice ?? 0
          : undefined,
      adflyPrice: item.variant.adflyPrice,
      refPrice: item.variant.refPrice,
      finalPrice:
        (item.variant.offerPrice ?? 0) > 0
          ? item.variant.offerPrice ?? 0
          : item.variant.adflyPrice,
    },
    item: item,
  }));
  const columns: GridColDef<RowItem[][number]>[] = [
    {
      field: "name",
      headerName: "Detalle",
      flex: 4,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            height: "100%",
            padding: "10px 0",
          }}
        >
          <Image
            sizes="100vw"
            width={10}
            height={10}
            style={{
              height: "100%",
              width: "auto",
            }}
            src={params.row.image !== "" ? params.row.image : "/Logo Adfly.svg"}
            alt={params.row.image}
          />
          <Typography variant="h3">{params.row.name}</Typography>
        </Stack>
      ),
    },
    {
      field: "prices.finalPrice",
      headerName: "Precio",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <Stack
          justifyContent="center"
          sx={{
            height: "100%",
          }}
        >
          {params.row.prices.offerPrice && (
            <Typography variant="body2" fontWeight={700} textAlign="center">
              S/. {params.row.prices.offerPrice.toFixed(2)}
            </Typography>
          )}
          <Typography
            variant="body2"
            fontWeight={700}
            textAlign="center"
            sx={{
              textDecoration: params.row.prices.offerPrice
                ? "line-through"
                : "none",
            }}
          >
            S/. {params.row.prices.adflyPrice.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textDecoration: "line-through",
            }}
            textAlign="center"
          >
            S/. {params.row.prices.refPrice.toFixed(2)}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <Stack justifyContent="center" sx={{ height: "100%" }}>
          <Typography textAlign="center" variant="body2" fontWeight={700}>
            {`${params.value} unidad(es)`}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <Stack justifyContent="center" sx={{ height: "100%" }}>
          <Typography
            textAlign="center"
            variant="body2"
            fontWeight={700}
          >{`S/. ${params.value.toFixed(2)}`}</Typography>
        </Stack>
      ),
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key="delete-action"
          icon={<Delete color="error" />}
          label="Eliminar"
          onClick={() =>
            removeProduct(
              (params.row.item as CartItem).uuidcartitem,
              (params.row.item as CartItem).uuidcartsuborder
            )
          }
        />,
      ],
    },
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        rowHeight={100}
        sx={{
          "& .MuiDataGrid-filler": {
            height: "0 !important",
          },
        }}
      />
    </>
  );
};

export default ProductCartTable;
