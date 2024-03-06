import {
  Button,
  Center,
  CopyButton,
  Grid,
  Image,
  MediaQuery,
  Stack,
  Text,
} from "@mantine/core";
import "@fontsource-variable/oswald";
import { useRouter } from "next/router";

const TadaMarchModal = () => {
  const router = useRouter();
  return (
    <>
      <Grid m={0} style={{ borderTopLeftRadius: "2.5rem" }}>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col
            span={5}
            style={{ background: "white", borderTopLeftRadius: "2.5rem" }}
          >
            <Stack pl={40} pr={10} pt={50} pb={10} mt={30}>
              <Text
                fw="bold"
                ta="center"
                fz={34}
                style={{
                  fontFamily: "Oswald Variable, sans-serif",
                }}
              >
                TE REGALAMOS S/20 EN LA APP DE TADA
              </Text>
              <Center my="lg">
                <Image
                  src="https://play-lh.googleusercontent.com/KN1W8L-Lx0y_nSQdRPvgyt_HtrLK3h2IulDUtF20FglQ3jmRixl5B1ft7lV0A_2z5d1e=w240-h480-rw"
                  alt="Comida de TGI Fridays"
                  width={150}
                  fit="contain"
                />
              </Center>
              <Button
                w="100%"
                h={50}
                fz={20}
                onClick={() => {
                  localStorage.setItem("tadamarchmodal", "closed");
                  router.push("/product/28178ebf-4a8b-4dbf-8837-e531e27792c0");
                }}
              >
                ¡LO QUIERO!
              </Button>
            </Stack>
          </Grid.Col>
        </MediaQuery>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col
            span={7}
            style={{
              padding: 65,
              background: "white",
              borderTopRightRadius: "2.5rem",
            }}
          >
            <div
              style={{
                height: "100%",
                background: `url('https://products.adfly.com.pe/4f89d5d8-6ea9-4238-aded-e006e2274c52/TADADFLY01.png') center center / cover no-repeat`, // Ajusta la ruta de la imagen
              }}
            ></div>
          </Grid.Col>
        </MediaQuery>
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Grid.Col
            span={12}
            style={{
              background: "white",
              borderTopLeftRadius: "2.5rem",
              borderTopRightRadius: "2.5rem",
              paddingLeft: 25,
              paddingRight: 25,
              paddingTop: 50,
              paddingBottom: 30,
            }}
          >
            <Stack>
              <Text
                fw="bold"
                ta="center"
                fz={34}
                style={{
                  fontFamily: "Oswald Variable, sans-serif",
                }}
              >
                TE REGALAMOS S/20 EN LA APP DE TADA
              </Text>
              <Center my="lg">
                <Image
                  src="https://play-lh.googleusercontent.com/KN1W8L-Lx0y_nSQdRPvgyt_HtrLK3h2IulDUtF20FglQ3jmRixl5B1ft7lV0A_2z5d1e=w240-h480-rw"
                  alt="Comida de TGI Fridays"
                  width={150}
                  fit="contain"
                />
              </Center>
              <Button
                w="100%"
                h={50}
                fz={20}
                onClick={() => {
                  localStorage.setItem("tadamarchmodal", "closed");
                  router.push("/product/28178ebf-4a8b-4dbf-8837-e531e27792c0");
                }}
              >
                ¡LO QUIERO!
              </Button>
            </Stack>
          </Grid.Col>
        </MediaQuery>
        <Grid.Col bg="#31658E" span={12}>
          <Text my={14} fz={14} ta="justify" c="white" mx="xl">
            <Text span fw="bold">
              T&C
            </Text>
            {`: POR COMPRAS MAYORES A 80 SOLES RECIBE S/20 DE DESCUENTO EN TODA LA APP DE TADA.`}
          </Text>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default TadaMarchModal;
