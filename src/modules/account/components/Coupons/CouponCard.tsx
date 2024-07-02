import BasicTabs from "@modules/components/TabPanel";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { CouponUsage } from "generated/graphql";
import { useMemo, useState } from "react";

const CouponDetailModal = ({
  coupon,
  onClose,
}: {
  coupon: CouponUsage;
  onClose: () => void;
}) => {
  const details = useMemo(() => {
    const newDetails: { name: string; value: string }[] = [];
    const dateOptions = {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    } as Intl.DateTimeFormatOptions;
    if (coupon.couponData?.initialDate)
      newDetails.push({
        name: "Fecha Inicio Uso",
        value: new Date(coupon.couponData?.initialDate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (coupon.couponData?.expirationDate)
      newDetails.push({
        name: "Fecha Vencimiento Uso",
        value: new Date(coupon.couponData?.expirationDate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (coupon.couponData?.initialPurchaseDate)
      newDetails.push({
        name: "Fecha Inicio Compra",
        value: new Date(coupon.couponData?.initialPurchaseDate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (coupon.couponData?.expirationPurchaseDate)
      newDetails.push({
        name: "Fecha Vencimiento Compra",
        value: new Date(
          coupon.couponData?.expirationPurchaseDate
        ).toLocaleString("es-ES", dateOptions),
      });
    if (coupon.couponData?.couponUsage)
      newDetails.push({
        name: "¿Cómo usar el cupón?",
        value: coupon.couponData?.couponUsage,
      });
    if (coupon.couponData?.couponContent)
      newDetails.push({
        name: "¿Qué incluye?",
        value: coupon.couponData?.couponContent,
      });
    newDetails.push({
      name: "Términos y Condiciones",
      value: coupon.variant?.offer?.termConditions ?? "-",
    });
    return newDetails;
  }, [coupon]);

  return (
    <Stack>
      <Stack
        mt={2}
        ml={3}
        mr={3}
        mb={-2}
        justifyContent="space-between"
        direction="row"
      >
        <Typography variant="h2">Detalles</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Stack>
      <BasicTabs
        items={[
          {
            label: "Descripción",
            content: (
              <Typography variant="body2">
                {coupon.variant?.offer.description}
              </Typography>
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
    </Stack>
  );
};

const CouponCard = ({ coupon }: { coupon: CouponUsage }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            backgroundColor: "white",
            [theme.breakpoints.up("md")]: {
              width: 560,
            },
            [theme.breakpoints.down("md")]: {
              width: 540,
            },
            [theme.breakpoints.down("sm")]: {
              width: 500,
            },
          })}
        >
          <CouponDetailModal coupon={coupon} onClose={() => setOpen(false)} />
        </Box>
      </Modal>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1}>
          <Stack spacing={2}>
            <img
              src={
                (coupon.variant?.imageURL ?? "") === ""
                  ? "/Logo Adfly.svg"
                  : coupon.variant?.imageURL ?? ""
              }
              alt={coupon.uuidcouponcollaboratorusage}
              sizes="100vw"
              width={10}
              height={50}
              style={{
                width: "auto",
              }}
            />
            <Button onClick={() => setOpen(true)}>Ver detalle</Button>
          </Stack>
          <Typography variant="h5" maxWidth={300}>
            {coupon.variant?.offer?.offerName ?? "-"}
            <br />
            <Typography component="span">
              SKU: {coupon.variant?.variantSku ?? "-"}
              <br />
            </Typography>
          </Typography>
        </Stack>
        <Stack spacing={0}>
          <Typography variant="caption" fontWeight={600}>
            Descuento
            <br />
            <Typography variant="inherit" component="span">{`${
              coupon.couponData?.discountType === "monetary"
                ? ` S/.${coupon.couponData?.discount.toFixed(2)}`
                : ` ${coupon.couponData?.discount}%`
            }`}</Typography>
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default CouponCard;
