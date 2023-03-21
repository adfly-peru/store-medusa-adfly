import { useProduct } from "@context/product-context";
import { Title, Group, Tooltip, ActionIcon, Image } from "@mantine/core";
import router from "next/router";

const CategorySection = () => {
  const { departments } = useProduct();
  console.log(departments);
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
              variant="filled"
              onClick={() => searchProductByCategorie(category.name)}
            >
              <Image
                src={category.image}
                alt={category.name}
                style={{ filter: "invert(1)" }}
              />
            </ActionIcon>
          </Tooltip>
        ))}
      </Group>
    </>
  );
};

export default CategorySection;
