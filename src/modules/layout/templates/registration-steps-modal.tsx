import { useAccount } from "@context/account-context";
import { Collaborator } from "@interfaces/collaborator";
import {
  ActionIcon,
  Center,
  Divider,
  Group,
  MediaQuery,
  Menu,
  Modal,
  Stack,
  Stepper,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { IconMenu, IconTransferOut } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Layout from ".";
import { useEffect, useState } from "react";
import PersonalDataFormRegister from "@modules/account/components/personal-data-form-register";
import VerifyEmailRegister from "../components/verify-email";
import SecurityFormRegister from "@modules/account/components/security-form-register";

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
  const [active, setActive] = useState(0);
  const { collaborator, logout } = useAccount();
  const router = useRouter();
  const isAllow = router.asPath.startsWith("/account/profile")
    ? true
    : router.asPath.startsWith("/account/security") && collaborator?.emailVerify
    ? true
    : false;
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    if (collaborator) {
      if (profileCompleted(collaborator)) setActive(1);
      if (collaborator.emailVerify) setActive(2);
    }
  }, [collaborator]);

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
        <Center w="100%" mb="xl">
          <Title c="#31658E" fz={25}>
            Completa tu Registro
          </Title>
        </Center>
        <MediaQuery
          largerThan="sm"
          styles={{
            display: "none",
          }}
        >
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint={0}
            styles={{
              steps: {
                paddingLeft: 0,
                paddingRight: 0,
              },
              stepIcon: {
                fontSize: 25,
                backgroundColor: "white",
                border: "2px solid #BCBCBC",
                color: "#BCBCBC",
                "&[data-completed]": {
                  borderWidth: 0,
                  backgroundColor: "#31658E",
                  color: "white",
                },
                "&[data-progress]": {
                  borderWidth: 0,
                  backgroundColor: "#31658E",
                  color: "white",
                },
              },
              step: {
                flexDirection: "column",
                width: 60,
              },
              stepBody: {
                margin: 0,
              },
              stepLabel: {
                marginTop: 5,
                fontSize: 10,
                textAlign: "center",
              },
              separator: {
                backgroundColor: "#BCBCBC",
                marginBottom: 20,
                height: 4,
                marginLeft: rem(-10),
                marginRight: rem(-10),
              },
              separatorActive: {
                backgroundColor: "#31658E",
              },
            }}
          >
            <Stepper.Step
              label="Completa tu Perfil"
              allowStepSelect={true}
              completedIcon={1}
            >
              <Divider
                w="100%"
                style={{ border: "1px solid #31658E" }}
                my="lg"
              />
              <Center>
                <PersonalDataFormRegister handleNextStep={nextStep} />
              </Center>
            </Stepper.Step>
            <Stepper.Step
              label="Verifica tu correo"
              allowStepSelect={profileCompleted(collaborator)}
              completedIcon={2}
            >
              <Divider
                w="100%"
                style={{ border: "1px solid #31658E" }}
                my="lg"
              />
              <Center>
                <VerifyEmailRegister
                  handlePrevStep={prevStep}
                  handleNextStep={collaborator.emailVerify ? nextStep : null}
                />
              </Center>
            </Stepper.Step>
            <Stepper.Step
              label="Actualiza tu contraseña"
              allowStepSelect={collaborator.emailVerify}
              completedIcon={3}
            >
              <Divider
                w="100%"
                style={{ border: "1px solid #31658E" }}
                my="lg"
              />
              <Center>
                <SecurityFormRegister handlePrevStep={prevStep} />
              </Center>
            </Stepper.Step>
          </Stepper>
        </MediaQuery>
        <MediaQuery
          smallerThan="sm"
          styles={{
            display: "none",
          }}
        >
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint={0}
            styles={{
              steps: {
                paddingLeft: 50,
                paddingRight: 50,
              },
              stepIcon: {
                fontSize: 25,
                backgroundColor: "white",
                border: "2px solid #BCBCBC",
                color: "#BCBCBC",
                "&[data-completed]": {
                  borderWidth: 0,
                  backgroundColor: "#31658E",
                  color: "white",
                },
                "&[data-progress]": {
                  borderWidth: 0,
                  backgroundColor: "#31658E",
                  color: "white",
                },
              },
              step: {
                flexDirection: "column",
                width: 200,
              },
              stepBody: {
                margin: 0,
              },
              stepLabel: {
                marginTop: 5,
                fontSize: 16,
              },
              separator: {
                backgroundColor: "#BCBCBC",
                marginBottom: 20,
                height: 4,
                marginLeft: rem(-100),
                marginRight: rem(-100),
              },
              separatorActive: {
                backgroundColor: "#31658E",
              },
            }}
          >
            <Stepper.Step
              label="Completa tu Perfil"
              allowStepSelect={true}
              completedIcon={1}
            >
              <Divider
                w="100%"
                style={{ border: "1px solid #31658E" }}
                my="lg"
              />
              <Center>
                <PersonalDataFormRegister handleNextStep={nextStep} />
              </Center>
            </Stepper.Step>
            <Stepper.Step
              label="Verifica tu correo"
              allowStepSelect={profileCompleted(collaborator)}
              completedIcon={2}
            >
              <Divider
                w="100%"
                style={{ border: "1px solid #31658E" }}
                my="lg"
              />
              <Center>
                <VerifyEmailRegister
                  handlePrevStep={prevStep}
                  handleNextStep={collaborator.emailVerify ? nextStep : null}
                />
              </Center>
            </Stepper.Step>
            <Stepper.Step
              label="Actualiza tu contraseña"
              allowStepSelect={collaborator.emailVerify}
              completedIcon={3}
            >
              <Divider
                w="100%"
                style={{ border: "1px solid #31658E" }}
                my="lg"
              />
              <Center>
                <SecurityFormRegister handlePrevStep={prevStep} />
              </Center>
            </Stepper.Step>
          </Stepper>
        </MediaQuery>
        <Center mt="lg">
          <Stack w="70%" align="center">
            <Text fz={10} align="center">
              Acuérdate que no podrás acceder a la tienda hasta que completes
              todos los pasos anteriores. Si necesitas ayuda, escríbenos a
              hola@adfly.pe o llámanos al +51 970 802 065.
            </Text>
          </Stack>
        </Center>
      </Modal>
      <Layout />
    </>
  );
};

export default RegistrationStepsModal;
