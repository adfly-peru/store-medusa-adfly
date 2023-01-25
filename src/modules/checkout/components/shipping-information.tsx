import {
  Text,
  Group,
  Stack,
  TextInput,
  Checkbox,
  Divider,
  ActionIcon,
  Center,
  Button,
  Space,
  Modal,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import { useState } from "react";
import { useAccount } from "../../../context/account-context";
import Address from "../../../interfaces/address-interface";
import AddressForm from "./address-form";
import ShipmentCard from "./shipment-card";

const ShippingInformation = () => {
  const { addresses } = useAccount();
  const [opened, setOpened] = useState(false);
  const [select, setSelect] = useState<number>(-1);
  const [address, setAddress] = useState<number | null>(null);
  const orders = ["order1", "order2"];
  return (
    <Center>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <AddressForm
          index={address}
          onSubmit={() => setOpened(false)}
        ></AddressForm>
      </Modal>
      <Stack px={60} spacing="xs" w="80%">
        <Text fw={700}>Direcciones de Envío</Text>
        <Divider />
        <Stack>
          {addresses.map((value, id) => (
            <Group position="apart">
              <Checkbox
                checked={select == id}
                onChange={(_) => setSelect(id)}
                radius="lg"
                value={id}
                label={value.address}
              />
              <ActionIcon
                onClick={() => {
                  setAddress(id);
                  setOpened(true);
                }}
              >
                <IconEdit size={30} />
              </ActionIcon>
            </Group>
          ))}
        </Stack>
        <Button
          onClick={() => {
            setAddress(null);
            setOpened(true);
          }}
          variant="default"
          color="dark"
        >
          Agregar Dirección
        </Button>
        <Space h="lg" />
        <Text fw={700}>Datos de Envío</Text>
        <Divider />
        {orders.map((_, index) => (
          <>
            <ShipmentCard index={index} total={orders.length} />
            <Space h="xl" />
          </>
        ))}
        <Divider />
      </Stack>
    </Center>
  );
};

export default ShippingInformation;
