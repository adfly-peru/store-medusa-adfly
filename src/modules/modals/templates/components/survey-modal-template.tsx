import React, { useState } from "react";
import {
  Stack,
  Title,
  Space,
  Divider,
  SimpleGrid,
  Text,
  Box,
  Group,
  Button,
  Loader,
} from "@mantine/core";

interface OptionCard {
  title: string;
  key: string;
  description?: string;
  size: number;
}

const getColumnsCount = (optionsLength: number): number => {
  if (optionsLength <= 4) return 2;
  if (optionsLength <= 6) return 3;
  if (optionsLength >= 12) return 4;
  return 3;
};

const SurveyModalTemplate = ({
  title,
  subtitle,
  options,
  step,
  setStep,
  maxSelections,
  defaultSelectedKeys,
  onSelectionComplete,
}: {
  title: string;
  subtitle: string;
  options: OptionCard[];
  step: number;
  setStep: (val: number) => void;
  maxSelections: number;
  defaultSelectedKeys?: string[];
  onSelectionComplete: (options: string[]) => Promise<void>;
}) => {
  const columnsCount = getColumnsCount(options.length);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    defaultSelectedKeys ?? []
  );
  const [loading, setLoading] = useState(false);

  const toggleOption = (key: string) => {
    if (selectedKeys.includes(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      if (selectedKeys.length < maxSelections) {
        setSelectedKeys([...selectedKeys, key]);
      }
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    await onSelectionComplete(selectedKeys);
    setLoading(false);
    setStep(step + 1);
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
          {title}
        </Title>
        <Text style={{ fontSize: 20, fontWeight: 400 }}>{subtitle}</Text>
        <Space h={1} />
      </Stack>
      <Divider size="sm" style={{ borderColor: "#31658E" }} />
      <Stack px={50}>
        <Space h="xl" />
        <SimpleGrid
          cols={columnsCount}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          verticalSpacing={40}
        >
          {options.map((option, index) => (
            <Box
              key={option.key}
              onClick={() => toggleOption(option.key)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 130,
                height: 130,
                backgroundColor: selectedKeys.includes(option.key)
                  ? "#31658E"
                  : "#FFFFFF",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                margin: "auto",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: selectedKeys.includes(option.key)
                    ? "#24567A"
                    : "#F0F0F0",
                },
              }}
              c={selectedKeys.includes(option.key) ? "white" : "dark"}
            >
              <img
                src={`/icons/${option.key}.png`}
                alt={option.key}
                width={option.size}
                height={option.size}
              />
              <Text style={{ fontSize: 15, fontWeight: 700 }} ta="center">
                {option.title}
              </Text>
              {option.description && (
                <Text style={{ fontSize: 15, fontWeight: 400 }} ta="center">
                  {option.description}
                </Text>
              )}
            </Box>
          ))}
        </SimpleGrid>
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
            disabled={selectedKeys.length === 0}
          >
            Continuar
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default SurveyModalTemplate;
