import { useOrder } from "@context/order-context";
import {
  Button,
  Container,
  Group,
  Loader,
  Select,
  Table,
  Title,
  Text,
  Card,
  Space,
} from "@mantine/core";
import OrderRow from "./order-row";
import { useEffect, useState } from "react";
import { useAccount } from "@context/account-context";
import { IconChevronDown } from "@tabler/icons-react";

const OrdersList = () => {
  const { orders, fetchOrders } = useOrder();
  const { collaborator } = useAccount();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [sortBy, setSortBy] = useState("business");
  const [asc, setAsc] = useState(false);
  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };
  const pagina_actual = Math.floor(offset / limit) + 1;
  const total_paginas = Math.ceil((orders?.totalOrders ?? 0) / limit);

  useEffect(() => {
    if (collaborator?.uuidcollaborator)
      fetchOrders(
        { sortBy, limit, offset, asc },
        collaborator.uuidcollaborator
      );
  }, [sortBy, limit, offset, collaborator, asc]);

  if (!orders) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <Container w="100%" style={{ display: "flex", flexDirection: "column" }}>
      <Card
        radius="md"
        shadow="sm"
        padding="xl"
        withBorder
        mih="98%"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Title>Mis Compras</Title>
            <Group position="right">
              <Text c="dimmed" fz="sm">
                Ordenar por:
              </Text>
              <Select
                variant="unstyled"
                rightSection={<IconChevronDown size="1rem" />}
                w={100}
                value={sortBy}
                onChange={handleSortByChange}
                data={[
                  { label: "Empresa", value: "business" },
                  { label: "Fecha", value: "creationdate" },
                  { label: "Total", value: "total" },
                  { label: "Últ. Mod.", value: "updatedate" },
                ]}
              />
              <Select
                variant="unstyled"
                rightSection={<IconChevronDown size="1rem" />}
                value={asc ? "asc" : "desc"}
                w={75}
                onChange={(val) => setAsc(val === "asc")}
                data={[
                  { label: "Asc", value: "asc" },
                  { label: "Desc", value: "desc" },
                ]}
              />
            </Group>
          </Group>
        </Card.Section>
        <Card.Section withBorder inheritPadding py="xs" style={{ flex: 1 }}>
          <Space />
          <Table striped highlightOnHover style={{ flex: 1 }}>
            <thead>
              <tr>
                <th>N Pedido</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Ver Detalle</th>
              </tr>
            </thead>
            <tbody>
              {orders.orders.map((order, _) => (
                <OrderRow key={order.uuidOrder} order={order} />
              ))}
            </tbody>
          </Table>
        </Card.Section>
        <Card.Section mx="sm" py="sm">
          <Group position="apart">
            <Group spacing="sm">
              <Text fz="xs">Filas por página:</Text>
              <Select
                value={String(limit)}
                onChange={(newValue) => {
                  setLimit(Number(newValue));
                }}
                data={["10", "20", "30", "40", "50"]}
                variant="unstyled"
                size="xs"
                styles={{
                  input: { width: 50 },
                  rightSection: { width: "16px" },
                }}
              />
            </Group>
            <Group spacing="xs">
              <Button
                compact
                size="xs"
                disabled={offset === 0}
                onClick={() => {
                  setOffset(Math.max(offset - limit, 0));
                }}
              >
                {"<"}
              </Button>
              {`${pagina_actual}/${total_paginas}`}
              <Button
                compact
                size="xs"
                disabled={pagina_actual === total_paginas}
                onClick={() => {
                  setOffset(offset + limit);
                }}
              >
                {">"}
              </Button>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </Container>
  );
};

export default OrdersList;
