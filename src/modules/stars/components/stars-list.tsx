import {
  Button,
  Container,
  Group,
  Loader,
  Select,
  Table,
  Title,
  Text,
  Card,
  Space,
  Center,
  Stack,
  Burger,
  Divider,
  MediaQuery,
} from "@mantine/core";
import StarRow from "./star-row";
import { useEffect, useState } from "react";
import { useAccount } from "@context/account-context";
import { IconChevronDown } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import InformationBox from "@modules/account/components/information-box";
import { useStar } from "@context/stars-context";

const StarsList = () => {
  const { paginatedStars, setOptions } = useStar();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [sortBy, setSortBy] = useState("creationdate");
  const [asc, setAsc] = useState(false);
  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };
  const pagina_actual = Math.floor(offset / limit) + 1;
  const total_paginas = Math.ceil(
    (paginatedStars?.totalOperations ?? 0) / limit
  );

  useEffect(() => {
    setOptions({ sortBy, limit, offset, asc });
  }, [sortBy, limit, offset, asc]);

  if (!paginatedStars) {
    return <Loader />;
  }
  return (
    <Center w="100%">
      <Stack w="90%">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <div>
            <Burger opened={opened} onClick={toggle} />
            {opened ? (
              <InformationBox withClose={true} onClose={close} />
            ) : (
              <></>
            )}
          </div>
        </MediaQuery>
        <Group position="apart">
          <Title
            fz={20}
          >{`Estrellas | Saldo Disponible: ${paginatedStars.totalStars}`}</Title>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Group position="apart" w="100%">
              <Select
                rightSection={<IconChevronDown size="1rem" />}
                w={120}
                label="Ordenar por:"
                value={sortBy}
                onChange={handleSortByChange}
                data={[{ label: "Fecha", value: "creationdate" }]}
              />
              <Select
                label="Orden"
                rightSection={<IconChevronDown size="1rem" />}
                value={asc ? "asc" : "desc"}
                w={90}
                onChange={(val) => setAsc(val === "asc")}
                data={[
                  { label: "Asc", value: "asc" },
                  { label: "Desc", value: "desc" },
                ]}
              />
            </Group>
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Group position="right">
              <Text c="dimmed" fz="sm">
                Ordenar por:
              </Text>
              <Select
                variant="unstyled"
                rightSection={<IconChevronDown size="1rem" />}
                w={100}
                value={sortBy}
                onChange={handleSortByChange}
                data={[
                  { label: "Empresa", value: "business" },
                  { label: "Fecha", value: "dateused" },
                ]}
              />
              <Select
                variant="unstyled"
                rightSection={<IconChevronDown size="1rem" />}
                value={asc ? "asc" : "desc"}
                w={75}
                onChange={(val) => setAsc(val === "asc")}
                data={[
                  { label: "Asc", value: "asc" },
                  { label: "Desc", value: "desc" },
                ]}
              />
            </Group>
          </MediaQuery>
        </Group>
        <Divider></Divider>
        <Space />
        <Table striped highlightOnHover style={{ flex: 1 }}>
          <thead>
            <tr>
              {/* <th>N Pedido</th> */}
              <th>Fecha</th>
              <th>Movimiento</th>
              <th>Motivo</th>
              <th>Estrellas</th>
              <th>Ver Detalle</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStars.operations.map((star, _) => (
              <StarRow key={star.uuidstars} star={star} />
            ))}
          </tbody>
        </Table>
        <Group position="apart">
          <Group spacing="sm">
            <Text fz="xs">Filas por página:</Text>
            <Select
              value={String(limit)}
              onChange={(newValue) => {
                setLimit(Number(newValue));
              }}
              data={["10", "20", "30", "40", "50"]}
              variant="unstyled"
              size="xs"
              styles={{
                input: { width: 50 },
                rightSection: { width: "16px" },
              }}
            />
          </Group>
          <Group spacing="xs">
            <Button
              compact
              size="xs"
              disabled={offset === 0}
              onClick={() => {
                setOffset(Math.max(offset - limit, 0));
              }}
            >
              {"<"}
            </Button>
            {`${pagina_actual}/${total_paginas}`}
            <Button
              compact
              size="xs"
              disabled={pagina_actual === total_paginas}
              onClick={() => {
                setOffset(offset + limit);
              }}
            >
              {">"}
            </Button>
          </Group>
        </Group>
      </Stack>
    </Center>
  );
};

export default StarsList;
