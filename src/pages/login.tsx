import {
  BackgroundImage,
  Text,
  Grid,
  Stack,
  Button,
  TextInput,
  PasswordInput,
  Box,
  Anchor,
  Image,
  Space,
  Title,
  LoadingOverlay,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useAccount } from "@context/account-context";
import { useEffect } from "react";
import { useDesign } from "@context/design-context";

const Login = () => {
  const { height, width } = useViewportSize();
  const { loginDesign } = useDesign();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { login, status } = useAccount();

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/home");
    }
  });

  return (
    <>
      <LoadingOverlay
        visible={status != "unauthenticated"}
        overlayBlur={2}
        overlayOpacity={0.9}
      />
      <Grid
        sx={{
          backgroundColor: loginDesign?.backcolor,
          color: loginDesign?.fontcolor,
        }}
      >
        <Grid.Col span={6} sx={{ padding: 0 }}>
          <BackgroundImage
            src={loginDesign?.bannerurl ?? ""}
            radius="xs"
            sx={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              height: height - 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack align="center" justify="flex-end">
              <Title order={3}>Bienvenido(a) a:</Title>
              <Title order={3}>Tu tienda de Beneficios (*)</Title>
            </Stack>
          </BackgroundImage>
        </Grid.Col>
        <Grid.Col
          span={6}
          sx={{
            height: height - 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: width / 3 }}>
            <Image
              radius="md"
              height={100}
              fit="contain"
              src={loginDesign?.logourl}
              alt="Login Logo"
              sx={{ padding: 30 }}
            />
            <form onSubmit={form.onSubmit((values) => login(values))}>
              <Stack spacing="xl">
                <TextInput
                  placeholder="Correo electrónico / DNI"
                  radius="xs"
                  size="lg"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  placeholder="Password"
                  radius="xs"
                  size="lg"
                  {...form.getInputProps("password")}
                />
                <Button fullWidth size="lg" type="submit">
                  Submit
                </Button>
              </Stack>
              <Space h="md" />
              <Stack align="center" spacing="xs">
                <Anchor href="" target="_blank">
                  ¿Olvidaste tu contraseña?
                </Anchor>
                <Text>
                  ¿No tienes una cuenta?{" "}
                  <Anchor href="" inherit>
                    Solicítala aquí
                  </Anchor>
                  .
                </Text>
              </Stack>
            </form>
          </Box>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Login;
