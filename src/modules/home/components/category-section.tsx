import { useProduct } from "@context/product-context";
import { Carousel } from "@mantine/carousel";
import {
  Title,
  ActionIcon,
  Image,
  Text,
  Stack,
  MediaQuery,
} from "@mantine/core";
import router from "next/router";

const CategorySection = () => {
  const { departments } = useProduct();

  const searchProductByCategorie = (categorieToSearch: string) => {
    router.push({
      pathname: "/search",
      query: { data: categorieToSearch },
    });
  };
  return (
    <>
      <Title align="center">¡Descubre lo que tenemos para ti! (*)</Title>
      <MediaQuery
        smallerThan="sm"
        styles={{
          width: "100%",
        }}
      >
        <Carousel
          w="90%"
          align="center"
          loop
          slideSize="14%"
          slideGap="xs"
          breakpoints={[
            { maxWidth: "md", slideSize: "25%", slideGap: "xs" },
            { maxWidth: "sm", slideSize: "50%", slideGap: "xs" },
          ]}
        >
          {departments
            .filter((d) => d.outstanding)
            .map((category, i) => (
              <Carousel.Slide key={category.id}>
                <Stack align="center" key={category.id}>
                  <ActionIcon
                    key={`${i}action`}
                    size={60}
                    variant="transparent"
                    onClick={() => searchProductByCategorie(category.name)}
                  >
                    <Image src={category.image} alt={category.name} />
                  </ActionIcon>
                  <Text>{category.name}</Text>
                </Stack>
              </Carousel.Slide>
            ))}
        </Carousel>
      </MediaQuery>
    </>
  );
};

export default CategorySection;
