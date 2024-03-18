import React from "react";
import { Stack, Title, Text, Group, Button, Anchor } from "@mantine/core";
import { modals } from "@mantine/modals";

const SurveyWelcomeModal = ({
  name,
  setStep,
  onClose,
}: {
  name: string;
  setStep: () => void;
  onClose: () => void;
}) => {
  return (
    <>
      <Stack mt={30} px="lg">
        <Title style={{ color: "#31658E", fontSize: 40, fontWeight: 700 }}>
          !Hola {name}!
        </Title>
        <Text style={{ fontSize: 25, fontWeight: 700 }}>
          Te damos la bienvenida a la tienda online que mereces.
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 400 }}>
          Ahora, podrás disfrutar de todos los beneficios que tenemos para ti.
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 400 }}>
          Queremos que tu experiencia sea única. Ayúdanos respondiendo una breve
          encuesta de 5 preguntas para conocerte mejor. Tu opinión es muy
          importante para nosotros.
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 400 }}>
          ¡Gracias por registrate con nosotros!
        </Text>
        <Group position="center" mt="xs">
          <Button fw={700} fz={18} h={50} w={156} onClick={() => setStep()}>
            ¡Comenzar!
          </Button>
        </Group>
        <Group position="center">
          <Anchor
            c="#31658E"
            fz={15}
            onClick={() => {
              modals.closeAll();
              onClose();
            }}
          >
            Hacerlo más tarde
          </Anchor>
        </Group>
      </Stack>
    </>
  );
};

export default SurveyWelcomeModal;
