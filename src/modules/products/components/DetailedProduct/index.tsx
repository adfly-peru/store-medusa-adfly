import { TimePeriod, purchasePeriodTime } from "@modules/common/types";
import * as amplitude from "@amplitude/analytics-browser";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import NumberInput from "@modules/components/NumberInput";
import { Icon } from "@iconify/react";
import { ProductImages } from "./ImageSection";
import { Details } from "./DetailsSection";
import { BreadcumbsSection } from "./BreadcumbsSection";
import { Delivery } from "./DeliverySection";
import { Attributes } from "./AttributesSection";
import { CouponResponse } from "./CouponResponse";
import { useDetailedProduct } from "@modules/products/context/DetailedProductContext";
import DynamicAlert from "@modules/components/Alert";
import { useState } from "react";
import { useAccount } from "@context/account-context";

export function DetailedProduct({}: {}) {
  const { collaborator, handleAuthentication } = useAccount();
  const {
    handleAddProduct,
    product,
    selectedVariant,
    value,
    setValue,
    stock,
    maxUnitsPerUser,
    unitsOrdered,
    itemFromCart,
    lastcoupon,
    handleGenerateCoupon,
  } = useDetailedProduct();
  const [loading, setLoading] = useState(false);
  const [triggerAlert, setTriggerAlert] = useState(false);
  const [alertFunc, setAlertFunc] = useState<() => Promise<void>>(
    () => async () => {}
  );
  const [alertMessage, setAlertMessage] = useState("");

  const handleAction = async () => {
    setLoading(true);
    if (product.type === "coupon") await handleGenerateCoupon();
    else await handleAddProduct();
    setLoading(false);
  };

  const handleOpenAlert = (func: () => Promise<void>, message: string) => {
    if (!collaborator) {
      handleAuthentication();
      return;
    }
    setAlertFunc(() => func);
    setAlertMessage(message);
    setTriggerAlert(true);
  };

  if (!selectedVariant) return <></>;

  return (
    <Box
      sx={{
        marginTop: "40px",
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      <CouponResponse />
      <BreadcumbsSection />
      <Stack
        sx={(theme) => ({
          flexDirection: "row",
          marginTop: "25px",
          gap: "40px",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
          },
        })}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          sx={(theme) => ({
            display: "none",
            [theme.breakpoints.down("md")]: {
              display: "flex",
              marginTop: "10px",
              marginBottom: "-15px",
            },
          })}
        >
          <Typography variant="h3">{product.brand.name}</Typography>
          <Typography variant="body2">
            <Typography fontWeight={700} display="inline" component="span">
              {"SKU: "}
            </Typography>
            {product.principalSku ?? selectedVariant.variantSku ?? "-"}
          </Typography>
        </Stack>
        <Typography
          variant="h1"
          color="black"
          sx={(theme) => ({
            display: "none",
            [theme.breakpoints.down("md")]: {
              display: "unset",
            },
          })}
        >
          {product.offerName}
        </Typography>
        <ProductImages />
        <Stack spacing={2} width="100%">
          <Typography
            variant="h2"
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            })}
          >
            {product.brand.name}
          </Typography>
          <Typography
            variant="h1"
            color="black"
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            })}
          >
            {product.offerName}
          </Typography>
          {product.type === "coupon" ? (
            <Stack>
              <Stack color="red" direction="row" justifyContent="space-between">
                <Typography variant="body2" fontWeight={700}>
                  Descuento
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                  -
                  {selectedVariant.coupon?.discountType === "monetary"
                    ? ` S/. ${selectedVariant.coupon?.discount}`
                    : ` ${selectedVariant.coupon?.discount}%`}
                </Typography>
              </Stack>
            </Stack>
          ) : (
            <Stack
              sx={{
                gap: "5px",
              }}
            >
              {selectedVariant.offerPrice ? (
                <Stack
                  color="red"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" fontWeight={700}>
                    Oferta
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    S/. {selectedVariant.offerPrice.toFixed(2)}
                  </Typography>
                </Stack>
              ) : null}
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" fontWeight={700}>
                  Precio ADFLY
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    textDecoration: selectedVariant.offerPrice
                      ? "line-through"
                      : "none",
                  }}
                >
                  S/. {selectedVariant.adflyPrice.toFixed(2)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Precio Mercado</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                  }}
                >
                  S/. {selectedVariant.refPrice.toFixed(2)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                color="#fab005"
              >
                <Stack direction="row" alignItems="center">
                  <Typography variant="body2" fontWeight={700}>
                    Estrellas
                  </Typography>
                  <Star
                    sx={{
                      fontSize: 18,
                    }}
                  />
                </Stack>
                <Typography variant="body2" fontWeight={700}>
                  {(
                    (selectedVariant.offerPrice ?? 0 > 0
                      ? selectedVariant.offerPrice ?? 0
                      : selectedVariant.adflyPrice) * 100
                  ).toFixed(0)}
                </Typography>
              </Stack>
            </Stack>
          )}
          <Attributes />
          <Divider />
          <Typography>
            <Typography fontWeight={700} display="inline" component="span">
              - Stock:
            </Typography>
            {` ${stock} unidad(es)`}
          </Typography>
          <Typography>
            <Typography fontWeight={700} display="inline" component="span">
              - Máximo pedido:
            </Typography>
            {` Te quedan ${
              (selectedVariant.maxQuantity ?? 0) - unitsOrdered
            } para este(a) ${
              purchasePeriodTime[
                (selectedVariant.purchasePeriod ?? "null") as TimePeriod
              ]
            }`}
          </Typography>
          {product.type === "coupon" ? (
            <Button
              onClick={() =>
                handleOpenAlert(
                  () => handleAction(),
                  "Su cupón fue agregado con éxito"
                )
              }
              variant="contained"
              disabled={maxUnitsPerUser <= 0 || loading}
            >
              {maxUnitsPerUser <= 0 ? (
                `Último cupón generado: ${lastcoupon ?? ""}`
              ) : loading ? (
                <CircularProgress size={24} />
              ) : (
                "Generar Cupón"
              )}
            </Button>
          ) : (
            <Stack spacing={1}>
              <Stack direction="row" spacing={2}>
                <NumberInput
                  value={value}
                  onChange={(_, newValue) => setValue(newValue ?? 0)}
                  min={0}
                  max={maxUnitsPerUser}
                />
                <Button
                  variant="contained"
                  onClick={() =>
                    handleOpenAlert(
                      () => handleAction(),
                      "Su producto fue agregado con éxito"
                    )
                  }
                  disabled={maxUnitsPerUser <= 0 || value < 1 || loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Agregar al carrito"
                  )}
                </Button>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Icon fontSize={25} icon="mdi:cart-check" />
                <Typography>
                  Tu carrito tiene
                  <Typography
                    display="inline"
                    component="span"
                    fontWeight={700}
                  >{` ${itemFromCart?.quantity ?? 0} unidades `}</Typography>
                  de esta oferta.
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
        <Delivery />
      </Stack>
      <Details />
      <DynamicAlert
        func={alertFunc}
        message={alertMessage}
        trigger={triggerAlert}
        onResetTrigger={() => setTriggerAlert(false)}
      />
    </Box>
  );
}
