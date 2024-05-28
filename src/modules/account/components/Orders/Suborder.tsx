import {
  DeliveryMethod,
  SuborderStatus,
  deliveryMethodInfo,
  suborderStatuses,
} from "@modules/common/types";
import { Divider, Stack, Typography } from "@mui/material";
import { Suborder } from "generated/graphql";
import Image from "next/image";

const SuborderInformation = ({
  suborder,
  index,
  total,
}: {
  suborder: Suborder;
  index: number;
  total: number;
}) => {
  return (
    <Stack spacing={2}>
      {!!index && <Divider />}
      <Typography variant="h3">
        Envío {index + 1} de {total} Vendido y entregado por{" "}
        {suborder.sellerName}
      </Typography>
      <Typography variant="h5">
        Estado de entrega:{" "}
        <Typography component="span" variant="inherit" fontWeight={500}>
          {`${suborderStatuses[suborder.status as SuborderStatus]}`}
        </Typography>
      </Typography>
      <Typography variant="h5">
        Comentarios:
        <br />
        <Typography component="span" variant="body2" fontWeight={500}>
          Método de Entrega:{" "}
          {
            deliveryMethodInfo[
              (suborder.deliveryMethod ?? "null") as DeliveryMethod
            ]
          }
          {suborder.deliveryMethod === "pickup"
            ? ` (${suborder.details?.name})`
            : ""}
          <br />
          Dirección Entrega: {suborder.details?.address || "-"}
          <br />
          Tiempo Entrega: {suborder.deliveryTime || "-"}
          <br />
          Especificaciones: {suborder.details?.comments || "-"}
        </Typography>
      </Typography>
      <Stack spacing={2}>
        {suborder.items.map((item) => (
          <Stack
            key={item.uuidorderitem}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={1}>
              <Image
                sizes="100vw"
                width={10}
                height={50}
                style={{
                  width: "auto",
                }}
                src={item.details?.imageurl ?? "/Logo Adfly.svg"}
                alt={item.uuidorderitem}
              />
              <Typography variant="h5" maxWidth={300}>
                {item.details?.productname ?? "-"}
                <br />
                <Typography component="span">
                  SKU: {item.details?.variantsku ?? "-"}
                  <br />
                  Cantidad: {item.quantity ?? "-"}
                  <br />
                </Typography>
              </Typography>
            </Stack>
            <Typography variant="caption" fontWeight={600}>
              S/.{item.subtotal.toFixed(2)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default SuborderInformation;
