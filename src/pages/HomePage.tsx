import { AppShell, Aside, Burger, Center, Container, Footer, Grid, Header, MediaQuery, Navbar, SimpleGrid, Text, useMantineTheme } from '@mantine/core'
import { Product, StoreGetProductsParams } from '@medusajs/medusa'
import { useCart } from 'medusa-react'
import { useMemo, useState } from 'react'
import { useInfiniteQuery } from "react-query"
import { LayoutHeader } from '../components/common/header'
import CountrySelect from '../components/country-select'
import ProductPreview from '../components/products/product-preview'
import { fetchProductsList } from '../lib/data'
import usePreviews from '../lib/hooks/use-previews'

export function HomePage() {
  const { cart } = useCart()
  const [params, setParams] = useState<StoreGetProductsParams>({})
  
  const queryParams = useMemo(() => {
    const p: StoreGetProductsParams = {}

    if (cart?.id) {
      p.cart_id = cart.id
    }

    p.is_giftcard = false

    return {
      ...p,
      ...params,
    }
  }, [cart?.id, params])

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-store`, queryParams, cart],
      ({ pageParam }) => fetchProductsList( pageParam, queryParams ),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )

    
  console.log('Pages ', data?.pages)
  console.log('Region ', cart)
  const previews = usePreviews({ pages: data?.pages, region: cart?.region })
  console.log('Previews ', previews)
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
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
        <SimpleGrid cols={3}>
          {previews.map((p) => (
            <li key={p.id}>
              <ProductPreview {...p} />
            </li>
          ))}
        </SimpleGrid>
      </Container>
    </AppShell>
    </>
  )
}