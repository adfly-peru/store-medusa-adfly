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
} from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAccount } from "@context/account-context";
import AddressForm from "@modules/checkout/components/address-form";
import ShipmentCard from "@modules/checkout/components/shipment-card";
import { useCart } from "@context/cart-context";
import { Address, AddressInfoForm } from "@interfaces/address-interface";
import AddressView from "./address-view";
import { UseFormReturnType } from "@mantine/form";

const ShippingInformation = ({
  form,
}: {
  form: UseFormReturnType<AddressInfoForm>;
}) => {
  const { addresses, deleteAddress } = useAccount();
  const [loading, setLoading] = useState(false);
  const { cart, editDelivery } = useCart();
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [select, setSelect] = useState<string>("");
  const [receiver, setReceiver] = useState("one");
  const [address, setAddress] = useState<Address | null>(null);

  const handleSelect = async (uuidcollaboratoraddress: string) => {
    setSelect(uuidcollaboratoraddress);
    await editDelivery(
      {
        receivername: "",
        receiverdocumentkind: "",
        receiverdocumentnumber: "",
        receiverphone: "",
      },
      uuidcollaboratoraddress
    );
  };

  useEffect(() => {
    if (cart?.deliveryInfo) {
      setSelect(cart.deliveryInfo.collaboratoraddress.uuidcollaboratoraddress);
      if (cart.deliveryInfo.receivername ?? "" != "") {
        setReceiver("other");
      }
    }
  }, []);
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
          {address && (
            <AddressView
              data={address}
              cb={async () => {
                setAddress(null);
                setOpened2(false);
                if (address.uuidcollaboratoraddress == select) {
                  await editDelivery(
                    {
                      receivername: "",
                      receiverdocumentkind: "",
                      receiverdocumentnumber: "",
                      receiverphone: "",
                    },
                    address.uuidcollaboratoraddress
                  );
                }
              }}
            />
          )}
        </Modal>
        <Stack px={60} spacing="xs" w="80%">
          <LoadingOverlay
            overlayBlur={2}
            overlayOpacity={0.9}
            visible={loading}
          />
          <Text fw={700}>Direcciones de Envío</Text>
          <Divider />
          <Stack>
            {addresses.map((value, _) => (
              <Group key={value.uuidcollaboratoraddress} position="apart">
                <Checkbox
                  checked={select == value.uuidcollaboratoraddress}
                  onChange={(_) => handleSelect(value.uuidcollaboratoraddress)}
                  radius="lg"
                  value={value.uuidcollaboratoraddress}
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
                  <ActionIcon
                    color="red"
                    onClick={async () => {
                      setLoading(true);
                      await deleteAddress(value.uuidcollaboratoraddress);
                      await editDelivery(
                        {
                          receivername: "",
                          receiverdocumentkind: "",
                          receiverdocumentnumber: "",
                          receiverphone: "",
                        },
                        ""
                      );
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
              radius="lg"
              value={"one"}
              label="Yo recogeré el producto"
            />
            <Checkbox
              checked={receiver == "other"}
              onChange={(_) => setReceiver("other")}
              radius="lg"
              value={"other"}
              label="Otra persona recogerá el producto"
            />
          </Group>
          {receiver === "other" && (
            <>
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
                    { value: "RUC", label: "RUC" },
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
            </>
          )}
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
