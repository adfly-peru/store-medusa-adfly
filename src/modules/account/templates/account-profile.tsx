import { Grid, Avatar, Stack, Badge, Title, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconStar } from "@tabler/icons";
import PersonalDataForm from "@modules/account/components/personal-data-form";

const AccountProfile = () => {
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
        <PersonalDataForm />
      </Grid.Col>
    </Grid>
  );
};

export default AccountProfile;
