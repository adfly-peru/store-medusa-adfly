import { useProduct } from "@context/product-context";
import { Department } from "@interfaces/category";
import { Carousel } from "@mantine/carousel";
import {
  Title,
  ActionIcon,
  Image,
  Text,
  Stack,
  MediaQuery,
  Space,
} from "@mantine/core";
import router from "next/router";
import { useEffect, useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";

const CategorySection = () => {
  const { departments } = useProduct();
  const [departmentsToShow, setDepartmentsToShow] = useState<Department[]>([]);

  const searchProductByCategorie = (categorieToSearch: string) => {
    amplitude.track("Search Product", {
      department: categorieToSearch,
      origin: "Home Departments",
    });
    router.push({
      pathname: "/search",
      query: { department: categorieToSearch },
    });
  };

  useEffect(() => {
    const departmentsFiltered = departments.filter((d) => d.outstanding);
    if (departmentsFiltered.length < 10 && departments.length > 0) {
      const completeList: Department[] = [];
      for (let i = 0; i < 10; i++) {
        completeList.push(departmentsFiltered[i % departmentsFiltered.length]);
      }
      setDepartmentsToShow(completeList);
    } else setDepartmentsToShow(departmentsFiltered);
  }, [departments]);
  return (
    <>
      <Title
        align="center"
        style={{
          fontSize: "31px",
          fontWeight: 400,
          lineHeight: "37.2px",
        }}
      >
        ¿Qué estás buscando?
      </Title>
      {/* <Space h={32} /> */}
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
          {departmentsToShow.map((category, i) => (
            <Carousel.Slide key={i}>
              <Stack align="center">
                <ActionIcon
                  key={`${i}action`}
                  size={60}
                  variant="transparent"
                  onClick={() => searchProductByCategorie(category.name)}
                  style={{
                    border: "0.89px solid black",
                    borderRadius: 89.28,
                    padding: 10,
                  }}
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
