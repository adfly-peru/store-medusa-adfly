import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import Address from "@interfaces/address-interface";
import { MapForm } from "@modules/common/components/map";
import ubigeoPeru from "ubigeo-peru";

const AddressForm = ({
  index,
  onSubmit,
}: {
  index: number | null;
  onSubmit: () => void;
}) => {
  const { addresses, editAddresses } = useAccount();
  const address: Address =
    index == null
      ? {
          address: "",
          number: "",
          department: "",
          province: "",
          district: "",
          additional: "",
        }
      : addresses[index];

  const registerAddress = (newAddress: Address) => {
    if (index == null) {
      editAddresses([...addresses, newAddress]);
    } else {
      const newAddresses: Address[] = [];
      for (var i = 0; i < addresses.length; i++) {
        if (i == index) {
          newAddresses.push(newAddress);
        } else {
          newAddresses.push(addresses[i]);
        }
      }
      editAddresses(newAddresses);
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      department: address.department,
      province: address.province,
      district: address.district,
      additional: address.additional,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => null)}>
      <Stack px="xl" spacing="sm">
        <TextInput
          label="Nombre de la Dirección"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Departamento:"
          {...form.getInputProps("department")}
          disabled
        />
        <Group position="apart" spacing="xl" grow>
          <TextInput
            label="Provincia:"
            {...form.getInputProps("province")}
            disabled
          />
          <TextInput
            label="Distrito:"
            {...form.getInputProps("district")}
            disabled
          />
        </Group>
        <MapForm
          onSelectPlace={(place) => {
            form.setFieldValue("district", place?.district.nombre ?? "");
            form.setFieldValue(
              "province",
              ubigeoPeru.reniec.find(
                (v) =>
                  v.departamento == place?.district.departamento &&
                  v.provincia == place.district.provincia &&
                  v.distrito == "00"
              )?.nombre ?? ""
            );
            form.setFieldValue(
              "department",
              ubigeoPeru.reniec.find(
                (v) =>
                  v.departamento == place?.district.departamento &&
                  v.provincia == "00" &&
                  v.distrito == "00"
              )?.nombre ?? ""
            );
          }}
        />
        <TextInput
          label="Información Adicional:"
          {...form.getInputProps("additional")}
        />
        <Group px={70} position="apart" grow mt="xl">
          <Button type="submit" onClick={() => onSubmit()} variant="light">
            Guardar
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default AddressForm;
