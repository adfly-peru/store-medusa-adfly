import {
  Text,
  Grid,
  Stack,
  Button,
  TextInput,
  PasswordInput,
  Box,
  Image,
  Space,
  Title,
  LoadingOverlay,
  Loader,
  Alert,
  Group,
  BackgroundImage,
  MediaQuery,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useAccount } from "@context/account-context";
import { useEffect, useState } from "react";
import { useDesign } from "@context/design-context";

const Login = () => {
  const router = useRouter();
  const [modalError, setModalError] = useState(false);
  const { height, width } = useViewportSize();
  const { loginDesign } = useDesign();
  const { login, status, loading, errorText } = useAccount();
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

  useEffect(() => {
    if (errorText) setModalError(true);
    else setModalError(false);
  }, [errorText]);

  return (
    <>
      <LoadingOverlay
        visible={status != "unauthenticated"}
        overlayBlur={2}
        overlayOpacity={0.9}
      />
      <Grid>
        <Grid.Col
          span="auto"
          sx={{
            height: height - 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MediaQuery
            smallerThan="sm"
            styles={{
              paddingLeft: 10,
              paddingRight: 10,
              h1: {
                fontSize: "20px",
              },
            }}
          >
            <Stack>
              <Image
                radius="md"
                height={100}
                fit="contain"
                src={loginDesign?.logourl ?? ""}
                alt="Login Logo"
              />
              {modalError && (
                <Alert
                  mb="xl"
                  withCloseButton
                  title="Error al ingresar!"
                  onClose={() => setModalError(false)}
                  color="red"
                >
                  {errorText}
                </Alert>
              )}
              <Stack spacing="md" my="xl">
                <Title fz={20} align="center">
                  ¡Descubre lo que tenemos para ti!
                </Title>
                <Text align="center" color="gray.7">
                  Ingresar a tu cuenta
                </Text>
              </Stack>
              <form onSubmit={form.onSubmit((values) => login(values))}>
                <Stack
                  spacing="xl"
                  px="sm"
                  style={{
                    fontSize: 16,
                  }}
                  align="center"
                >
                  <TextInput
                    placeholder="E-mail / Doc. Identidad"
                    radius="xs"
                    size="md"
                    w={320}
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    placeholder="Contraseña"
                    radius="xs"
                    size="md"
                    w={320}
                    {...form.getInputProps("password")}
                  />
                  <Button w={320} size="lg" type="submit" disabled={loading}>
                    {loading ? (
                      <Loader variant="dots" />
                    ) : (
                      <Text>Ingresar</Text>
                    )}
                  </Button>
                </Stack>
                <Space h={100} />
                <Group align="center" position="center" spacing={0}>
                  <Text color="gray.6">Por:</Text>
                  <Image
                    radius="md"
                    height={50}
                    width="inherit"
                    fit="contain"
                    src="https://www.adfly.pe/Content/logo.png"
                    alt="Adfly"
                    sx={{ padding: 10 }}
                  />
                </Group>
              </form>
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

export default Login;
