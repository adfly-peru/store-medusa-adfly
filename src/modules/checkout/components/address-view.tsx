import {
  ActionIcon,
  Alert,
  Button,
  Group,
  LoadingOverlay,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Address } from "@interfaces/address-interface";
import ubigeoPeru from "ubigeo-peru";
import { useState } from "react";
import { useAccount } from "@context/account-context";
import { AddressInfo, MapForm } from "@modules/common/components/map";
import { IconEdit } from "@tabler/icons-react";

const AddressView = ({ data, cb }: { data: Address; cb: () => void }) => {
  const { editAddress } = useAccount();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [address, setAddress] = useState<AddressInfo | null>({
    address: data.address,
    lat: data.lat,
    lng: data.lng,
    district: data.district,
    province: data.province,
    department: data.department,
  });
  const form = useForm({
    initialValues: {
      alias: data.alias,
      additional: data.additional,
    },
  });

  // Función para actualizar los datos del formulario
  const handleUpdate = async () => {
    setLoading(true);
    form.validate();
    if (form.isValid() && address) {
      const newdata: Address = {
        uuidcollaboratoraddress: data.uuidcollaboratoraddress,
        additional: form.values.additional,
        lat: data.lat,
        lng: data.lng,
        alias: form.values.alias,
        district: address.district,
        province: address.province,
        department: address.department,
        country: "pe",
        address: address.address,
      };
      const result = await editAddress(newdata);
      if (result) setError(true);
      else cb();
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <Stack px="xl" spacing="sm">
      {error && (
        <Alert
          title="Error"
          color="red"
          onClose={() => setError(false)}
          my="lg"
          withCloseButton
        >
          Ups! Hubo un error
        </Alert>
      )}
      <LoadingOverlay overlayBlur={2} overlayOpacity={0.9} visible={loading} />
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
      {editMode ? (
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
      ) : (
        <Group align="end">
          <TextInput w="80%" label="Direccion:" value={data.address} disabled />
          <ActionIcon onClick={() => setEditMode(true)} w="15%">
            <IconEdit size="2rem" />
          </ActionIcon>
        </Group>
      )}

      <TextInput
        label="Información Adicional:"
        {...form.getInputProps("additional")}
      />
      <Group px={70} position="apart" grow mt="xl">
        <Button type="submit" onClick={handleUpdate} variant="light">
          Guardar
        </Button>
      </Group>
    </Stack>
  );
};

export default AddressView;
