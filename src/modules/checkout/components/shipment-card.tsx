import { useAccount } from "@context/account-context";
import { useCart } from "@context/cart-context";
import { CartSubOrder } from "@interfaces/cart";
import {
  Text,
  Group,
  Stack,
  Image,
  Checkbox,
  Grid,
  Divider,
  Select,
} from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ShipmentData } from "./shipping-information";

const ShipmentCard = ({
  index,
  total,
  suborder,
  updateShipmentData,
}: {
  index: number;
  total: number;
  suborder: CartSubOrder;
  updateShipmentData: (data: ShipmentData) => void;
}) => {
  const { cart } = useCart();
  const { collaborator } = useAccount();
  const [uuidstore, setUuidstore] = useState(
    suborder.deliverymethod === "pickup" ? suborder.uuidaddress : ""
  );
  const [selected, setSelected] = useState(suborder.deliverymethod ?? "");

  useEffect(() => {
    if (selected === "onhome" || selected === "online") {
      setUuidstore("");
      updateShipmentData({
        uuidcartsuborder: suborder.uuidcartsuborder,
        method: selected,
        uuidaddress:
          selected === "onhome"
            ? cart?.deliveryInfo?.collaboratoraddress
                ?.uuidcollaboratoraddress ?? ""
            : "",
      });
    }
  }, [selected]);

  useEffect(() => {
    if (selected === "pickup" && uuidstore.length > 0) {
      updateShipmentData({
        uuidcartsuborder: suborder.uuidcartsuborder,
        method: selected,
        uuidaddress: uuidstore,
      });
    }
  }, [uuidstore]);

  return (
    <Stack spacing={0} mb="md">
      <Grid gutter="lg" fw={600} fz={15} grow>
        <Grid.Col span={6} md={8}>
          <Text>
            Pedido {index + 1} de {total}: Entregado por {suborder.businessName}
          </Text>
        </Grid.Col>
        <Grid.Col span={6} md={4}>
          <Text>Opciones de Envío</Text>
        </Grid.Col>
      </Grid>
      <Divider />
      <Grid gutter="lg" mt="md" grow>
        <Grid.Col span={6} md={8}>
          <Stack spacing="xl">
            {suborder.items.map((product, _) => (
              <div key={product.uuidcartitem}>
                <Group position="left" spacing="xl">
                  <Image
                    src={product.variant.imageURL}
                    alt={product.variant.imageURL}
                    height={100}
                    width={100}
                    fit="contain"
                    withPlaceholder
                  />
                  <Stack fz={10} spacing={0}>
                    <Text fz={15} lineClamp={2}>
                      {product.variant.offer.offerName}
                    </Text>
                    <Text>
                      <Text fw={500} span>
                        {"Cantidad: "}
                      </Text>
                      {product.quantity}
                    </Text>
                    <Text>
                      <Text fw={500} span>
                        {"Subtotal: "}
                      </Text>
                      {`S/.${
                        product.quantity * (product.variant.adflyPrice ?? 0)
                      }`}
                    </Text>
                    <Text>
                      <Text fw={500} span>
                        {"Vendido y Entregado por: "}
                      </Text>
                      {suborder.businessName}
                    </Text>
                  </Stack>
                </Group>
              </div>
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={6} md={4}>
          <Stack>
            {suborder.items.findIndex(
              (v) => v.variant.offer.type === "product"
            ) === -1 ? (
              <Checkbox
                icon={IconCircleFilled}
                radius="lg"
                onChange={() => {
                  setSelected("online");
                }}
                checked={selected === "online"}
                value={2}
                label="Entrega online"
                description={`Se le enviará al siguiente correo: ${collaborator?.email}`}
              />
            ) : (
              <>
                {suborder.availableDeliveryMethods.deliveryOnHome !== null ? (
                  <div>
                    <Checkbox
                      checked={selected === "onhome"}
                      onChange={() => {
                        setSelected("onhome");
                      }}
                      radius="lg"
                      value={0}
                      icon={IconCircleFilled}
                      label="Entrega en Dirección Personal"
                    />
                    <Stack pl={20} spacing={0} fz={11}>
                      <Text>
                        <Text span c="dimmed">
                          Costo de Envío:
                        </Text>
                        {` S/. ${suborder.availableDeliveryMethods.deliveryOnHome.price}`}
                      </Text>
                      <Text>
                        <Text span c="dimmed">
                          Fecha de Entrega:
                        </Text>
                        {` ${suborder.availableDeliveryMethods.deliveryOnHome.timetodelivery}`}
                      </Text>
                      <Text>
                        <Text span c="dimmed">
                          Especificaciones:{" "}
                        </Text>
                        {suborder.availableDeliveryMethods.deliveryOnHome
                          .comments ?? "-"}
                      </Text>
                    </Stack>
                  </div>
                ) : (
                  <Checkbox
                    icon={IconCircleFilled}
                    disabled
                    radius="lg"
                    value={0}
                    label="Entrega en Dirección Personal"
                    description="No ha seleccionado una dirección personal o el partner no cuenta con esta modalidad en su dirección."
                  />
                )}
                <Checkbox
                  icon={IconCircleFilled}
                  checked={selected === "pickup"}
                  onChange={() => setSelected("pickup")}
                  radius="lg"
                  value={1}
                  label="Recojo en Tienda"
                />
                {selected === "pickup" ? (
                  <Stack pl={20} spacing={0} fz={11}>
                    <Select
                      data={suborder.availableDeliveryMethods.deliveryOnStore.map(
                        (value) => ({
                          value: value.uuiddeliverystore,
                          label: value.name,
                        })
                      )}
                      value={uuidstore}
                      onChange={(val) => {
                        setUuidstore(val ?? "");
                      }}
                    />
                    <Text>
                      <Text span c="dimmed">
                        Dirección:
                      </Text>
                      {` ${
                        suborder.availableDeliveryMethods.deliveryOnStore
                          .find((v) => v.uuiddeliverystore === uuidstore)
                          ?.line?.split(",")
                          ?.at(0) ?? "-"
                      }`}
                    </Text>
                    <Text>
                      <Text span c="dimmed">
                        Tiempo Entrega:
                      </Text>
                      {` ${
                        suborder.availableDeliveryMethods.deliveryOnStore.find(
                          (v) => v.uuiddeliverystore === uuidstore
                        )?.timetodelivery ?? "-"
                      }`}
                    </Text>
                    <Text>
                      <Text span c="dimmed">
                        Especificaciones:{" "}
                      </Text>
                      {suborder.availableDeliveryMethods.deliveryOnStore.find(
                        (v) => v.uuiddeliverystore === uuidstore
                      )?.comments ?? "-"}
                    </Text>
                  </Stack>
                ) : (
                  <></>
                )}
              </>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default ShipmentCard;
