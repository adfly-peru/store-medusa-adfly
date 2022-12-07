import React from "react";
import { useRouter } from "next/router";

import HomeHeader from "../../modules/home/components/header";
import Product from "../../interfaces/productInterface"
import { CardProductDetails } from "../../components/cardProductDetailsComponent";
import { title } from "process";
import { AppShell, Container, Grid, Header, Loader, Stack } from "@mantine/core";
import CardComponent from "../../components/cardComponent";
import AccountLayout from "../../modules/account/templates/account-layout";
import { useProduct } from "../../context/product-context";

export default function ProductInfo() {
    const router = useRouter();
    const productID = router.query.product;
    const { getProduct, products } = useProduct();

    const showProduct = getProduct(productID as string);

    console.log('showProduct', showProduct);

    if (showProduct == null) {
      return <Loader />;
    }

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
            
          <CardProductDetails product={showProduct} />
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