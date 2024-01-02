import {
  Stack,
  Button,
  TextInput,
  Space,
  Checkbox,
  Anchor,
  Modal,
  Center,
  Loader,
  SimpleGrid,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import { ProfileForm } from "@interfaces/collaborator";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as amplitude from "@amplitude/analytics-browser";

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

const PersonalDataFormRegister = ({
  handleNextStep,
}: {
  handleNextStep: () => void;
}) => {
  const router = useRouter();
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
    if (collaborator?.emailVerify) {
      handleNextStep();
      return;
    }
    form.validate();
    if (form.isValid()) {
      setLoading(true);
      try {
        const profileform: ProfileForm = {
          email: form.values.email,
          phone: form.values.cellPhone,
          acceptPublicity: form.values.acceptPublicity,
          terms: form.values.termsOfService,
        };
        const res = await verify(profileform);
        setMessage(
          res === "email already exists"
            ? "Ya existe un usuario con el correo enviado."
            : res ?? "success"
        );
        if (!res) {
          handleNextStep();
          amplitude.track(
            "Step 1 Completed: Profile and Send email verification"
          );
          const timerId = setTimeout(() => {
            router.push("/");
          }, 3000);
          return () => clearTimeout(timerId);
        }
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
      <Stack spacing="xs">
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
            disabled={collaborator.emailVerify}
            placeholder=""
            label="Celular"
            radius="xs"
            size="sm"
            {...form.getInputProps("cellPhone")}
          />
        </SimpleGrid>
        <Space h="md" />
        {!collaborator.emailVerify ? (
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
              checked={form.values.termsOfService}
              onChange={(event) =>
                form.setFieldValue(
                  "termsOfService",
                  event.currentTarget.checked
                )
              }
            />
            <Checkbox
              label="Acepto recibir publicidad"
              checked={form.values.acceptPublicity}
              onChange={(event) =>
                form.setFieldValue(
                  "acceptPublicity",
                  event.currentTarget.checked
                )
              }
            />
          </>
        ) : (
          <></>
        )}
      </Stack>
      <Space h="md" />
      <Button color="gray" size="md" onClick={handleUpdate}>
        Continuar
      </Button>
    </Stack>
  );
};

export default PersonalDataFormRegister;
