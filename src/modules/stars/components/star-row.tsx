import { CollaboratorStars } from "@interfaces/star";
import { ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { formatDate } from "@modules/common/functions/format-date";
import { IconSearch } from "@tabler/icons-react";

const CouponRow = ({ star }: { star: CollaboratorStars }) => {
  return (
    <tr key={star.uuidstars}>
      <td>
        <Text>{formatDate(star.creationdate)}</Text>
      </td>
      <td>
        <Text>
          {star.operation === "input"
            ? "Ingreso"
            : star.operation === "output"
            ? "Salida"
            : "-"}
        </Text>
      </td>
      <td>
        <Text>{star.reason}</Text>
      </td>
      <td>
        <Text>{star.amount}</Text>
      </td>
      <td>
        <ActionIcon
          onClick={() => {
            modals.closeAll();
            modals.open({
              title: "Editar Usuario",
              children: <></>,
            });
          }}
        >
          <IconSearch />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default CouponRow;
