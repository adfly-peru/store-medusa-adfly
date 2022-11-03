import { AppShell, Aside, Burger, Center, Container, Footer, Grid, Group, Header, Image, Navbar, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core'
import { Product, StoreGetProductsParams } from '@medusajs/medusa'
import { useCart } from 'medusa-react'
import { useMemo, useState } from 'react'
import { useInfiniteQuery } from "react-query"
import { dehydrate, QueryClient, useQuery } from "react-query"
import {
    BrowserRouter as Router,
    useParams,
  } from "react-router-dom";
import { LayoutHeader } from '../../components/common/header'
import CountrySelect from '../../components/country-select'
import Items from '../../components/order/items'
import OrderDetails from '../../components/order/order-details'
import OrderSummary from '../../components/order/order-summary'
import PaymentDetails from '../../components/order/payment-details'
import ShippingDetails from '../../components/order/shipping-details'
import { medusaClient } from '../../lib/config'

const fetchOrder = async (id: string) => {
    return await medusaClient.orders.retrieve(id).then(({ order }) => order)
}

export function OrderConfirmPage() {
    const theme = useMantineTheme();
    const { order } = useParams();
    const id = order ?? ''

    const { isSuccess, data, isLoading, isError } = useQuery(
        ["get_order_confirmed", id],
        () => fetchOrder(id),
        {
            enabled: id.length > 0,
            staleTime: Infinity,
        }
    )

    if (data == null || data == undefined) {
        return (
            <></>
        )
    }

    return (
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
            <div className="max-w-4xl h-full bg-white w-full">
            <OrderDetails order={data} />
            <Items
                items={data.items}
                region={data.region}
                cartId={data.cart_id}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-10 border-b border-gray-200">
                <PaymentDetails
                payments={data.payments}
                paymentStatus={data.payment_status}
                />
                <ShippingDetails
                shippingMethods={data.shipping_methods}
                address={data.shipping_address}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-10">
                <OrderSummary order={data} />
            </div>
            </div>
        </Container>
      </AppShell>
    )
}