import React, { useState } from "react";
import {
  Stack,
  Title,
  Space,
  Divider,
  Text,
  Group,
  Button,
  Checkbox,
  TextInput,
  Loader,
} from "@mantine/core";
import { modals } from "@mantine/modals";

const SurveyFinalModal = ({
  step,
  setStep,
  defaultOther,
  defaultValue,
  onSelectionComplete,
}: {
  step: number;
  setStep: (val: number) => void;
  defaultOther?: string;
  defaultValue?: string[];
  onSelectionComplete: (options: string[], other: string) => Promise<void>;
}) => {
  const [value, setValue] = useState<string[]>(defaultValue ?? []);
  const [otherValue, setOtherValue] = useState<string>(defaultOther ?? "");
  const [loading, setLoading] = useState(false);

  const handleOtherInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherValue(event.currentTarget.value);
  };
  const handleContinue = async () => {
    setLoading(true);
    await onSelectionComplete(value, otherValue);
    setLoading(false);
    modals.closeAll();
  };

  if (loading)
    return (
      <Stack h={200} align="center" justify="center">
        <Loader />
      </Stack>
    );

  return (
    <>
      <Stack px={20} mt={20}>
        <Title style={{ color: "#31658E", fontSize: 25, fontWeight: 700 }}>
          ¿Cómo te gustaría enterarte de la tienda y sus novedades?
        </Title>
        <Text style={{ fontSize: 20, fontWeight: 400 }}>
          Puedes marcar más de una opción
        </Text>
        <Space h={1} />
      </Stack>
      <Divider size="sm" style={{ borderColor: "#31658E" }} />
      <Stack mt={30} px="lg">
        <Checkbox.Group
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          value={value}
          onChange={setValue}
        >
          <Checkbox value="email" label="Correo electrónico" fz={20} />
          <Checkbox value="whatsapp" label="Whatsapp" fz={20} />
          <Checkbox value="sms" label="SMS" fz={20} />
          <Checkbox
            value="workplace_murals"
            label="Murales informativos en centro de trabajo (pizarra, TV)"
            fz={20}
          />
          <Checkbox
            value="business_portal"
            label="Portal de tu empresa (Página Web, Intranet)"
            fz={20}
          />
          <Checkbox
            value="workplace_web_page"
            label="Página web de la tienda"
            fz={20}
          />
          <Checkbox value="other" fz={20} label="Otros" />
        </Checkbox.Group>
        {value.includes("other") && (
          <TextInput
            placeholder="Por favor especifica otros medios"
            label="Otros medios"
            value={otherValue}
            onChange={handleOtherInputChange}
            mt="md"
          />
        )}
        <Group position="center" mt="xl" mb="xs">
          <Button
            fw={700}
            fz={18}
            h={45}
            w={120}
            onClick={() => setStep(step - 1)}
          >
            Atras
          </Button>
          <Button
            fw={700}
            fz={18}
            h={45}
            w={120}
            onClick={handleContinue}
            disabled={value.length === 0}
          >
            Finalizar
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default SurveyFinalModal;
