import { ActionIcon, Footer, Group, Text } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons";

const FooterComponent = () => {
  return (
    <Footer height={60} pt={10} mt={20}>
      <Group px={15} position="apart">
        <Text c="dimmed">Contáctanos a través de nuestras redes sociales.</Text>
        <Group>
          <ActionIcon size="lg">
            <IconBrandFacebook size={26} />
          </ActionIcon>
          <ActionIcon size="lg" variant="transparent">
            <IconBrandTwitter size={26} />
          </ActionIcon>
          <ActionIcon size="lg" variant="transparent">
            <IconBrandInstagram size={26} />
          </ActionIcon>
          <ActionIcon size="lg" variant="transparent">
            <IconBrandLinkedin size={26} />
          </ActionIcon>
          <ActionIcon size="lg" variant="transparent">
            <IconBrandGithub size={26} />
          </ActionIcon>
        </Group>
      </Group>
    </Footer>
  );
};

export default FooterComponent;
