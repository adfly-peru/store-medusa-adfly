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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import { ProfileForm } from "@interfaces/collaborator";
import { useState } from "react";
import { useRouter } from "next/router";

interface FormValues {
  name: string;
  lastname: string;
  documenttype: string;
  documentnumber: string;
  email: string;
  cellPhone: string;
  termsOfService: boolean;
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
      termsOfService: false,
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
          email: form.values.email,
          phone: form.values.cellPhone,
        };
        const res = await verify(profileform);
        setMessage(res ?? "success");
        handleNextStep();
        if (!res) {
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
            placeholder=""
            label="Celular"
            radius="xs"
            size="sm"
            {...form.getInputProps("cellPhone")}
          />
        </SimpleGrid>
        <Space h="md" />
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
            <Checkbox
              label="Acepto recibir publicidad"
              {...form.getInputProps("acceptPublicity")}
            />
          </>
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
