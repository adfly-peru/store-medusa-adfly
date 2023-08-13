import { useAccount } from "@context/account-context";
import { Text, Group, Stack, TextInput, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

const InformationForm = () => {
  const [checked, setChecked] = useState(false);
  const { collaborator } = useAccount();
  const form = useForm({
    initialValues: {
      personalInformation: {
        name: collaborator?.name,
        lastName: collaborator?.lastname,
        docType: collaborator?.documenttype,
        doc: collaborator?.documentnumber,
        email: collaborator?.email,
        phone: collaborator?.phonenumber,
      },
      billInformation: {
        ruc: "",
        socialReason: "",
        address: "",
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
