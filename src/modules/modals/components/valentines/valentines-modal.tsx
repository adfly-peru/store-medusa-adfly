import {
  Button,
  CopyButton,
  Grid,
  Image,
  MediaQuery,
  Stack,
  Text,
} from "@mantine/core";

const ValentinesModal = () => {
  return (
    <>
      <Grid m={0} style={{ borderTopLeftRadius: "2.5rem" }}>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col
            span={5}
            style={{ background: "white", borderTopLeftRadius: "2.5rem" }}
          >
            <Stack pl={40} pr={10} pt={50} pb={10}>
              <Image
                src="/fridays_coupon/png final-52.png"
                alt="Comida de TGI Fridays"
                fit="contain"
              />
              <Image
                src="/fridays_coupon/fridays logo.png"
                alt="Comida de TGI Fridays"
                fit="contain"
              />
              <Stack
                bg="white"
                align="center"
                justify="center"
                spacing={0}
                style={{
                  border: "1px solid #31658E",
                  borderRadius: "0.5rem",
                  fontSize: 26,
                  textAlign: "center",
                  color: "#31658E",
                }}
              >
                <Text>FRYDAYSAD25</Text>
                <CopyButton value={"FRYDAYSAD25"}>
                  {({ copied, copy }) => (
                    <Button w="100%" h={50} fz={20} onClick={copy}>
                      Copiar Cupón
                    </Button>
                  )}
                </CopyButton>
              </Stack>
            </Stack>
          </Grid.Col>
        </MediaQuery>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col
            span={7}
            style={{
              padding: 0,
              borderTopRightRadius: "2.5rem",
            }}
          >
            <div
              style={{
                height: "100%", // Asegura que el div ocupe toda la altura de la columna
                background: `url('/fridays_coupon/Foto Fridays_523x448_Mesa de trabajo 136.jpg') center center / cover no-repeat`, // Ajusta la ruta de la imagen
                borderTopRightRadius: "2.5rem",
              }}
            >
              {/* No hay necesidad de agregar contenido aquí, ya que la imagen es un fondo */}
            </div>
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
              <Image
                src="/fridays_coupon/png final-52.png"
                alt="Comida de TGI Fridays"
                fit="contain"
              />
              <Image
                src="/fridays_coupon/fridays logo.png"
                alt="Comida de TGI Fridays"
                fit="contain"
              />
              <Stack
                bg="white"
                align="center"
                justify="center"
                spacing={0}
                mt={25}
                style={{
                  border: "1px solid #31658E",
                  borderRadius: "0.5rem",
                  fontSize: 26,
                  textAlign: "center",
                  color: "#31658E",
                }}
              >
                <Text>FRIDAYSAD25</Text>
                <CopyButton value={"FRIDAYSAD25"}>
                  {({ copied, copy }) => (
                    <Button w="100%" h={50} fz={20} onClick={copy}>
                      Copiar Cupón
                    </Button>
                  )}
                </CopyButton>
              </Stack>
            </Stack>
          </Grid.Col>
        </MediaQuery>
        <Grid.Col bg="#31658E" span={12}>
          <Text fz={10} ta="justify" c="white" mx="xl">
            <Text span fw="bold">
              T&C
            </Text>
            {`: Promoción válida del 12.02.2024 hasta el 29.02.2024. Solo
            aplica para productos a la Carta. No aplica para Gift Cards, otras
            promociones ni bebidas. Exclusivo por fridaysperu.com. El descuento
            se realizará por medio del cupón "FRIDAYSAD25" Descuento máximo
            S/30. No aplica para descontar el monto de servicio de delivery. El
            modo de uso: Antes de realizar el pago, en el Check out, el usuario
            debe digitar el cupón "FRIDAYSAD25" (sin comillas) en la casilla de
            cupones, luego dar clic en "Aplicar" y de ese modo le saldrá una
            confirmación en letra verde "Cupón aplicado" y luego procederá con
            el pago. Imágenes referenciales. Cupones solo válidos uno por
            transacción y no acumulables con otros cupones. Franquicias
            Alimentarias S.A. RUC: 20298674611.`}
          </Text>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ValentinesModal;
