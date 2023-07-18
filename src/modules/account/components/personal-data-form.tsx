import {
  Text,
  Stack,
  Button,
  TextInput,
  Box,
  Space,
  Divider,
  Select,
  Checkbox,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { ACCOUNT_STEPS, useAccount } from "@context/account-context";
import Customer from "@interfaces/customerInterface";
import { useRouter } from "next/router";

const PersonalDataForm = () => {
  const router = useRouter();
  const { width } = useViewportSize();
  const { currentCustomer } = useAccount();
  const form = useForm({
    initialValues: {
      collaborator: currentCustomer.name,
      documentKind: currentCustomer.documentKind,
      document: currentCustomer.document,
      email: currentCustomer.email,
      cellPhone: currentCustomer.cellPhone,
      workPlace: currentCustomer.workPlace,
      workAddress: currentCustomer.workAddress,
      termsOfService: false,
      acceptPublicity: currentCustomer.acceptPublicity,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      cellPhone: (value) => (value.length > 0 ? null : "Invalid Cellphone"),
      workPlace: (value) => (value != "" ? null : "This field is necessary"),
    },
  });

  const { updateStep, updateCustomer, accountStep } = useAccount();

  return (
    <Box sx={{ width: width / 3 }}>
      <form
        onSubmit={form.onSubmit((values) => {
          const newCustomer: Customer = {
            name: values.collaborator,
            documentKind: values.documentKind,
            document: values.document,
            email: values.email,
            cellPhone: values.cellPhone,
            workPlace: values.workPlace,
            workAddress: values.workAddress,
            acceptPublicity: currentCustomer.acceptPublicity,
          };
          updateCustomer(newCustomer);
          if (accountStep == ACCOUNT_STEPS.UNCOMPLETE) {
            updateStep(ACCOUNT_STEPS.PROFILECOMPLETED);
          } else if (accountStep == ACCOUNT_STEPS.PROFILECOMPLETED) {
            router.push("/home");
          }
        })}
      >
        <Stack spacing="xs">
          <Text>Perfil</Text>
          <Divider></Divider>
          <Text>Datos Personales</Text>

          <TextInput
            placeholder="Nombre Completo"
            label="Nombre Completo"
            radius="xs"
            size="sm"
            disabled
            withAsterisk
            {...form.getInputProps("collaborator")}
          />

          <TextInput
            placeholder="Tipo Documento"
            label="Tipo Documento"
            radius="xs"
            size="sm"
            disabled
            withAsterisk
            {...form.getInputProps("documentKind")}
          />

          <TextInput
            placeholder="Nro. Documento"
            label="Nro. Documento"
            radius="xs"
            size="sm"
            disabled
            withAsterisk
            {...form.getInputProps("document")}
          />

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

          <Space h="md" />

          <Text>Dirección de Centro de Trabajo</Text>

          <Select
            label="Sede de Trabajo"
            placeholder="Seleccione uno"
            data={[
              { value: "Sede1", label: "Sede1" },
              { value: "Sede2", label: "Sede2" },
              { value: "Sede3", label: "Sede3" },
            ]}
            withAsterisk
            {...form.getInputProps("workPlace")}
          />

          <TextInput
            placeholder="Dirección de Sede"
            label="Dirección de Sede"
            radius="xs"
            size="sm"
            disabled
            {...form.getInputProps("workAddress")}
          />

          <Space h="md" />

          <Checkbox
            label="Acepto los términos y condiciones"
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />

          <Checkbox
            label="Acepto recibir publicidad"
            {...form.getInputProps("acceptPublicity", { type: "checkbox" })}
          />
        </Stack>

        <Space h="md" />

        <Button color="gray" fullWidth size="lg" type="submit">
          Actualizar
        </Button>
      </form>
    </Box>
  );
};

export default PersonalDataForm;
