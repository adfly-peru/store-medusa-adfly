import {
  Text,
  Stack,
  Button,
  TextInput,
  Box,
  Space,
  Divider,
  Checkbox,
  Group,
  Title,
  FileInput,
  Alert,
  Anchor,
  Modal,
  Center,
  Loader,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import { ProfileForm } from "@interfaces/collaborator";
import { useState } from "react";

interface FormValues {
  name: string;
  lastname: string;
  documenttype: string;
  documentnumber: string;
  email: string;
  cellPhone: string;
  termsOfService: boolean;
  imgprofile: File | null;
}

const PersonalDataForm = () => {
  const { width } = useViewportSize();
  const { collaborator, verify } = useAccount();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    initialValues: {
      name: collaborator?.name ?? "",
      lastname: collaborator?.lastname ?? "",
      documenttype: collaborator?.documenttype ?? "",
      documentnumber: collaborator?.documentnumber ?? "",
      email: collaborator?.email ?? "",
      cellPhone: collaborator?.phonenumber ?? "",
      termsOfService: false,
      imgprofile: null,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      cellPhone: (val) => (val.length > 0 ? null : "Invalid Cellphone"),
      imgprofile: (val: any) =>
        val != null && val != undefined ? null : "Este campo es requerido",
      termsOfService: (val: boolean) =>
        val == true
          ? null
          : "Es obligatorio aceptar los Términos y Condiciones",
    },
  });

  const handleUpdate = async () => {
    form.validate();
    if (form.isValid()) {
      setLoading(true);
      const profileform: ProfileForm = {
        email: form.values.email,
        phone: form.values.cellPhone,
        image: form.values.imgprofile ?? undefined,
      };
      const res = await verify(profileform);
      setMessage(res ?? "success");
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        opened={loading}
        withCloseButton={false}
        onClose={() => null}
        closeOnClickOutside={false}
        closeOnEscape={false}
        centered
        size="xl"
      >
        <Center>
          <Loader />
        </Center>
      </Modal>
      <Box sx={{ width: width / 3 }}>
        <Stack spacing="xs">
          {message != "" && (
            <Alert
              title={message == "success" ? "Felicidades!" : "Error!"}
              color={message == "success" ? "green" : "red"}
              onClose={() => setMessage("")}
              my="lg"
              withCloseButton
            >
              {message == "success"
                ? "Se ha actualizado el perfil de manera exitosa"
                : message}
            </Alert>
          )}
          <Title>Perfil</Title>
          <Divider></Divider>
          <Title order={3}>Datos Personales</Title>

          <Group grow>
            <TextInput
              placeholder="Nombres (*)"
              label="Nombres"
              radius="xs"
              size="sm"
              disabled
              withAsterisk
              {...form.getInputProps("name")}
            />
            <TextInput
              placeholder="Apellidos (*)"
              label="Apellidos"
              radius="xs"
              size="sm"
              disabled
              withAsterisk
              {...form.getInputProps("lastname")}
            />
          </Group>
          <Group grow>
            <TextInput
              placeholder="Tipo Documento"
              label="Tipo Documento"
              radius="xs"
              size="sm"
              disabled
              withAsterisk
              {...form.getInputProps("documenttype")}
            />
            <TextInput
              placeholder="Nro. Documento"
              label="Nro. Documento"
              radius="xs"
              size="sm"
              disabled
              withAsterisk
              {...form.getInputProps("documentnumber")}
            />
          </Group>
          <TextInput
            placeholder=""
            label="Correo Electrónico"
            radius="xs"
            size="sm"
            withAsterisk
            {...form.getInputProps("email")}
          />
          <TextInput
            placeholder=""
            label="Celular"
            radius="xs"
            size="sm"
            withAsterisk
            {...form.getInputProps("cellPhone")}
          />
          <FileInput
            label="Imagen de Perfil"
            withAsterisk
            clearable
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "420px",
            }}
            {...form.getInputProps("imgprofile")}
          />
          <Space h="md" />
          <Checkbox
            label={
              <>
                Acepto los{" "}
                <Anchor href="/terms" target="_blank">
                  Términos y Condiciones
                </Anchor>
              </>
            }
            {...form.getInputProps("termsOfService")}
          />
          <Checkbox
            label="Acepto recibir publicidad"
            {...form.getInputProps("acceptPublicity")}
          />
        </Stack>
        <Space h="md" />
        <Button color="gray" fullWidth size="lg" onClick={handleUpdate}>
          Actualizar
        </Button>
      </Box>
    </>
  );
};

export default PersonalDataForm;
