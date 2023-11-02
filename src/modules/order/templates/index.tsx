import { Center, Grid, MediaQuery, Stack } from "@mantine/core";
import SimpleOrderView from "./simple";
import InformationBox from "@modules/account/components/information-box";

const OrderTemplate = ({ orderId }: { orderId: string }) => {
  return (
    <Center>
      <Stack w="90%">
        <Grid p={20} justify="space-around">
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Grid.Col span={3}>
              <InformationBox />
            </Grid.Col>
          </MediaQuery>
          <Grid.Col
            span="auto"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <SimpleOrderView orderId={orderId} />
          </Grid.Col>
        </Grid>
      </Stack>
    </Center>
  );
};

export default OrderTemplate;
