import { Card, Paper, Divider, Grid, Text, Title } from "@mantine/core";
import { Order } from "@interfaces/order";
import SuborderCard from "../components/subordercard";

const SimpleOrderView = ({ order }: { order: Order }) => {
  return (
    <Paper m="xl" radius="md" py="md" px="xl" withBorder>
      <Title>
        Orden
        <Text color="dimmed" component="span" fz={25}>
          {" "}
          #{order.purchasenumber}
        </Text>
      </Title>
      <Divider mb="sm" />
      <Grid gutter="xl" grow>
        <Grid.Col span={8}>
          {order.suborders.map((suborder) => (
            <div key={suborder.uuidsuborder}>
              <SuborderCard suborder={suborder} />
            </div>
          ))}
        </Grid.Col>
        <Grid.Col span={4}>
          <Card withBorder shadow="sm" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
              <Title order={4} weight={500}>
                Resumen
              </Title>
            </Card.Section>
            <Text mt="md" weight={400}>
              Fecha de Compra: {order.creationdate.substring(0, 10)}
            </Text>
            <Text weight={400}>Estado: {order.status}</Text>
            <Text weight={400}>Precio Total: S/.{order.finaltotal}</Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default SimpleOrderView;
