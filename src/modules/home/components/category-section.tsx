import { useProduct } from "@context/product-context";
import {
  Title,
  Group,
  Tooltip,
  ActionIcon,
  Image,
  useMantineColorScheme,
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
      <Title>¡Descubre nuestras categorías! (*)</Title>
      <Group spacing={50}>
        {departments.map((category, i) => (
          <Tooltip
            withArrow
            transition="fade"
            transitionDuration={200}
            key={`${i}tip`}
            label={category.name}
          >
            <ActionIcon
              key={`${i}action`}
              size={60}
              radius="xl"
              variant="outline"
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
          </Tooltip>
        ))}
      </Group>
    </>
  );
};

export default CategorySection;
