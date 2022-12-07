import React from "react";
import { useRouter } from "next/router";

import HomeHeader from "../../modules/home/components/header";
import Product from "../../interfaces/productInterface"
import { CardProductDetails } from "../../components/cardProductDetailsComponent";
import { title } from "process";
import { AppShell, Container, Grid, Header, Stack } from "@mantine/core";
import CardComponent from "../../components/cardComponent";
import AccountLayout from "../../modules/account/templates/account-layout";

const products: Product[] = [
    {
      discount: 50,
      imgUrl: 'https://www.gloria.com.pe/uploads/products/lacteos/externa.jpg',
      brand: 'Gloria',
      name: 'Leche',
      originalPrice: 30,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 30,
      imgUrl: 'https://plazavea.vteximg.com.br/arquivos/ids/2633807-1000-1000/20201565.jpg',
      brand: 'Donofrio',
      name: 'Panetón',
      originalPrice: 40,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 60,
      imgUrl: 'https://plazavea.vteximg.com.br/arquivos/ids/16382255-1000-1000/20258247.jpg',
      brand: 'Gloria',
      name: 'Mantequilla',
      originalPrice: 35,
      finalPrice: 15,
      stars: 5,
    }
  ]

interface ProductDetails {
  discount: number;
  imgUrl: string[],
  brand: string,
  name: string,
  originalPrice: number,
  finalPrice: number,
  stars: number,
  stock: number,
  expirationDate: string,
  details: string,
}
  const infoCard: ProductDetails = {
    discount: 20,
    imgUrl: ['', ''],
    brand: 'Donofrio',
    name: 'Helado',
    originalPrice: 50,
    finalPrice: 30,
    stars: 20,
    stock: 5,
    expirationDate: '10/12/24',
    details: 'string',
  }

export default function ProductInfo() {
    const router = useRouter();
    const productID = router.query.product;

    let showProduct;
    products.forEach(item => {
      if (item.name === productID) {
        showProduct = item;
      }
    });
    console.log('showProduct', showProduct);

    return (
      <AccountLayout>
        <AppShell
        padding={0}
        header={<Header height={120} p="xs">
          <HomeHeader/></Header>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
        >

          <Container mt={20}>
            
          <CardProductDetails discount={50} imgUrl={['https://www.gloria.com.pe/uploads/products/lacteos/externa.jpg', '']} brand={"Gloria"} name={"Leche"} originalPrice={30} finalPrice={15} stars={5} stock={5} expirationDate={"12/12/24"} details={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi libero totam enim ab quod quidem, explicabo voluptas, vero excepturi magnam aperiam autem maxime dolores fugit quos nulla numquam temporibus impedit!"} />
          </Container>

          <Stack align="center" justify="flex-end" spacing="xl">
            <Grid>
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
    );
}