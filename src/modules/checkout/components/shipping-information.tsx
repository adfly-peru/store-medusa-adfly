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
  TextInput,
  Select,
  LoadingOverlay,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCircleFilled,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAccount } from "@context/account-context";
import AddressForm from "@modules/checkout/components/address-form";
import ShipmentCard from "@modules/checkout/components/shipment-card";
import { useCart } from "@context/cart-context";
import { Address, AddressInfoForm } from "@interfaces/address-interface";
import AddressView from "./address-view";
import { UseFormReturnType } from "@mantine/form";
import { formatAddress } from "@modules/common/functions/format-place";

const ShippingInformation = ({
  form,
  handleNextStep,
  handlePrevStep,
}: {
  form: UseFormReturnType<AddressInfoForm>;
  handleNextStep: () => void;
  handlePrevStep: () => void;
}) => {
  const { addresses, deleteAddress } = useAccount();
  const [loading, setLoading] = useState(false);
  const { cart, editDelivery } = useCart();
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [select, setSelect] = useState<string>("");
  const [receiver, setReceiver] = useState("one");
  const [address, setAddress] = useState<Address | null>(null);
  const [addressSelected, setAddressSelected] = useState(false);

  const handleSelect = async (uuidcollaboratoraddress: string) => {
    console.log("hi");
    await editDelivery(
      {
        receivername: form.values.receivername,
        receiverdocumentkind: form.values.receiverdocumentkind,
        receiverdocumentnumber: form.values.receiverdocumentnumber,
        receiverphone: form.values.receiverphone,
      },
      uuidcollaboratoraddress
    );
    setAddressSelected(true);
  };

  useEffect(() => {
    if (cart?.deliveryInfo) {
      if (cart.deliveryInfo.receivername ?? "" != "") setReceiver("other");

      if (cart.deliveryInfo.collaboratoraddress)
        setSelect(
          cart.deliveryInfo.collaboratoraddress.uuidcollaboratoraddress
        );
    }
  }, []);
  return (
    <>
      <Center w="100%">
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
              cb={async () => {
                setAddress(null);
                setOpened2(false);
                if (address.uuidcollaboratoraddress == select) {
                  await editDelivery(
                    {
                      receivername: form.values.receivername,
                      receiverdocumentkind: form.values.receiverdocumentkind,
                      receiverdocumentnumber:
                        form.values.receiverdocumentnumber,
                      receiverphone: form.values.receiverphone,
                    },
                    address.uuidcollaboratoraddress
                  );
                }
              }}
            />
          )}
        </Modal>
        <Stack spacing="xs" w="95%">
          <LoadingOverlay
            overlayBlur={2}
            overlayOpacity={0.9}
            visible={loading}
          />
          <Title order={3}>Mis Direcciones</Title>
          <Divider />
          <Stack>
            {addresses.map((value, _) => (
              <Group
                key={value.uuidcollaboratoraddress}
                spacing="xl"
                position={addressSelected ? "left" : "apart"}
              >
                <Checkbox
                  checked={select == value.uuidcollaboratoraddress}
                  onChange={(_) => setSelect(value.uuidcollaboratoraddress)}
                  radius="lg"
                  value={value.uuidcollaboratoraddress}
                  label={value.alias}
                  icon={IconCircleFilled}
                  description={
                    <Stack spacing={0} m={0} fz={10}>
                      <Text>{value.address.split(",")[0]}</Text>
                      <Text>{formatAddress(value)}</Text>
                    </Stack>
                  }
                />
                <Group position="right">
                  <ActionIcon
                    onClick={() => {
                      setAddress(value);
                      setOpened2(true);
                    }}
                  >
                    <IconPencil color="#5C98C7" size={30} />
                  </ActionIcon>
                  {addressSelected ? (
                    <></>
                  ) : (
                    <ActionIcon
                      color="red"
                      onClick={async () => {
                        setLoading(true);
                        await deleteAddress(value.uuidcollaboratoraddress);
                        await editDelivery(
                          {
                            receivername: form.values.receivername,
                            receiverdocumentkind:
                              form.values.receiverdocumentkind,
                            receiverdocumentnumber:
                              form.values.receiverdocumentnumber,
                            receiverphone: form.values.receiverphone,
                          },
                          ""
                        );
                        setLoading(false);
                      }}
                    >
                      <IconTrash size={30} />
                    </ActionIcon>
                  )}
                </Group>
              </Group>
            ))}
          </Stack>
          {addressSelected ? (
            <></>
          ) : (
            <>
              <UnstyledButton
                w={200}
                onClick={() => {
                  setAddress(null);
                  setOpened(true);
                }}
                fz={10}
                c="#31658E"
              >
                <Group>
                  <IconPlus size={14} />
                  <Text>Agregar una nueva dirección</Text>
                </Group>
              </UnstyledButton>
              <Center>
                <Group w="70%" position="center" mt="xl">
                  <Stack w="100%" align="flex-end">
                    <Button
                      fullWidth
                      onClick={() => handleSelect(select)}
                      disabled={select.length > 0 ? false : true}
                    >
                      Continuar
                    </Button>
                    <UnstyledButton
                      w={200}
                      onClick={() => handleSelect("")}
                      fz={10}
                      c="#31658E"
                    >
                      <Text align="end">Continuar sin dirección de envío</Text>
                    </UnstyledButton>
                  </Stack>
                </Group>
              </Center>
            </>
          )}
          {addressSelected ? (
            <Stack w="100%" spacing={2}>
              <Text fw={700}>Datos de Envío</Text>
              <Divider m={0} />
              <Space h="xs" />
              <Group position="apart">
                <Checkbox
                  checked={receiver == "one"}
                  onChange={(_) => {
                    setReceiver("one");
                    form.setValues({
                      receivername: "",
                      receiverdocumentkind: "",
                      receiverdocumentnumber: "",
                      receiverphone: "",
                    });
                  }}
                  icon={IconCircleFilled}
                  radius="lg"
                  value={"one"}
                  label="Yo recogeré el producto"
                />
                <Checkbox
                  checked={receiver == "other"}
                  onChange={(_) => setReceiver("other")}
                  radius="lg"
                  icon={IconCircleFilled}
                  value={"other"}
                  label="Otra persona recogerá el pedido"
                />
              </Group>
              {receiver === "other" && (
                <Stack mt="md">
                  <TextInput
                    label="Nombre de la persona"
                    withAsterisk
                    {...form.getInputProps("receivername")}
                  />
                  <Group align="flex-start" grow>
                    <Select
                      data={[
                        { value: "DNI", label: "DNI" },
                        { value: "CE", label: "Carné extranjería" },
                        { value: "passport", label: "Pasaporte" },
                      ]}
                      label="Tipo Documento"
                      withAsterisk
                      {...form.getInputProps("receiverdocumentkind")}
                    />
                    <TextInput
                      label="N° Documento"
                      withAsterisk
                      {...form.getInputProps("receiverdocumentnumber")}
                    />
                  </Group>
                  <TextInput
                    label="Teléfono"
                    withAsterisk
                    {...form.getInputProps("receiverphone")}
                  />
                </Stack>
              )}
              <Space h="lg" />
              <Text fw={700}>Pedidos</Text>
              <Space h="xs" />
              {cart?.suborders.map((suborder, index) => (
                <ShipmentCard
                  key={suborder.uuidcartsuborder}
                  index={index}
                  total={cart.suborders.length}
                  suborder={suborder}
                />
              ))}{" "}
            </Stack>
          ) : (
            <></>
          )}

          <Center>
            <Group w="70%" position="center" mt="xl">
              <Button
                w={200}
                h={48}
                onClick={() =>
                  addressSelected ? setAddressSelected(false) : handlePrevStep()
                }
              >
                {"Regresar"}
              </Button>
              {addressSelected ? (
                <Button w={200} h={48} onClick={handleNextStep}>
                  Continuar
                </Button>
              ) : (
                <></>
              )}
            </Group>
          </Center>
        </Stack>
      </Center>
    </>
  );
};

export default ShippingInformation;
