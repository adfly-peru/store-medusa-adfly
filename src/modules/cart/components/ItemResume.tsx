/* eslint-disable @next/next/no-img-element */
import { useCart } from "@context/cart-context";
import { Delete, DeleteOutline, MoreVert } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CartItem } from "generated/graphql";
import { Dispatch, SetStateAction, useState } from "react";
import NumberInput from "@modules/components/NumberInput";
import DynamicAlert from "@modules/components/Alert";

const ItemResume = ({
  item,
  setLoading,
}: {
  item: CartItem;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isVerySmall = useMediaQuery(theme.breakpoints.down(516));
  const { editProduct, removeProduct } = useCart();
  const [triggerAlert, setTriggerAlert] = useState(false);
  const [alertFunc, setAlertFunc] = useState<() => Promise<void>>(
    () => async () => {}
  );
  const [alertMessage, setAlertMessage] = useState("");

  // For menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  if (isVerySmall) {
    return (
      <Stack
        width="100%"
        spacing={2}
        my={1}
        sx={(theme) => ({
          borderTop: `1px solid ${theme.palette.grey[200]}`,
          pt: 2,
        })}
      >
        <Menu
          id={`basic-menu-${item.uuidcartitem}`}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": `basic-button-${item.uuidcartitem}`,
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleOpenAlert(
                () =>
                  handleAction(() =>
                    removeProduct(item.uuidcartitem, item.uuidcartsuborder)
                  ),
                "Su carrito ha sido actualizado con éxito"
              );
            }}
          >
            Eliminar
          </MenuItem>
        </Menu>
        <Stack
          direction="row"
          width="100%"
          alignItems="flex-start"
          justifyContent="space-around"
        >
          <img
            sizes="100vw"
            style={{
              height: "80px",
              width: "80px",
              objectFit: "contain",
              marginRight: "15px",
            }}
            src={
              item.variant.imageURL !== ""
                ? item.variant.imageURL
                : "/Logo Adfly.svg"
            }
            alt={item.variant.imageURL}
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
              maxHeight: "3em",
            }}
          >
            {item.variant.offer.offerName}
          </Typography>
          <IconButton
            id={`basic-button-${item.uuidcartitem}`}
            aria-controls={open ? `basic-menu-${item.uuidcartitem}` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
        </Stack>
        <Stack
          direction="row"
          width="100%"
          alignItems="flex-start"
          justifyContent="space-around"
        >
          <Stack gap="3px" justifyContent="flex-start" alignItems="flex-start">
            <Typography variant="body2" fontWeight={500} textAlign="start">
              Precio: S/.
              {((item.variant.offerPrice ?? 0) > 0
                ? item.variant.offerPrice ?? 0
                : item.variant.adflyPrice
              ).toFixed(2)}
            </Typography>
            <Typography variant="body2" fontWeight={500} textAlign="start">
              Subtotal: S/.{item.subtotal.toFixed(2)}
            </Typography>
          </Stack>
          <Stack justifyContent="center" sx={{ height: "100%" }} spacing={1}>
            <NumberInput
              value={item.quantity}
              onChange={(_, newValue) =>
                handleOpenAlert(
                  () =>
                    handleAction(() =>
                      editProduct(item, item.uuidcartsuborder, newValue ?? 0)
                    ),
                  "Su carrito ha sido actualizado con éxito"
                )
              }
              min={1}
              max={Math.min(
                (item.variant.maxQuantity ?? 0) -
                  (item.variant.totalLastPeriod ?? 0),
                item.variant.maxQuantity ?? 0
              )}
            />
            <Typography textAlign="center" variant="body2" fontWeight={700}>
              {`Max: ${Math.min(
                (item.variant.maxQuantity ?? 0) -
                  (item.variant.totalLastPeriod ?? 0),
                item.variant.maxQuantity ?? 0
              )} unidad(es)`}
            </Typography>
          </Stack>
        </Stack>
        <DynamicAlert
          func={alertFunc}
          message={alertMessage}
          trigger={triggerAlert}
          onResetTrigger={() => setTriggerAlert(false)}
        />
      </Stack>
    );
  }

  return (
    <Stack
      width="100%"
      direction="row"
      spacing={1}
      justifyContent="space-between"
      my={1}
      sx={(theme) => ({
        borderTop: `1px solid ${theme.palette.grey[200]}`,
        pt: 2,
      })}
    >
      <Menu
        id={`basic-menu-${item.uuidcartitem}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `basic-button-${item.uuidcartitem}`,
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenAlert(
              () =>
                handleAction(() =>
                  removeProduct(item.uuidcartitem, item.uuidcartsuborder)
                ),
              "Su carrito ha sido actualizado con éxito"
            );
          }}
        >
          Eliminar
        </MenuItem>
      </Menu>
      <Stack direction="row">
        <img
          sizes="100vw"
          style={{
            height: "120px",
            width: "120px",
            objectFit: "contain",
            marginRight: "15px",
          }}
          src={
            item.variant.imageURL !== ""
              ? item.variant.imageURL
              : "/Logo Adfly.svg"
          }
          alt={item.variant.imageURL}
        />
        <Stack gap="3px" justifyContent="flex-start" alignItems="flex-start">
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
              maxHeight: "3em",
            }}
          >
            {item.variant.offer.offerName}
          </Typography>
          <Typography variant="body2" fontWeight={500} textAlign="start">
            Precio: S/.
            {((item.variant.offerPrice ?? 0) > 0
              ? item.variant.offerPrice ?? 0
              : item.variant.adflyPrice
            ).toFixed(2)}
          </Typography>
          <Typography variant="body2" fontWeight={500} textAlign="start">
            Subtotal: S/.{item.subtotal.toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
      <Stack height="100%" justifyContent="space-around" alignItems="flex-end">
        <IconButton
          id={`basic-button-${item.uuidcartitem}`}
          aria-controls={open ? `basic-menu-${item.uuidcartitem}` : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        <Stack justifyContent="center" sx={{ height: "100%" }} spacing={1}>
          <NumberInput
            value={item.quantity}
            onChange={(_, newValue) =>
              handleOpenAlert(
                () =>
                  handleAction(() =>
                    editProduct(item, item.uuidcartsuborder, newValue ?? 0)
                  ),
                "Su carrito ha sido actualizado con éxito"
              )
            }
            min={1}
            max={Math.min(
              (item.variant.maxQuantity ?? 0) -
                (item.variant.totalLastPeriod ?? 0),
              item.variant.maxQuantity ?? 0
            )}
          />
          <Typography textAlign="center" variant="body2" fontWeight={700}>
            {`Max: ${Math.min(
              (item.variant.maxQuantity ?? 0) -
                (item.variant.totalLastPeriod ?? 0),
              item.variant.maxQuantity ?? 0
            )} unidad(es)`}
          </Typography>
        </Stack>
      </Stack>
      <DynamicAlert
        func={alertFunc}
        message={alertMessage}
        trigger={triggerAlert}
        onResetTrigger={() => setTriggerAlert(false)}
      />
    </Stack>
  );
};

export default ItemResume;
