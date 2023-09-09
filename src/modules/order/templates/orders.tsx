import { Grid } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import InformationBox from "@modules/account/components/information-box";
import OrdersList from "../components/orders-list";

const AllOrdersTemplate = () => {
  const { height } = useViewportSize();
  return (
    <Grid p={20} w="100%" justify="space-around">
      <Grid.Col span={4}>
        <InformationBox />
      </Grid.Col>
      <Grid.Col
        span={6}
        sx={{
          height: height,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <OrdersList />
      </Grid.Col>
    </Grid>
  );
};

export default AllOrdersTemplate;
