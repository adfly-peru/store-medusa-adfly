import { useProduct } from "@context/product-context";
import { Title, Group, Tooltip, ActionIcon } from "@mantine/core";
import router from "next/router";

const CategorySection = () => {
  const { categories, products } = useProduct();
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
        {categories.map((category, i) => (
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
              variant="filled"
              onClick={() => searchProductByCategorie(category.name)}
            >
              {category.icon}
            </ActionIcon>
          </Tooltip>
        ))}
      </Group>
    </>
  );
};

export default CategorySection;
