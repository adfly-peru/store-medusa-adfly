import { useAccount } from "@context/account-context";
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
  Center,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconMail,
  IconMailFilled,
  IconMessage2,
  IconPhoneFilled,
} from "@tabler/icons-react";

const FooterComponent = () => {
  const { homeDesign } = useAccount();
  return (
    <Footer height="100%" pt={10} mt={20} fz={15}>
      <Center>
        <Group w="85%" align="start" position="apart" px="xl">
          <Stack spacing="xs" align="center" h="100%">
            <Image
              radius="md"
              height={50}
              width="inherit"
              fit="contain"
              src="https://www.adfly.pe/Content/logo.png"
              alt="Adfly"
              sx={{ padding: 10 }}
            />
            <Stack align="left">
              <Title order={3}>CONTÁCTANOS:</Title>
              <Group>
                <IconMailFilled style={{ color: "#5C98C7" }} />
                <Text>hola@adfly.pe</Text>
              </Group>
              <Group>
                <IconPhoneFilled style={{ color: "#5C98C7" }} />
                <Text>(+51) 970 802 065</Text>
              </Group>
              <Group>
                <IconMessage2 style={{ color: "#5C98C7" }} />
                <Text>(+51) 970 802 065</Text>
              </Group>
            </Stack>
          </Stack>
          <Stack spacing="xs" align="center">
            <Stack align="left" spacing="xs">
              <Title order={3}>TIENDA ONLINE</Title>
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
          </Stack>
          <Stack spacing="xs" align="center">
            <Stack>
              <Title order={3}>NOSOTROS</Title>
              <Text>¿Qué es ADFLY?</Text>
              <Image
                radius="md"
                height={100}
                width="inherit"
                fit="contain"
                src="https://bestbrands.com.pe/librodereclamaciones/wp-content/uploads/2022/02/i1.jpg"
                alt="Adfly"
                sx={{ paddingTop: 10, paddingLeft: -10 }}
              />
            </Stack>
          </Stack>
        </Group>
      </Center>
      <Group
        position="apart"
        pb="lg"
        bg={homeDesign?.backcolor ?? "#2A6595"}
        px="md"
      >
        <Group mt="md">
          <ActionIcon
            size="lg"
            variant="transparent"
            c="white"
            component="a"
            href="https://www.instagram.com/adfly.pe/"
          >
            <IconBrandInstagram size={26} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="transparent"
            c="white"
            component="a"
            href="https://pe.linkedin.com/company/somosadfly"
          >
            <IconBrandLinkedin size={26} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="transparent"
            c="white"
            component="a"
            href="https://wa.me/51970802065"
          >
            <IconBrandWhatsapp size={26} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="transparent"
            c="white"
            component="a"
            href="https://www.facebook.com/adfly.pe/"
          >
            <IconBrandFacebook size={26} />
          </ActionIcon>
        </Group>
        <Text c="white" align="end" style={{ marginTop: "20px" }}>
          © 2023 ADFLY S.A.C. Todos los derechos reservados. Lima - Perú
        </Text>
      </Group>
    </Footer>
  );
};

export default FooterComponent;
