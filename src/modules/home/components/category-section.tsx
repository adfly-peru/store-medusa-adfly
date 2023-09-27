import { useProduct } from "@context/product-context";
import { Carousel } from "@mantine/carousel";
import {
  Title,
  ActionIcon,
  Image,
  useMantineColorScheme,
  Text,
  Stack,
  MediaQuery,
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
      <Title align="center">¡Descubre lo que tenemos para ti! (*)</Title>
      <MediaQuery
        smallerThan="sm"
        styles={{
          width: "100%",
        }}
      >
        <Carousel
          align="center"
          loop
          slideSize="25%"
          slideGap="md"
          breakpoints={[
            { maxWidth: "md", slideSize: "33.33333%", slideGap: "xs" },
            { maxWidth: "sm", slideSize: "50%", slideGap: "xs" },
          ]}
        >
          {departments.map((category, i) => (
            <Carousel.Slide>
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
            </Carousel.Slide>
          ))}
        </Carousel>
      </MediaQuery>
    </>
  );
};

export default CategorySection;
