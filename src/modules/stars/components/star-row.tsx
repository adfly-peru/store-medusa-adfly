import { CollaboratorStars } from "@interfaces/star";
import { ActionIcon, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { formatDate } from "@modules/common/functions/format-date";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import StarDetails from "./star-details";

const CouponRow = ({ star }: { star: CollaboratorStars }) => {
  const router = useRouter();
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
            if (star.operation === "output" && star.uuidorder) {
              router.push(`/orders/${star.uuidorder}`);
            } else {
              modals.closeAll();
              modals.open({
                radius: "md",
                size: 800,
                styles: {
                  body: {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                  content: {
                    borderRadius: "4rem",
                  },
                  close: {
                    marginRight: 20,
                  },
                },
                centered: true,
                children: <StarDetails starDetails={star} />,
              });
            }
          }}
        >
          <IconSearch />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default CouponRow;
