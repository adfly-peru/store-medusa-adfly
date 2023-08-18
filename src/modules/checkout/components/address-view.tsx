import { Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Address } from "@interfaces/address-interface";
import ubigeoPeru from "ubigeo-peru";

const AddressView = ({ address }: { address: Address }) => {
  const form = useForm({
    initialValues: {
      address: address.address,
      additional: address.additional,
    },
  });

  return (
    <Stack px="xl" spacing="sm">
      <TextInput
        label="Dirección"
        {...form.getInputProps("address")}
        disabled
      />
      <TextInput
        label="Departamento:"
        value={
          ubigeoPeru.reniec.find(
            (v) =>
              v.departamento == address?.department &&
              v.provincia == "00" &&
              v.distrito == "00"
          )?.nombre ?? ""
        }
        disabled
      />
      <Group position="apart" spacing="xl" grow>
        <TextInput
          label="Provincia:"
          value={
            ubigeoPeru.reniec.find(
              (v) =>
                v.departamento == address?.department &&
                v.provincia == address?.province &&
                v.distrito == "00"
            )?.nombre ?? ""
          }
          disabled
        />
        <TextInput
          label="Distrito:"
          value={
            ubigeoPeru.reniec.find(
              (v) =>
                v.departamento == address?.department &&
                v.provincia == address?.province &&
                v.distrito == address?.district
            )?.nombre ?? ""
          }
          disabled
        />
      </Group>
      <TextInput
        label="Información Adicional:"
        {...form.getInputProps("additional")}
        disabled
      />
    </Stack>
  );
};

export default AddressView;
