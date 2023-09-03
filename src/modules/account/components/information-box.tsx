import { useAccount } from "@context/account-context";
import {
  Card,
  Badge,
  Group,
  Avatar,
  Stack,
  Title,
  NavLink,
} from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const InformationBox = () => {
  const router = useRouter();
  const { collaborator } = useAccount();

  return (
    <Card pb={40} withBorder shadow="sm" radius="md">
      <Card.Section
        withBorder
        inheritPadding
        py="xs"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        {/* <Badge size="md">
          <IconStar size={15} /> 210 Estrellas
        </Badge> */}
      </Card.Section>
      <Card.Section p="md">
        <Group>
          <Avatar
            radius="xl"
            size="xl"
            src={collaborator?.urlprofile}
            alt="it's me"
          />
          <Stack spacing="xs" justify="flex-start">
            <Title
              order={2}
            >{`${collaborator?.name} ${collaborator?.lastname}`}</Title>
            <Title fw={300} order={3}>
              Empresa (*)
            </Title>
          </Stack>
        </Group>
      </Card.Section>
      <Card.Section>
        <NavLink
          component={Link}
          href="/account/profile"
          label="Mi Perfil"
          icon={<Badge radius="xs" variant="filled" p={2} />}
          active={router.asPath == "/account/profile"}
        />
        <NavLink
          component={Link}
          href="/account/addresses"
          label="Mis Direcciones"
          icon={<Badge radius="xs" variant="filled" p={2} />}
          active={router.asPath == "/account/addresses"}
        />
        <NavLink
          component={Link}
          href="/account/security"
          label="Seguridad"
          icon={<Badge radius="xs" variant="filled" p={2} />}
          active={router.asPath == "/account/security"}
        />
      </Card.Section>
    </Card>
  );
};

export default InformationBox;
