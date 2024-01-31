import { useAccount } from "@context/account-context";
import { useDesign } from "@context/design-context";
import {
  LoadingOverlay,
  Grid,
  MediaQuery,
  Stack,
  Alert,
  Title,
  Text,
  Image,
  TextInput,
  PasswordInput,
  Anchor,
  Button,
  Loader,
  Space,
  Group,
  BackgroundImage,
  Modal,
  Box,
  Center,
  em,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import RegisterModal from "@modules/register/templates";
import RequestModal from "@modules/register/templates/request";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginDesign } = useDesign();
  const { login, status } = useAccount();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalState, setModalState] = useState<"register" | "request">(
    "register"
  );
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/home");
    }
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    form.validate();
    if (form.isValid()) {
      amplitude.track("User Clicks Login");
      const response = await login(form.values);
      setError(response);
    } else {
      setError("Completa los campos obligatorios");
    }
    setLoading(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        radius="md"
        onClose={close}
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        centered={true}
        size={800}
        styles={{
          body: {
            paddingLeft: 0,
            paddingRight: 0,
          },
          content: {
            borderRadius: "4rem",
          },
          close: {
            marginRight: 20,
          },
        }}
      >
        {modalState === "register" ? (
          <RegisterModal
            businessname={loginDesign?.commercialname ?? ""}
            goRequest={() => setModalState("request")}
          />
        ) : (
          <RequestModal businessname={loginDesign?.commercialname ?? ""} />
        )}
      </Modal>
      <LoadingOverlay
        visible={status != "unauthenticated"}
        overlayBlur={2}
        overlayOpacity={0.9}
      />
      <Grid m={0} style={{ minHeight: "100vh" }}>
        <Grid.Col
          span="auto"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <MediaQuery
            smallerThan="sm"
            styles={{
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Stack>
              <Image
                radius="md"
                height="6.25rem"
                fit="contain"
                src={loginDesign?.logourl ?? ""}
                alt="Login Logo"
              />
              {error === "" ? (
                <></>
              ) : (
                <Alert
                  mb="xl"
                  withCloseButton
                  title="Error al ingresar!"
                  onClose={() => setError("")}
                  color="red"
                >
                  {error}
                </Alert>
              )}
              <Stack spacing="md" my="0.75rem">
                <Title
                  style={{
                    fontSize: "1.25rem",
                  }}
                  align="center"
                >
                  ¡Descubre lo que tenemos para ti!
                </Title>
                <Text
                  style={{
                    fontSize: "1rem",
                  }}
                  align="center"
                  color="gray.7"
                >
                  Ingresar a tu cuenta
                </Text>
              </Stack>
              <form onSubmit={form.onSubmit((_) => handleSubmit())}>
                <Stack spacing="xl" px="sm" style={{}} align="center">
                  <TextInput
                    placeholder="E-mail / Doc. Identidad"
                    radius="xs"
                    size="md"
                    w={320}
                    styles={{
                      input: {
                        fontSize: "1rem",
                        height: "1rem",
                      },
                    }}
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    placeholder="Contraseña"
                    radius="xs"
                    size="md"
                    inputWrapperOrder={[
                      "label",
                      "input",
                      "description",
                      "error",
                    ]}
                    styles={{
                      innerInput: {
                        fontSize: "1rem",
                      },
                      input: {
                        height: "1rem",
                      },
                      description: {
                        textAlign: "right",
                      },
                    }}
                    description={
                      <Anchor href="/recovery">
                        ¿Olvidaste tu contraseña?
                      </Anchor>
                    }
                    w={320}
                    {...form.getInputProps("password")}
                  />
                  <Button w={320} size="lg" disabled={loading} type="submit">
                    {loading ? (
                      <Loader variant="dots" />
                    ) : (
                      <Text>Ingresar</Text>
                    )}
                  </Button>
                </Stack>
              </form>
              <Space h="0.5rem" m={0} />
              <Box style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{ flexGrow: 1, height: 1, backgroundColor: "#d1d1d1" }}
                ></div>
                <Text
                  style={{
                    margin: "0 8px",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  O
                </Text>
                <div
                  style={{ flexGrow: 1, height: 1, backgroundColor: "#d1d1d1" }}
                ></div>
              </Box>
              <Center>
                <Button
                  variant="outline"
                  onClick={() => {
                    amplitude.track("User Click Register Button");
                    setModalState("register");
                    open();
                  }}
                  w={250}
                  h={48}
                  c="#31658E"
                  fz={16}
                  fw={700}
                  style={{
                    borderColor: "#8F959B",
                  }}
                >
                  Regístrate Aquí
                </Button>
              </Center>
              <Space h="1rem" m={0} />
              <Group align="center" position="center" spacing={0}>
                <Image
                  radius="md"
                  p={0}
                  height={80}
                  width="inherit"
                  fit="contain"
                  src="/logo_adfly.svg"
                  alt="Adfly"
                  sx={{ padding: 10 }}
                />
              </Group>
            </Stack>
          </MediaQuery>
        </Grid.Col>
        <MediaQuery
          smallerThan="md"
          styles={{
            display: "none",
          }}
        >
          <Grid.Col span={6} style={{ margin: 0, padding: 0 }}>
            <BackgroundImage
              src={loginDesign?.bannerurl ?? ""}
              style={{
                height: "100%",
                width: "100%",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </>
  );
};

export default LoginPage;
