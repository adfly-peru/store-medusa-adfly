import { Text, Grid, Avatar, Stack, Badge, Title } from "@mantine/core";
import { IconStar } from "@tabler/icons";
import { useViewportSize } from "@mantine/hooks";
import DatosPersonalesComponent from "@components/datosPersonalesComponent";
import SeguridadComponent from "@components/seguridadComponent";
import Layout from "@modules/layout/templates";

const Proffile = () => {
  const { height } = useViewportSize();

  return (
    <Layout allow>
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
          <DatosPersonalesComponent />
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

export default Proffile;
