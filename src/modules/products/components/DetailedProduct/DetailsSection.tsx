import BasicTabs from "@modules/components/TabPanel";
import { useDetailedProduct } from "@modules/products/context/DetailedProductContext";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useMemo } from "react";

export function Details() {
  const { product, selectedVariant } = useDetailedProduct();

  const details = useMemo(() => {
    const newDetails: { name: string; value: string }[] = [];
    const dateOptions = {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    } as Intl.DateTimeFormatOptions;
    if (!selectedVariant) return newDetails;
    switch (product.type) {
      case "coupon":
        if (selectedVariant.coupon?.initialDate)
          newDetails.push({
            name: "Fecha Inicio Uso",
            value: new Date(selectedVariant.coupon?.initialDate).toLocaleString(
              "es-ES",
              dateOptions
            ),
          });
        if (selectedVariant.coupon?.expirationDate)
          newDetails.push({
            name: "Fecha Vencimiento Uso",
            value: new Date(
              selectedVariant.coupon?.expirationDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.coupon?.initialPurchaseDate)
          newDetails.push({
            name: "Fecha Inicio Compra",
            value: new Date(
              selectedVariant.coupon?.initialPurchaseDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.coupon?.expirationPurchaseDate)
          newDetails.push({
            name: "Fecha Vencimiento Compra",
            value: new Date(
              selectedVariant.coupon?.expirationPurchaseDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.coupon?.couponUsage)
          newDetails.push({
            name: "¿Cómo usar el cupón?",
            value: selectedVariant.coupon?.couponUsage,
          });
        if (selectedVariant.coupon?.couponContent)
          newDetails.push({
            name: "¿Qué incluye?",
            value: selectedVariant.coupon?.couponContent,
          });
        if (product.termConditions)
          newDetails.push({
            name: "Términos y Condiciones",
            value: product.termConditions,
          });
        break;
      case "service":
        if (selectedVariant.service?.initialDate)
          newDetails.push({
            name: "Fecha Inicio Uso",
            value: new Date(
              selectedVariant.service?.initialDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.service?.expirationDate)
          newDetails.push({
            name: "Fecha Vencimiento Uso",
            value: new Date(
              selectedVariant.service?.expirationDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.service?.initialPurchaseDate)
          newDetails.push({
            name: "Fecha Inicio Compra",
            value: new Date(
              selectedVariant.service?.initialPurchaseDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.service?.expirationPurchaseDate)
          newDetails.push({
            name: "Fecha Vencimiento Compra",
            value: new Date(
              selectedVariant.service?.expirationPurchaseDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.service?.accessService)
          newDetails.push({
            name: "¿Cómo acceder al servicio?",
            value: selectedVariant.service?.accessService,
          });
        if (selectedVariant.service?.contentService)
          newDetails.push({
            name: "¿Qué incluye?",
            value: selectedVariant.service?.contentService,
          });
        if (product.termConditions)
          newDetails.push({
            name: "Términos y Condiciones",
            value: product.termConditions,
          });
        break;
      case "product":
        if (selectedVariant.product?.specification)
          newDetails.push({
            name: "Especificaciones del Producto",
            value: selectedVariant.product.specification,
          });
        if (selectedVariant.product?.condition)
          newDetails.push({
            name: "Condición del Producto",
            value:
              selectedVariant.product.condition === "new" ? "Nuevo" : "Usado",
          });
        if (selectedVariant.product?.conditionDetails)
          newDetails.push({
            name: "Detalle de la Condición",
            value: selectedVariant.product.conditionDetails,
          });
        if (selectedVariant.product?.productWarranty)
          newDetails.push({
            name: "Garantía del Producto",
            value: selectedVariant.product?.productWarranty,
          });
        if (selectedVariant.product?.sellerWarranty)
          newDetails.push({
            name: "Garantía del Vendedor",
            value: selectedVariant.product?.sellerWarranty,
          });
        if (selectedVariant.product?.included)
          newDetails.push({
            name: "¿Qué incluye?",
            value: selectedVariant.product?.included,
          });
        if (selectedVariant.product?.width)
          newDetails.push({
            name: "Ancho (cm)",
            value: `${selectedVariant.product?.width}`,
          });
        if (selectedVariant.product?.length)
          newDetails.push({
            name: "Largo (cm)",
            value: `${selectedVariant.product?.length}`,
          });
        if (selectedVariant.product?.height)
          newDetails.push({
            name: "Alto (cm)",
            value: `${selectedVariant.product?.height}`,
          });
        if (selectedVariant.product?.weight)
          newDetails.push({
            name: "Peso (kg)",
            value: `${selectedVariant.product?.weight}`,
          });
        break;
    }
    return newDetails;
  }, [product, selectedVariant]);
  return (
    <BasicTabs
      items={[
        {
          label: "Descripción",
          content: (
            <Typography variant="body2">{product.description}</Typography>
          ),
        },
        {
          label: "Información Adicional",
          content: (
            <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
              <Table sx={{ width: "100%" }}>
                <TableBody>
                  {details.map((d, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          width: "25%",
                        }}
                      >
                        <Typography>{d.name}</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "75%",
                        }}
                      >
                        <Typography>{d.value}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ),
        },
      ]}
    ></BasicTabs>
  );
}
