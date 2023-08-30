import {
  ActionIcon,
  Footer,
  Grid,
  Group,
  Text,
  Image,
  Title,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons";

const FooterComponent = () => {
  return (
    <Footer height={60} pt={10} mt={20} px="xl" fs="md">
      <Grid gutter="xl">
        <Grid.Col span={4}>
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
          <Text>(+51)999999999</Text>
          <Text>WhatsApp:</Text>
          <Text>(+51)999999999</Text>
        </Grid.Col>
        <Grid.Col span={4}>
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
        </Grid.Col>
        <Grid.Col span={4}>
          <Title order={3}>Nosotros</Title>
          <Text>Sobre ADLY</Text>

          <Image
            radius="md"
            height={200}
            width="inherit"
            fit="contain"
            src="https://bestbrands.com.pe/librodereclamaciones/wp-content/uploads/2022/02/i1.jpg"
            alt="Adfly"
            sx={{ padding: 10 }}
          />
        </Grid.Col>
      </Grid>
    </Footer>
  );
};

export default FooterComponent;
