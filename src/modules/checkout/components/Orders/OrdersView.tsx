import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { CartQuery } from "generated/graphql";
import ItemView from "./ItemView";
import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import { useEffect } from "react";
import { useAccount } from "@context/account-context";

const OrderView = ({
  order,
  index,
  total,
}: {
  order: NonNullable<CartQuery["cart"]>["suborders"][number];
  index: number;
  total: number;
}) => {
  const { collaborator } = useAccount();
  const {
    ordersDeliveryInfo,
    setOrdersDeliveryInfo,
    promotions: cartPromotions,
  } = useCheckout();

  const handleDeliveryMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedMethod = (event.target as HTMLInputElement).value;

    let deliveryPrice = 0;
    if (selectedMethod === "onhome") {
      const price = order.availableDeliveryMethods?.deliveryOnHome?.price ?? 0;
      const isFree = !!cartPromotions?.PartnerPromotions?.find(
        (p) => p.UUIDPartner === order.uuidbusiness
      )?.FreeShippingPromotion;

      deliveryPrice = isFree ? 0 : price;
    }
    setOrdersDeliveryInfo((prev) => ({
      ...prev,
      [order.uuidbusiness]: {
        ...prev[order.uuidbusiness],
        selectedMethod,
        deliveryPrice,
      },
    }));
  };
  const handleStoreChange = (event: SelectChangeEvent<string>) => {
    const selectedStore = event.target.value;
    setOrdersDeliveryInfo((prev) => ({
      ...prev,
      [order.uuidbusiness]: {
        ...prev[order.uuidbusiness],
        selectedStore,
      },
    }));
  };

  const selectedDeliveryMethod =
    ordersDeliveryInfo[order.uuidbusiness]?.selectedMethod || "";

  const partnerPromotion = cartPromotions.PartnerPromotions?.find(
    (p) => p.UUIDPartner === order.uuidbusiness
  );

  useEffect(() => {
    if (!ordersDeliveryInfo[order.uuidbusiness]) {
      setOrdersDeliveryInfo((prev) => ({
        ...prev,
        [order.uuidbusiness]: { selectedMethod: "", deliveryPrice: 0 },
      }));
    }
  }, [order.uuidbusiness, ordersDeliveryInfo, setOrdersDeliveryInfo]);

  return (
    <Grid container>
      <Grid item xs={8}>
        <Typography variant="h4">{`Pedido ${index} de ${total}: Entregado por ${order.businessName}`}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4">Opciones de Envío</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={(theme) => ({ borderColor: theme.palette.grey[300] })} />
      </Grid>
      {!!partnerPromotion?.DiscountPromotion && (
        <Grid item xs={12}>
          <Typography variant="h4" color="#d32f2f">
            Descuento por promoción: S/.{" "}
            {partnerPromotion.DiscountPromotion.Discount}
          </Typography>
        </Grid>
      )}
      <Grid item xs={8}>
        {order.items.map((item) => (
          <ItemView
            key={item.uuidcartitem}
            item={item}
            businessName={order.businessName}
          />
        ))}
      </Grid>
      <Grid item xs={4}>
        <FormControl sx={{ marginTop: 1, marginBottom: 1 }}>
          <RadioGroup
            name={`radio-shipment-${order.uuidbusiness}`}
            value={selectedDeliveryMethod}
            onChange={handleDeliveryMethodChange}
          >
            {order.type === "service" && (
              <>
                <FormControlLabel
                  value="online"
                  control={<Radio />}
                  label="Entrega online"
                />
                <Typography
                  sx={{ marginLeft: 4, marginTop: -1 }}
                  fontSize={11}
                  variant="caption"
                >{`Se le enviará al siguiente correo: ${collaborator?.email}`}</Typography>
              </>
            )}
            {order.type === "product" &&
              order.availableDeliveryMethods?.deliveryOnHome && (
                <>
                  <FormControlLabel
                    value="onhome"
                    control={<Radio />}
                    label="Entrega en Dirección Personal"
                  />
                  <Typography
                    variant="caption"
                    sx={{ marginLeft: 4, marginTop: -1 }}
                    fontSize={11}
                  >
                    Costo de Envío:{" "}
                    <span
                      style={{
                        color: "black",
                        textDecoration:
                          !!partnerPromotion?.FreeShippingPromotion
                            ? "line-through"
                            : "none",
                      }}
                    >
                      S/. {order.availableDeliveryMethods.deliveryOnHome.price}
                    </span>
                    {!!partnerPromotion?.FreeShippingPromotion && (
                      <Typography
                        variant="inherit"
                        fontWeight={600}
                        color="primary"
                        component="span"
                      >
                        {" "}
                        Delivery Gratis
                      </Typography>
                    )}
                    <br />
                    Fecha de Entrega:{" "}
                    <span
                      style={{
                        color: "black",
                      }}
                    >
                      {
                        order.availableDeliveryMethods.deliveryOnHome
                          .timetodelivery
                      }
                    </span>
                    <br />
                    Especificaciones:{" "}
                    <span
                      style={{
                        color: "black",
                      }}
                    >
                      {order.availableDeliveryMethods.deliveryOnHome.comments}
                    </span>
                  </Typography>
                </>
              )}
            {order.type === "product" && (
              <>
                <FormControlLabel
                  value="pickup"
                  control={<Radio />}
                  label="Recojo en Tienda"
                  disabled={
                    (order.availableDeliveryMethods?.deliveryOnStore?.length ??
                      0) === 0
                  }
                />

                {(order.availableDeliveryMethods?.deliveryOnStore?.length ??
                  0) === 0 && (
                  <Typography
                    sx={{ marginLeft: 4, marginTop: -1 }}
                    fontSize={11}
                    variant="caption"
                  >
                    El partner aún no tiene tiendas de recojo habilitadas.
                  </Typography>
                )}
                {selectedDeliveryMethod === "pickup" && (
                  <Box
                    sx={{
                      marginLeft: 4,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <FormControl size="small">
                      <Select
                        id="select"
                        value={
                          ordersDeliveryInfo[order.uuidbusiness].selectedStore
                        }
                        onChange={handleStoreChange}
                        fullWidth
                      >
                        {order.availableDeliveryMethods?.deliveryOnStore?.map(
                          (item) => (
                            <MenuItem
                              key={item.uuiddeliverystore}
                              value={item.uuiddeliverystore}
                            >
                              {item.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                    <Typography variant="caption" fontSize={11}>
                      Dirección:{" "}
                      <span
                        style={{
                          color: "black",
                        }}
                      >
                        {` ${
                          order.availableDeliveryMethods?.deliveryOnStore?.find(
                            (v) =>
                              v.uuiddeliverystore ===
                              ordersDeliveryInfo[order.uuidbusiness]
                                .selectedStore
                          )?.line ?? "-"
                        }`}
                      </span>
                      <br />
                      Tiempo de Entrega:{" "}
                      <span
                        style={{
                          color: "black",
                        }}
                      >
                        {` ${
                          order.availableDeliveryMethods?.deliveryOnStore?.find(
                            (v) =>
                              v.uuiddeliverystore ===
                              ordersDeliveryInfo[order.uuidbusiness]
                                .selectedStore
                          )?.timetodelivery ?? "-"
                        }`}
                      </span>
                      <br />
                      Especificaciones:{" "}
                      <span
                        style={{
                          color: "black",
                        }}
                      >
                        {` ${
                          order.availableDeliveryMethods?.deliveryOnStore?.find(
                            (v) =>
                              v.uuiddeliverystore ===
                              ordersDeliveryInfo[order.uuidbusiness]
                                .selectedStore
                          )?.comments ?? "-"
                        }`}
                      </span>
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default OrderView;
