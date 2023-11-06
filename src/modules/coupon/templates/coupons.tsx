import { Center, Grid, MediaQuery, Stack } from "@mantine/core";
import InformationBox from "@modules/account/components/information-box";
import CouponsList from "../components/coupon-list";

const AllCouponsTemplate = () => {
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
            <CouponsList />
          </Grid.Col>
        </Grid>
      </Stack>
    </Center>
  );
};

export default AllCouponsTemplate;
