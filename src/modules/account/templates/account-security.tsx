import { Grid, Stack, Center, MediaQuery } from "@mantine/core";

import SecurityForm from "../components/security-form";
import InformationBox from "../components/information-box";

const AccountSecurity = () => {
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
            <SecurityForm />
          </Grid.Col>
        </Grid>
      </Stack>
    </Center>
  );
};

export default AccountSecurity;
