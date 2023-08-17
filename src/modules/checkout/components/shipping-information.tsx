import {
  Text,
  Group,
  Stack,
  Checkbox,
  Divider,
  ActionIcon,
  Center,
  Button,
  Space,
  Modal,
} from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { useAccount } from "@context/account-context";
import AddressForm from "@modules/checkout/components/address-form";
import ShipmentCard from "@modules/checkout/components/shipment-card";
import { useCart } from "@context/cart-context";
import Address from "@interfaces/address-interface";
import AddressView from "./address-view";

const ShippingInformation = () => {
  const { addresses } = useAccount();
  const { cart } = useCart();
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [select, setSelect] = useState<number>(-1);
  const [address, setAddress] = useState<Address | null>(null);
  return (
    <>
      <Center>
        <Modal
          title={"Nueva dirección"}
          size="xl"
          opened={opened}
          onClose={() => setOpened(false)}
        >
          <AddressForm onSubmit={() => setOpened(false)} />
        </Modal>
        <Modal
          size="xl"
          opened={opened2}
          title={address?.alias}
          onClose={() => {
            setAddress(null);
            setOpened2(false);
          }}
        >
          {address && <AddressView address={address} />}
        </Modal>
        <Stack px={60} spacing="xs" w="80%">
          <Text fw={700}>Direcciones de Envío</Text>
          <Divider />
          <Stack>
            {addresses.map((value, id) => (
              <Group key={id} position="apart">
                <Checkbox
                  checked={select == id}
                  onChange={(_) => setSelect(id)}
                  radius="lg"
                  value={id}
                  label={value.alias}
                />
                <Group position="right">
                  <ActionIcon
                    onClick={() => {
                      setAddress(value);
                      setOpened2(true);
                    }}
                  >
                    <IconEye size={30} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => {}}>
                    <IconTrash size={30} />
                  </ActionIcon>
                </Group>
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
          {cart?.suborders.map((suborder, index) => (
            <div key={suborder.uuidcartsuborder}>
              <ShipmentCard
                index={index}
                total={cart.suborders.length}
                suborder={suborder}
              />
              <Space h="xl" />
            </div>
          ))}
          <Divider />
        </Stack>
      </Center>
    </>
  );
};

export default ShippingInformation;
