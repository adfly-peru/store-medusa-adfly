import Layout from "@modules/layout/templates";
import { useRouter } from "next/router";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconArrowLeft, IconLocation, IconMoodSad } from "@tabler/icons-react";
import SuccessMessage from "@modules/layout/components/success-message";

const SuccesPage = () => {
  const router = useRouter();
  const { number, id } = router.query;
  const { height } = useViewportSize();

  return (
    <Layout>
      <Center h={height / 1.5}>
        <SuccessMessage number={number} id={id} />
      </Center>
    </Layout>
  );
};

export default SuccesPage;
