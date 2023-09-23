import { useProduct } from "@context/product-context";
import {
  Title,
  Group,
  Tooltip,
  ActionIcon,
  Image,
  useMantineColorScheme,
  Text,
  Stack,
} from "@mantine/core";
import router from "next/router";

const CategorySection = () => {
  const { departments } = useProduct();
  const { colorScheme } = useMantineColorScheme();

  const searchProductByCategorie = (categorieToSearch: string) => {
    router.push({
      pathname: "/search",
      query: { data: categorieToSearch },
    });
  };
  return (
    <>
      <Title>¡Descubre lo que tenemos para ti! (*)</Title>
      <Group spacing={50}>
        {departments.map((category, i) => (
          <Stack align="center" key={category.id}>
            <ActionIcon
              key={`${i}action`}
              size={60}
              variant="transparent"
              onClick={() => searchProductByCategorie(category.name)}
            >
              <Image
                src={category.image}
                alt={category.name}
                style={{
                  filter: colorScheme === "dark" ? "invert(1)" : "none",
                }}
              />
            </ActionIcon>
            <Text>{category.name}</Text>
          </Stack>
        ))}
      </Group>
    </>
  );
};

export default CategorySection;
