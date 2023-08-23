import { BillingForm } from "@interfaces/billing";
import { Text, Group, Stack, TextInput, Checkbox } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

const InformationForm = ({
  form,
}: {
  form: UseFormReturnType<BillingForm>;
}) => {
  return (
    <div>
      <Stack px={60} spacing="xl">
        <Text>Datos Personales</Text>
        <Stack px="xl" spacing="sm">
          <Group position="apart" spacing="xl" grow>
            <TextInput
              label="Nombre:"
              disabled
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Apellidos:"
              disabled
              {...form.getInputProps("lastname")}
            />
          </Group>
          <Group position="apart" spacing="xl" grow>
            <TextInput
              label="Tipo de Documento:"
              disabled
              {...form.getInputProps("doctype")}
            />
            <TextInput
              label="N° Doc:"
              disabled
              {...form.getInputProps("doc")}
            />
          </Group>
          <Group position="apart" spacing="xl" grow>
            <TextInput
              label="Correo electrónico:"
              disabled
              {...form.getInputProps("email")}
            />
            <TextInput label="Celular:" {...form.getInputProps("phone")} />
          </Group>
        </Stack>
      </Stack>
    </div>
  );
};

export default InformationForm;
