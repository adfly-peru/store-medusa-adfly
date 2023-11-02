import { Center, Grid, MediaQuery, Stack } from "@mantine/core";
import InformationBox from "../components/information-box";
import AddressesBox from "../components/addresses-box";

const AccountAddresses = () => {
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
            <AddressesBox />
          </Grid.Col>
        </Grid>
      </Stack>
    </Center>
  );
};

export default AccountAddresses;
