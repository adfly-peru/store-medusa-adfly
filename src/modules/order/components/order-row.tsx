import { Order } from "@interfaces/order";
import { ActionIcon, Text } from "@mantine/core";
import { formatDate } from "@modules/common/functions/format-date";
import { IconSearch } from "@tabler/icons-react";

const OrderRow = ({ order }: { order: Order }) => {
  return (
    <tr key={order.uuidOrder}>
      <td>
        <Text>{formatDate(order.creationDate)}</Text>
      </td>
      <td>
        <Text>S/. {order.finalTotal.toFixed(2)}</Text>
      </td>
      <td>
        <ActionIcon component="a" href={`/orders/${order.uuidOrder}`}>
          <IconSearch />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default OrderRow;
