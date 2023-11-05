import { Group, Stack, Text, Image, Title } from "@mantine/core";
import { CouponUsage } from "@interfaces/order";

const CouponCard = ({ coupon }: { coupon: CouponUsage }) => {
  return (
    <div>
      <Group position="apart" spacing="xl" grow>
        <Image
          src={coupon.variant?.imageURL}
          alt={coupon.variant?.imageURL}
          height={100}
          fit="contain"
          withPlaceholder
        />
        <Stack spacing={0}>
          <Title order={5} fw="bold" c="indigo" lineClamp={2}>
            {coupon.variant?.offer.offerName}
          </Title>
          <Text fz="sm">
            <Text fw={500} span>
              {"SKU: "}
            </Text>
            {coupon.variant?.variantSku}
          </Text>
          <Text fz="sm">
            {coupon.variant?.attributes.map(
              (attr) => `${attr.attributeName} ${attr.value}, `
            )}
          </Text>
        </Stack>
        <Stack spacing={0}>
          <Text fw={600}>Descuento</Text>
          <Text>
            {`${
              coupon.couponData?.discountType === "monetary"
                ? ` S/.${coupon.couponData?.discount.toFixed(2)}`
                : ` ${coupon.couponData?.discount}%`
            }`}
          </Text>
        </Stack>
      </Group>
    </div>
  );
};

export default CouponCard;
