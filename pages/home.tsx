import { AppShell, Text, Header, Navbar, BackgroundImage, Stack, Title, ActionIcon, Group, Space, Grid } from "@mantine/core"
import { useProduct } from "../context/product-context";
import HomeHeader from "../modules/home/components/header"
import AccountLayout from '../modules/account/templates/account-layout';

import CardComponent from '../components/cardComponent';
import Product from '../interfaces/productInterface';

const productsList: Product[] = [
  {
    discount: 50,
    imgUrl: '',
    brand: 'Marca1',
    name: 'Producto1',
    originalPrice: 30,
    finalPrice: 15,
    starts: 5,
  },
  {
    discount: 30,
    imgUrl: '',
    brand: 'Marca2',
    name: 'Producto2',
    originalPrice: 40,
    finalPrice: 15,
    starts: 5,
  },
  {
    discount: 60,
    imgUrl: '',
    brand: 'Marca3',
    name: 'Producto3',
    originalPrice: 35,
    finalPrice: 15,
    starts: 5,
  },
  {
    discount: 20,
    imgUrl: '',
    brand: 'Marca4',
    name: 'Producto4',
    originalPrice: 25,
    finalPrice: 15,
    starts: 5,
  },
  {
    discount: 30,
    imgUrl: '',
    brand: 'Marca5',
    name: 'Producto5',
    originalPrice: 30,
    finalPrice: 15,
    starts: 5,
  },
  {
    discount: 60,
    imgUrl: '',
    brand: 'Marca6',
    name: 'Producto6',
    originalPrice: 80,
    finalPrice: 15,
    starts: 5,
  }
];

const Home = () => {

  const { categories } = useProduct();

  return (
    <AccountLayout>
      <AppShell
      padding={0}
      header={<Header height={120} p="xs"><HomeHeader/></Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
      >
        <BackgroundImage
          src="https://rdb.rw/wp-content/uploads/2018/01/default-placeholder.png"
          radius="xs"
          sx={({ height:300, width:'100%', display: "flex", justifyContent: "center", alignItems: "center" })}
        >
          <Stack align="center" justify="flex-end">
            <Title order={3}>Bienvenido(a) a:</Title>
            <Title order={3}>Tu tienda de Beneficios (*)</Title>
          </Stack>
        </BackgroundImage>
        <Stack align="center" justify="flex-end" spacing="xl">
          <Space/>
          <Title>¡Descubre nuestras categorías! (*)</Title>
          <Group spacing={50}>
          {
            categories.map((category)=>(
              <ActionIcon size={60} radius="xl" variant="filled">
                {category.icon}
              </ActionIcon>
            ))
          }
          </Group>
          <Title>Productos Destacados (*)</Title>
          <Grid mt={20}>
            {
              productsList.map( ( prod ): any =>
                <Grid.Col xs={4}>
                  <CardComponent product={prod}/>
                </Grid.Col>
              )
            }
          </Grid>
        </Stack>
      </AppShell>
    </AccountLayout>
  )
}
  
export default Home
  