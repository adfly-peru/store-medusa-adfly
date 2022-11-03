import { AppShell, Aside, Burger, Center, Container, Footer, Grid, Group, Header, Image, Navbar, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core'
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
import { CheckoutProvider } from '../lib/context/checkout-context'
import CheckoutForm from '../components/checkout/checkout-form'
import CheckoutSummary from '../components/checkout/checkout-summary'

export function CheckoutPage() {

    return (
        <CheckoutProvider>
            <Container size="xl" px="md" py="sm">
                <Group position="apart">
                    <CheckoutForm />
                    <CheckoutSummary />
                </Group>
            </Container>
        </CheckoutProvider>
    )
}