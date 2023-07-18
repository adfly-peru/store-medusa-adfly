import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import Address from "@interfaces/address-interface";

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
    console.log("ready");
  };

  const form = useForm({
    initialValues: {
      address: address.address,
      number: address.number,
      department: address.department,
      province: address.province,
      district: address.district,
      additional: address.additional,
    },
  });

  // const form = useForm({
  //   initialValues: {
  //     address: "Calle Los Jades 160, Santiago de Surco",
  //     number: "160 Dpt 507",
  //     department: "Lima",
  //     province: "Lima",
  //     district: "Barranco",
  //     additional: "160 Dpt 507",
  //   },
  // });
  return (
    <form onSubmit={form.onSubmit((values) => registerAddress(values))}>
      <Stack px="xl" spacing="sm">
        <TextInput
          label="Dirección de envío"
          {...form.getInputProps("address")}
        />
        <Group position="apart" spacing="xl" grow>
          <TextInput label="Número:" {...form.getInputProps("number")} />
          <TextInput
            label="Departamento:"
            {...form.getInputProps("department")}
          />
        </Group>
        <Group position="apart" spacing="xl" grow>
          <TextInput label="Provincia:" {...form.getInputProps("province")} />
          <TextInput label="Distrito:" {...form.getInputProps("district")} />
        </Group>
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
