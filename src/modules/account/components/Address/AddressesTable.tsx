import { Icon } from "@iconify/react";
import { formatAddress } from "@modules/common/functions/format-place";
import { Add, Delete, Edit, Remove } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Snackbar,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { CollaboratorAddress, useGetAddressesQuery } from "generated/graphql";
import React, { useState } from "react";
import AddressForm from "./AddressForm";
import { useSession } from "next-auth/react";
import {
  createAddress,
  updateAddressQuery,
  deleteAddressQuery,
} from "api/delivery";
import DynamicAlert from "@modules/components/Alert";

const HomeIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const AddressesTable = () => {
  const { data, refetch } = useGetAddressesQuery();
  const { data: session } = useSession();
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
    <Stack spacing={1}>
      <Modal open={creation}>
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            backgroundColor: "white",
            [theme.breakpoints.up("md")]: {
              width: 660,
            },
            [theme.breakpoints.down("md")]: {
              width: 640,
            },
            [theme.breakpoints.down("sm")]: {
              width: 600,
            },
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
      </Modal>
      <Modal open={!!address}>
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            backgroundColor: "white",
            [theme.breakpoints.up("md")]: {
              width: 660,
            },
            [theme.breakpoints.down("md")]: {
              width: 640,
            },
            [theme.breakpoints.down("sm")]: {
              width: 600,
            },
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
      </Modal>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3" fontSize={26}>
          Mis Direcciones
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreation(true)}
        >
          Agregar Dirección
        </Button>
      </Stack>
      <Divider />
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
          maxHeight: 500,
        }}
      >
        {data.collaboratoraddresses.map((address) => (
          <ListItem
            key={address.uuidcollaboratoraddress}
            sx={{
              padding: 0,
            }}
            secondaryAction={
              <Stack direction="row" spacing={1}>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => setAddress(address.uuidcollaboratoraddress)}
                >
                  <Edit color="primary" />
                </IconButton>
                {/* Button To Delete an Address */}
                <IconButton
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
                  <Delete color="error" />
                </IconButton>
              </Stack>
            }
          >
            <ListItemButton
              sx={{
                padding: "3px 5px",
              }}
              role={undefined}
              dense
            >
              <ListItemIcon>
                <HomeIcon icon="ph:house" width={40} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  paddingLeft: 1,
                }}
                primary={address.alias}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {address.address.split(",")[0]}
                    </Typography>
                    <br />
                    {formatAddress(address)}
                  </React.Fragment>
                }
              />
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
    </Stack>
  );
};

export default AddressesTable;
