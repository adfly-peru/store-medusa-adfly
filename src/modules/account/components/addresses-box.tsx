import { useAccount } from "@context/account-context";
import { Address } from "@interfaces/address-interface";
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import AddressForm from "@modules/checkout/components/address-form";
import AddressView from "@modules/checkout/components/address-view";
import { IconEye, IconMapPin, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

const AddressesBox = () => {
  const { width } = useViewportSize();
  const { addresses, deleteAddress } = useAccount();
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [address, setAddress] = useState<Address | null>(null);

  return (
    <div>
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
        {address && (
          <AddressView
            data={address}
            cb={() => {
              setAddress(null);
              setOpened2(false);
            }}
          />
        )}
      </Modal>
      <Card withBorder shadow="sm" radius="md" sx={{ width: width / 3 }}>
        <Card.Section p="md" withBorder>
          <Text fw={700}>Direcciones de Envío</Text>
        </Card.Section>
        <Card.Section p="md">
          <LoadingOverlay
            overlayBlur={2}
            overlayOpacity={0.9}
            visible={loading}
          />
          <Stack spacing="xl">
            {addresses.map((value, _) => (
              <Group key={value.uuidcollaboratoraddress} position="apart">
                <Group position="left">
                  <IconMapPin />
                  <Text>{value.alias}</Text>
                </Group>
                <Group position="right">
                  <ActionIcon
                    onClick={() => {
                      setAddress(value);
                      setOpened2(true);
                    }}
                  >
                    <IconEye size={30} />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    onClick={async () => {
                      setLoading(true);
                      await deleteAddress(value.uuidcollaboratoraddress);
                      setLoading(false);
                    }}
                  >
                    <IconTrash size={30} />
                  </ActionIcon>
                </Group>
              </Group>
            ))}
          </Stack>
        </Card.Section>
        <Button
          mt="sm"
          onClick={() => {
            setAddress(null);
            setOpened(true);
          }}
          variant="default"
          color="dark"
          fullWidth
        >
          Agregar Dirección
        </Button>
      </Card>
    </div>
  );
};

export default AddressesBox;
