import { BillingForm } from "@interfaces/billing";
import { Text, Group, Stack, TextInput, Checkbox } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useEffect, useState } from "react";

const InformationForm = ({
  form,
}: {
  form: UseFormReturnType<BillingForm>;
}) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (
      form.values.businessname ||
      form.values.ruc ||
      form.values.fiscaladdress
    ) {
      setChecked(true);
    }
  }, []);

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
          <Checkbox
            label="Quiero Factura"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            size="md"
          />
        </Stack>
        {checked ? (
          <div>
            <Text>Datos de la Factura</Text>
            <Stack px="xl" spacing="sm">
              <Group position="apart" spacing="xl" grow>
                <TextInput label="Ruc:" {...form.getInputProps("ruc")} />
                <TextInput
                  label="Razón Social:"
                  {...form.getInputProps("businessname")}
                />
              </Group>
              <TextInput
                label="Dirección Fiscal:"
                {...form.getInputProps("fiscaladdress")}
              />
            </Stack>
          </div>
        ) : null}
      </Stack>
    </div>
  );
};

export default InformationForm;
