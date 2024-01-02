import { useAccount } from "@context/account-context";
import { CollaboratorStars } from "@interfaces/star";
import { Stack, Text, Space, Title, Group, Divider } from "@mantine/core";
import { formatDate } from "@modules/common/functions/format-date";

const StarDetails = ({ starDetails }: { starDetails: CollaboratorStars }) => {
  const { homeDesign } = useAccount();
  return (
    <Stack>
      <Stack align="center" ta="center" px={20}>
        <Title
          c="#31658E"
          fz={25}
          style={{
            marginTop: -40,
            zIndex: 1000,
          }}
        >
          Detalles
        </Title>
      </Stack>
      <Divider py="xs" size="md" w="100%" style={{ borderColor: "#31658E" }} />
      <Stack px={50} pb="md">
        <Group>
          <Stack fz={15} fw="bold">
            <Text>Fecha:</Text>
            <Text>Estrellas asignadas:</Text>
          </Stack>
          <Stack fz={15}>
            <Text>{formatDate(starDetails.creationdate)}</Text>
            <Text>{starDetails.amount}</Text>
          </Stack>
        </Group>
        <Space h="xs" />
        <Title
          my="md"
          order={3}
          fz={20}
        >{`${homeDesign?.commercialname} te ha asignado ${starDetails.amount} estrellas`}</Title>
        <Group>
          <Stack fz={15} fw="bold">
            <Text>Motivo:</Text>
            <Text>Mensaje:</Text>
          </Stack>
          <Stack fz={15}>
            <Text>{starDetails.reason}</Text>
            <Text>{starDetails.message}</Text>
          </Stack>
        </Group>
      </Stack>
    </Stack>
  );
};

export default StarDetails;
