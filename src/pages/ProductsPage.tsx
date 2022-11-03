import { AppShell, Aside, Burger, Center, Container, Footer, Grid, Header, Image, Navbar, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core'
import { Product, StoreGetProductsParams } from '@medusajs/medusa'
import { useCart } from 'medusa-react'
import { useMemo, useState } from 'react'
import { useInfiniteQuery } from "react-query"
import CountrySelect from '../components/country-select'
import ProductPreview from '../components/products/product-preview'
import { fetchProductsList } from '../lib/data'
import usePreviews from '../lib/hooks/use-previews'
import { dehydrate, QueryClient, useQuery } from "react-query"
import {
    BrowserRouter as Router,
    useParams,
  } from "react-router-dom";
import { medusaClient } from '../lib/config'
import OptionSelect from '../components/products/option-select'
import { ProductInformation } from '../components/products/product-information'
import { ProductProvider } from '../lib/context/product-context'
import { LayoutHeader } from '../components/common/header'

export function ProductsPage() {
  const theme = useMantineTheme();
  const { handle } = useParams();
  const fetchProduct = async (handle: string) => {
    return await medusaClient.products
      .list({ handle })
      .then(({ products }) => products[0])
  }
  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_product`, handle],
    () => fetchProduct(handle ?? ''),
    {
      enabled: (handle ?? '').length > 0,
      keepPreviousData: true,
    }
  )
  
  console.log(data)
  if (isSuccess) {
    return (
        <>
        <AppShell
        styles={{
            main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        footer={
            <Footer height={60} p="md">
            <CountrySelect />
            </Footer>
        }
        header={
            <LayoutHeader/>
        }
        >
        <Container size="md" px="xs">
            <ProductProvider product={data}>
                <ProductInformation product={data}/>
            </ProductProvider>
        </Container>
        </AppShell>
        </>
    )
  }
  return <></>
}