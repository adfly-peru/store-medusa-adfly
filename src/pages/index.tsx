import { Flex, LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  });
  return (
    <Flex justify="center" align="center" wrap="wrap">
      <LoadingOverlay visible={true} overlayBlur={2} overlayOpacity={0.9} />
    </Flex>
  );
}
