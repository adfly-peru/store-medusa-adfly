import { useAccount } from "@context/account-context";
import { useDialog } from "@context/DialogContext";
import { Icon } from "@iconify/react";
import LoadingButton from "@modules/components/LoadingButton";
import TextFieldInput from "@modules/components/TextFieldInput";
import {
  Grid,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { requestMarketplaceItem } from "api/marketplace";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ContactSeller = ({ id }: { id: string }) => {
  const { collaborator } = useAccount();
  const { data: session } = useSession();
  const [cell, setCell] = useState(true);
  const [message, setMessage] = useState("");
  const { openDialog, closeDialog } = useDialog();

  const handleContact = async () => {
    try {
      await requestMarketplaceItem(session?.user?.accessToken ?? "", {
        uuid_business: session?.user?.uuidbusiness ?? "",
        uuid_marketplace_item: id,
        name: collaborator?.name ?? "",
        last_name: collaborator?.lastname ?? "",
        email: collaborator?.email ?? "",
        phone: cell ? collaborator?.phonenumber ?? "" : "-",
        include_phone: cell,
        message,
      });
      openDialog({
        title: "¡Mensaje enviado con éxito!",
        content: (
          <Stack width="100%" alignItems="center" justifyContent="center">
            <Typography
              variant="caption"
              fontSize={16}
              lineHeight="24px"
              textAlign="center"
            >
              Su mensaje se ha enviado correctamente y el vendedor se contactará
              con usted pronto.
            </Typography>
          </Stack>
        ),
        actions: [
          <Button
            key="close-action"
            onClick={() => {
              closeDialog();
            }}
            size="small"
            variant="contained"
          >
            Continuar
          </Button>,
        ],
        centeredTitle: true,
        closable: false,
      });
    } catch (error: any) {
      const errorMessage =
        (error as AxiosError<any, any>).response?.data?.error ||
        (error as AxiosError<any, any>).response?.data ||
        error?.message ||
        "Error desconocido";

      openDialog({
        title: "¡Error al enviar el mensaje!",
        content: (
          <Typography
            variant="body2"
            fontSize={16}
            lineHeight="24px"
            textAlign="center"
          >
            {typeof errorMessage === "string"
              ? errorMessage
              : JSON.stringify(errorMessage)}
          </Typography>
        ),
        actions: [
          <Button
            key="close-action"
            onClick={() => {
              closeDialog();
            }}
            size="small"
            variant="contained"
          >
            Continuar
          </Button>,
        ],
        centeredTitle: true,
        closable: false,
      });
    }
  };

  return (
    <Grid container columnSpacing="70px" rowSpacing="10px">
      <Grid item xs={12}>
        <Typography variant="caption" fontSize={15}>
          Verifica los datos que le enviarás al comprador y completa el campo
          requerido
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextFieldInput
          disabled
          label="Nombre"
          value={collaborator?.name ?? "-"}
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldInput
          disabled
          label="Apellido"
          value={collaborator?.lastname ?? "-"}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldInput
          disabled
          label="Correo electrónico"
          value={collaborator?.email ?? "-"}
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldInput
          disabled
          label="Celular"
          description="Activa o desactiva la opción para elegir si deseas enviar tu número celular"
          value={collaborator?.phonenumber ?? "-"}
        />
      </Grid>
      <Grid item xs={6}>
        <FormGroup>
          <FormControlLabel
            sx={{
              ml: 0,
              my: 1,
            }}
            control={
              <Checkbox
                checked={cell}
                onChange={() => setCell(true)}
                name="Incluir celular"
              />
            }
            label="Incluir celular"
          />
          <FormControlLabel
            sx={{
              ml: 0,
              my: 1,
            }}
            control={
              <Checkbox
                checked={!cell}
                onChange={() => setCell(false)}
                name="Incluir celular"
              />
            }
            label="No incluir celular"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <TextFieldInput
          label="Mensaje"
          description="Escribe el mensaje que le llegará al comprador"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <LoadingButton
            variant="contained"
            size="small"
            endIcon={<Icon icon="ic:outline-mail" />}
            asyncFunction={handleContact}
          >
            Enviar mensaje
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContactSeller;
