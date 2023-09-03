import {
  ActionIcon,
  Footer,
  Grid,
  Group,
  Text,
  Image,
  Title,
  Stack,
  Container,
  Divider,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

const FooterComponent = () => {
  return (
    <Footer height="100%" pt={10} mt={20} px="xl" fs="md">
      <Container mt={25} maw={1260}>
        <Grid gutter={210}>
          <Grid.Col sm={4}>
            <Stack spacing="xs">
              <Image
                radius="md"
                height={50}
                width="inherit"
                fit="contain"
                src="https://www.adfly.pe/Content/logo.png"
                alt="Adfly"
                sx={{ padding: 10 }}
              />
              <Title order={3}>Comunícate con nosotros:</Title>
              <Text>Escríbenos:</Text>
              <Text>hola@adfly.pe</Text>
              <Text>Llámanos:</Text>
              <Text>(+51) 970 802 065</Text>
              <Text>WhatsApp:</Text>
              <Text>(+51) 970 802 065</Text>
              <Group mt="md">
                <ActionIcon
                  size="lg"
                  variant="transparent"
                  component="a"
                  href="https://www.instagram.com/adfly.pe/"
                >
                  <IconBrandInstagram size={26} />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  variant="transparent"
                  component="a"
                  href="https://pe.linkedin.com/company/somosadfly"
                >
                  <IconBrandLinkedin size={26} />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  variant="transparent"
                  component="a"
                  href="https://wa.me/51970802065"
                >
                  <IconBrandWhatsapp size={26} />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  variant="transparent"
                  component="a"
                  href="https://www.facebook.com/adfly.pe/"
                >
                  <IconBrandFacebook size={26} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col sm={4}>
            <Stack spacing="xs">
              <Title order={3}>Tienda Online</Title>
              <Text>Términos y condiciones</Text>
              <Text>Políticas de Privacidad y Seguridad</Text>
              <Text>Políticas de Cookies</Text>
              <Text>Condiciones Promociones</Text>
              <Text>Cambios y Devoluciones</Text>
              <Text>Mis Pedidos</Text>
              <Text>Tipos de entrega</Text>
              <Text>Medios de Pago</Text>
              <Text>Preguntas Frecuentes</Text>
              <Text>¿Cómo Comprar?</Text>
              <Text>Boletas y facturas</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col sm={4}>
            <Stack spacing="xs">
              <Title order={3}>Nosotros</Title>
              <Text>Sobre ADLY</Text>

              <Image
                radius="md"
                height={100}
                width="inherit"
                fit="contain"
                src="https://bestbrands.com.pe/librodereclamaciones/wp-content/uploads/2022/02/i1.jpg"
                alt="Adfly"
                sx={{ padding: 10 }}
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
      <Divider my="sm" />
      <Text color="gray" align="end" style={{ marginTop: "20px" }}>
        © 2023 ADFLY. Todos los derechos reservados. Lima - Perú
      </Text>
    </Footer>
  );
};

export default FooterComponent;
