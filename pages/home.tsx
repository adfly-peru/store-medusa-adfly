import { AppShell, Text, Header, Navbar, BackgroundImage, Stack, Title, ActionIcon, Group, Space, Grid } from "@mantine/core"
import { useProduct } from "../context/product-context";
import HomeHeader from "../modules/home/components/header"
import AccountLayout from '../modules/account/templates/account-layout';

import CardComponent from '../components/cardComponent';
import AuthLayout from "../modules/account/templates/authentication-layout";

const Home = () => {

  const { categories, products } = useProduct();

  return (
  <AuthLayout>
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
            categories.map((category, i)=>(
              <ActionIcon key={i} size={60} radius="xl" variant="filled">
                {category.icon}
              </ActionIcon>
            ))
          }
          </Group>
          <Title>Productos Destacados (*)</Title>
          <Grid mt={20}>
            {
              products.map( ( prod, i ): any =>
                <Grid.Col key={i} xs={3}>
                  <CardComponent product={prod}/>
                </Grid.Col>
              )
            }
          </Grid>
        </Stack>
      </AppShell>
    </AccountLayout>
  </AuthLayout>
  )
}
  
export default Home
  