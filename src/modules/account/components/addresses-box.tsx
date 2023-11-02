import { useAccount } from "@context/account-context";
import { Address } from "@interfaces/address-interface";
import {
  ActionIcon,
  Burger,
  Button,
  Center,
  Divider,
  Group,
  LoadingOverlay,
  MediaQuery,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddressForm from "@modules/checkout/components/address-form";
import AddressView from "@modules/checkout/components/address-view";
import { formatAddress } from "@modules/common/functions/format-place";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import InformationBox from "./information-box";

const AddressesBox = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { addresses, deleteAddress } = useAccount();
  const [loading, setLoading] = useState(false);
  const [openedModal, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [address, setAddress] = useState<Address | null>(null);

  return (
    <Center w="100%">
      <Modal
        title={"Nueva dirección"}
        size="xl"
        opened={openedModal}
        onClose={() => setOpened(false)}
      >
        <AddressForm onSubmit={() => setOpened(false)} />
      </Modal>
      <Modal
        size="xl"
        opened={opened2}
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
      <Stack w="80%">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <div>
            <Burger opened={opened} onClick={toggle} />
            {opened ? (
              <InformationBox withClose={true} onClose={close} />
            ) : (
              <></>
            )}
          </div>
        </MediaQuery>
        <Title fz={20} order={3}>
          Mis Direcciones
        </Title>
        <Divider />
        <LoadingOverlay
          overlayBlur={2}
          overlayOpacity={0.9}
          visible={loading}
        />
        <Stack spacing="xl">
          {addresses.map((value, _) => (
            <Group key={value.uuidcollaboratoraddress} position="apart">
              <Stack spacing={0} m={0} fz={10}>
                <Text fz={15}>{value.alias}</Text>
                <Text c="#737A82">{value.address.split(",")[0]}</Text>
                <Text c="#737A82">{formatAddress(value)}</Text>
              </Stack>
              <Group position="right">
                <ActionIcon
                  onClick={() => {
                    setAddress(value);
                    setOpened2(true);
                  }}
                >
                  <IconPencil color="#5C98C7" size={30} />
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
        <Button
          mt="sm"
          onClick={() => {
            setAddress(null);
            setOpened(true);
          }}
          fullWidth
        >
          Agregar Dirección
        </Button>
      </Stack>
    </Center>
  );
};

export default AddressesBox;
