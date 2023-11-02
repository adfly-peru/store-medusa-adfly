import { Center, Grid, MediaQuery, Stack } from "@mantine/core";
import PersonalDataForm from "@modules/account/components/personal-data-form";
import InformationBox from "../components/information-box";

const AccountProfile = () => {
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
            <PersonalDataForm />
          </Grid.Col>
        </Grid>
      </Stack>
    </Center>
  );
};

export default AccountProfile;
