import {
  Stack,
  Button,
  TextInput,
  Space,
  Divider,
  Checkbox,
  Group,
  Title,
  Alert,
  Anchor,
  Modal,
  Center,
  Loader,
  Burger,
  MediaQuery,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import { ProfileForm } from "@interfaces/collaborator";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InformationBox from "./information-box";

interface FormValues {
  name: string;
  lastname: string;
  documenttype: string;
  documentnumber: string;
  email: string;
  cellPhone: string;
  termsOfService: boolean;
  acceptPublicity: boolean;
}

const PersonalDataForm = () => {
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
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
      termsOfService: collaborator?.emailVerify ?? false,
      acceptPublicity: collaborator?.newsletters ?? false,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
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
      try {
        const profileform: ProfileForm = {
          phone: form.values.cellPhone,
          acceptPublicity: form.values.acceptPublicity,
          terms: collaborator?.emailVerify ?? false,
        };
        const res = await verify(profileform);
        setMessage(res ?? "success");
      } catch (error) {
        setMessage("Ha ocurrido un error durante la verificación");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!collaborator) {
    return <Loader />;
  }

  return (
    <Stack w="80%">
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
              ? "Se ha actualizado el perfil de manera exitosa."
              : message}
          </Alert>
        )}
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <div>
            <Burger opened={opened} onClick={toggle} />
            {opened ? (
              <InformationBox withClose={true} onClose={close} />
            ) : (
              <></>
            )}
          </div>
        </MediaQuery>
        <Title>Perfil</Title>
        <Divider></Divider>

        <SimpleGrid
          cols={2}
          spacing="xl"
          breakpoints={[{ maxWidth: "48rem", cols: 1, spacing: "sm" }]}
        >
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
          <TextInput
            disabled={collaborator.emailVerify}
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
            {...form.getInputProps("cellPhone")}
          />
        </SimpleGrid>
        <Space h="md" />
        <Checkbox
          label="Acepto recibir publicidad"
          checked={form.values.acceptPublicity}
          onChange={(event) =>
            form.setFieldValue("acceptPublicity", event.currentTarget.checked)
          }
        />
        {!collaborator.emailVerify && (
          <>
            {" "}
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
          </>
        )}
      </Stack>
      <Space h="md" />
      <Button color="gray" fullWidth size="lg" onClick={handleUpdate}>
        Actualizar
      </Button>
    </Stack>
  );
};

export default PersonalDataForm;
