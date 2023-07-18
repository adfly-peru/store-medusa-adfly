import { Text, Grid, Avatar, Stack, Badge, Title } from "@mantine/core";

import { IconStar } from "@tabler/icons";
import { useViewportSize } from "@mantine/hooks";
import SecurityForm from "../components/security-form";

const AccountSecurity = () => {
  const { height } = useViewportSize();

  return (
    <Grid w="100%">
      <Grid.Col span={3} sx={{ display: "flex", paddingLeft: 30 }}>
        <Avatar radius="xl" size="xl" />
        <Stack spacing="xs" align="center" justify="flex-start">
          <Badge size="md">
            <IconStar size={15} /> 210 Estrellas
          </Badge>
          <Title order={3}>Nombre</Title>
          <Text>Empresa (*)</Text>
          <Text>Seguridad (*)</Text>
        </Stack>
      </Grid.Col>

      <Grid.Col
        span={9}
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
