import { useCoupon } from "@context/coupon-context";
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
import CouponRow from "./coupon-row";
import { useEffect, useState } from "react";
import { useAccount } from "@context/account-context";
import { IconChevronDown } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import InformationBox from "@modules/account/components/information-box";

const CouponsList = () => {
  const { coupons, fetchCoupons } = useCoupon();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { collaborator } = useAccount();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [sortBy, setSortBy] = useState("business");
  const [asc, setAsc] = useState(false);
  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };
  const pagina_actual = Math.floor(offset / limit) + 1;
  const total_paginas = Math.ceil((coupons?.totalCoupons ?? 0) / limit);

  useEffect(() => {
    if (collaborator?.uuidcollaborator)
      fetchCoupons(
        { sortBy, limit, offset, asc },
        collaborator.uuidcollaborator
      );
  }, [sortBy, limit, offset, collaborator, asc]);

  if (!coupons) {
    return (
      <>
        <Loader />
      </>
    );
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
          <Title>Mis Compras</Title>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Group position="apart" w="100%">
              <Select
                rightSection={<IconChevronDown size="1rem" />}
                w={120}
                label="Ordenar por:"
                value={sortBy}
                onChange={handleSortByChange}
                data={[
                  { label: "Empresa", value: "business" },
                  { label: "Fecha", value: "dateused" },
                ]}
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
              <th>Partner</th>
              <th>Ver Detalle</th>
            </tr>
          </thead>
          <tbody>
            {coupons.coupons.map((coupon, _) => (
              <CouponRow
                key={coupon.uuidcouponcollaboratorusage}
                coupon={coupon}
              />
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

export default CouponsList;
