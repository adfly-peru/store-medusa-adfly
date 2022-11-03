import { AppShell, Aside, Burger, Button, Center, clsx, Container, Footer, Grid, Header, Image, Navbar, SimpleGrid, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { Product, StoreGetProductsParams } from '@medusajs/medusa'
import { useCart } from 'medusa-react'
import { useMemo, useState } from 'react'
import { dehydrate, QueryClient, useQuery } from "react-query"
import {
    BrowserRouter as Router,
    useParams,
  } from "react-router-dom";
import { useProductActions } from '../../../lib/context/product-context'
import useProductPrice from '../../../lib/hooks/use-product-price'
import OptionSelect from '../option-select'

export function ProductInformation({ product } : { product : Product }) {

  const { updateOptions, addToCart, options, inStock, variant } =
  useProductActions()

  const price = useProductPrice({ id: product?.id ?? '', variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price
    return variantPrice || cheapestPrice || null
  }, [price])

  console.log('Selected price', selectedPrice)
  
    return (
        <>
        <Grid>
            <Grid.Col span={6}>
                <Image
                    radius="md"
                    src={product.thumbnail}
                    alt={product.title}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <Stack justify="flex-start">
                    <Title weight={100} align="center">
                        {product.title}
                    </Title>
                    <Text>
                        {product.description}
                    </Text>
                    {product.variants.length > 1 && (
                        <>
                        {product.options.map((option) => {
                            return (
                                <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title}
                                />
                            )
                        })}
                        </>
                    )}
                    {selectedPrice ? (
                    <>
                        <Text
                        color={selectedPrice.price_type === "sale" ? 'red' : 'black'}
                        >
                            {selectedPrice.calculated_price}
                        </Text>
                        {selectedPrice.price_type === "sale" && (
                        <>
                            <p>
                            <span className="text-gray-500">Original: </span>
                            <span className="line-through">
                                {selectedPrice.original_price}
                            </span>
                            </p>
                            <span className="text-rose-600">
                            -{selectedPrice.percentage_diff}%
                            </span>
                        </>
                        )}
                    </>
                    ) : (
                    <></>
                    )}

                    <Button onClick={addToCart}>
                        {!inStock ? "Out of stock" : "Add to cart"}
                    </Button>
                </Stack>
            </Grid.Col>
        </Grid>
        </>
    )

}