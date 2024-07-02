import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { CartItem } from "generated/graphql";
import { useCart } from "@context/cart-context";
import { useState } from "react";
import DynamicAlert from "@modules/components/Alert";
import NumberInput from "@modules/components/NumberInput";

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
  item: CartItem;
  maxQuantity: number;
}

const ProductCartTable = ({ items }: { items: CartItem[] }) => {
  const { editProduct, removeProduct } = useCart();
  const [loading, setLoading] = useState(false);
  const [triggerAlert, setTriggerAlert] = useState(false);
  const [alertFunc, setAlertFunc] = useState<() => Promise<void>>(
    () => async () => {}
  );
  const [alertMessage, setAlertMessage] = useState("");

  const handleAction = async (func: () => Promise<void>) => {
    setLoading(true);
    await func();
    setLoading(false);
  };

  const handleOpenAlert = (func: () => Promise<void>, message: string) => {
    setAlertFunc(() => func);
    setAlertMessage(message);
    setTriggerAlert(true);
  };

  const rows: RowItem[] = items.map((item, index) => {
    const allowed =
      (item.variant.maxQuantity ?? 0) - (item.variant.totalLastPeriod ?? 0);

    return {
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
      maxQuantity: Math.min(allowed, item.variant.maxQuantity ?? 0),
    };
  });
  const columns: GridColDef<RowItem[][number]>[] = [
    {
      field: "name",
      headerName: "Detalle",
      flex: 2,
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
          <img
            sizes="100vw"
            width={200}
            height={190}
            src={params.row.image !== "" ? params.row.image : "/Logo Adfly.svg"}
            alt={params.row.image}
          />
          <Typography variant="h3" fontSize={18}>
            {params.row.name}
          </Typography>
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
      renderCell: (params) => {
        return (
          <Stack justifyContent="center" sx={{ height: "100%" }} spacing={1}>
            <NumberInput
              value={params.value}
              onChange={(_, newValue) =>
                handleOpenAlert(
                  () =>
                    handleAction(() =>
                      editProduct(
                        params.row.item,
                        params.row.item.uuidcartsuborder,
                        newValue ?? 0
                      )
                    ),
                  "Su carrito ha sido actualizado con éxito"
                )
              }
              min={1}
              max={params.row.maxQuantity}
            />
            <Typography textAlign="center" variant="body2" fontWeight={700}>
              {`Max: ${params.row.maxQuantity} unidad(es)`}
            </Typography>
          </Stack>
        );
      },
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
            handleOpenAlert(
              () =>
                handleAction(() =>
                  removeProduct(
                    (params.row.item as CartItem).uuidcartitem,
                    (params.row.item as CartItem).uuidcartsuborder
                  )
                ),
              "Su carrito ha sido actualizado con éxito"
            )
          }
        />,
      ],
    },
  ];

  return (
    <Box position="relative" sx={{ width: "100%" }}>
      <Backdrop
        sx={(theme) => ({
          color: theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(1px)",
          borderRadius: 1,
        })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
      <DynamicAlert
        func={alertFunc}
        message={alertMessage}
        trigger={triggerAlert}
        onResetTrigger={() => setTriggerAlert(false)}
      />
    </Box>
  );
};

export default ProductCartTable;
