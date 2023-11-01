import { BillingForm } from "@interfaces/billing";
import { Text, Group, Stack, TextInput, Checkbox, Button, SimpleGrid, MediaQuery } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useRouter } from "next/router";

const InformationForm = ({
  form,
  handleNextStep
}: {
  form: UseFormReturnType<BillingForm>;
  handleNextStep: () => void;
}) => {
  const router = useRouter();
  return (
    <div>
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: '40rem', cols: 1, spacing: 'sm' },
        ]}
      >
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
        <TextInput
          label="Correo electrónico:"
          disabled
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Celular:"
          required
          withAsterisk
          {...form.getInputProps("phone")}
        />
      </SimpleGrid>
    </div>
  );
};

export default InformationForm;
