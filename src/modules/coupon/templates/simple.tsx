import {
  Paper,
  Divider,
  Text,
  Title,
  Space,
  Group,
  Button,
  TextInput,
  LoadingOverlay,
  Center,
  Stack,
  Burger,
  MediaQuery,
} from "@mantine/core";
import { CouponUsage } from "@interfaces/order";
import { formatDate } from "@modules/common/functions/format-date";
import { useEffect, useState } from "react";
import InformationBox from "@modules/account/components/information-box";
import { useDisclosure } from "@mantine/hooks";
import { useCoupon } from "@context/coupon-context";
import CouponCard from "../components/coupon-card";

const SimpleCouponView = ({ couponId }: { couponId: string }) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { getCoupon } = useCoupon();
  const [report, setReport] = useState<CouponUsage | null>(null);
  const [loading, setLoading] = useState(false);
  const getOrderReport = async () => {
    setLoading(true);
    const couponreaded = await getCoupon(couponId);
    setReport(couponreaded ?? null);
    setLoading(false);
  };

  useEffect(() => {
    getOrderReport();
  }, []);

  if (loading || !report) {
    return <LoadingOverlay visible={loading} />;
  }

  return (
    <Center w="100%">
      <Stack w="95%">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <div>
            <Burger opened={opened} onClick={toggle} />
            {opened ? (
              <InformationBox withClose={true} onClose={close} />
            ) : (
              <></>
            )}
          </div>
        </MediaQuery>
        <Group position="apart">
          <Title>Detalle Pedido</Title>
          <Button component="a" href="/coupons">
            Volver
          </Button>
        </Group>
        <Paper radius="md" py="md" px="xl" withBorder>
          <Text>
            Fecha de Pedido:{" "}
            <Text fw="bold" span>
              {formatDate(report.dateused)}
            </Text>
          </Text>
          <Text>
            Código Cupón:{" "}
            <Text fw="bold" span>
              {report.couponcode}
            </Text>
          </Text>
          <Text>
            Vendido y entregado por{" "}
            <Text fw="bold" span>
              {report.businessname}
            </Text>
          </Text>
          <Space h="xl" />
          <Title order={3}> Envíos </Title>

          <Paper radius="md" py="md" px="xl" withBorder>
            <CouponCard coupon={report} />
          </Paper>
          <Space h="xl" />
        </Paper>
      </Stack>
    </Center>
  );
};

export default SimpleCouponView;
