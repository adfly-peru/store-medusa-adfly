import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import { Address } from "@interfaces/address-interface";
import { MapForm } from "@modules/common/components/map";
import ubigeoPeru from "ubigeo-peru";
import { useState } from "react";

interface AddressInfo {
  address: string;
  lat: number;
  lng: number;
  district: string;
  province: string;
  department: string;
}

const AddressForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { addAddress } = useAccount();
  const [address, setAddress] = useState<AddressInfo | null>(null);

  const registerAddress = () => {
    form.validate();
    if (!form.isValid()) return;
    if (!address) return;

    const newAddress: Address = {
      alias: form.values.alias,
      address: address.address,
      lat: address.lat,
      lng: address.lng,
      district: address.district,
      province: address.province,
      department: address.department,
      country: "pe",
      additional: form.values.additional == "" ? null : form.values.additional,
      uuidcollaboratoraddress: "",
    };
    addAddress(newAddress).then(() => onSubmit());
  };

  const form = useForm({
    initialValues: {
      alias: "",
      additional: "",
    },
    validate: {
      alias: (a) => (a.length > 0 ? null : "Este campo no puede ser nulo"),
    },
  });

  return (
    <Stack px="xl" spacing="sm">
      <TextInput
        label="Nombre de la Dirección"
        {...form.getInputProps("alias")}
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
      <MapForm
        onSelectPlace={(place) => {
          if (place) {
            setAddress({
              address: place.name,
              lat: place.location.lat,
              lng: place.location.lng,
              district: place.district.distrito,
              province: place.district.provincia,
              department: place.district.departamento,
            });
          }
        }}
      />
      <TextInput
        label="Información Adicional:"
        {...form.getInputProps("additional")}
      />
      <Group px={70} position="apart" grow mt="xl">
        <Button type="submit" onClick={registerAddress} variant="light">
          Guardar
        </Button>
      </Group>
    </Stack>
  );
};

export default AddressForm;
