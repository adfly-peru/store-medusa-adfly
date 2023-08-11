import { Grid } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import PersonalDataForm from "@modules/account/components/personal-data-form";
import InformationBox from "../components/information-box";

const AccountProfile = () => {
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
        <PersonalDataForm />
      </Grid.Col>
    </Grid>
  );
};

export default AccountProfile;
