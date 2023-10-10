import { useCart } from "@context/cart-context";
import { CartSubOrder, DeliveryStore } from "@interfaces/cart";
import {
  Text,
  Group,
  Stack,
  Image,
  Checkbox,
  Grid,
  Accordion,
  rem,
  Button,
} from "@mantine/core";
import { modals } from "@mantine/modals";

const SelectStore = ({
  stores,
  selectStore,
}: {
  stores: DeliveryStore[];
  selectStore: (uuidstore: string) => void;
}) => {
  return (
    <Accordion>
      {stores.map((store) => {
        return (
          <Accordion.Item
            value={store.uuiddeliverystore}
            key={store.uuiddeliverystore}
          >
            <Accordion.Control>{store.name}</Accordion.Control>
            <Accordion.Panel>
              <Text>
                <Text span fw="bold">
                  Departamento:
                </Text>
                {` ${store.department}`}
              </Text>
              <Text>
                <Text span fw="bold">
                  Provincia:
                </Text>
                {` ${store.city}`}
              </Text>
              <Text>
                <Text span fw="bold">
                  Distrito:
                </Text>
                {` ${store.district}`}
              </Text>
              <Text>
                <Text span fw="bold">
                  Direccion:
                </Text>
                {` ${store.line}`}
              </Text>
              <Text>
                <Text span fw="bold">
                  Tiempo de llegada:
                </Text>
                {` ${store.timetodelivery}`}
              </Text>
              <Text>
                <Text span fw="bold">
                  Comentarios:
                </Text>
                {` ${store.comments}`}
              </Text>
              <Button onClick={() => selectStore(store.uuiddeliverystore)}>
                Seleccionar Tienda
              </Button>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

const ShipmentCard = ({
  index,
  total,
  suborder,
}: {
  index: number;
  total: number;
  suborder: CartSubOrder;
}) => {
  const { selectDeliveryMethod, cart } = useCart();
  const onhomeSelect = async () => {
    if (cart?.deliveryInfo?.collaboratoraddress?.uuidcollaboratoraddress)
      await selectDeliveryMethod(
        suborder.uuidcartsuborder,
        "onhome",
        cart?.deliveryInfo?.collaboratoraddress.uuidcollaboratoraddress
      );
  };

  const openStoreModal = async () => {
    modals.closeAll();
    modals.open({
      title: "Seleccionar Tienda",
      size: "xl",
      children: (
        <SelectStore
          stores={suborder.availableDeliveryMethods.deliveryOnStore}
          selectStore={(uuidstore) => {
            modals.closeAll();
            selectDeliveryMethod(
              suborder.uuidcartsuborder,
              "pickup",
              uuidstore
            );
          }}
        />
      ),
    });
  };

  return (
    <Grid gutter="lg" grow>
      <Grid.Col span={8}>
        <Stack spacing="xl">
          <Text fw={500}>
            Pedido {index + 1} de {total}: Entregado por {suborder.businessName}
          </Text>
          {suborder.items.map((product, _) => (
            <div key={product.uuidcartitem}>
              <Group position="apart" spacing="xl" grow>
                <Image
                  src={product.variant.imageURL}
                  alt={product.variant.imageURL}
                  height={150}
                  fit="contain"
                  withPlaceholder
                />
                <Stack spacing={0}>
                  <Text c="indigo">{product.variant.product.productName}</Text>
                  <Text fz="sm">
                    <Text fw={500} span>
                      {"Cantidad: "}
                    </Text>
                    {product.quantity}
                  </Text>
                  <Text fz="sm">
                    <Text fw={500} span>
                      {"Subtotal: "}
                    </Text>
                    {`S/.${
                      product.quantity * (product.variant.adflyPrice ?? 0)
                    }`}
                  </Text>
                </Stack>
              </Group>
            </div>
          ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}>
        <Stack>
          <Text fw={500}>Opciones de Envío</Text>
          {suborder.availableDeliveryMethods.deliveryOnHome != null ? (
            <div>
              <Checkbox
                checked={suborder.deliverymethod == "onhome"}
                onChange={onhomeSelect}
                radius="lg"
                value={0}
                label="Entrega en Dirección Personal"
              />
              <Stack pl={20} spacing={0}>
                <Text fz="sm">
                  <Text span c="dimmed">
                    Costo de Envío:
                  </Text>
                  {` S/. ${suborder.availableDeliveryMethods.deliveryOnHome.price}`}
                </Text>
                <Text fz="sm">
                  <Text span c="dimmed">
                    Fecha de Entrega:
                  </Text>
                  {` ${suborder.availableDeliveryMethods.deliveryOnHome.timetodelivery}`}
                </Text>
                <Text fz="sm">
                  <Text span c="dimmed">
                    Especificaciones:{" "}
                  </Text>
                  {suborder.availableDeliveryMethods.deliveryOnHome.comments ??
                    "-"}
                </Text>
              </Stack>
            </div>
          ) : (
            <Checkbox
              disabled
              radius="lg"
              value={0}
              label="Entrega en Dirección Personal"
              description="En este momento el partner no cuenta con Entrega a Domicilio en su zona"
            />
          )}
          <Checkbox
            checked={suborder.deliverymethod == "pickup"}
            onChange={openStoreModal}
            radius="lg"
            value={1}
            label="Recojo en Tienda"
            description={
              suborder.deliverymethod == "pickup"
                ? suborder.availableDeliveryMethods.deliveryOnStore.find(
                    (s) => s.uuiddeliverystore == suborder.uuidaddress
                  )?.name
                : null
            }
          />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default ShipmentCard;
