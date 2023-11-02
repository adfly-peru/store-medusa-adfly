import { Center, Grid, MediaQuery, Stack } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import InformationBox from "@modules/account/components/information-box";
import OrdersList from "../components/orders-list";

const AllOrdersTemplate = () => {
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
            <OrdersList />
          </Grid.Col>
        </Grid>
      </Stack>
    </Center>
  );
};

export default AllOrdersTemplate;
