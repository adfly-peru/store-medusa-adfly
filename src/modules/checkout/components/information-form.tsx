import { BillingForm } from "@interfaces/billing";
import {
  Group,
  TextInput,
  Button,
  SimpleGrid,
  MediaQuery,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useRouter } from "next/router";

const InformationForm = ({
  form,
  handleNextStep,
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
        breakpoints={[{ maxWidth: "40rem", cols: 1, spacing: "sm" }]}
      >
        <TextInput
          label="Nombre:"
          disabled
          withAsterisk
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Apellidos:"
          disabled
          withAsterisk
          {...form.getInputProps("lastname")}
        />
        <TextInput
          label="Tipo de Documento:"
          disabled
          withAsterisk
          {...form.getInputProps("doctype")}
        />
        <TextInput
          label="N° Doc:"
          disabled
          withAsterisk
          {...form.getInputProps("doc")}
        />
        <TextInput
          label="Correo electrónico:"
          disabled
          withAsterisk
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Celular:"
          required
          withAsterisk
          {...form.getInputProps("phone")}
        />
      </SimpleGrid>
      <Group position="center" w="100%" mt="xl">
        <MediaQuery
          smallerThan="sm"
          styles={{
            width: "45%",
          }}
        >
          <Button
            w={200}
            h={48}
            onClick={() => router.push("/checkout/mycart")}
          >
            {"Regresar a Carrito"}
          </Button>
        </MediaQuery>
        <MediaQuery
          smallerThan="sm"
          styles={{
            width: "45%",
          }}
        >
          <Button w={200} h={48} onClick={handleNextStep}>
            Continuar
          </Button>
        </MediaQuery>
      </Group>
    </div>
  );
};

export default InformationForm;
