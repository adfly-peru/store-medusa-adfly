import { Text, Group, Stack, TextInput, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

const InformationForm = () => {
  const [checked, setChecked] = useState(false);
  const form = useForm({
    initialValues: {
      personalInformation: {
        name: "Alonso",
        lastName: "Ferreyros Belmont",
        docType: "DNI",
        doc: "72306782",
        email: "ferreyrosalonso@gmail.com",
        phone: "989621629",
      },
      billInformation: {
        ruc: "20602968970",
        socialReason: "ADFLY S.A.C.",
        address: "Calle Los Jades 160, Santiago de Surco",
      },
    },
  });
  return (
    <div>
      <Stack px={60} spacing="xl">
        <Text>Datos Personales</Text>
        <Stack px="xl" spacing="sm">
          <Group position="apart" spacing="xl" grow>
            <TextInput
              label="Nombre:"
              disabled
              {...form.getInputProps("personalInformation.name")}
            />
            <TextInput
              label="Apellidos:"
              disabled
              {...form.getInputProps("personalInformation.lastName")}
            />
          </Group>
          <Group position="apart" spacing="xl" grow>
            <TextInput
              label="Tipo de Documento:"
              disabled
              {...form.getInputProps("personalInformation.docType")}
            />
            <TextInput
              label="N° Doc:"
              disabled
              {...form.getInputProps("personalInformation.doc")}
            />
          </Group>
          <Group position="apart" spacing="xl" grow>
            <TextInput
              label="Correo electrónico:"
              disabled
              {...form.getInputProps("personalInformation.email")}
            />
            <TextInput
              label="Celular:"
              {...form.getInputProps("personalInformation.phone")}
            />
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
                <TextInput
                  label="Ruc:"
                  {...form.getInputProps("billInformation.ruc")}
                />
                <TextInput
                  label="Razón Social:"
                  {...form.getInputProps("billInformation.socialReason")}
                />
              </Group>
              <TextInput
                label="Dirección Fiscal:"
                {...form.getInputProps("billInformation.address")}
              />
            </Stack>
          </div>
        ) : null}
      </Stack>
    </div>
  );
};

export default InformationForm;
