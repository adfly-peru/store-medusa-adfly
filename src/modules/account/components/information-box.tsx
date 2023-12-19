import { useAccount } from "@context/account-context";
import {
  Card,
  Badge,
  Group,
  Stack,
  Title,
  NavLink,
  Loader,
  ActionIcon,
  Grid,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const InformationBox = ({
  onClose,
  withClose = false,
}: {
  onClose?: () => void;
  withClose?: boolean;
}) => {
  const router = useRouter();
  const { collaborator } = useAccount();

  if (!collaborator) return <Loader />;

  return (
    <Card pb={40} withBorder shadow="sm" radius="md">
      <Card.Section p="xl" withBorder>
        <Grid>
          <Grid.Col span="auto">
            <Stack spacing="xs" justify="flex-start">
              <Title
                order={2}
              >{`${collaborator.name} ${collaborator.lastname}`}</Title>
              {/* <Title fw={300} order={3}>
              {collaborator.}
            </Title> */}
            </Stack>
          </Grid.Col>
          {withClose ? (
            <Grid.Col span={2}>
              <ActionIcon
                mt={-15}
                mr={-10}
                variant="outline"
                c="#31658E"
                radius="xl"
                onClick={onClose}
              >
                <IconX />
              </ActionIcon>
            </Grid.Col>
          ) : (
            <></>
          )}
        </Grid>
      </Card.Section>
      <Card.Section>
        <Stack spacing="xs">
          <NavLink
            component={Link}
            href="/account/profile"
            label="Mi Perfil"
            icon={
              <Badge
                bg={router.asPath == "/account/profile" ? "#31658E" : "#D9D9D9"}
                radius="xs"
                variant="filled"
                p={2}
              />
            }
            active={router.asPath == "/account/profile"}
          />
          <NavLink
            component={Link}
            href="/account/addresses"
            label="Mis Direcciones"
            disabled={!collaborator.changePassword}
            icon={
              <Badge
                bg={
                  router.asPath == "/account/addresses" ? "#31658E" : "#D9D9D9"
                }
                radius="xs"
                variant="filled"
                p={2}
              />
            }
            active={router.asPath == "/account/addresses"}
          />
          <NavLink
            component={Link}
            href="/account/security"
            label="Seguridad"
            disabled={!collaborator.emailVerify}
            icon={
              <Badge
                bg={
                  router.asPath == "/account/security" ? "#31658E" : "#D9D9D9"
                }
                radius="xs"
                variant="filled"
                p={2}
              />
            }
            active={router.asPath == "/account/security"}
          />
          <NavLink
            component={Link}
            href="/orders"
            label="Mis Compras"
            disabled={!collaborator.changePassword}
            icon={
              <Badge
                bg={router.asPath.startsWith("/orders") ? "#31658E" : "#D9D9D9"}
                radius="xs"
                variant="filled"
                p={2}
              />
            }
            active={router.asPath.startsWith("/orders")}
          />
          <NavLink
            component={Link}
            href="/coupons"
            label="Mis Cupones"
            disabled={!collaborator.changePassword}
            icon={
              <Badge
                bg={
                  router.asPath.startsWith("/coupons") ? "#31658E" : "#D9D9D9"
                }
                radius="xs"
                variant="filled"
                p={2}
              />
            }
            active={router.asPath.startsWith("/coupons")}
          />
          <NavLink
            component={Link}
            href="/stars"
            label="Mis Estrellas"
            disabled={!collaborator.changePassword}
            icon={
              <Badge
                bg={router.asPath.startsWith("/stars") ? "#31658E" : "#D9D9D9"}
                radius="xs"
                variant="filled"
                p={2}
              />
            }
            active={router.asPath.startsWith("/stars")}
          />
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default InformationBox;
