import AddressForm from "@modules/account/components/Address/AddressForm";
import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import { formatAddress } from "@modules/common/functions/format-place";
import DynamicAlert from "@modules/components/Alert";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import {
  createAddress,
  deleteAddressQuery,
  updateAddressQuery,
} from "api/delivery";
import { CollaboratorAddress, GetAddressesQuery } from "generated/graphql";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const SelectAddressTable = ({
  data,
  refetch,
}: {
  data: GetAddressesQuery | undefined;
  refetch: () => Promise<void>;
}) => {
  const { data: session } = useSession();
  const { address: currentAddress, handleCheckAddress } = useCheckout();
  const [address, setAddress] = useState<string | null>(null);
  const [creation, setCreation] = useState(false);
  const [triggerAlert, setTriggerAlert] = useState(false);
  const [alertFunc, setAlertFunc] = useState<() => Promise<void>>(
    () => async () => {}
  );
  const [alertMessage, setAlertMessage] = useState("");

  const handleCreateAddress = async (newAddress: CollaboratorAddress) => {
    if (!session?.user) return;
    await createAddress(
      session.user.id ?? "",
      newAddress,
      session.user.accessToken ?? ""
    );
    await refetch();
    setCreation(false);
  };

  const handleUpdateAddress = async (updatedAddress: CollaboratorAddress) => {
    if (!session?.user) return;
    await updateAddressQuery(updatedAddress, session.user.accessToken ?? "");
    await refetch();
    setAddress(null);
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!session?.user) return;
    handleCheckAddress("");
    await deleteAddressQuery(addressId, session.user.accessToken ?? "");
    await refetch();
  };

  const handleOpenAlert = (func: () => Promise<void>, message: string) => {
    setAlertFunc(() => func);
    setAlertMessage(message);
    setTriggerAlert(true);
  };

  if (!data) return <></>;

  return (
    <Stack>
      <Modal open={creation}>
        <Box
          sx={{
            position: "absolute",
            inset: "0px",
            height: "100%",
            overflow: "hidden auto",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
          }}
        >
          <Box
            sx={(theme) => ({
              position: "relative",
              margin: "auto",
              height: "max-content",
              maxHeight: "unset",
              transform: "none",
              top: "unset",
              left: "unset",
            })}
          >
            <AddressForm
              onSubmit={(data) => {
                handleOpenAlert(
                  () => handleCreateAddress(data as CollaboratorAddress),
                  "Dirección creada con éxito"
                );
              }}
              onClose={() => setCreation(false)}
            />
          </Box>
        </Box>
      </Modal>
      <Modal open={!!address}>
        <Box
          sx={{
            position: "absolute",
            inset: "0px",
            height: "100%",
            overflow: "hidden auto",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
          }}
        >
          <Box
            sx={(theme) => ({
              position: "relative",
              margin: "auto",
              height: "max-content",
              maxHeight: "unset",
              transform: "none",
              top: "unset",
              left: "unset",
            })}
          >
            <AddressForm
              onSubmit={(data) => {
                handleOpenAlert(
                  () =>
                    handleUpdateAddress({
                      ...(data as CollaboratorAddress),
                      uuidcollaboratoraddress: address ?? "",
                    }),
                  "Dirección actualizada con éxito"
                );
              }}
              defaultValues={data.collaboratoraddresses.find(
                (a) => a.uuidcollaboratoraddress === address
              )}
              onClose={() => setAddress(null)}
            />
          </Box>
        </Box>
      </Modal>
      <List
        sx={{
          overflow: "auto",
          marginTop: "5px",
          marginRight: "15px",
          "&::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(255,255,255,0.1)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
          maxHeight: 300,
        }}
      >
        {data.collaboratoraddresses.map((address) => (
          <ListItem
            key={address.uuidcollaboratoraddress}
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <ListItemButton
              sx={{
                padding: "3px 5px",
                display: "flex",
              }}
              role={undefined}
              onClick={() =>
                handleCheckAddress(address.uuidcollaboratoraddress)
              }
              dense
            >
              <ListItemIcon>
                <Checkbox
                  sx={{ paddingRight: "15px", margin: 0 }}
                  edge="start"
                  checked={currentAddress === address.uuidcollaboratoraddress}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText
                primary={address.alias}
                secondary={
                  <Typography component="span" variant="subtitle2">
                    {address.address.split(",")[0]}
                    {<br />}
                    {formatAddress(address)}
                  </Typography>
                }
              />
              <Stack direction="row" spacing={1}>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                  })}
                  onClick={() => setAddress(address.uuidcollaboratoraddress)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  edge="end"
                  aria-label="remove"
                  onClick={() =>
                    handleOpenAlert(
                      () =>
                        handleDeleteAddress(address.uuidcollaboratoraddress),
                      "Dirección eliminada con éxito"
                    )
                  }
                >
                  <Delete />
                </IconButton>
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <DynamicAlert
        func={alertFunc}
        message={alertMessage}
        trigger={triggerAlert}
        onResetTrigger={() => setTriggerAlert(false)}
      />

      <Button
        sx={{
          alignSelf: "flex-start",
        }}
        startIcon={<Add />}
        onClick={() => setCreation(true)}
      >
        Agregar una nueva dirección
      </Button>
    </Stack>
  );
};

export default SelectAddressTable;
