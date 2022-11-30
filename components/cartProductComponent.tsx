import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, Badge, Button, Container, createStyles, Flex, TextInput, Box, Grid, Stack, Anchor, Center, Title, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMinus, IconEye, IconFileZip, IconTrash, IconPlus } from '@tabler/icons';
import { useState } from 'react';
import Product from '../interfaces/productInterface';

const CartProduct = ({ product } : {product: Product}) => {

  const [showBuy, setShowBuy] = useState(false);
  const [cant, setCant] = useState(0);
  
  // Calculo de precio final
  let finalPrice = product.originalPrice - (product.originalPrice * product.discount / 100);
  let ahorro = product.originalPrice - product.finalPrice;
  
  return (
    <Container>
        <Grid justify="center" align="center" sx={{ paddingBottom: 20, paddingTop: 20 }} grow>
            <Grid.Col span={6}>
                <Image src={product.imgUrl} alt={product.imgUrl} height={80} fit="contain" withPlaceholder/>
            </Grid.Col>
            <Grid.Col span={6}>
                <Stack spacing={5}>
                    <Title order={4}>{product.name}</Title>
                    <Text fw={500}>{product.brand}</Text>
                    <Text>Cantidad: {1}</Text>
                    <Button color="gray" leftIcon={<IconTrash />} onClick={() => null}>
                        Eliminar
                    </Button>
                </Stack>
            </Grid.Col>
        </Grid>
        <Divider size="xs" />
    </Container>
  )
}
  
  export default CartProduct
  