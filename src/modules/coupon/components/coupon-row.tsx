import { CouponUsage } from "@interfaces/order";
import { ActionIcon, Text } from "@mantine/core";
import { formatDate } from "@modules/common/functions/format-date";
import { IconSearch } from "@tabler/icons-react";

const CouponRow = ({ coupon }: { coupon: CouponUsage }) => {
  return (
    <tr key={coupon.uuidcouponcollaboratorusage}>
      <td>
        <Text>{formatDate(coupon.dateused)}</Text>
      </td>
      <td>
        <Text>{coupon.businessname}</Text>
      </td>
      <td>
        <ActionIcon
          component="a"
          href={`/coupons/${coupon.uuidcouponcollaboratorusage}`}
        >
          <IconSearch />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default CouponRow;
