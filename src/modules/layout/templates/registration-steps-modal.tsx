import { useAccount } from "@context/account-context";
import { Collaborator } from "@interfaces/collaborator";
import {
  Center,
  Group,
  Indicator,
  Modal,
  Paper,
  Space,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Layout from ".";

const profileCompleted = (collaborator: Collaborator | undefined) => {
  if (collaborator) {
    if (!collaborator.email?.length) return false;
    if (!collaborator.phonenumber?.length) return false;
    return true;
  }
  return false;
};

const RegistrationStepsModal: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { collaborator } = useAccount();
  const router = useRouter();
  const isAllow = router.asPath.startsWith("/account");
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
        size="50%"
      >
        <Stack>
          <Center>
            <Text sx={{ width: "75%" }} size="lg">
              Estás a 3 pasos de poder disfrutar de todos los benificios que
              tenemos para ti.
            </Text>
          </Center>
          <Space h="lg" />
          <Group grow>
            <Center>
              <UnstyledButton
                w="50%"
                onClick={() => router.push("/account/profile")}
              >
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
                </Indicator>{" "}
              </UnstyledButton>
            </Center>
            <Center>
              <UnstyledButton w="50%">
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
            </Center>
            <Center>
              <UnstyledButton
                w="50%"
                onClick={() => router.push("/account/security")}
              >
                <Indicator
                  size={22}
                  label={<IconCheck />}
                  radius="lg"
                  disabled={!collaborator?.changePassword}
                >
                  <Paper shadow="xs" radius="md" p="xs" withBorder>
                    <Text align="center" lineClamp={2}>
                      Actualizar contraseña
                    </Text>
                  </Paper>
                </Indicator>
              </UnstyledButton>
            </Center>
          </Group>
          <Space h="lg" />
          <Center>
            <Text sx={{ width: "75%" }} size="lg" align="justify">
              Acuérdate que no podrás acceder a la tienda hasta que completes
              todos los pasos anteriores. Si necesitas ayuda, escribenos a xx@xx
              o llamanos al +51 xxxxxxxxx.
            </Text>
          </Center>
          <Space h="md" />
          {collaborator?.email?.length ? (
            <Center>
              <Text sx={{ width: "75%" }} size="lg" align="justify">
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
