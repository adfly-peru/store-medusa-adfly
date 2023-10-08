import { useAccount } from "@context/account-context";
import { Collaborator } from "@interfaces/collaborator";
import {
  ActionIcon,
  Center,
  Group,
  Indicator,
  Menu,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconCheck, IconMenu, IconTransferOut } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Layout from ".";

const profileCompleted = (collaborator: Collaborator | undefined) => {
  if (collaborator) {
    if (!collaborator.email?.length) return false;
    return true;
  }
  return false;
};

const RegistrationStepsModal: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { collaborator, logout } = useAccount();
  const router = useRouter();
  const isAllow = router.asPath.startsWith("/account/profile")
    ? true
    : router.asPath.startsWith("/account/security") && collaborator?.emailVerify
    ? true
    : false;

  if (!collaborator) return <></>;

  if (isAllow) {
    return <>{children}</>;
  }

  return (
    <>
      <Modal
        opened
        radius="md"
        onClose={() => null}
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        withCloseButton={false}
        centered={true}
        size={900}
      >
        <Group m={0} p={0} position="right">
          <Menu>
            <Menu.Target>
              <ActionIcon variant="transparent" size="lg">
                <IconMenu size={30} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={logout} icon={<IconTransferOut size={14} />}>
                Cerrar sesión
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Stack spacing="xl" p="xl">
          <Center>
            <Text sx={{ width: "85%" }} size="lg" align="justify">
              Estás a 3 pasos de poder disfrutar de todos los benificios que
              tenemos para ti.
            </Text>
          </Center>
          <SimpleGrid
            cols={3}
            spacing="xl"
            breakpoints={[
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <UnstyledButton onClick={() => router.push("/account/profile")}>
              <Indicator
                size={22}
                label={<IconCheck />}
                radius="lg"
                disabled={!profileCompleted(collaborator)}
              >
                <Paper shadow="xs" radius="md" p="xs" withBorder>
                  <Text align="center" lineClamp={2}>
                    Completa tu perfil
                  </Text>
                </Paper>
              </Indicator>
            </UnstyledButton>
            <UnstyledButton disabled>
              <Indicator
                size={22}
                label={<IconCheck />}
                disabled={!collaborator?.emailVerify}
              >
                <Paper shadow="xs" radius="md" p="xs" withBorder>
                  <Text align="center" lineClamp={2}>
                    Verificar email
                  </Text>
                </Paper>
              </Indicator>
            </UnstyledButton>
            <UnstyledButton
              onClick={() => router.push("/account/security")}
              disabled={!collaborator.emailVerify}
            >
              <Indicator
                size={22}
                label={<IconCheck />}
                radius="lg"
                disabled={!collaborator.changePassword}
              >
                <Paper shadow="xs" radius="md" p="xs" withBorder>
                  <Text align="center" lineClamp={2}>
                    Actualizar contraseña
                  </Text>
                </Paper>
              </Indicator>
            </UnstyledButton>
          </SimpleGrid>
          <Center>
            <Text sx={{ width: "85%" }} size="lg" align="justify">
              Acuérdate que no podrás acceder a la tienda hasta que completes
              todos los pasos anteriores. Si necesitas ayuda, escríbenos a
              hola@adfly.pe o llámanos al +51 970 802 065.
            </Text>
          </Center>
          {collaborator.email?.length && !collaborator.emailVerify ? (
            <Center>
              <Text sx={{ width: "85%" }} size="lg" align="justify">
                Hemos enviado un correo de verificación a {collaborator?.email},
                revisa tu correo para completar tu perfil. Haz click{" "}
                <Text
                  span
                  c="blue"
                  onClick={() => router.push("/account/profile")}
                  inherit
                >
                  aquí
                </Text>{" "}
                para cambiar tu dirección de correo electrónico.
              </Text>
            </Center>
          ) : null}
        </Stack>
      </Modal>
      <Layout />
    </>
  );
};

export default RegistrationStepsModal;
