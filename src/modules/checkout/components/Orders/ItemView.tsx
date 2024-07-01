import { Stack, Typography } from "@mui/material";
import { CartItem } from "generated/graphql";
import Image from "next/image";

const ItemView = ({
  item,
  businessName,
}: {
  item: CartItem;
  businessName: string;
}) => {
  return (
    <Stack direction="row" spacing={1} my={2}>
      <img
        sizes="100vw"
        width={10}
        height={50}
        style={{
          width: "auto",
        }}
        src={
          item.variant.imageURL !== ""
            ? item.variant.imageURL
            : "/Logo Adfly.svg"
        }
        alt={item.variant.imageURL}
      />
      <Stack px={1}>
        <Typography variant="h5">{item.variant.offer.offerName}</Typography>
        <Typography variant="body1">{`Cantidad: ${item.quantity}`}</Typography>
        <Typography variant="body1">{`Subtotal: S/. ${item.subtotal}`}</Typography>
        <Typography variant="body1">{`Vendido y Entregado por: ${businessName}`}</Typography>
      </Stack>
    </Stack>
  );
};

export default ItemView;
