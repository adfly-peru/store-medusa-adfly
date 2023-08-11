import { Text, Grid, Avatar, Stack, Badge, Title } from "@mantine/core";

import { IconStar } from "@tabler/icons";
import { useViewportSize } from "@mantine/hooks";
import SecurityForm from "../components/security-form";
import InformationBox from "../components/information-box";

const AccountSecurity = () => {
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
        <SecurityForm />
      </Grid.Col>
    </Grid>
  );
};

export default AccountSecurity;
